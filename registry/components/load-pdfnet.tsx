"use client";

import { useState, useEffect, type PropsWithChildren, type ReactNode } from "react";
import Script from "next/script";

// Track if PDFNet script has been loaded globally to avoid duplicate loading
let pdfnetScriptLoaded = false;

export type LoadPDFNetProps = PropsWithChildren<{
  /**
   * Path to the PDFTron/Apryse WebViewer files.
   * Defaults to NEXT_PUBLIC_PDFTRON_PATH environment variable or "/webviewer/lib".
   */
  pdftronPath?: string;
  /**
   * Custom loading UI to display while the script is loading.
   * Defaults to a simple "Loading PDFNet..." div.
   */
  loadingUI?: ReactNode;
  /**
   * Custom error UI to display if the script fails to load.
   * Defaults to a simple "Failed to load PDFNet script" div.
   */
  errorUI?: ReactNode;
  /**
   * Callback when the script loads successfully.
   */
  onLoad?: () => void;
  /**
   * Callback when the script fails to load.
   */
  onError?: (error: Error) => void;
}>;

export const LoadPDFNet = ({
  children,
  pdftronPath = process.env.NEXT_PUBLIC_PDFTRON_PATH || "/webviewer/lib",
  loadingUI = <div>Loading PDFNet...</div>,
  errorUI = <div>Failed to load PDFNet script</div>,
  onLoad,
  onError,
}: LoadPDFNetProps) => {
  const [ready, setReady] = useState(() => pdfnetScriptLoaded);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (pdfnetScriptLoaded) {
      setReady(true);
    }
  }, []);

  if (error) {
    return <>{errorUI}</>;
  }

  return (
    <>
      <Script
        src={`${pdftronPath}/core/pdf/PDFNet.js`}
        strategy="afterInteractive"
        onLoad={() => {
          pdfnetScriptLoaded = true;
          setReady(true);
          onLoad?.();
        }}
        onError={() => {
          setError(true);
          onError?.(new Error("Failed to load PDFNet script"));
        }}
      />
      {ready ? children : loadingUI}
    </>
  );
};
