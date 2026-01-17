"use client";

import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCoreInstance } from "@/hooks/use-core-instance";

export type DocumentProps = {
  /**
   * Path to the PDF document to load.
   * Can be a relative path (e.g., "/documents/sample.pdf") or
   * an absolute URL (e.g., "https://example.com/document.pdf").
   */
  documentPath: string;
  /**
   * Callback fired when the document has been successfully loaded.
   */
  onLoad?: () => void;
  /**
   * Callback fired when document loading fails.
   */
  onError?: (error: Error) => void;
};

/**
 * Component for loading PDF documents into the viewer.
 *
 * This component uses @tanstack/react-query's useMutation for document loading,
 * which provides built-in state management for loading, error, and success states.
 *
 * Must be used within a WebViewerProvider context.
 */
export const Document = ({ documentPath, onLoad, onError }: DocumentProps) => {
  const { documentViewer } = useCoreInstance();
  const previousPathRef = useRef<string | null>(null);

  const { mutate: loadDocument } = useMutation({
    mutationFn: async (path: string) => {
      await documentViewer.loadDocument(path);
    },
    onSuccess: () => {
      onLoad?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  useEffect(() => {
    // Only load if the path has changed to avoid reloading on re-renders
    if (documentPath && documentPath !== previousPathRef.current) {
      previousPathRef.current = documentPath;
      loadDocument(documentPath);
    }
  }, [documentPath, loadDocument]);

  // This is a non-visual component
  return null;
};
