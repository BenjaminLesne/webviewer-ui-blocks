"use client";

import { useCallback } from "react";
import { useCoreInstance } from "@/hooks/use-core-instance";

/**
 * Hook for running PDFNet operations with automatic license key handling.
 *
 * PDFNet operations require a license key and proper cleanup. This hook provides
 * a wrapper function that handles both automatically using PDFNet.runWithCleanup.
 *
 * @param licenseKey - Optional license key. Defaults to NEXT_PUBLIC_PDFTRON_LICENSE env var.
 * @returns A function that wraps async PDFNet operations with license and cleanup handling.
 *
 * @example
 * ```tsx
 * const runWithLicense = useRunWithLicense();
 *
 * const result = await runWithLicense(async () => {
 *   const doc = await PDFNet.PDFDoc.createFromURL(url);
 *   // ... perform operations
 *   return doc;
 * });
 * ```
 */
export const useRunWithLicense = (
  licenseKey: string = process.env.NEXT_PUBLIC_PDFTRON_LICENSE ?? ""
) => {
  const { Core } = useCoreInstance();

  const runWithLicense = useCallback(
    async <T>(fn: () => Promise<T>): Promise<T> => {
      const PDFNet = Core.PDFNet;

      if (!PDFNet) {
        throw new Error(
          "PDFNet is not available. Make sure LoadPDFNet is rendered before using this hook."
        );
      }

      return PDFNet.runWithCleanup(fn, licenseKey);
    },
    [Core, licenseKey]
  );

  return runWithLicense;
};
