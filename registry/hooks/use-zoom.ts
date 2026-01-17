"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useCoreInstance } from "@/hooks/use-core-instance";

const ZOOM_STEP = 0.25;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 10;

/**
 * Hook for managing zoom level state and actions.
 *
 * Uses useSyncExternalStore to subscribe to documentViewer zoom changes,
 * ensuring the UI stays in sync with the actual zoom level.
 *
 * @returns Object containing:
 *   - zoomLevel: Current zoom level (1 = 100%)
 *   - zoomIn: Function to increase zoom by 25%
 *   - zoomOut: Function to decrease zoom by 25%
 *   - zoomTo: Function to set zoom to a specific level
 *
 * @example
 * ```tsx
 * const { zoomLevel, zoomIn, zoomOut, zoomTo } = useZoom();
 *
 * return (
 *   <div>
 *     <button onClick={zoomOut}>-</button>
 *     <span>{Math.round(zoomLevel * 100)}%</span>
 *     <button onClick={zoomIn}>+</button>
 *     <button onClick={() => zoomTo(1)}>Reset</button>
 *   </div>
 * );
 * ```
 */
export const useZoom = () => {
  const { documentViewer } = useCoreInstance();

  const subscribe = useCallback(
    (callback: () => void) => {
      documentViewer.addEventListener("zoomUpdated", callback);
      return () => {
        documentViewer.removeEventListener("zoomUpdated", callback);
      };
    },
    [documentViewer]
  );

  const getSnapshot = useCallback(() => {
    return documentViewer.getZoomLevel();
  }, [documentViewer]);

  const getServerSnapshot = useCallback(() => {
    return 1; // Default zoom level for SSR
  }, []);

  const zoomLevel = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const zoomTo = useCallback(
    (level: number) => {
      const clampedLevel = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, level));
      documentViewer.zoomTo(clampedLevel);
    },
    [documentViewer]
  );

  const zoomIn = useCallback(() => {
    const newLevel = zoomLevel + ZOOM_STEP;
    zoomTo(newLevel);
  }, [zoomLevel, zoomTo]);

  const zoomOut = useCallback(() => {
    const newLevel = zoomLevel - ZOOM_STEP;
    zoomTo(newLevel);
  }, [zoomLevel, zoomTo]);

  return {
    zoomLevel,
    zoomIn,
    zoomOut,
    zoomTo,
  };
};
