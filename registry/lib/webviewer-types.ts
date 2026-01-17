import type { Core } from "@pdftron/webviewer";

export type DocumentViewer = (typeof Core)["documentViewer"];

export type WebViewerContextValue = {
  Core: typeof Core | null;
  documentViewer: DocumentViewer | null;
};
