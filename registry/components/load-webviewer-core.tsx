"use client";

import {
  useState,
  useEffect,
  useRef,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import Script from "next/script";
import { DEFAULT_WEBVIEWER_PATH } from "@/lib/webviewer-constants";

export type LoadWebviewerCoreProps = PropsWithChildren<{
  /**
   * Path to the PDFTron/Apryse WebViewer files.
   * Defaults to NEXT_PUBLIC_PDFTRON_PATH environment variable or "/webviewer".
   */
  pdftronPath?: string;
  /**
   * Custom loading UI to display while the script is loading.
   * Defaults to a simple "Loading WebViewer..." div.
   */
  loadingUI?: ReactNode;
  /**
   * Custom error UI to display if the script fails to load.
   * Defaults to a simple "Failed to load WebViewer Core script" div.
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

export const LoadWebviewerCore = ({
  children,
  pdftronPath = process.env.NEXT_PUBLIC_PDFTRON_PATH || DEFAULT_WEBVIEWER_PATH,
  loadingUI = <div>Loading WebViewer...</div>,
  errorUI = <div>Failed to load WebViewer Core script</div>,
  onLoad,
  onError,
}: LoadWebviewerCoreProps) => {
  const [ready, setReady] = useState(
    () => typeof window !== "undefined" && !!window.Core
  );
  const [error, setError] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (window.Core) {
      setReady(true);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (error) {
    return <>{errorUI}</>;
  }

  return (
    <>
      <Script
        src={`${pdftronPath}/core/webviewer-core.min.js`}
        strategy="afterInteractive"
        onLoad={() => {
          if (window.Core) {
            setReady(true);
            onLoad?.();
          } else {
            // Retry once after a short delay in case Core initializes asynchronously
            timeoutRef.current = setTimeout(() => {
              if (window.Core) {
                setReady(true);
                onLoad?.();
              } else {
                setError(true);
                onError?.(new Error("WebViewer Core failed to initialize"));
              }
            }, 100);
          }
        }}
        onError={() => {
          if (!window.Core) {
            setError(true);
            onError?.(new Error("Failed to load WebViewer Core script"));
          }
        }}
      />
      {ready ? children : loadingUI}
    </>
  );
};
