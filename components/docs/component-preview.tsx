"use client";

import { type PropsWithChildren } from "react";
import { cn } from "@/lib/cn";
import { MockWebViewerProvider } from "./mock-webviewer-provider";

export type ComponentPreviewProps = PropsWithChildren<{
  /** Additional class names for the preview container */
  className?: string;
  /** Initial zoom level for mock provider (default: 1) */
  initialZoom?: number;
  /** Whether to show description text below the preview */
  description?: string;
}>;

/**
 * Preview wrapper for component documentation.
 * Wraps children in MockWebViewerProvider so real components work without Apryse.
 *
 * @example
 * ```tsx
 * <ComponentPreview>
 *   <ZoomControls className="flex items-center gap-2" />
 * </ComponentPreview>
 * ```
 */
export const ComponentPreview = ({
  children,
  className,
  initialZoom = 1,
  description,
}: ComponentPreviewProps) => {
  return (
    <div className="not-prose my-6">
      <div
        className={cn(
          "flex min-h-[150px] items-center justify-center rounded-lg border bg-fd-card p-6",
          className
        )}
      >
        <MockWebViewerProvider initialZoom={initialZoom}>
          {children}
        </MockWebViewerProvider>
      </div>
      {description && (
        <p className="mt-2 text-center text-sm text-fd-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};
