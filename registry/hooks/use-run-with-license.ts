"use client";

import { useCoreInstance } from "@/hooks/use-core-instance";

type PDFNetOperation<T> = () => Promise<T>;

export const useRunWithLicense = () => {
  const { Core } = useCoreInstance();

  return async <T>(operation: PDFNetOperation<T>): Promise<T> => {
    return Core.PDFNet.runWithCleanup(
      operation,
      process.env.NEXT_PUBLIC_APRYSE_LICENSE_WEB ?? ""
    );
  };
};
