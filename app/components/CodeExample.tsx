/* ============================================================
   CODE EXAMPLE COMPONENT (Server Component)
   ============================================================
   
   A reusable component to display code snippets with a title.
   Used throughout the learning pages to show code examples.
   ============================================================ */

interface CodeExampleProps {
  title: string;
  code: string;
  language?: string;
}

export default function CodeExample({ title, code, language = "tsx" }: CodeExampleProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400">
        <span className="font-medium">{title}</span>
        <span className="uppercase tracking-wide">{language}</span>
      </div>
      <pre className="code-block !rounded-none !rounded-b-xl">{code}</pre>
    </div>
  );
}
