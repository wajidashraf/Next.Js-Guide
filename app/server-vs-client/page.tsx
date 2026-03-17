/* ============================================================
   SERVER vs CLIENT COMPONENTS
   ============================================================
   
   THE MOST IMPORTANT CONCEPT IN NEXT.JS:
   
   SERVER COMPONENTS (Default):
   ✅ Run only on the server
   ✅ Can directly access databases, file system, APIs
   ✅ Send zero JavaScript to the browser (smaller bundles)
   ✅ Better for SEO (content is in the HTML)
   ❌ Cannot use hooks (useState, useEffect, etc.)
   ❌ Cannot use browser APIs (window, document, etc.)
   ❌ Cannot have event handlers (onClick, onChange, etc.)
   
   CLIENT COMPONENTS ("use client"):
   ✅ Run in the browser
   ✅ Can use hooks, state, effects
   ✅ Can handle user interactions (clicks, forms, etc.)
   ✅ Can access browser APIs
   ❌ Adds JavaScript to the bundle (slower initial load)
   
   RULE OF THUMB:
   → Start with Server Components (default)
   → Only add "use client" when you NEED interactivity
   ============================================================ */

import type { Metadata } from "next";
import Card from "../components/Card";
import CodeExample from "../components/CodeExample";
import Counter from "../components/Counter";

export const metadata: Metadata = {
  title: "Server vs Client Components",
};

export default function ServerVsClientPage() {
  // This page itself is a Server Component!
  // It can import and render the Counter (a Client Component)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">⚡ Server vs Client Components</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The most important concept in Next.js — understanding when code runs on the 
        server vs the browser.
      </p>

      {/* ============ VISUAL COMPARISON ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Side-by-Side Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950 border-2 border-blue-300 dark:border-blue-700">
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-3">
              🖥️ Server Components (Default)
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✅</span>
                <span>No &quot;use client&quot; needed (default)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✅</span>
                <span>Zero JavaScript sent to browser</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✅</span>
                <span>Can fetch data directly (no API calls!)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✅</span>
                <span>Can access backend resources</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✅</span>
                <span>Better for SEO and performance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">❌</span>
                <span>No hooks (useState, useEffect)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">❌</span>
                <span>No onClick, onChange events</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">❌</span>
                <span>No browser APIs (window, localStorage)</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-orange-50 dark:bg-orange-950 border-2 border-orange-300 dark:border-orange-700">
            <h3 className="text-lg font-bold text-orange-700 dark:text-orange-300 mb-3">
              🌐 Client Components (&quot;use client&quot;)
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✅</span>
                <span>Can use useState, useEffect, etc.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✅</span>
                <span>Can handle user interactions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✅</span>
                <span>Can use browser APIs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✅</span>
                <span>Full React features available</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">❌</span>
                <span>Adds JavaScript to bundle</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">❌</span>
                <span>Slower initial page load</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">❌</span>
                <span>Cannot directly access server resources</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">❌</span>
                <span>Less SEO-friendly for content</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============ SERVER COMPONENT ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Server Component Example</h2>
        <Card title="THIS page is a Server Component!" variant="success">
          <p>
            This very page you&apos;re reading runs on the server. It doesn&apos;t have 
            &quot;use client&quot; at the top, so Next.js renders it on the server and sends 
            only the HTML to your browser. Zero JavaScript for this page! 🎉
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Server Component (default — no directive needed)"
            code={`// app/products/page.tsx
// No "use client" = Server Component

// Can fetch data directly — no useEffect needed!
async function getProducts() {
  const res = await fetch("https://api.example.com/products");
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();  // Runs on the server!

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name} - \${p.price}</li>
      ))}
    </ul>
  );
}

// BENEFITS:
// ✅ Data is fetched on server (fast, secure)
// ✅ API keys stay on the server (never exposed)
// ✅ No loading spinners needed
// ✅ HTML is sent to browser with data already included`}
          />
        </div>
      </section>

      {/* ============ CLIENT COMPONENT ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. Client Component Example</h2>
        <Card title='Must add "use client" at the very top' variant="warning">
          <p>
            The Counter below is a Client Component because it uses useState for 
            interactivity. It must have &quot;use client&quot; as the first line.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title='Client Component (requires "use client")'
            code={`"use client";  // ← MUST be the FIRST line!

import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ {likes} Likes
    </button>
  );
}

// WHY "use client"?
// → useState needs to run in the browser
// → onClick events only work in the browser
// → The browser needs the JavaScript for this component`}
          />
        </div>

        {/* Live demo */}
        <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
            ▶ Live: Client Component (Counter) inside a Server Component page
          </p>
          <Counter label="I'm a Client Component!" />
        </div>
      </section>

      {/* ============ MIXING THEM ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">4. Mixing Server & Client Components</h2>
        <Card title="The Composition Pattern" variant="info">
          <p className="mb-3">
            You can import and use Client Components inside Server Components. But you 
            CANNOT import Server Components inside Client Components.
          </p>
          <p>
            <strong>Think of it as:</strong> Server Components are the &quot;shell&quot; and Client 
            Components are &quot;interactive islands&quot; within that shell.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Composition Pattern"
            code={`// app/dashboard/page.tsx (Server Component)
import LikeButton from "@/components/LikeButton";  // Client
import UserStats from "@/components/UserStats";      // Server

export default async function DashboardPage() {
  const data = await fetchDashboardData();  // Server-side fetch

  return (
    <div>
      {/* Server Component — no JS sent */}
      <UserStats data={data} />
      
      {/* Client Component — JS sent for interactivity */}
      <LikeButton />
    </div>
  );
}

// ✅ Server Component CAN render Client Components
// ❌ Client Component CANNOT import Server Components
// ✅ But Client CAN receive Server Components as {children}`}
          />
        </div>
      </section>

      {/* ============ DECISION GUIDE ============ */}
      <section className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4">🤔 Decision Guide: Server or Client?</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <span className="text-lg">🖥️</span>
            <div>
              <strong>Use Server Component when:</strong>
              <p className="text-gray-600 dark:text-gray-400">Fetching data, reading databases, displaying static content, SEO-important content</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
            <span className="text-lg">🌐</span>
            <div>
              <strong>Use Client Component when:</strong>
              <p className="text-gray-600 dark:text-gray-400">User interactions (buttons, forms), animations, using hooks, browser APIs (localStorage, geolocation)</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
            <span className="text-lg">💡</span>
            <div>
              <strong>Golden Rule:</strong>
              <p className="text-gray-600 dark:text-gray-400">Start with Server Components. Only add &quot;use client&quot; when you actually need interactivity. Keep Client Components as small as possible.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
