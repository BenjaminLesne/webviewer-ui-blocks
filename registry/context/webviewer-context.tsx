"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { WebViewerContextValue } from "@/lib/webviewer-types";

export const WebViewerContext = createContext<WebViewerContextValue>({
  Core: null,
  documentViewer: null,
});

export type WebViewerProviderProps = PropsWithChildren<{
  /**
   * Path to the WebViewer worker files.
   * Defaults to NEXT_PUBLIC_PDFTRON_PATH environment variable or "/webviewer/lib".
   */
  workerPath?: string;
}>;

export const WebViewerProvider = ({
  children,
  workerPath = process.env.NEXT_PUBLIC_PDFTRON_PATH
    ? `${process.env.NEXT_PUBLIC_PDFTRON_PATH}/core`
    : "/webviewer/lib/core",
}: WebViewerProviderProps) => {
  // Initialize Core and DocumentViewer synchronously
  // window.Core is guaranteed to exist since we're a child of LoadWebviewerCore
  const [state] = useState(() => {
    const CoreInstance = window.Core!;

    CoreInstance.setWorkerPath(workerPath);
    CoreInstance.enableFullPDF();

    const docViewer = new CoreInstance.DocumentViewer();
    docViewer.enableAnnotations();

    return {
      Core: CoreInstance,
      documentViewer: docViewer,
    };
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (state.documentViewer) {
        try {
          void state.documentViewer.closeDocument();
        } catch {
          // DocumentViewer might not have a document loaded
        }
      }
    };
  }, [state.documentViewer]);

  return (
    <WebViewerContext.Provider value={state}>
      {children}
    </WebViewerContext.Provider>
  );
};

export const useWebViewerContext = () => useContext(WebViewerContext);
