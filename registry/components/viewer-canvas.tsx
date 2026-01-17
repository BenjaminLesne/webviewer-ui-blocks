"use client";

import type { CSSProperties } from "react";
import { ScrollViewContainer } from "@/components/scroll-view-container";
import { ViewerElement } from "@/components/viewer-element";

export type ViewerCanvasProps = {
  /**
   * Additional CSS class names for the scroll container.
   */
  className?: string;
  /**
   * Inline styles for the scroll container.
   */
  style?: CSSProperties;
  /**
   * Additional CSS class names for the inner viewer element.
   */
  viewerClassName?: string;
  /**
   * Inline styles for the inner viewer element.
   */
  viewerStyle?: CSSProperties;
};

/**
 * Composite component that combines ScrollViewContainer and ViewerElement.
 * This is the main canvas where PDF documents are rendered with scroll support.
 */
export const ViewerCanvas = ({
  className,
  style,
  viewerClassName,
  viewerStyle,
}: ViewerCanvasProps) => {
  return (
    <ScrollViewContainer className={className} style={style}>
      <ViewerElement className={viewerClassName} style={viewerStyle} />
    </ScrollViewContainer>
  );
};
