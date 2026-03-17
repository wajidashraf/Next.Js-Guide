/* ============================================================
   API ROUTE HANDLER (Route Handler)
   ============================================================
   
   KEY CONCEPTS:
   - API routes live in app/api/ folders using route.ts (not page.tsx)
   - Export functions named after HTTP methods: GET, POST, PUT, DELETE
   - These run ONLY on the server — safe for secrets/database calls
   - Return Response objects (standard Web API)
   - Next.js also provides NextRequest/NextResponse helpers
   
   FILE NAMING:
   - app/api/hello/route.ts → URL: /api/hello
   - app/api/users/[id]/route.ts → URL: /api/users/1
   
   IMPORTANT:
   - route.ts and page.tsx CANNOT exist in the same folder
   - Route Handlers are cached by default for GET (no Request object)
   - Using NextRequest makes the route dynamic (not cached)
   ============================================================ */

import { NextRequest, NextResponse } from "next/server";

// --- GET handler ---
export async function GET() {
  // Return JSON data
  return NextResponse.json({
    message: "Hello from the API! 👋",
    timestamp: new Date().toISOString(),
    framework: "Next.js 16",
  });
}

// --- POST handler ---
export async function POST(request: NextRequest) {
  // Parse the incoming JSON body
  const body = await request.json();

  // Validate input
  if (!body.name || typeof body.name !== "string") {
    return NextResponse.json(
      { error: "Name is required and must be a string" },
      { status: 400 }
    );
  }

  // Return a response
  return NextResponse.json(
    {
      message: `Hello, ${body.name}!`,
      receivedAt: new Date().toISOString(),
    },
    { status: 201 }
  );
}
