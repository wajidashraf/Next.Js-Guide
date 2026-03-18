/* ============================================================
   SUPABASE WITH NEXT.JS — BEGINNER GUIDE
   ============================================================
   
   KEY CONCEPTS:
   - Supabase is an open-source Firebase alternative
   - It provides: PostgreSQL database, Auth, Storage, Realtime
   - Next.js + Supabase = full-stack app without a separate backend
   
   CREDENTIAL MANAGEMENT:
   - NEVER expose secret keys in client-side code
   - Use .env.local for local development
   - NEXT_PUBLIC_ prefix → exposed to browser (only for anon key)
   - Without prefix → server-only (for service role key)
   - Use Server Components & Server Actions to keep secrets safe
   
   SUPABASE CLIENT TYPES:
   - Browser client → uses anon key (safe, respects RLS)
   - Server client → uses anon key + cookies (for auth in SSR)
   - Admin client → uses service_role key (bypasses RLS, server ONLY)
   ============================================================ */

import type { Metadata } from "next";
import Card from "../components/Card";
import CodeExample from "../components/CodeExample";

export const metadata: Metadata = {
  title: "Supabase Guide",
};

export default function SupabaseGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">🟢 Supabase with Next.js</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Learn how to integrate Supabase into a Next.js app and manage credentials
        securely — from setup to production.
      </p>

      {/* ============ SECTION 1: What is Supabase? ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. What is Supabase?</h2>
        <Card title="Supabase = Backend-as-a-Service" variant="info">
          <p className="mb-3">
            Supabase gives you a <strong>PostgreSQL database</strong>, <strong>Authentication</strong>,{" "}
            <strong>File Storage</strong>, <strong>Realtime subscriptions</strong>, and{" "}
            <strong>Edge Functions</strong> — all from one dashboard. Think of it as an
            open-source Firebase built on top of Postgres.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Database:</strong> Full PostgreSQL with a visual table editor</li>
            <li><strong>Auth:</strong> Email/password, OAuth (Google, GitHub, etc.)</li>
            <li><strong>Storage:</strong> Upload and serve files (images, PDFs, etc.)</li>
            <li><strong>Realtime:</strong> Subscribe to database changes live</li>
            <li><strong>Edge Functions:</strong> Serverless Deno functions</li>
            <li><strong>Row Level Security (RLS):</strong> Postgres-native access control</li>
          </ul>
        </Card>
      </section>

      {/* ============ SECTION 2: Project Setup ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Setting Up Supabase</h2>

        <Card title="Step-by-step setup" variant="default">
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to <strong>supabase.com</strong> → Sign up → Create a new project</li>
            <li>Note your <strong>Project URL</strong> and <strong>API Keys</strong> from Settings → API</li>
            <li>Install the packages in your Next.js project (see below)</li>
            <li>Create <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.env.local</code> with your credentials</li>
          </ol>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Install Supabase packages"
            language="bash"
            code={`# Install Supabase client library + SSR helpers
npm install @supabase/supabase-js @supabase/ssr

# What each package does:
# @supabase/supabase-js  → Core client (queries, auth, storage)
# @supabase/ssr          → Helpers for Server Components, 
#                           Server Actions, Route Handlers, 
#                           and Middleware (cookie management)`}
          />
        </div>
      </section>

      {/* ============ SECTION 3: Credentials / Environment Variables ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. Managing Credentials Securely</h2>

        <Card title="🔑 The #1 rule: NEVER put secret keys in client code" variant="warning">
          <p className="mb-3">
            Supabase gives you <strong>two API keys</strong>:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-3">
            <li>
              <strong>anon (public) key</strong> — Safe for the browser. It respects
              Row Level Security (RLS) policies, so users can only access what you allow.
            </li>
            <li>
              <strong>service_role (secret) key</strong> — FULL access, bypasses RLS.
              Must <strong>NEVER</strong> be exposed to the browser.
            </li>
          </ul>
          <p>
            Next.js environment variables without the <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">NEXT_PUBLIC_</code> prefix
            are <strong>only available on the server</strong>. This is how you protect your secret key.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title=".env.local — Your credentials file"
            language="env"
            code={`# ===========================================
# Supabase Credentials (.env.local)
# ===========================================
# This file is auto-ignored by .gitignore
# NEVER commit this to version control!

# Project URL — same for client and server
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co

# Anon key — safe for browser (RLS protects data)
# NEXT_PUBLIC_ prefix → available in browser code
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...

# Service role key — FULL ACCESS, server only!
# NO NEXT_PUBLIC_ prefix → only available on the server
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Make sure .env.local is in .gitignore"
            language="gitignore"
            code={`# .gitignore (Next.js already includes this by default)
.env*.local

# This means .env.local, .env.development.local, 
# .env.production.local are all ignored by Git.
# Your keys will NOT be pushed to GitHub!`}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="✅ NEXT_PUBLIC_ variables">
            <p className="mb-2">Available in <strong>both</strong> browser &amp; server.</p>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded block">
              NEXT_PUBLIC_SUPABASE_URL
            </code>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded block mt-1">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>
            <p className="mt-2 text-xs">Use for: Supabase URL &amp; anon key</p>
          </Card>
          <Card title="🔒 Server-only variables">
            <p className="mb-2">Available <strong>only</strong> on the server.</p>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded block">
              SUPABASE_SERVICE_ROLE_KEY
            </code>
            <p className="mt-2 text-xs">Use for: Admin operations, webhooks, cron jobs</p>
          </Card>
        </div>
      </section>

      {/* ============ SECTION 4: Creating Supabase Clients ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">4. Creating Supabase Clients (The Right Way)</h2>

        <Card title="Why multiple clients?" variant="info">
          <p className="mb-3">
            Next.js runs code in different environments (browser, server, middleware).
            Each environment handles cookies differently, so you need a client
            configured for each context. The <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">@supabase/ssr</code> package
            makes this easy.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="lib/supabase/client.ts — Browser Client"
            code={`// lib/supabase/client.ts
// Used in Client Components ("use client")
// This runs in the BROWSER

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// USAGE in a Client Component:
// "use client";
// import { createClient } from "@/lib/supabase/client";
// const supabase = createClient();
// const { data } = await supabase.from("posts").select();`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="lib/supabase/server.ts — Server Client"
            code={`// lib/supabase/server.ts
// Used in Server Components, Server Actions, Route Handlers
// This runs on the SERVER

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll is called from a Server Component
            // where cookies can't be set. This is fine
            // because Middleware will handle the refresh.
          }
        },
      },
    }
  );
}

// USAGE in a Server Component:
// import { createClient } from "@/lib/supabase/server";
// const supabase = await createClient();
// const { data } = await supabase.from("posts").select();`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="middleware.ts — Refresh auth tokens on every request"
            code={`// middleware.ts (in your project ROOT, not in /app)
// Runs BEFORE every request to refresh expired auth tokens

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Set cookies on the request (for downstream code)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // Set cookies on the response (sent to browser)
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the session — this is the key line!
  await supabase.auth.getUser();

  return supabaseResponse;
}

// Only run middleware on routes that need auth
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="lib/supabase/admin.ts — Admin Client (Server Only)"
            code={`// lib/supabase/admin.ts
// Uses the SERVICE ROLE KEY — bypasses Row Level Security!
// ONLY use this in Server Actions, Route Handlers, or scripts
// NEVER import this in Client Components!

import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!   // No NEXT_PUBLIC_ prefix!
  );
}

// USAGE (server-only contexts):
// import { createAdminClient } from "@/lib/supabase/admin";
// const supabase = createAdminClient();
// const { data } = await supabase.from("users").select();
// ↑ This bypasses RLS — use with caution!`}
          />
        </div>
      </section>

      {/* ============ SECTION 5: Recommended Folder Structure ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">5. Recommended Project Structure</h2>

        <div className="mt-4">
          <CodeExample
            title="Where to put Supabase files"
            language="text"
            code={`your-nextjs-app/
├── .env.local                  # 🔑 Credentials (git-ignored)
├── middleware.ts                # 🔄 Refresh auth tokens
├── lib/
│   └── supabase/
│       ├── client.ts           # 🌐 Browser client
│       ├── server.ts           # 🖥️ Server client
│       └── admin.ts            # 🔒 Admin client (service role)
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   │   └── page.tsx            # Login form
│   ├── signup/
│   │   └── page.tsx            # Signup form
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts        # OAuth callback handler
│   └── dashboard/
│       └── page.tsx            # Protected page
└── package.json`}
          />
        </div>
      </section>

      {/* ============ SECTION 6: Common Operations ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">6. Common Supabase Operations</h2>

        <div className="mt-4">
          <CodeExample
            title="CRUD Operations — Reading & Writing Data"
            code={`// ===== READ data =====
const { data: posts, error } = await supabase
  .from("posts")
  .select("*")                  // Select all columns
  .order("created_at", { ascending: false })
  .limit(10);

// ===== READ with filter =====
const { data } = await supabase
  .from("posts")
  .select("id, title, author:profiles(name)")  // Join!
  .eq("published", true)       // WHERE published = true
  .gte("likes", 10);           // WHERE likes >= 10

// ===== INSERT data =====
const { data: newPost, error } = await supabase
  .from("posts")
  .insert({ title: "Hello", body: "World", user_id: userId })
  .select()                    // Return the inserted row
  .single();                   // Return object, not array

// ===== UPDATE data =====
const { error } = await supabase
  .from("posts")
  .update({ title: "Updated Title" })
  .eq("id", postId);          // WHERE id = postId

// ===== DELETE data =====
const { error } = await supabase
  .from("posts")
  .delete()
  .eq("id", postId);`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Authentication — Sign up, Sign in, Sign out"
            code={`// ===== Sign Up with email/password =====
const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "securepassword123",
});

// ===== Sign In with email/password =====
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "securepassword123",
});

// ===== Sign In with OAuth (Google, GitHub, etc.) =====
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "github",
  options: {
    redirectTo: "http://localhost:3000/auth/callback",
  },
});

// ===== Get Current User (Server Component) =====
import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  return <h1>Welcome, {user.email}</h1>;
}

// ===== Sign Out =====
await supabase.auth.signOut();`}
          />
        </div>
      </section>

      {/* ============ SECTION 7: Server Actions with Supabase ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">7. Server Actions with Supabase</h2>

        <Card title="Server Actions keep your logic secure" variant="success">
          <p>
            Server Actions run on the server, so they can safely use the Supabase
            server client. Database calls happen server-side — the browser never
            sees your queries or credentials.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Server Action — Create a post"
            code={`// app/posts/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const supabase = await createClient();

  // 1. Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "You must be logged in" };
  }

  // 2. Validate input
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  if (!title || title.length < 3) {
    return { error: "Title must be at least 3 characters" };
  }

  // 3. Insert into database
  const { error } = await supabase
    .from("posts")
    .insert({
      title,
      body,
      user_id: user.id,
    });

  if (error) {
    return { error: error.message };
  }

  // 4. Revalidate the page to show new data
  revalidatePath("/posts");
  return { success: true };
}

// USAGE in a form:
// <form action={createPost}>
//   <input name="title" />
//   <textarea name="body" />
//   <button type="submit">Create Post</button>
// </form>`}
          />
        </div>
      </section>

      {/* ============ SECTION 8: Row Level Security ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">8. Row Level Security (RLS)</h2>

        <Card title="RLS = Your database firewall" variant="warning">
          <p className="mb-3">
            Row Level Security is a Postgres feature that controls <strong>who can access
            which rows</strong>. Since the anon key is public (visible in the browser),
            RLS is your <strong>critical security layer</strong>. Without RLS policies,
            anyone with your anon key could read/write all data!
          </p>
          <p>
            <strong>Always enable RLS</strong> on every table, then add policies for the
            operations you want to allow.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="SQL — Common RLS Policies (run in Supabase SQL Editor)"
            language="sql"
            code={`-- Enable RLS on the posts table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can READ published posts
CREATE POLICY "Public posts are viewable by everyone"
ON posts FOR SELECT
USING (published = true);

-- Policy: Users can only INSERT their own posts
CREATE POLICY "Users can create their own posts"
ON posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only UPDATE their own posts
CREATE POLICY "Users can update their own posts"
ON posts FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only DELETE their own posts
CREATE POLICY "Users can delete their own posts"
ON posts FOR DELETE
USING (auth.uid() = user_id);

-- EXPLANATION:
-- auth.uid()  → returns the logged-in user's ID
-- USING       → filters which rows the user can SEE
-- WITH CHECK  → validates what data the user can WRITE`}
          />
        </div>
      </section>

      {/* ============ SECTION 9: Type Safety ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">9. TypeScript Integration</h2>

        <Card title="Generate types from your database" variant="info">
          <p>
            Supabase can auto-generate TypeScript types from your database schema.
            This gives you full autocomplete and type checking for all your queries.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Generate & use database types"
            language="bash"
            code={`# Install Supabase CLI
npm install -D supabase

# Login to Supabase
npx supabase login

# Generate types from your database
npx supabase gen types typescript \\
  --project-id your-project-id \\
  > lib/supabase/database.types.ts

# TIP: Add this as an npm script in package.json:
# "scripts": {
#   "db:types": "supabase gen types typescript --project-id YOUR_ID > lib/supabase/database.types.ts"
# }`}
          />
        </div>

        <div className="mt-4">
          <CodeExample
            title="Using generated types in your client"
            code={`// lib/supabase/client.ts (updated with types)
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Now you get full autocomplete:
const supabase = createClient();
const { data } = await supabase
  .from("posts")   // ← autocomplete table names
  .select("*");    // ← data is typed as Post[]

// Type helpers for convenience:
type Post = Database["public"]["Tables"]["posts"]["Row"];
type NewPost = Database["public"]["Tables"]["posts"]["Insert"];
type UpdatePost = Database["public"]["Tables"]["posts"]["Update"];`}
          />
        </div>
      </section>

      {/* ============ SECTION 10: Hosting / Deployment ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">10. Deploying with Credentials</h2>

        <Card title="Setting env variables in production" variant="default">
          <p className="mb-3">
            When deploying to Vercel (or any host), you need to add your environment
            variables in the hosting dashboard — <strong>not</strong> in your code.
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to Vercel → Your Project → Settings → Environment Variables</li>
            <li>Add <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code></li>
            <li>Add <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
            <li>Add <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code></li>
            <li>Redeploy your app</li>
          </ol>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Vercel CLI — set env variables from terminal"
            language="bash"
            code={`# Or use Vercel CLI to add env vars
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY

# These are stored securely on Vercel's servers
# and injected at build time / runtime.`}
          />
        </div>
      </section>

      {/* ============ SECTION 11: Common Mistakes ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">11. Common Beginner Mistakes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="❌ Mistake: Service key in browser">
            <code className="text-xs bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 p-2 rounded block mb-2">
              {`NEXT_PUBLIC_SUPABASE_SERVICE_KEY=...`}
            </code>
            <p>
              Adding <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">NEXT_PUBLIC_</code> to the service
              key exposes it to the browser. Anyone can steal it and have
              <strong> full access</strong> to your database.
            </p>
          </Card>
          <Card title="✅ Fix: Keep service key server-only">
            <code className="text-xs bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 p-2 rounded block mb-2">
              {`SUPABASE_SERVICE_ROLE_KEY=...`}
            </code>
            <p>
              Without the prefix, this variable is only available in Server
              Components, Server Actions, Route Handlers, and Middleware.
            </p>
          </Card>

          <Card title="❌ Mistake: No RLS policies">
            <p className="mb-2">
              Creating tables without enabling RLS means <strong>anyone</strong> with
              your anon key can read/write/delete all rows.
            </p>
          </Card>
          <Card title="✅ Fix: Always enable RLS">
            <p className="mb-2">
              Enable RLS on every table immediately after creating it.
              Then add policies to control read/write access.
            </p>
          </Card>

          <Card title="❌ Mistake: One client for everything">
            <p className="mb-2">
              Using a single Supabase client in both server and client code
              causes auth token issues and cookie mismatches.
            </p>
          </Card>
          <Card title="✅ Fix: Separate clients per context">
            <p className="mb-2">
              Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">createBrowserClient</code> for
              client components and <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">createServerClient</code> for
              server code.
            </p>
          </Card>

          <Card title="❌ Mistake: Forgetting middleware">
            <p className="mb-2">
              Without middleware, auth tokens expire and users get
              unexpectedly logged out on page navigation.
            </p>
          </Card>
          <Card title="✅ Fix: Add middleware.ts">
            <p className="mb-2">
              The middleware refreshes auth tokens on every request,
              keeping sessions alive seamlessly.
            </p>
          </Card>
        </div>
      </section>

      {/* ============ SECTION 12: Real-World Example ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">12. Full Example: Protected Dashboard</h2>

        <div className="mt-4">
          <CodeExample
            title="app/dashboard/page.tsx — Server Component with auth check"
            code={`// app/dashboard/page.tsx
// Server Component — data fetched on the server

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. Check authentication
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");  // Not logged in → redirect
  }

  // 2. Fetch user's data (RLS filters automatically!)
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  // 3. Render the page
  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <p>You have {posts?.length ?? 0} posts</p>
      
      {posts?.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

// HOW THIS WORKS:
// 1. Middleware refreshes the auth token (middleware.ts)
// 2. Server Component reads cookies to get user session
// 3. supabase.auth.getUser() verifies the session
// 4. If no user → redirect to login
// 5. Supabase query runs with the user's JWT
// 6. RLS policies filter rows to only this user's data
// 7. HTML is rendered on the server and sent to browser`}
          />
        </div>
      </section>

      {/* ============ Summary / Cheat Sheet ============ */}
      <section className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4">📋 Supabase + Next.js Cheat Sheet</h2>
        <div className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
          <p>• <strong>Install:</strong> npm install @supabase/supabase-js @supabase/ssr</p>
          <p>• <strong>.env.local:</strong> NEXT_PUBLIC_ for URL &amp; anon key, no prefix for service key</p>
          <p>• <strong>Browser client:</strong> createBrowserClient() — for Client Components</p>
          <p>• <strong>Server client:</strong> createServerClient() with cookies — for Server Components</p>
          <p>• <strong>Admin client:</strong> createClient() with service_role key — server only, bypasses RLS</p>
          <p>• <strong>Middleware:</strong> Refresh auth tokens on every request</p>
          <p>• <strong>RLS:</strong> Always enable on every table — it&apos;s your security layer</p>
          <p>• <strong>Types:</strong> npx supabase gen types typescript for full type safety</p>
          <p>• <strong>Server Actions:</strong> Best place for mutations (insert, update, delete)</p>
          <p>• <strong>Deploy:</strong> Add env vars in Vercel dashboard, never in code</p>
        </div>
      </section>
    </div>
  );
}
