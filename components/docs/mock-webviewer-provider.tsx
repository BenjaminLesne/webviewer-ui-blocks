"use client";

import {
  useState,
  useCallback,
  useMemo,
  useRef,
  type PropsWithChildren,
} from "react";
import { WebViewerContext } from "@/context/webviewer-context";

type MockDocumentViewer = {
  getZoomLevel: () => number;
  zoomTo: (level: number) => void;
  addEventListener: (event: string, callback: () => void) => void;
  removeEventListener: (event: string, callback: () => void) => void;
  setScrollViewElement: (element: HTMLElement | null) => void;
  setViewerElement: (element: HTMLElement | null) => void;
};

export type MockWebViewerProviderProps = PropsWithChildren<{
  /** Initial zoom level (default: 1) */
  initialZoom?: number;
}>;

/**
 * Mock WebViewer provider for documentation previews.
 * Supplies a fake documentViewer that supports zoom operations without loading Apryse.
 * Uses the same context as the real WebViewerProvider, so real components work seamlessly.
 *
 * @example
 * ```tsx
 * <MockWebViewerProvider>
 *   <ZoomControls />
 * </MockWebViewerProvider>
 * ```
 */
export const MockWebViewerProvider = ({
  children,
  initialZoom = 1,
}: MockWebViewerProviderProps) => {
  const [zoomLevel, setZoomLevel] = useState(initialZoom);
  const listenersRef = useRef(new Set<() => void>());

  const triggerZoomUpdate = useCallback(() => {
    listenersRef.current.forEach((cb) => cb());
  }, []);

  const mockDocumentViewer = useMemo<MockDocumentViewer>(() => {
    return {
      getZoomLevel: () => zoomLevel,
      zoomTo: (level: number) => {
        setZoomLevel(level);
        // Trigger update after state change
        setTimeout(triggerZoomUpdate, 0);
      },
      addEventListener: (_event: string, callback: () => void) => {
        listenersRef.current.add(callback);
      },
      removeEventListener: (_event: string, callback: () => void) => {
        listenersRef.current.delete(callback);
      },
      setScrollViewElement: () => {},
      setViewerElement: () => {},
    };
  }, [zoomLevel, triggerZoomUpdate]);

  // Cast to any to satisfy the type system since we're providing a mock
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contextValue = useMemo(
    () => ({
      Core: {} as any,
      documentViewer: mockDocumentViewer as any,
    }),
    [mockDocumentViewer]
  );

  return (
    <WebViewerContext.Provider value={contextValue}>
      {children}
    </WebViewerContext.Provider>
  );
};
