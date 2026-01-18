"use client";

import { useEffect, useRef } from "react";
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
 * Must be used as a child of ViewerCanvas - the canvas must be
 * initialized before documents can be loaded.
 *
 * Must be used within a WebViewerProvider context.
 */
export const Document = ({ documentPath, onLoad, onError }: DocumentProps) => {
  const { documentViewer } = useCoreInstance();
  const previousPathRef = useRef<string | null>(null);

  // Set up event listeners for onLoad/onError callbacks
  useEffect(() => {
    if (!onLoad && !onError) return;

    const handleDocumentLoaded = () => onLoad?.();

    documentViewer.addEventListener("documentLoaded", handleDocumentLoaded);

    return () => {
      documentViewer.removeEventListener("documentLoaded", handleDocumentLoaded);
    };
  }, [documentViewer, onLoad, onError]);

  // Load document when path changes
  useEffect(() => {
    if (documentPath && documentPath !== previousPathRef.current) {
      previousPathRef.current = documentPath;
      void documentViewer.loadDocument(documentPath);
    }
  }, [documentPath, documentViewer]);

  // This is a non-visual component
  return null;
};
