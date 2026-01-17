"use client";

import { useWebViewerContext } from "@/context/webviewer-context";

/**
 * Hook for accessing Core and DocumentViewer instances from the WebViewer context.
 *
 * @throws Error if used outside of WebViewerProvider or if instances are not initialized
 * @returns Object containing Core and documentViewer instances (guaranteed non-null)
 */
export const useCoreInstance = () => {
  const { Core, documentViewer } = useWebViewerContext();

  if (!Core) {
    throw new Error(
      "useCoreInstance must be used within a WebViewerProvider after Core is initialized"
    );
  }

  if (!documentViewer) {
    throw new Error(
      "useCoreInstance must be used within a WebViewerProvider after DocumentViewer is initialized"
    );
  }

  return { Core, documentViewer };
};
