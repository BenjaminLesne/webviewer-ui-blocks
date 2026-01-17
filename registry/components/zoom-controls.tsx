"use client";

import type { CSSProperties } from "react";
import { useZoom } from "@/hooks/use-zoom";

export type ZoomControlsProps = {
  /**
   * Additional CSS class names for the container.
   */
  className?: string;
  /**
   * Inline styles for the container.
   */
  style?: CSSProperties;
  /**
   * CSS class names for the zoom buttons.
   */
  buttonClassName?: string;
  /**
   * CSS class names for the percentage display.
   */
  displayClassName?: string;
};

/**
 * Simple zoom controls with +/- buttons and percentage display.
 *
 * Uses the useZoom hook to get and set the zoom level.
 *
 * @example
 * ```tsx
 * <ZoomControls className="flex items-center gap-2" />
 * ```
 */
export const ZoomControls = ({
  className,
  style,
  buttonClassName,
  displayClassName,
}: ZoomControlsProps) => {
  const { zoomLevel, zoomIn, zoomOut } = useZoom();

  const percentageDisplay = `${Math.round(zoomLevel * 100)}%`;

  return (
    <div className={className} style={style}>
      <button
        type="button"
        onClick={zoomOut}
        className={buttonClassName}
        aria-label="Zoom out"
      >
        -
      </button>
      <span className={displayClassName}>{percentageDisplay}</span>
      <button
        type="button"
        onClick={zoomIn}
        className={buttonClassName}
        aria-label="Zoom in"
      >
        +
      </button>
    </div>
  );
};
