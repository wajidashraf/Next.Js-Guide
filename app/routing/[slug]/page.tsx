/* ============================================================
   DYNAMIC ROUTE PAGE — Demonstrates [slug] dynamic segments
   ============================================================
   
   This file is at: app/routing/[slug]/page.tsx
   It matches URLs like:
     /routing/hello-world  → slug = "hello-world"
     /routing/my-first-post → slug = "my-first-post"
     /routing/anything      → slug = "anything"
   
   In Next.js 15+, params is a Promise that must be awaited.
   ============================================================ */

import type { Metadata } from "next";
import Link from "next/link";

// --- TypeScript: Define the props shape ---
interface PageProps {
  params: Promise<{ slug: string }>;  // Dynamic params are Promises in Next.js 15+
}

// --- Dynamic Metadata (changes based on the URL) ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Dynamic: ${slug}`,
  };
}

// --- The Page Component ---
export default async function DynamicRoutePage({ params }: PageProps) {
  // IMPORTANT: In Next.js 15+, params is a Promise — you must await it
  const { slug } = await params;

  // Convert slug to readable title: "hello-world" → "Hello World"
  const readableTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link 
        href="/routing" 
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Routing
      </Link>

      <h1 className="text-3xl font-bold mb-2">🔗 Dynamic Route Demo</h1>
      
      <div className="mt-6 space-y-4">
        {/* Show what was captured from the URL */}
        <div className="p-6 rounded-xl bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
          <h2 className="text-lg font-semibold mb-3 text-purple-700 dark:text-purple-300">
            Parameters from URL
          </h2>
          <div className="space-y-2 text-sm">
            <p><strong>Raw slug:</strong> <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">{slug}</code></p>
            <p><strong>Readable:</strong> <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">{readableTitle}</code></p>
            <p><strong>Current URL:</strong> <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">/routing/{slug}</code></p>
          </div>
        </div>

        {/* How this works */}
        <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
          <h2 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-300">
            How This Works
          </h2>
          <div className="text-sm space-y-2 text-blue-800 dark:text-blue-200">
            <p>📁 This file is at: <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">app/routing/[slug]/page.tsx</code></p>
            <p>🔗 The [slug] folder captures whatever is in the URL after /routing/</p>
            <p>📝 The captured value is available via the <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">params</code> prop</p>
          </div>
        </div>

        {/* Try other URLs */}
        <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold mb-3">Try Other Dynamic URLs</h2>
          <div className="flex flex-wrap gap-2">
            {["nextjs-is-awesome", "learning-typescript", "my-first-project", "2024-recap"].map(
              (example) => (
                <Link
                  key={example}
                  href={`/routing/${example}`}
                  className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  /routing/{example}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
