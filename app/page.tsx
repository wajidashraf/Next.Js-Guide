/* ============================================================
   HOME PAGE (page.tsx in /app)
   ============================================================
   
   KEY CONCEPTS:
   - page.tsx in /app = the HOME route (/)
   - This is the first page users see
   - It's a Server Component (no "use client")
   - metadata export overrides the layout's default title
   
   ROUTING IN NEXT.JS:
   /app/page.tsx           → URL: /
   /app/about/page.tsx     → URL: /about
   /app/blog/[id]/page.tsx → URL: /blog/1, /blog/2, etc.
   ============================================================ */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description: "Next.js Learning Guide - Complete reference for beginners",
};

// --- TypeScript: Type for our feature cards ---
interface Feature {
  title: string;
  description: string;
  href: string;
  emoji: string;
}

const features: Feature[] = [
  {
    title: "JSX & React Basics",
    description: "Learn JSX syntax, components, props, and the fundamentals you need before diving deeper.",
    href: "/basics",
    emoji: "📝",
  },
  {
    title: "Routing & Navigation",
    description: "File-based routing, dynamic routes, route groups, and the Link component.",
    href: "/routing",
    emoji: "🗺️",
  },
  {
    title: "Server vs Client Components",
    description: "Understand the core concept that makes Next.js unique — when to use each one.",
    href: "/server-vs-client",
    emoji: "⚡",
  },
  {
    title: "Data Fetching",
    description: "Fetch data on the server, handle loading states, and display dynamic content.",
    href: "/data-fetching",
    emoji: "📡",
  },
  {
    title: "Styling with Tailwind",
    description: "Master Tailwind CSS utility classes for responsive, dark-mode-ready designs.",
    href: "/styling",
    emoji: "🎨",
  },
  {
    title: "TypeScript in Next.js",
    description: "Types, interfaces, generics, and how TypeScript makes your code safer.",
    href: "/typescript-guide",
    emoji: "🔷",
  },
  {
    title: "API Routes",
    description: "Build backend API endpoints right inside your Next.js app.",
    href: "/api-routes",
    emoji: "🔌",
  },
  {
    title: "Forms & Server Actions",
    description: "Handle form submissions with the new Server Actions pattern.",
    href: "/forms",
    emoji: "📋",
  },
  {
    title: "Images & Fonts",
    description: "Optimize images with next/image and load fonts with next/font.",
    href: "/images-fonts",
    emoji: "🖼️",
  },
  {
    title: "Best Practices",
    description: "Performance tips, project structure, SEO, and production-ready patterns.",
    href: "/best-practices",
    emoji: "✅",
  },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          📘 Next.js Learning Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          A complete, hands-on reference project covering all essential Next.js features 
          with TypeScript and Tailwind CSS. Built for beginners with no prior React experience.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
            Next.js 16
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
            React 19
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
            TypeScript
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
            Tailwind CSS 4
          </span>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center">📚 Learning Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group block p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all"
            >
              <div className="text-2xl mb-2">{feature.emoji}</div>
              <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Start Info */}
      <section className="mt-16 p-8 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4">🚀 Quick Start Commands</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <span className="text-gray-500">Start dev server:</span>
            <br />
            <span className="text-green-600">npm run dev</span>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <span className="text-gray-500">Build for production:</span>
            <br />
            <span className="text-green-600">npm run build</span>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <span className="text-gray-500">Run production build:</span>
            <br />
            <span className="text-green-600">npm run start</span>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <span className="text-gray-500">Lint your code:</span>
            <br />
            <span className="text-green-600">npm run lint</span>
          </div>
        </div>
      </section>
    </div>
  );
}
