/* ============================================================
   BEST PRACTICES PAGE
   ============================================================
   
   A reference guide covering the most important rules and
   patterns for building production-quality Next.js apps with
   TypeScript and Tailwind CSS.
   ============================================================ */

import type { Metadata } from "next";
import Card from "../components/Card";
import CodeExample from "../components/CodeExample";

export const metadata: Metadata = {
  title: "Best Practices",
  description:
    "Production-ready patterns for Next.js, TypeScript, Tailwind CSS, performance, security, and accessibility.",
};

// ─── small helper so the table rows stay DRY ───────────────
function Row({
  label,
  good,
  bad,
}: {
  label: string;
  good: string;
  bad: string;
}) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-800">
      <td className="py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {label}
      </td>
      <td className="py-2 pr-4 text-xs text-green-700 dark:text-green-400 font-mono">{good}</td>
      <td className="py-2 text-xs text-red-600 dark:text-red-400 font-mono">{bad}</td>
    </tr>
  );
}

export default function BestPracticesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">✅ Best Practices</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
        A condensed reference of the most important rules for building fast, safe, and
        maintainable Next.js apps — bookmark this page!
      </p>

      {/* ────────────────────────────────────────────────────────
         SECTION 1: Server vs Client Components
      ──────────────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-1">1. Server vs Client Components</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          The single biggest decision you make for every component.
        </p>

        <Card title="Golden Rule: default to Server, opt into Client only when needed" variant="info">
          <p className="mb-3">
            Every component in the <code>app/</code> directory is a{" "}
            <strong>Server Component by default</strong>. Server Components are rendered on the
            server, produce zero client-side JavaScript, and can directly read databases, files, and
            environment variables.
          </p>
          <p>
            Add <code>&quot;use client&quot;</code> <em>only</em> when the component needs one of:
            hooks (<code>useState</code>, <code>useEffect</code>), browser APIs, or event handlers.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Server vs Client — quick decision checklist"
            code={`// ✅ Keep as SERVER Component (default — no directive needed)
// → fetches data at request time
// → reads environment variables / database
// → no interactivity / no hooks
export default async function ProductList() {
  const products = await db.products.findMany(); // runs on server
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}

// ✅ Convert to CLIENT Component only when you need hooks/events
"use client";
import { useState } from "react";

export default function Counter() {       // ← needs useState
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// ❌ DO NOT add "use client" to every component "just in case"
// It increases bundle size and disables server rendering benefits.`}
          />
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-wide text-gray-500">Feature needed</th>
                <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-wide text-green-600">Use</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["fetch / async data", "Server Component"],
                ["Database / filesystem access", "Server Component"],
                ["Server-only secrets / API keys", "Server Component"],
                ["useState / useReducer", "Client Component"],
                ["useEffect / lifecycle hooks", "Client Component"],
                ["onClick / onChange / events", "Client Component"],
                ["Browser APIs (localStorage, window)", "Client Component"],
                ["Third-party UI libs (charts, maps)", "Client Component"],
              ].map(([feature, use]) => (
                <tr key={feature} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="py-2 px-4 text-xs font-mono">{feature}</td>
                  <td className={`py-2 px-4 text-xs font-semibold ${use === "Server Component" ? "text-blue-600 dark:text-blue-400" : "text-orange-600 dark:text-orange-400"}`}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
         SECTION 2: TypeScript Practices
      ──────────────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-1">2. TypeScript</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          TypeScript + Next.js = errors caught at compile time, not in production.
        </p>

        <div className="space-y-4">
          <Card title="Always type your component props" variant="info">
            <p className="text-sm">Define an <code>interface</code> or <code>type</code> for every component&apos;s props.
            Never use <code>any</code> — use <code>unknown</code> if the shape is truly dynamic.</p>
          </Card>
          <Card title="Type API responses, not just UI props" variant="warning">
            <p className="text-sm">When you fetch from an API, define a type for what you expect.
            Never assume the shape — APIs change and TypeScript can&apos;t protect you if you skip this.</p>
          </Card>
        </div>

        <div className="mt-4 space-y-4">
          <CodeExample
            title="Typing props, API data, and async functions"
            code={`// ✅ 1. Define prop types with interface ────────────────────
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";  // union type = only these values
  disabled?: boolean;                 // ? = optional
}

export default function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// ✅ 2. Type API / fetch responses ────────────────────────────
type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

async function getPosts(): Promise<Post[]> {     // explicit return type
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data: unknown = await res.json();
  return data as Post[];                         // cast at the boundary
}

// ✅ 3. Use "satisfies" to validate config objects ─────────────
const config = {
  api: "https://api.example.com",
  timeout: 5000,
} satisfies Record<string, string | number>;    // catches type mismatches

// ❌ Avoid "any" — it disables ALL type checking
function bad(data: any) { data.xyz.abc(); }     // no error, crashes at runtime

// ✅ Use "unknown" instead and narrow the type
function good(data: unknown) {
  if (typeof data === "object" && data !== null && "name" in data) {
    console.log((data as { name: string }).name);
  }
}`}
          />
          <CodeExample
            title="Common TypeScript patterns in Next.js"
            code={`// ✅ Type page params and searchParams (App Router) ──────────
interface PageProps {
  params: Promise<{ id: string }>;          // always a Promise in Next 15+
  searchParams: Promise<{ q?: string }>;    // optional query param
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  return <div>Product {id}</div>;
}

// ✅ Type Server Action state ──────────────────────────────────
type FormState = {
  success: boolean;
  message: string;
  errors?: { email?: string[] };
};

// ✅ Metadata type from Next.js ────────────────────────────────
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "My Page",
  description: "Typed, so typos are caught at compile time",
};`}
          />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
         SECTION 3: Performance
      ──────────────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-1">3. Performance</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Next.js has performance built in — but you can easily undo those gains.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card title="🖼️ Always use next/image" variant="warning">
            <p className="text-sm">Never use raw <code>&lt;img&gt;</code> tags. <code>next/image</code> automatically
            lazy-loads, resizes, and serves modern formats (WebP/AVIF).
            Always provide <code>width</code> + <code>height</code>, or use <code>fill</code> for responsive images.</p>
          </Card>
          <Card title="🔤 Always use next/font" variant="warning">
            <p className="text-sm">Never add Google Font <code>&lt;link&gt;</code> tags in HTML.
            <code>next/font</code> self-hosts fonts, eliminates network round-trips, and
            prevents Cumulative Layout Shift (CLS).</p>
          </Card>
          <Card title="🔗 Always use next/link" variant="info">
            <p className="text-sm">Replace every <code>&lt;a href&gt;</code> internal link with
            <code>&lt;Link href&gt;</code>. It prefetches pages on hover and navigates without
            a full page reload.</p>
          </Card>
          <Card title="📦 Lazy-load heavy components" variant="info">
            <p className="text-sm">Use <code>dynamic()</code> from <code>next/dynamic</code> for
            heavy Client Components (charts, rich text editors, maps). They are excluded from the
            initial JavaScript bundle.</p>
          </Card>
        </div>

        <CodeExample
          title="Performance checklist in code"
          code={`// ✅ Images — use next/image, never <img>
import Image from "next/image";
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />
// priority = preload above-the-fold images (LCP)

// ✅ Fonts — use next/font, never <link>
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// ✅ Links — use next/link, never <a>
import Link from "next/link";
<Link href="/about">About us</Link>

// ✅ Lazy-load heavy components
import dynamic from "next/dynamic";
const HeavyChart = dynamic(() => import("./HeavyChart"), {
  loading: () => <p>Loading chart...</p>,
  ssr: false,        // skip server render for browser-only libs
});

// ✅ Parallel data fetching — don't await sequentially
const [user, posts] = await Promise.all([
  getUser(id),       // runs in parallel ✅
  getPosts(id),      // runs in parallel ✅
]);
// NOT: const user = await getUser(id); const posts = await getPosts(id); ❌`}
        />

        <div className="mt-4">
          <CodeExample
            title="Caching & Revalidation patterns"
            code={`// ✅ Static fetch (cached forever, best for rarely-changing data)
const data = await fetch("https://api.example.com/config");

// ✅ Revalidate every 60 seconds (ISR — Incremental Static Regeneration)
const data = await fetch("https://api.example.com/posts", {
  next: { revalidate: 60 },
});

// ✅ No cache (always fresh on every request — use for user-specific data)
const data = await fetch("https://api.example.com/cart", {
  cache: "no-store",
});

// ✅ On-demand revalidation (clear cache when data changes)
import { revalidatePath, revalidateTag } from "next/cache";
await revalidatePath("/blog");         // re-render the /blog page
await revalidateTag("posts");          // re-render all fetches tagged "posts"`}
          />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
         SECTION 4: Data Fetching
      ──────────────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-1">4. Data Fetching</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Fetch as close to where the data is used as possible.
        </p>

        <Card title="Fetch in Server Components, pass down to Client Components" variant="info">
          <p className="text-sm">
            Don&apos;t use <code>useEffect + fetch</code> in Client Components for initial page data.
            Fetch in a Server Component and pass the result as props — this avoids client waterfalls,
            exposes no API keys, and is faster.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Do this — fetch in Server, pass to Client"
            code={`// ✅ Server Component fetches and passes data down ────────────
// app/dashboard/page.tsx  (Server Component by default)
async function getUser(id: string) {
  const res = await fetch(\`https://api.example.com/users/\${id}\`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json() as Promise<User>;
}

export default async function DashboardPage() {
  const user = await getUser("123");   // runs on server, safe to use secrets
  return <UserCard user={user} />;     // pass result to Client Component
}

// ─────────────────────────────────────────────────────────────
// ❌ Avoid this — useEffect fetch in Client Components
"use client";
function UserCard() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("/api/user/123").then(r => r.json()).then(setUser); // waterfall!
  }, []);
  // ...
}
// Problems: extra network round-trip, loading flash, exposes API calls`}
          />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
         SECTION 5: Security
      ──────────────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-1">5. Security</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Common vulnerabilities and how Next.js helps you avoid them.
        </p>

        <div className="space-y-4 mb-4">
          <Card title="🔐 Never expose secrets to the client" variant="warning">
            <p className="text-sm">
              Only variables prefixed with <code>NEXT_PUBLIC_</code> are sent to the browser.
              Database URLs, API keys, and secrets should{" "}
              <strong>never</strong> have the <code>NEXT_PUBLIC_</code> prefix.
            </p>
          </Card>
          <Card title="🛡️ Always validate Server Action input on the server" variant="warning">
            <p className="text-sm">
              Client-side validation is for UX only. Anyone can bypass it by sending raw HTTP
              requests. Always validate, sanitize, and authorize inside every Server Action and
              API Route handler — never trust the client.
            </p>
          </Card>
          <Card title="🔒 Use HTTPS and secure cookies for auth" variant="info">
            <p className="text-sm">
              Session tokens must use <code>httpOnly</code>, <code>secure</code>, and{" "}
              <code>sameSite=&quot;lax&quot;</code> cookie flags. Use a library like{" "}
              <code>next-auth</code> or <code>lucia</code> rather than rolling your own auth.
            </p>
          </Card>
        </div>

        <CodeExample
          title="Security checklist in code"
          code={`// ✅ Environment variables ───────────────────────────────────
// .env.local
DATABASE_URL=postgres://...       // ✅ server-only (no NEXT_PUBLIC_)
NEXT_PUBLIC_MAP_KEY=pk_...        // ✅ ok to expose (public API key)
SECRET_JWT_KEY=supersecret        // ✅ server-only

// ❌ NEVER do this:
const db = process.env.NEXT_PUBLIC_DATABASE_URL; // exposes DB to browser!

// ✅ Server Action input validation ──────────────────────────
"use server";
export async function updateProfile(formData: FormData) {
  const session = await getSession();       // 1. check authentication
  if (!session) return { error: "Unauthorized" };

  const name = String(formData.get("name") ?? "").trim();
  if (name.length < 2 || name.length > 100) {  // 2. validate on server
    return { error: "Name must be 2–100 characters" };
  }

  // 3. check authorization (is this user allowed to edit this resource?)
  if (session.userId !== targetUserId) {
    return { error: "Forbidden" };
  }

  await db.users.update({ name });          // 4. only now touch the DB
}

// ✅ API Route protection ─────────────────────────────────────
// app/api/admin/route.ts
export async function GET() {
  const session = await getSession();
  if (!session?.isAdmin) {
    return new Response("Unauthorized", { status: 401 });
  }
  // ...
}`}
        />
      </section>

      {/* ────────────────────────────────────────────────────────
         SECTION 6: SEO & Metadata
      ──────────────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-1">6. SEO & Metadata</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Next.js has a built-in Metadata API — use it instead of writing raw <code>&lt;head&gt;</code> tags.
        </p>

        <CodeExample
          title="Static and dynamic metadata"
          code={`// ✅ Static metadata ─────────────────────────────────────────
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "My App",
    template: "%s | My App",           // page titles become "Posts | My App"
  },
  description: "The best app ever.",
  openGraph: {
    title: "My App",
    description: "The best app ever.",
    url: "https://myapp.com",
    siteName: "My App",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ✅ Dynamic metadata (e.g., per blog post) ───────────────────
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.heroImage] },
  };
}`}
        />
      </section>

      {/* ────────────────────────────────────────────────────────
         SECTION 7: Error Handling
      ──────────────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-1">7. Error Handling</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Next.js has dedicated files for handling errors and missing routes at each segment level.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card title="error.tsx — catches runtime errors">
            <p className="text-sm">Place an <code>error.tsx</code> next to <code>page.tsx</code> to
            catch any errors thrown during rendering or data fetching. It must be a{" "}
            <strong>Client Component</strong>. It receives the <code>error</code> and a{" "}
            <code>reset</code> function to retry.</p>
          </Card>
          <Card title="not-found.tsx — handles 404s">
            <p className="text-sm">Create <code>not-found.tsx</code> to show a custom 404 UI.
            Call <code>notFound()</code> from <code>next/navigation</code> inside a Server Component
            to trigger it programmatically (e.g., when a DB record is missing).</p>
          </Card>
        </div>

        <CodeExample
          title="error.tsx and not-found.tsx"
          code={`// app/blog/error.tsx — catches errors in the /blog segment
"use client";
export default function BlogError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;   // re-tries the failed render
}) {
  return (
    <div>
      <h2>Something went wrong loading the blog.</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// app/blog/[slug]/page.tsx — trigger 404 for missing post
import { notFound } from "next/navigation";

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();        // ← renders not-found.tsx
  return <article>{post.content}</article>;
}

// app/not-found.tsx — global 404 page
export default function NotFound() {
  return <h1>404 — Page not found</h1>;
}`}
        />
      </section>

      {/* ────────────────────────────────────────────────────────
         SECTION 8: Accessibility
      ──────────────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-1">8. Accessibility (a11y)</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Accessible apps are better for everyone and ranked higher by search engines.
        </p>

        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wide text-gray-500 font-semibold">Rule</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wide text-green-600 font-semibold">✅ Do</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wide text-red-500 font-semibold">❌ Don&apos;t</th>
              </tr>
            </thead>
            <tbody>
              <Row label="Images" good='alt="Descriptive text"' bad='alt="" (empty on meaningful images)' />
              <Row label="Forms" good="<label htmlFor='email'>" bad="Placeholder text only" />
              <Row label="Buttons" good='<button type="button">' bad="<div onClick=...>" />
              <Row label="Headings" good="h1 → h2 → h3 hierarchy" bad="Skipping heading levels" />
              <Row label="Color" good="Text contrast ≥ 4.5:1 (WCAG AA)" bad="Low contrast grey on white" />
              <Row label="Focus" good="visible focus ring on interactive elements" bad="outline: none globally" />
              <Row label="lang" good='<html lang="en">' bad="Missing lang attribute" />
            </tbody>
          </table>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
         SECTION 9: Project Organisation
      ──────────────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-1">9. Project Organisation</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          A consistent folder structure saves hours of confusion as a project grows.
        </p>

        <CodeExample
          title="Recommended folder layout"
          code={`app/
  layout.tsx              ← root layout (html, body, global nav)
  page.tsx                ← home page
  globals.css             ← global styles
  (marketing)/            ← route group (no URL segment)
    about/page.tsx
    pricing/page.tsx
  (dashboard)/            ← another route group
    dashboard/page.tsx
    settings/page.tsx
  api/
    users/route.ts        ← API Route
  components/             ← shared UI components (Server by default)
    Navbar.tsx
    Card.tsx
  actions/                ← shared Server Actions
    auth.ts
    posts.ts
  lib/                    ← utilities, DB client, helpers
    db.ts
    utils.ts
  types/                  ← shared TypeScript types
    index.ts

// Key conventions:
// - PascalCase for component files: Button.tsx, UserCard.tsx
// - camelCase for utility files: utils.ts, formatDate.ts
// - Keep co-located files together (component + its action + its types)
// - Route Groups (parentheses) organise routes without affecting the URL`}
        />
      </section>

      {/* ────────────────────────────────────────────────────────
         SECTION 10: Quick-Reference Checklist
      ──────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">10. Pre-Launch Checklist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="🚀 Performance" variant="success">
            <ul className="space-y-1 text-sm list-none">
              {[
                "next/image for every image",
                "next/font — no external font <link>",
                "next/link for all internal navigation",
                "dynamic() for heavy Client Components",
                "Parallel data fetching (Promise.all)",
                "Cache headers configured on fetch calls",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card title="🔐 Security" variant="warning">
            <ul className="space-y-1 text-sm list-none">
              {[
                "No secrets with NEXT_PUBLIC_ prefix",
                "Server Actions validate all input",
                "Server Actions check auth + authz",
                "API Routes return 401/403 when unauthorised",
                "Cookies are httpOnly + secure + sameSite",
                "No sensitive data in client components",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card title="♿ Accessibility">
            <ul className="space-y-1 text-sm list-none">
              {[
                "All images have descriptive alt text",
                "Form inputs have <label> elements",
                "Heading hierarchy is correct (h1→h2→h3)",
                "Interactive elements are keyboard reachable",
                "Colour contrast meets WCAG AA (4.5:1)",
                'lang attribute set on <html>',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card title="📦 TypeScript">
            <ul className="space-y-1 text-sm list-none">
              {[
                "strict: true in tsconfig.json",
                "Props typed with interface or type",
                'No "any" — use "unknown" + narrowing',
                "API response shapes are typed",
                "Server Action state types defined",
                "next build passes with zero TS errors",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
