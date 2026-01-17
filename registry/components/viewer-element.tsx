"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useCoreInstance } from "@/hooks/use-core-instance";

export type ViewerElementProps = {
  /**
   * Additional CSS class names for the viewer element.
   */
  className?: string;
  /**
   * Inline styles for the viewer element.
   */
  style?: CSSProperties;
};

/**
 * Component that sets the documentViewer's viewer element on mount.
 * This is where the PDF pages will be rendered.
 */
export const ViewerElement = ({ className, style }: ViewerElementProps) => {
  const { documentViewer } = useCoreInstance();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      documentViewer.setViewerElement(ref.current);
    }

    return () => {
      documentViewer.setViewerElement(null);
    };
  }, [documentViewer]);

  return <div ref={ref} className={className} style={style} />;
};
