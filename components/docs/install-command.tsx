'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';

interface InstallCommandProps {
  /**
   * The name of the registry item to install
   */
  name: string;
  /**
   * Additional className for the container
   */
  className?: string;
}

/**
 * Shows a copyable installation command for a registry item.
 * Displays a command like: npx shadcn@latest add <registry-url>/<name>.json
 */
export function InstallCommand({ name, className }: InstallCommandProps) {
  const [baseUrl, setBaseUrl] = useState<string>('');

  // Get the base URL on client side
  if (typeof window !== 'undefined' && !baseUrl) {
    setBaseUrl(window.location.origin);
  }

  const command = `npx shadcn@latest add ${baseUrl}/r/${name}.json`;

  const [checked, onClick] = useCopyButton(() => {
    return navigator.clipboard.writeText(command);
  });

  return (
    <div
      className={cn(
        'relative flex items-center gap-2 rounded-lg border bg-fd-card p-3 font-mono text-sm',
        className
      )}
    >
      <code className="flex-1 overflow-x-auto whitespace-nowrap text-fd-muted-foreground">
        {command}
      </code>
      <button
        onClick={onClick}
        className="flex-shrink-0 rounded-md p-1.5 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors"
        aria-label="Copy install command"
      >
        {checked ? (
          <Check className="size-4 text-green-500" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
    </div>
  );
}
