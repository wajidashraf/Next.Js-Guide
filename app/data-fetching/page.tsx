/* ============================================================
   DATA FETCHING PAGE
   ============================================================
   
   Next.js makes data fetching SIMPLE:
   
   1. SERVER COMPONENTS can fetch data directly (async/await)
      - No useEffect or useState needed!
      - Data is fetched on the server before HTML is sent
   
   2. LOADING STATES are automatic with loading.tsx
   
   3. CACHING: Next.js caches fetch() results by default
      - Use { cache: 'no-store' } for dynamic data
      - Use { next: { revalidate: 60 } } to refresh every 60s
   ============================================================ */

import type { Metadata } from "next";
import Card from "../components/Card";
import CodeExample from "../components/CodeExample";

export const metadata: Metadata = {
  title: "Data Fetching",
};

// --- TypeScript: Define the shape of data we expect ---
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

// --- Data Fetching Function ---
// This runs on the SERVER, not in the browser!
async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=0", {
    // Cache options (pick one):
    // cache: 'force-cache'           // Default — cached forever
    cache: 'no-store',              // Always fresh (no cache)
    // next: { revalidate: 3600 },       // Revalidate every hour
  });
  return res.json();
}

async function getUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users?_limit=3", {
    next: { revalidate: 3600 },
  });
  return res.json();
}

// --- Page Component (async because it fetches data) ---
export default async function DataFetchingPage() {
  // Fetch data in parallel for better performance!
  const [posts, users] = await Promise.all([getPosts(), getUsers()]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">📡 Data Fetching</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Fetch data on the server with async/await — no useEffect needed!
      </p>

      {/* ============ SECTION 1: Server-Side Fetching ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Fetching Data in Server Components</h2>
        <Card title="Just use async/await — it's that simple!" variant="info">
          <p className="mb-3">
            In Server Components, you can make your component <strong>async</strong> and 
            use <strong>await</strong> directly. No useState, no useEffect, no loading 
            management needed!
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Server-Side Data Fetching"
            code={`// This is a Server Component (no "use client")
// So we can make it async and fetch data directly!

interface Post {
  id: number;
  title: string;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://api.example.com/posts");
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();  // Fetched on the SERVER!

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// BEHIND THE SCENES:
// 1. Next.js runs this on the server
// 2. fetch() is called on the server (fast!)
// 3. HTML with data is sent to the browser
// 4. User sees content immediately (no spinner!)`}
          />
        </div>
      </section>

      {/* ============ SECTION 2: Cache Options ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Caching Strategies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="🗄️ Static (Default)">
            <p className="mb-2">Data is cached and reused on every request.</p>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded block">
              {`fetch(url)`}
            </code>
            <p className="mt-2 text-xs">Best for: Blog posts, product pages</p>
          </Card>
          <Card title="🔄 Revalidate (ISR)">
            <p className="mb-2">Data refreshes after a time interval.</p>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded block">
              {`fetch(url, { next: { revalidate: 60 } })`}
            </code>
            <p className="mt-2 text-xs">Best for: News, prices, scores</p>
          </Card>
          <Card title="⚡ Dynamic (No Cache)">
            <p className="mb-2">Fresh data on every request.</p>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded block">
              {`fetch(url, { cache: "no-store" })`}
            </code>
            <p className="mt-2 text-xs">Best for: User dashboards, real-time data</p>
          </Card>
        </div>
      </section>

      {/* ============ SECTION 3: Parallel Fetching ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. Parallel Data Fetching</h2>
        <Card title="Use Promise.all() for parallel fetches" variant="success">
          <p>
            When fetching multiple resources, use <strong>Promise.all()</strong> to 
            fetch them simultaneously instead of one after another. This is much faster!
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Parallel vs Sequential Fetching"
            code={`// ❌ SLOW: Sequential (one after another)
const posts = await getPosts();    // Wait...
const users = await getUsers();    // Wait again...
// Total time: posts time + users time

// ✅ FAST: Parallel (both at the same time)
const [posts, users] = await Promise.all([
  getPosts(),
  getUsers(),
]);
// Total time: max(posts time, users time)`}
          />
        </div>
      </section>

      {/* ============ SECTION 4: Loading States ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">4. Loading States</h2>
        <Card title="Add loading.tsx for automatic loading UI" variant="info">
          <p>
            Create a <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">loading.tsx</code> file 
            in the same folder as your page. Next.js will automatically show it while 
            the page&apos;s data is being fetched.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="loading.tsx (Skeleton Screen)"
            code={`// File: app/posts/loading.tsx
// Shown automatically while page.tsx is loading data

export default function Loading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
}

// TIP: Use skeleton screens (gray boxes that match
// your layout) instead of spinners — it feels faster!`}
          />
        </div>
      </section>

      {/* ============ LIVE DEMO: Fetched Data ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">5. Live Demo: Real API Data</h2>
        <p className="text-sm text-gray-500 mb-4">
          This data was fetched on the server from JSONPlaceholder API using Promise.all()
        </p>

        {/* Posts */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">📝 Posts (fetched from API)</h3>
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-800"
              >
                <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-1">
                  {post.id}. {post.title}
                </h4>
                <p className="text-sm text-gray-500 line-clamp-2">{post.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Users */}
        <div>
          <h3 className="font-semibold mb-3">👥 Users (fetched in parallel)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400 mt-1">{user.company.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4">📋 Data Fetching Cheat Sheet</h2>
        <div className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
          <p>• <strong>Server Components:</strong> Use async/await directly (no hooks!)</p>
          <p>• <strong>Parallel fetching:</strong> Promise.all() for multiple fetches</p>
          <p>• <strong>Caching:</strong> Default is cached; use revalidate for timed refresh</p>
          <p>• <strong>Loading UI:</strong> Add loading.tsx in the route folder</p>
          <p>• <strong>Error handling:</strong> Add error.tsx for error boundaries</p>
          <p>• <strong>TypeScript:</strong> Always type your API response data</p>
        </div>
      </section>
    </div>
  );
}
