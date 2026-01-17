/**
 * Type declarations for @pdftron/webviewer
 *
 * This module declaration provides typing for the WebViewer Core SDK.
 * When users install components from this registry, they should install
 * @pdftron/webviewer in their project for full type support.
 */
declare module "@pdftron/webviewer" {
  export interface DocumentViewer {
    setViewerElement(element: HTMLElement | null): void;
    setScrollViewElement(element: HTMLElement | null): void;
    closeDocument(): Promise<void>;
    loadDocument(
      source: string | File | Blob | ArrayBuffer,
      options?: Record<string, any>
    ): Promise<void>;
    enableAnnotations(): void;
    getZoomLevel(): number;
    zoomTo(zoomLevel: number): void;
    addEventListener(event: string, callback: (...args: any[]) => void): void;
    removeEventListener(
      event: string,
      callback: (...args: any[]) => void
    ): void;
  }

  export interface CoreModule {
    DocumentViewer: new () => DocumentViewer;
    documentViewer: DocumentViewer;
    setWorkerPath(path: string): void;
    enableFullPDF(): void;
    PDFNet?: PDFNetModule;
  }

  export interface PDFNetModule {
    initialize(licenseKey?: string): Promise<void>;
    runWithCleanup<T>(
      fn: () => Promise<T>,
      licenseKey?: string
    ): Promise<T>;
  }

  export const Core: CoreModule;
}

/**
 * Extend the global Window interface to include the Core property
 * which is set when webviewer-core.min.js is loaded
 */
declare global {
  interface Window {
    Core?: import("@pdftron/webviewer").CoreModule;
    PDFNet?: import("@pdftron/webviewer").PDFNetModule;
  }
}

export {};
