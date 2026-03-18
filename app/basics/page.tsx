/* ============================================================
   BASICS PAGE — JSX & React Fundamentals
   ============================================================
   
   This page teaches the absolute basics you need to know:
   - What is JSX?
   - Components (functions that return JSX)
   - Props (passing data to components)
   - Conditional rendering
   - Lists and .map()
   - Layout pages (shared UI across routes)
   - Authentication (protecting pages & managing sessions)
   - Performance & efficiency (tools to measure & optimise)
   ============================================================ */

import type { Metadata } from "next";
import Card from "../components/Card";
import CodeExample from "../components/CodeExample";
import Counter from "../components/Counter";

export const metadata: Metadata = {
  title: "JSX & React Basics",
};

export default function BasicsPage() {
  // --- Variables can be used directly in JSX ---
  const greeting = "Hello, Next.js!";
  const currentYear = new Date().getFullYear();
  const isLoggedIn = true;

  // --- Arrays can be rendered using .map() ---
  const fruits: string[] = ["Apple", "Banana", "Cherry", "Date"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">📝 JSX & React Basics</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The fundamental building blocks you need before learning Next.js features.
      </p>

      {/* ============ SECTION 1: What is JSX? ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. What is JSX?</h2>
        <Card title="JSX = JavaScript + HTML" variant="info">
          <p className="mb-3">
            JSX lets you write HTML-like code inside JavaScript. It looks like HTML, 
            but it&apos;s actually JavaScript that gets converted to real HTML.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">className</code> instead of <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">class</code> (because class is a reserved word in JS)</li>
            <li>Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">htmlFor</code> instead of <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">for</code></li>
            <li>All tags must be closed: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">{"<img />"}</code> not <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">{"<img>"}</code></li>
            <li>Use curly braces <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">{"{}"}</code> to embed JavaScript expressions</li>
          </ul>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="JSX Basics"
            code={`// Using variables in JSX with curly braces {}
const name = "World";
return <h1>Hello, {name}!</h1>;

// Expressions work too
return <p>2 + 2 = {2 + 2}</p>;

// Calling functions
return <p>Today is {new Date().toLocaleDateString()}</p>;`}
          />
        </div>

        {/* Live example */}
        <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">▶ Live: Variables in JSX</p>
          <p className="font-semibold">{greeting}</p>
          <p>Current year: {currentYear}</p>
          <p>2 + 2 = {2 + 2}</p>
        </div>
      </section>

      {/* ============ SECTION 2: Components ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Components</h2>
        <Card title="Components = Reusable Building Blocks">
          <p className="mb-3">
            A component is just a <strong>function that returns JSX</strong>. Think of them 
            like custom HTML tags you create yourself.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Component names must start with an UPPERCASE letter</li>
            <li>Each component should be in its own file</li>
            <li>Export the component so other files can use it</li>
            <li>Components can use other components (composition)</li>
          </ul>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Creating a Component"
            code={`// File: app/components/Greeting.tsx

// A simple component (function that returns JSX)
export default function Greeting() {
  return <h1>Hello, World!</h1>;
}

// Using it in another file:
import Greeting from "./components/Greeting";

export default function Page() {
  return (
    <div>
      <Greeting />  {/* Use it like an HTML tag */}
      <Greeting />  {/* Reuse it multiple times! */}
    </div>
  );
}`}
          />
        </div>
      </section>

      {/* ============ SECTION 3: Props ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. Props (Passing Data)</h2>
        <Card title="Props = Properties passed to components" variant="info">
          <p className="mb-3">
            Props let you pass data from a parent component to a child component. 
            Think of them like <strong>function arguments</strong> for your components.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Component with Props (TypeScript)"
            code={`// Define what props this component accepts
interface GreetingProps {
  name: string;       // Required prop
  age?: number;       // Optional prop (? means optional)
}

// Destructure props in the function parameter
export default function Greeting({ name, age }: GreetingProps) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old</p>}
    </div>
  );
}

// Usage:
<Greeting name="Alice" age={25} />
<Greeting name="Bob" />  {/* age is optional */}`}
          />
        </div>
      </section>

      {/* ============ SECTION 4: Conditional Rendering ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">4. Conditional Rendering</h2>
        <Card title="Show different content based on conditions">
          <p>Three common patterns for conditional rendering in JSX:</p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Conditional Rendering Patterns"
            code={`// Pattern 1: Ternary operator (if/else)
{isLoggedIn ? <p>Welcome back!</p> : <p>Please log in</p>}

// Pattern 2: Logical AND (if only, no else)
{isLoggedIn && <p>Welcome back!</p>}

// Pattern 3: Early return in component
function Dashboard({ user }: { user: User | null }) {
  if (!user) return <p>Please log in</p>;
  return <p>Welcome, {user.name}</p>;
}`}
          />
        </div>

        {/* Live example */}
        <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">▶ Live: Conditional Rendering</p>
          {isLoggedIn ? (
            <p className="text-green-700 dark:text-green-300 font-medium">✅ User is logged in — Welcome back!</p>
          ) : (
            <p className="text-red-700">❌ User is not logged in</p>
          )}
        </div>
      </section>

      {/* ============ SECTION 5: Lists ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">5. Rendering Lists</h2>
        <Card title="Use .map() to render arrays">
          <p>
            To render a list of items, use JavaScript&apos;s <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.map()</code> method.
            Always provide a unique <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">key</code> prop for each item.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Rendering a List"
            code={`const fruits = ["Apple", "Banana", "Cherry"];

return (
  <ul>
    {fruits.map((fruit) => (
      <li key={fruit}>{fruit}</li>  // key must be unique!
    ))}
  </ul>
);`}
          />
        </div>

        {/* Live example */}
        <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">▶ Live: Rendered List</p>
          <div className="flex flex-wrap gap-2">
            {fruits.map((fruit) => (
              <span
                key={fruit}
                className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm border"
              >
                {fruit}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 6: State (Interactive) ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">6. State (Interactive Components)</h2>
        <Card title="useState makes components interactive" variant="warning">
          <p className="mb-3">
            State = data that can CHANGE over time. When state changes, the component 
            re-renders to show the new value.
          </p>
          <p>
            <strong>Important:</strong> useState requires <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">&quot;use client&quot;</code> directive 
            because state only exists in the browser.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="useState Hook"
            code={`"use client";  // REQUIRED for hooks!
import { useState } from "react";

export default function Counter() {
  // [value, setterFunction] = useState(initialValue)
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
          />
        </div>

        {/* Live example: Counter component */}
        <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">▶ Live: Counter Component (try clicking!)</p>
          <div className="flex flex-wrap gap-4">
            <Counter label="Default" />
            <Counter initialValue={10} step={5} label="Custom (step: 5)" />
          </div>
        </div>
      </section>

      {/* ============ SECTION 7: Layout Pages ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">7. Layout Pages (layout.tsx)</h2>
        <Card title="What is a Layout?" variant="info">
          <p className="mb-3">
            A <strong>layout</strong> is a component that <strong>wraps pages</strong> and
            is <strong>shared across multiple routes</strong>. It receives a{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">children</code> prop which is the current page content.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Layouts <strong>persist between navigations</strong> — they don&apos;t re-mount</li>
            <li>The root layout (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">app/layout.tsx</code>) wraps <strong>every page</strong> in your app</li>
            <li>You can create <strong>nested layouts</strong> for specific route groups</li>
            <li>Layouts are <strong>Server Components</strong> by default</li>
          </ul>
        </Card>

        <div className="mt-4">
          <Card title="Why do we use layout.tsx?" variant="warning">
            <p className="mb-3">
              Without layouts, you&apos;d have to repeat shared UI (navbar, footer, sidebar)
              on <strong>every single page</strong>. Layouts solve this by letting you define
              shared UI <strong>once</strong>.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>No code duplication:</strong> Define Navbar, Footer, Sidebar once — 
                they automatically appear on every page
              </li>
              <li>
                <strong>Preserved state:</strong> Layouts don&apos;t re-render when you navigate. 
                If you have a counter in the layout, it keeps its value between pages
              </li>
              <li>
                <strong>Shared providers:</strong> Wrap your app with ThemeProvider, AuthProvider, 
                etc. in the layout — available to all pages
              </li>
              <li>
                <strong>Global styles &amp; fonts:</strong> Import CSS and configure fonts once 
                in the root layout
              </li>
              <li>
                <strong>SEO metadata:</strong> Set default title &amp; description for all pages, 
                with per-page overrides
              </li>
              <li>
                <strong>Performance:</strong> Only the page content changes on navigation — 
                the layout stays mounted (faster transitions)
              </li>
            </ul>
          </Card>
        </div>

        <div className="mt-4">
          <CodeExample
            title="Root Layout — app/layout.tsx (required)"
            code={`// app/layout.tsx — The ROOT layout
// This file is REQUIRED. It wraps every page in your app.

import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,   // ← This is the current page content
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Shared UI — appears on EVERY page */}
        <Navbar />

        {/* Page content renders here */}
        <main>{children}</main>

        {/* Footer on every page */}
        <footer>Built with Next.js</footer>
      </body>
    </html>
  );
}

// HOW IT WORKS:
// When you visit /about, Next.js renders:
//   <RootLayout>
//     <AboutPage />     ← children = the about page
//   </RootLayout>
//
// When you navigate to /contact:
//   <RootLayout>        ← stays mounted (not re-rendered!)
//     <ContactPage />   ← only this part changes
//   </RootLayout>`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Nested Layout — app/dashboard/layout.tsx"
            code={`// app/dashboard/layout.tsx
// This layout only applies to /dashboard and its sub-routes
// It nests INSIDE the root layout

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar only visible on dashboard pages */}
      <aside className="w-64 bg-gray-100 p-4">
        <nav>
          <a href="/dashboard">Overview</a>
          <a href="/dashboard/settings">Settings</a>
          <a href="/dashboard/analytics">Analytics</a>
        </nav>
      </aside>

      {/* Dashboard page content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}

// RESULT for /dashboard/settings:
//   <RootLayout>           ← Root: Navbar + Footer
//     <DashboardLayout>    ← Nested: Sidebar
//       <SettingsPage />   ← Page content
//     </DashboardLayout>
//   </RootLayout>`}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="❌ Without Layouts">
            <CodeExample
              title="Repeating UI on every page"
              code={`// app/about/page.tsx
export default function About() {
  return (
    <>
      <Navbar />        {/* repeated! */}
      <h1>About Us</h1>
      <Footer />        {/* repeated! */}
    </>
  );
}

// app/contact/page.tsx
export default function Contact() {
  return (
    <>
      <Navbar />        {/* repeated again! */}
      <h1>Contact</h1>
      <Footer />        {/* repeated again! */}
    </>
  );
}`}
            />
          </Card>
          <Card title="✅ With Layouts">
            <CodeExample
              title="Define shared UI once"
              code={`// app/layout.tsx — define once
export default function Layout({ children }) {
  return (
    <html>
      <body>
        <Navbar />      {/* once! */}
        <main>{children}</main>
        <Footer />      {/* once! */}
      </body>
    </html>
  );
}

// app/about/page.tsx — clean!
export default function About() {
  return <h1>About Us</h1>;
}

// app/contact/page.tsx — clean!
export default function Contact() {
  return <h1>Contact</h1>;
}`}
            />
          </Card>
        </div>

        {/* Live example */}
        <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">▶ Live: You&apos;re seeing a layout right now!</p>
          <p>
            The <strong>Navbar</strong> at the top and the <strong>Footer</strong> at the bottom
            of this page come from{" "}
            <code className="bg-green-100 dark:bg-green-900 px-1 rounded">app/layout.tsx</code>.
            Navigate to any other page — they stay the same without any code repetition.
          </p>
        </div>
      </section>

      {/* ============ SECTION 8: Authentication ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">8. Authentication in Next.js</h2>
        <Card title="How does auth work in Next.js?" variant="info">
          <p className="mb-3">
            Next.js doesn&apos;t have built-in authentication. Instead, you use
            an <strong>auth provider</strong> (like Supabase, NextAuth.js, Clerk, or Auth0)
            and protect routes using Next.js features:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Middleware</strong> — intercepts requests BEFORE they reach a page</li>
            <li><strong>Server Components</strong> — check auth on the server, redirect if needed</li>
            <li><strong>Server Actions</strong> — verify the user before mutations</li>
            <li><strong>Route Handlers</strong> — protect API endpoints</li>
            <li><strong>Client Components</strong> — show/hide UI based on session</li>
          </ul>
        </Card>

        <div className="mt-4">
          <Card title="The Auth Flow in Next.js" variant="default">
            <div className="text-sm space-y-2">
              <p className="font-semibold mb-2">What happens when a user visits a protected page:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Browser sends request to <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/dashboard</code></li>
                <li><strong>Middleware</strong> runs first — checks for auth cookie/token</li>
                <li>If no token → middleware redirects to <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/login</code></li>
                <li>If token exists → request continues to the page</li>
                <li><strong>Server Component</strong> verifies user with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">getUser()</code></li>
                <li>If valid → renders the page with user data</li>
                <li>If invalid/expired → redirects to <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/login</code></li>
              </ol>
            </div>
          </Card>
        </div>

        <div className="mt-4">
          <CodeExample
            title="Middleware — Protect routes before they load"
            code={`// middleware.ts (in your project ROOT, not in /app)
// Runs BEFORE every matching request

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if user has an auth token cookie
  const token = request.cookies.get("auth-token");

  // Protected routes — add paths you want to protect
  const protectedPaths = ["/dashboard", "/profile", "/settings"];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // If visiting a protected route without a token → redirect
  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    // Save where the user wanted to go (redirect back after login)
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Only run middleware on these routes (skip static files)
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Server Component — Verify auth & fetch user data"
            code={`// app/dashboard/page.tsx (Server Component)
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  // Read the auth cookie on the server
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  // If no token, redirect to login
  if (!token) {
    redirect("/login");
  }

  // With Supabase, you'd do:
  // const supabase = await createClient();
  // const { data: { user } } = await supabase.auth.getUser();
  // if (!user) redirect("/login");

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome! You are authenticated.</p>
    </div>
  );
}

// KEY POINT: This check runs on the SERVER.
// The user never sees the dashboard HTML if they're not logged in.
// This is more secure than client-side checks.`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Server Action — Verify auth before mutations"
            code={`// app/actions/posts.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  // 1. Always verify auth in Server Actions!
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");
  if (!token) {
    redirect("/login");
  }

  // 2. Get form data
  const title = formData.get("title") as string;

  // 3. Save to database (user is verified)
  // await db.posts.create({ title, userId: token.value });

  return { success: true };
}

// WHY CHECK AUTH HERE?
// Server Actions are like API endpoints — anyone could call them.
// Always verify the user before doing anything sensitive.`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Client Component — Show/hide UI based on auth"
            code={`"use client";
import { useState, useEffect } from "react";

export default function AuthButton() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check auth state on the client
    // With Supabase: supabase.auth.getUser()
    // With NextAuth: useSession()
    checkAuth().then(setUser);
  }, []);

  if (!user) {
    return <a href="/login">Sign In</a>;
  }

  return (
    <div>
      <span>Hi, {user.name}</span>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

// NOTE: Client-side checks are for UI only!
// They make the UI responsive but are NOT secure.
// Always verify auth on the SERVER (middleware, 
// Server Components, Server Actions) for real protection.`}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="🛡️ Where to check auth">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                <strong>Middleware:</strong> First line of defense. Blocks
                unauthenticated requests before they reach your page.
              </li>
              <li>
                <strong>Server Component:</strong> Double-check auth and load
                user-specific data. Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">redirect()</code> if invalid.
              </li>
              <li>
                <strong>Server Action:</strong> Always verify before database
                writes. Never trust the client.
              </li>
              <li>
                <strong>Client Component:</strong> For UI only — show/hide
                buttons, display user name, etc.
              </li>
            </ul>
          </Card>
          <Card title="🔧 Popular Auth Libraries">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                <strong>Supabase Auth:</strong> Built into Supabase. Email,
                OAuth, magic links. Great with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">@supabase/ssr</code>.
              </li>
              <li>
                <strong>NextAuth.js (Auth.js):</strong> Most popular for
                Next.js. Supports 50+ OAuth providers.
              </li>
              <li>
                <strong>Clerk:</strong> Drop-in auth UI components.
                Pre-built sign-in/sign-up forms.
              </li>
              <li>
                <strong>Auth0:</strong> Enterprise-grade. Complex setups,
                role-based access control.
              </li>
            </ul>
          </Card>
        </div>

        <div className="mt-4">
          <Card title="❌ Common auth mistakes beginners make" variant="warning">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-red-600 dark:text-red-400 mb-1">❌ Client-only auth check</p>
                <p>Checking auth only in <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">useEffect</code> — the server
                  still renders and sends the protected HTML.</p>
              </div>
              <div>
                <p className="font-semibold text-green-600 dark:text-green-400 mb-1">✅ Server + client check</p>
                <p>Check in middleware/Server Component first (blocks the page), then
                  use client checks for reactive UI.</p>
              </div>
              <div>
                <p className="font-semibold text-red-600 dark:text-red-400 mb-1">❌ No auth in Server Actions</p>
                <p>Trusting that only logged-in users can submit forms — anyone
                  can call a Server Action directly.</p>
              </div>
              <div>
                <p className="font-semibold text-green-600 dark:text-green-400 mb-1">✅ Always verify in actions</p>
                <p>Check <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">getUser()</code> at the start of every
                  Server Action that writes data.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ============ SECTION 9: Performance & Efficiency ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">9. Checking Performance &amp; Efficiency</h2>

        <Card title="Why measure performance?" variant="info">
          <p className="mb-3">
            Writing code that works is step one. Making it <strong>fast</strong> is step two.
            Next.js provides several built-in tools and integrations with browser tooling
            so you can find bottlenecks before users do.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>next build</strong> — shows bundle sizes and page weights at build time</li>
            <li><strong>Next.js Speed Insights</strong> — real-user Core Web Vitals in production</li>
            <li><strong>Chrome DevTools</strong> — Lighthouse, Network, and Performance tabs</li>
            <li><strong>React DevTools Profiler</strong> — find slow component re-renders</li>
            <li><strong>Bundle Analyzer</strong> — visualise what&apos;s bloating your JS bundle</li>
          </ul>
        </Card>

        {/* Tool 1: next build output */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Tool 1 — <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">next build</code> Output</h3>
          <Card title="Read the build output every time you ship" variant="default">
            <p className="mb-2 text-sm">
              Run <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">npm run build</code> and Next.js prints a table showing the
              size of every page and route. Anything over <strong>~100 kB First Load JS</strong> is a warning sign.
            </p>
          </Card>
          <div className="mt-3">
            <CodeExample
              title="What the build output looks like"
              language="bash"
              code={`$ npm run build

Route (app)                    Size     First Load JS
┌ ○ /                          5.2 kB        92.4 kB
├ ○ /about                     2.1 kB        89.3 kB
├ ● /blog/[slug]               3.4 kB        91.6 kB  ← dynamic
└ ○ /dashboard                 8.7 kB   ⚠️  142 kB   ← TOO BIG!

# ● = dynamic (server-rendered on each request)
# ○ = static (pre-rendered at build time → fastest!)

# Goal: keep First Load JS under ~100 kB per page
# If a page is too big → find what's importing large libraries`}
            />
          </div>
        </div>

        {/* Tool 2: Bundle Analyzer */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Tool 2 — Bundle Analyzer</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            See a visual treemap of every module in your JS bundle. Instantly spot which
            library is bloating your page.
          </p>
          <CodeExample
            title="Set up @next/bundle-analyzer"
            language="bash"
            code={`# Install the analyzer
npm install --save-dev @next/bundle-analyzer`}
          />
          <div className="mt-3">
            <CodeExample
              title="next.config.ts — enable the analyzer"
              code={`// next.config.ts
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer({
  // your existing next config here
});

// Run with:
// ANALYZE=true npm run build
// → Opens an interactive treemap in your browser`}
            />
          </div>
        </div>

        {/* Tool 3: Lighthouse */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Tool 3 — Lighthouse (Chrome DevTools)</h3>
          <Card title="The 5 scores Lighthouse measures" variant="default">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {[
                ["Performance",    "Page load speed — LCP, FID, CLS"],
                ["Accessibility",  "Screen readers, keyboard nav, contrast"],
                ["Best Practices", "HTTPS, no console errors, secure APIs"],
                ["SEO",            "Meta tags, robots.txt, crawlability"],
                ["PWA",            "Offline support, installability"],
              ].map(([name, desc]) => (
                <div key={name} className="flex gap-2">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <span><strong>{name}:</strong> {desc}</span>
                </div>
              ))}
            </div>
          </Card>
          <div className="mt-3">
            <CodeExample
              title="How to run Lighthouse"
              language="bash"
              code={`# Method 1: Chrome DevTools (easiest)
# 1. Open your app in Chrome
# 2. Press F12 → go to "Lighthouse" tab
# 3. Click "Analyze page load"
# 4. Read the score and actionable suggestions

# Method 2: Lighthouse CLI
npm install -g lighthouse
lighthouse http://localhost:3000 --view

# Method 3: PageSpeed Insights (production sites)
# Go to: pagespeed.web.dev
# Enter your URL → get real-world + lab data`}
            />
          </div>
        </div>

        {/* Tool 4: Core Web Vitals */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Tool 4 — Core Web Vitals (The 3 Numbers That Matter)</h3>
          <Card title="Google's official performance metrics" variant="warning">
            <p className="mb-3 text-sm">Google uses these 3 metrics to rank your site in search results. Poor scores hurt SEO.</p>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <span className="font-mono font-bold text-green-600 w-10">LCP</span>
                <div>
                  <strong>Largest Contentful Paint</strong> — How fast the main content loads.
                  <span className="ml-1 text-green-600">Good: &lt; 2.5s</span>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="font-mono font-bold text-blue-600 w-10">FID</span>
                <div>
                  <strong>First Input Delay</strong> — How fast the page responds to clicks.
                  <span className="ml-1 text-green-600">Good: &lt; 100ms</span>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="font-mono font-bold text-purple-600 w-10">CLS</span>
                <div>
                  <strong>Cumulative Layout Shift</strong> — How much the layout jumps around.
                  <span className="ml-1 text-green-600">Good: &lt; 0.1</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tool 5: React DevTools Profiler */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Tool 5 — React DevTools Profiler</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Find components that are re-rendering too often or taking too long to render.
          </p>
          <CodeExample
            title="How to use the React Profiler"
            language="bash"
            code={`# 1. Install React DevTools browser extension
#    Chrome: search "React Developer Tools" in Chrome Web Store

# 2. Open your app → F12 → go to "Profiler" tab

# 3. Click the record button ⏺ → interact with your app

# 4. Stop recording → see a flame chart:
#    - Wide bars = slow components (render time in ms)
#    - Yellow = re-rendered unnecessarily
#    - Grey = not re-rendered this cycle

# 5. Fix slow components with:
#    - React.memo()  → skip re-render if props didn't change
#    - useMemo()     → cache expensive calculations
#    - useCallback() → stable function references`}
          />
        </div>

        {/* Common fixes */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Common Performance Wins in Next.js</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="🖼️ Images — use next/image">
              <CodeExample
                title=""
                code={`// ❌ Plain <img> — no optimisation
<img src="/photo.jpg" />

// ✅ next/image — auto WebP, lazy load,
//    prevents layout shift (CLS)
import Image from "next/image";
<Image src="/photo.jpg" width={800} height={600} alt="photo" />`}
              />
            </Card>
            <Card title="⚡ Dynamic imports — lazy load heavy components">
              <CodeExample
                title=""
                code={`import dynamic from "next/dynamic";

// ❌ Always loaded, even if modal is never opened
import HeavyChart from "./HeavyChart";

// ✅ Only loaded when component is rendered
const HeavyChart = dynamic(() =>
  import("./HeavyChart"),
  { loading: () => <p>Loading chart...</p> }
);`}
              />
            </Card>
            <Card title="📡 Parallel data fetching — don't await one-by-one">
              <CodeExample
                title=""
                code={`// ❌ Sequential — 300ms + 200ms = 500ms total
const user  = await fetchUser();
const posts = await fetchPosts();

// ✅ Parallel — max(300ms, 200ms) = 300ms total
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts(),
]);`}
              />
            </Card>
            <Card title="🗄️ Caching — avoid re-fetching the same data">
              <CodeExample
                title=""
                code={`// Next.js extends fetch() with caching options

// Cache forever (static — re-use across requests)
const data = await fetch(url, {
  cache: "force-cache",
});

// Revalidate every 60 seconds (ISR)
const data = await fetch(url, {
  next: { revalidate: 60 },
});

// Never cache (always fresh)
const data = await fetch(url, {
  cache: "no-store",
});`}
              />
            </Card>
          </div>
        </div>

        {/* Live checklist */}
        <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
          <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-3">⚡ Quick Performance Checklist</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm text-blue-900 dark:text-blue-200">
            {[
              "Run npm run build and check page sizes",
              "All images use next/image",
              "Heavy libraries use dynamic import",
              "Data fetches run in parallel (Promise.all)",
              "Lighthouse score ≥ 90 on Performance",
              "LCP < 2.5s, CLS < 0.1",
              "No unnecessary \"use client\" directives",
              "Bundle Analyzer run — no surprise large deps",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5 shrink-0">☐</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CHEAT SHEET ============ */}
      <section className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4">📋 Quick Reference Cheat Sheet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">JSX Rules:</h3>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Use <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">className</code> not class</li>
              <li>• Close all tags: {"<br />"}</li>
              <li>• One root element per return</li>
              <li>• {"{}"} for JS expressions</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Component Rules:</h3>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• PascalCase names (MyComponent)</li>
              <li>• Must return JSX</li>
              <li>• Props are read-only</li>
              <li>• State needs &quot;use client&quot;</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Layout Rules:</h3>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Root layout is required</li>
              <li>• Must have {"<html>"} and {"<body>"}</li>
              <li>• Receives children prop</li>
              <li>• Persists across navigations</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Auth Pattern:</h3>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Middleware → blocks requests</li>
              <li>• Server Component → verifies user</li>
              <li>• Server Action → checks before writes</li>
              <li>• Client → UI only (not secure)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Performance Tools:</h3>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• npm run build → check page sizes</li>
              <li>• Lighthouse → 5-score audit</li>
              <li>• Bundle Analyzer → JS treemap</li>
              <li>• React Profiler → slow re-renders</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
