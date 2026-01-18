"use client";

import type { CSSProperties, PropsWithChildren } from "react";
import { ScrollViewContainer } from "@/components/scroll-view-container";
import { ViewerElement } from "@/components/viewer-element";

export type ViewerCanvasProps = PropsWithChildren<{
  /**
   * Additional CSS class names for the scroll container.
   */
  className?: string;
  /**
   * Inline styles for the scroll container.
   */
  style?: CSSProperties;
}>;

/**
 * Composite component that combines ScrollViewContainer and ViewerElement.
 * This is the main canvas where PDF documents are rendered with scroll support.
 *
 * @example
 * ```tsx
 * <ViewerCanvas className="h-[500px] overflow-auto">
 *   <Document documentPath="/sample.pdf" />
 * </ViewerCanvas>
 * ```
 */
export const ViewerCanvas = ({
  children,
  className,
  style,
}: ViewerCanvasProps) => {
  return (
    <ScrollViewContainer className={className} style={style}>
      <ViewerElement>{children}</ViewerElement>
    </ScrollViewContainer>
  );
};
