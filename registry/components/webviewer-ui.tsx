"use client";

import type { CSSProperties, PropsWithChildren } from "react";
import { ZoomControls } from "@/components/zoom-controls";

export type WebViewerUIProps = PropsWithChildren<{
  /**
   * Title displayed in the toolbar.
   */
  title?: string;
  /**
   * Additional CSS class names for the container.
   */
  className?: string;
  /**
   * Inline styles for the container.
   */
  style?: CSSProperties;
}>;

/**
 * Complete viewer UI with toolbar.
 * Wraps children (typically ViewerCanvas) with a toolbar containing zoom controls.
 *
 * @example
 * ```tsx
 * <WebViewerUI title="My Document">
 *   <ViewerCanvas />
 *   <Document documentPath="/sample.pdf" />
 * </WebViewerUI>
 * ```
 */
export const WebViewerUI = ({
  children,
  title = "Document",
  className,
  style,
}: WebViewerUIProps) => {
  return (
    <div className={className} style={style}>
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b bg-secondary/30 px-4 py-2">
        <div className="text-sm font-medium">{title}</div>
        <ZoomControls
          className="flex items-center gap-2"
          buttonClassName="w-8 h-8 rounded bg-secondary hover:bg-secondary/80 font-medium transition-colors"
          displayClassName="min-w-[50px] text-center text-sm font-medium"
        />
      </div>

      {/* Main content area */}
      <div className="flex-1">{children}</div>
    </div>
  );
};
