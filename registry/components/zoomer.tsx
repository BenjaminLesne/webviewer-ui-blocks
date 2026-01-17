"use client";

import { useState, useEffect, useCallback, type CSSProperties } from "react";
import { useZoom } from "@/hooks/use-zoom";

export type ZoomerProps = {
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
   * CSS class names for the input field.
   */
  inputClassName?: string;
};

/**
 * Modern vertical zoom UI with editable input.
 *
 * Features:
 * - Vertical layout with + button on top, - button on bottom
 * - Editable input field for direct zoom percentage entry
 * - Input syncs automatically with actual zoom level
 * - Supports both percentage (e.g., "150%") and decimal (e.g., "1.5") input
 *
 * @example
 * ```tsx
 * <Zoomer
 *   className="flex flex-col items-center gap-1"
 *   buttonClassName="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
 *   inputClassName="w-16 text-center border rounded"
 * />
 * ```
 */
export const Zoomer = ({
  className,
  style,
  buttonClassName,
  inputClassName,
}: ZoomerProps) => {
  const { zoomLevel, zoomIn, zoomOut, zoomTo } = useZoom();
  const [inputValue, setInputValue] = useState(() =>
    Math.round(zoomLevel * 100).toString()
  );

  // Sync input value with actual zoom level when it changes externally
  useEffect(() => {
    setInputValue(Math.round(zoomLevel * 100).toString());
  }, [zoomLevel]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleInputBlur = useCallback(() => {
    // Parse the input value and apply zoom
    let value = inputValue.trim();

    // Remove % sign if present
    if (value.endsWith("%")) {
      value = value.slice(0, -1);
    }

    const numValue = parseFloat(value);

    if (!isNaN(numValue)) {
      // If value is > 10, treat as percentage; otherwise treat as decimal
      const zoomValue = numValue > 10 ? numValue / 100 : numValue;
      zoomTo(zoomValue);
    }

    // Reset input to match actual zoom level
    setInputValue(Math.round(zoomLevel * 100).toString());
  }, [inputValue, zoomLevel, zoomTo]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleInputBlur();
        (e.target as HTMLInputElement).blur();
      }
      if (e.key === "Escape") {
        setInputValue(Math.round(zoomLevel * 100).toString());
        (e.target as HTMLInputElement).blur();
      }
    },
    [handleInputBlur, zoomLevel]
  );

  return (
    <div className={className} style={style}>
      <button
        type="button"
        onClick={zoomIn}
        className={buttonClassName}
        aria-label="Zoom in"
      >
        +
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className={inputClassName}
        aria-label="Zoom percentage"
      />
      <button
        type="button"
        onClick={zoomOut}
        className={buttonClassName}
        aria-label="Zoom out"
      >
        -
      </button>
    </div>
  );
};
