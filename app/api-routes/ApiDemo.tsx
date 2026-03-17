/* ============================================================
   API DEMO (Client Component)
   ============================================================
   Interactive buttons that call our API routes and show results.
   ============================================================ */

"use client";

import { useState } from "react";

export default function ApiDemo() {
  const [getResult, setGetResult] = useState<string>("");
  const [postResult, setPostResult] = useState<string>("");
  const [usersResult, setUsersResult] = useState<string>("");
  const [loading, setLoading] = useState<string>("");

  // --- Call GET /api/hello ---
  async function handleGet() {
    setLoading("get");
    try {
      const res = await fetch("/api/hello");
      const data = await res.json();
      setGetResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setGetResult("Error: " + (err instanceof Error ? err.message : "Unknown error"));
    }
    setLoading("");
  }

  // --- Call POST /api/hello ---
  async function handlePost() {
    setLoading("post");
    try {
      const res = await fetch("/api/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Next.js Learner" }),
      });
      const data = await res.json();
      setPostResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setPostResult("Error: " + (err instanceof Error ? err.message : "Unknown error"));
    }
    setLoading("");
  }

  // --- Call GET /api/users ---
  async function handleUsers() {
    setLoading("users");
    try {
      const res = await fetch("/api/users?role=Developer");
      const data = await res.json();
      setUsersResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setUsersResult("Error: " + (err instanceof Error ? err.message : "Unknown error"));
    }
    setLoading("");
  }

  return (
    <div className="space-y-6">
      {/* GET Demo */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-bold">
            GET
          </span>
          <code className="text-sm">/api/hello</code>
        </div>
        <button
          onClick={handleGet}
          disabled={loading === "get"}
          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {loading === "get" ? "Loading..." : "Send GET Request"}
        </button>
        {getResult && (
          <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
            {getResult}
          </pre>
        )}
      </div>

      {/* POST Demo */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-bold">
            POST
          </span>
          <code className="text-sm">/api/hello</code>
          <span className="text-xs text-gray-500">body: {`{ "name": "Next.js Learner" }`}</span>
        </div>
        <button
          onClick={handlePost}
          disabled={loading === "post"}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading === "post" ? "Loading..." : "Send POST Request"}
        </button>
        {postResult && (
          <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
            {postResult}
          </pre>
        )}
      </div>

      {/* Users with Query Params */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-bold">
            GET
          </span>
          <code className="text-sm">/api/users?role=Developer</code>
        </div>
        <button
          onClick={handleUsers}
          disabled={loading === "users"}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {loading === "users" ? "Loading..." : "Fetch Developers"}
        </button>
        {usersResult && (
          <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto">
            {usersResult}
          </pre>
        )}
      </div>
    </div>
  );
}
