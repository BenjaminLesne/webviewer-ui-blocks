import { promises as fs } from 'fs';
import path from 'path';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

type RegistryType = 'component' | 'hook' | 'context' | 'lib';

interface ComponentSourceProps {
  /**
   * The name of the registry item (e.g., "zoom-controls", "use-zoom")
   */
  name: string;
  /**
   * The type of registry item - determines the file path
   */
  type: RegistryType;
  /**
   * Additional className for the container
   */
  className?: string;
}

/**
 * Maps registry types to their directory paths
 */
const typeToPath: Record<RegistryType, string> = {
  component: 'registry/components',
  hook: 'registry/hooks',
  context: 'registry/context',
  lib: 'registry/lib',
};

/**
 * Maps registry types to their file extensions
 */
const typeToExtension: Record<RegistryType, string> = {
  component: '.tsx',
  hook: '.ts',
  context: '.tsx',
  lib: '.ts',
};

/**
 * Displays the source code of a registry item with syntax highlighting.
 * This is a server component that reads files directly from the registry directory.
 */
export async function ComponentSource({
  name,
  type,
  className,
}: ComponentSourceProps) {
  const directory = typeToPath[type];
  const extension = typeToExtension[type];
  const filePath = path.join(process.cwd(), directory, `${name}${extension}`);

  let code: string;
  try {
    code = await fs.readFile(filePath, 'utf-8');
  } catch {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        Error: Could not load source for {type} &quot;{name}&quot;
      </div>
    );
  }

  const lang = extension === '.tsx' ? 'tsx' : 'ts';

  return (
    <div className={className}>
      <DynamicCodeBlock lang={lang} code={code} />
    </div>
  );
}
