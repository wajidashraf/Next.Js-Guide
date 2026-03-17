/* ============================================================
   USERS API ROUTE — demonstrates query params & multiple methods
   ============================================================ */

import { NextRequest, NextResponse } from "next/server";

// --- Fake in-memory data (in real apps, use a database) ---
const users = [
  { id: 1, name: "Alice", role: "Developer" },
  { id: 2, name: "Bob", role: "Designer" },
  { id: 3, name: "Charlie", role: "Manager" },
];

// --- GET /api/users?role=Developer ---
export async function GET(request: NextRequest) {
  // Read query (search) parameters from the URL
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");

  // Filter if a role query param was provided
  const result = role
    ? users.filter((u) => u.role.toLowerCase() === role.toLowerCase())
    : users;

  return NextResponse.json(result);
}
