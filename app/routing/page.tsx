/* ============================================================
   ROUTING PAGE — File-Based Routing in Next.js
   ============================================================
   
   ROUTING RULES:
   /app/page.tsx               → /
   /app/about/page.tsx         → /about
   /app/blog/page.tsx          → /blog
   /app/blog/[slug]/page.tsx   → /blog/hello-world (dynamic)
   /app/shop/[...slug]/page.tsx → /shop/a/b/c (catch-all)
   
   SPECIAL FILES IN EACH ROUTE:
   - page.tsx    → The UI for this route
   - layout.tsx  → Shared layout wrapping this route + children
   - loading.tsx → Loading UI (shown while page loads)
   - error.tsx   → Error boundary (shown on errors)
   - not-found.tsx → Shown when route doesn't exist
   ============================================================ */

import type { Metadata } from "next";
import Link from "next/link";
import Card from "../components/Card";
import CodeExample from "../components/CodeExample";

export const metadata: Metadata = {
  title: "Routing & Navigation",
};

export default function RoutingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">🗺️ Routing & Navigation</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Next.js uses file-based routing — your folder structure IS your URL structure.
      </p>

      {/* ============ SECTION 1: How Routing Works ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. File-Based Routing</h2>
        <Card title="Folders = Routes, page.tsx = Visible Page" variant="info">
          <p className="mb-3">
            In Next.js, you don&apos;t configure routes in a file. Instead, you create 
            folders and add a <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">page.tsx</code> file 
            inside them. The folder name becomes the URL.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Folder Structure → URLs"
            code={`app/
├── page.tsx              → URL: /
├── basics/
│   └── page.tsx          → URL: /basics
├── routing/
│   └── page.tsx          → URL: /routing  (THIS PAGE!)
├── blog/
│   ├── page.tsx          → URL: /blog
│   └── [slug]/
│       └── page.tsx      → URL: /blog/my-post (dynamic!)
└── shop/
    └── [...slug]/
        └── page.tsx      → URL: /shop/a/b/c (catch-all)`}
            language="text"
          />
        </div>
      </section>

      {/* ============ SECTION 2: Link Component ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Navigation with Link</h2>
        <Card title="Always use <Link> instead of <a>" variant="warning">
          <p className="mb-3">
            The <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">Link</code> component from 
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded"> next/link</code> provides:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Client-side navigation</strong> — No full page reload (instant!)</li>
            <li><strong>Prefetching</strong> — Linked pages are loaded in the background</li>
            <li><strong>Code splitting</strong> — Only loads JS needed for the target page</li>
          </ul>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Using the Link Component"
            code={`import Link from "next/link";

// Basic link
<Link href="/about">About Page</Link>

// Link with styling (Tailwind)
<Link href="/blog" className="text-blue-500 hover:underline">
  Read Blog
</Link>

// Dynamic link
const postId = "hello-world";
<Link href={\`/blog/\${postId}\`}>Read Post</Link>

// ❌ DON'T use <a> tags for internal navigation!
// <a href="/about">About</a>  ← This causes a full page reload`}
          />
        </div>

        {/* Live demo links */}
        <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-3">▶ Live: Navigation Links (click to test!)</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Home
            </Link>
            <Link href="/basics" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Basics
            </Link>
            <Link href="/routing/hello-world" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Dynamic: /routing/hello-world
            </Link>
            <Link href="/routing/my-first-post" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Dynamic: /routing/my-first-post
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SECTION 3: Dynamic Routes ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. Dynamic Routes</h2>
        <Card title="[brackets] create dynamic URL segments">
          <p className="mb-3">
            Wrap a folder name in <strong>[square brackets]</strong> to make it dynamic.
            The value in the URL becomes available as a parameter in your page.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Dynamic Route Example"
            code={`// File: app/routing/[slug]/page.tsx
// URL: /routing/hello-world → slug = "hello-world"
// URL: /routing/my-post     → slug = "my-post"

interface PageProps {
  params: Promise<{ slug: string }>;  // Next.js 15+ uses Promise
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;  // Await the params
  return <h1>Post: {slug}</h1>;
}

// --- Other Dynamic Route Types ---
// [id]         → Single dynamic segment: /blog/123
// [...slug]    → Catch-all: /shop/clothes/shirts/red
// [[...slug]]  → Optional catch-all: /shop OR /shop/clothes`}
          />
        </div>
      </section>

      {/* ============ SECTION 4: Special Files ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">4. Special Route Files</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="📄 page.tsx">
            <p>The actual UI content for this route. A route is only accessible if it has a page.tsx file.</p>
          </Card>
          <Card title="📐 layout.tsx">
            <p>Shared UI that wraps the page and all child routes. State is preserved between navigations.</p>
          </Card>
          <Card title="⏳ loading.tsx">
            <p>Shown automatically while the page is loading. Great for skeleton screens and spinners.</p>
          </Card>
          <Card title="❌ error.tsx">
            <p>Error boundary — catches errors and shows a fallback UI instead of crashing.</p>
          </Card>
          <Card title="🔍 not-found.tsx">
            <p>Custom 404 page shown when a route doesn&apos;t exist.</p>
          </Card>
          <Card title="🔗 route.ts">
            <p>API route handler — creates backend API endpoints (no UI).</p>
          </Card>
        </div>
      </section>

      {/* ============ SECTION 5: Layouts ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">5. Layouts</h2>
        <Card title="Layouts = Shared Wrappers" variant="info">
          <p className="mb-3">
            A layout wraps its page and all child pages. The root layout (app/layout.tsx) 
            wraps the ENTIRE app. You can create nested layouts for specific sections.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Nested Layout Example"
            code={`// File: app/dashboard/layout.tsx
// This layout wraps all pages inside /dashboard/*

export default function DashboardLayout({
  children,  // This is the page content
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-64">
        {/* Sidebar — shared across all dashboard pages */}
        <nav>Dashboard Menu</nav>
      </aside>
      <main className="flex-1">
        {children}  {/* Page content rendered here */}
      </main>
    </div>
  );
}`}
          />
        </div>
      </section>

      {/* Summary */}
      <section className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4">📋 Routing Cheat Sheet</h2>
        <div className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
          <p>• <strong>Static route:</strong> Create a folder with page.tsx → /folder-name</p>
          <p>• <strong>Dynamic route:</strong> Use [brackets] → /blog/[id]</p>
          <p>• <strong>Catch-all:</strong> Use [...slug] → /shop/a/b/c</p>
          <p>• <strong>Navigate:</strong> Always use Link from next/link</p>
          <p>• <strong>Layouts:</strong> Shared UI that persists across navigations</p>
          <p>• <strong>Loading:</strong> Add loading.tsx for automatic loading states</p>
        </div>
      </section>
    </div>
  );
}
