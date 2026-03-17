/* ============================================================
   API ROUTES PAGE
   ============================================================
   
   KEY CONCEPTS:
   - Route Handlers let you build REST APIs inside Next.js
   - They live in app/api/ folders using route.ts files
   - Export named functions: GET, POST, PUT, PATCH, DELETE
   - They run ONLY on the server — safe for secrets & DB calls
   - Uses standard Web Request/Response APIs
   - NextRequest/NextResponse provide extra helpers
   
   WHEN TO USE API ROUTES:
   ✅ Webhooks from third-party services
   ✅ Proxying external APIs (hide API keys)
   ✅ Building a REST/GraphQL API for mobile apps
   ✅ Handling form submissions from non-Next.js clients
   
   WHEN YOU MIGHT NOT NEED THEM:
   ❌ Fetching data for your own pages → use Server Components
   ❌ Submitting forms in your Next.js app → use Server Actions
   ============================================================ */

import type { Metadata } from "next";
import Card from "../components/Card";
import CodeExample from "../components/CodeExample";
import ApiDemo from "./ApiDemo";

export const metadata: Metadata = {
  title: "API Routes",
  description: "Learn how to build API endpoints in Next.js",
};

export default function ApiRoutesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">🔌 API Routes (Route Handlers)</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
        Build backend API endpoints right inside your Next.js app using Route Handlers.
        They run on the server and are perfect for handling webhooks, proxying APIs, and more.
      </p>

      {/* --------------------------------------------------------
         SECTION 1: How Route Handlers Work
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">📁 File Structure</h2>
        <Card title="Route Handler Naming Convention" variant="info">
          <p className="mb-3">
            API routes use <strong>route.ts</strong> (not page.tsx) inside the <strong>app/api/</strong> directory.
            The folder structure determines the URL path:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><code>app/api/hello/route.ts</code> → <code>/api/hello</code></li>
            <li><code>app/api/users/route.ts</code> → <code>/api/users</code></li>
            <li><code>app/api/users/[id]/route.ts</code> → <code>/api/users/1</code></li>
          </ul>
        </Card>
      </section>

      {/* --------------------------------------------------------
         SECTION 2: GET Request
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">📥 GET Request</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The most common type of API route. Return data as JSON:
        </p>
        <CodeExample
          title="app/api/hello/route.ts — GET handler"
          code={`import { NextResponse } from "next/server";

// Export a function named GET
export async function GET() {
  return NextResponse.json({
    message: "Hello from the API! 👋",
    timestamp: new Date().toISOString(),
  });
}

// The URL for this API is: /api/hello
// Try it in your browser!`}
        />
      </section>

      {/* --------------------------------------------------------
         SECTION 3: POST Request
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">📤 POST Request</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Handle incoming data with POST. Always validate input on the server:
        </p>
        <CodeExample
          title="app/api/hello/route.ts — POST handler"
          code={`import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Parse the request body
  const body = await request.json();

  // Validate input (ALWAYS do this!)
  if (!body.name || typeof body.name !== "string") {
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400 }  // 400 = Bad Request
    );
  }

  // Return success response
  return NextResponse.json(
    { message: \`Hello, \${body.name}!\` },
    { status: 201 }  // 201 = Created
  );
}`}
        />
      </section>

      {/* --------------------------------------------------------
         SECTION 4: Query Parameters
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🔍 Query Parameters</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Read URL parameters like <code>/api/users?role=Developer</code>:
        </p>
        <CodeExample
          title="app/api/users/route.ts — with query params"
          code={`import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Extract query params from URL
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");

  // Filter data based on query
  const result = role
    ? users.filter(u => u.role === role)
    : users;

  return NextResponse.json(result);
}
// URL: /api/users?role=Developer`}
        />
      </section>

      {/* --------------------------------------------------------
         SECTION 5: Dynamic Route Parameters
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🔗 Dynamic Route Parameters</h2>
        <CodeExample
          title="app/api/users/[id]/route.ts — dynamic param"
          code={`import { NextRequest, NextResponse } from "next/server";

// The second argument contains the route params
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Look up the user by ID
  const user = users.find(u => u.id === Number(id));

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}
// URL: /api/users/1 → { id: 1, name: "Alice" }`}
        />
      </section>

      {/* --------------------------------------------------------
         SECTION 6: All HTTP Methods
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">📋 All HTTP Methods</h2>
        <Card title="Supported HTTP Methods">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 pr-4 font-semibold">Method</th>
                  <th className="text-left py-2 pr-4 font-semibold">Purpose</th>
                  <th className="text-left py-2 font-semibold">Example</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 pr-4 font-mono text-green-600">GET</td>
                  <td className="py-2 pr-4">Read / fetch data</td>
                  <td className="py-2 font-mono text-xs">Get all users</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 pr-4 font-mono text-blue-600">POST</td>
                  <td className="py-2 pr-4">Create new data</td>
                  <td className="py-2 font-mono text-xs">Create a user</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 pr-4 font-mono text-yellow-600">PUT</td>
                  <td className="py-2 pr-4">Replace / update data</td>
                  <td className="py-2 font-mono text-xs">Replace a user</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 pr-4 font-mono text-orange-600">PATCH</td>
                  <td className="py-2 pr-4">Partially update data</td>
                  <td className="py-2 font-mono text-xs">Update user name</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-red-600">DELETE</td>
                  <td className="py-2 pr-4">Remove data</td>
                  <td className="py-2 font-mono text-xs">Delete a user</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* --------------------------------------------------------
         SECTION 7: Live Demo
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🚀 Live Demo</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Try calling the API routes built into this project:
        </p>
        <ApiDemo />
      </section>

      {/* --------------------------------------------------------
         SECTION 8: Best Practices
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">✅ Route Handler Best Practices</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card title="Always Validate Input" variant="success">
            <p>Never trust incoming data. Check types, required fields, and sanitize strings before using them.</p>
          </Card>
          <Card title="Use Proper Status Codes" variant="info">
            <p>200 = OK, 201 = Created, 400 = Bad Request, 404 = Not Found, 500 = Server Error.</p>
          </Card>
          <Card title="Handle Errors Gracefully" variant="warning">
            <p>Wrap logic in try/catch blocks. Return helpful error messages with appropriate status codes.</p>
          </Card>
          <Card title="Keep Secrets Server-Side" variant="success">
            <p>Route Handlers run on the server — safe for API keys, database passwords, and tokens.</p>
          </Card>
        </div>
      </section>

      {/* --------------------------------------------------------
         SECTION 9: Route Handler vs Server Actions
      -------------------------------------------------------- */}
      <section>
        <h2 className="text-2xl font-bold mb-4">⚖️ Route Handlers vs Server Actions</h2>
        <Card title="When to Use Each">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 pr-4 font-semibold">Use Case</th>
                  <th className="text-left py-2 pr-4 font-semibold">Route Handler</th>
                  <th className="text-left py-2 font-semibold">Server Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 pr-4">Form submission in Next.js</td>
                  <td className="py-2 pr-4">❌</td>
                  <td className="py-2">✅ Preferred</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 pr-4">Webhook endpoint</td>
                  <td className="py-2 pr-4">✅ Preferred</td>
                  <td className="py-2">❌</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 pr-4">API for mobile app</td>
                  <td className="py-2 pr-4">✅ Preferred</td>
                  <td className="py-2">❌</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Mutating data in Next.js</td>
                  <td className="py-2 pr-4">⚠️ Can work</td>
                  <td className="py-2">✅ Preferred</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}
