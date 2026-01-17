"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type PropsWithChildren,
} from "react";
import { useCoreInstance } from "@/hooks/use-core-instance";

export type ScrollViewContainerProps = PropsWithChildren<{
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
 * Component that sets the documentViewer's scroll view element on mount.
 * This container handles scrolling for the PDF viewer.
 */
export const ScrollViewContainer = ({
  children,
  className,
  style,
}: ScrollViewContainerProps) => {
  const { documentViewer } = useCoreInstance();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      documentViewer.setScrollViewElement(ref.current);
    }

    return () => {
      documentViewer.setScrollViewElement(null);
    };
  }, [documentViewer]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};
