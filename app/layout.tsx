/* ============================================================
   ROOT LAYOUT (layout.tsx)
   ============================================================
   
   KEY CONCEPTS:
   - This is the ROOT layout — it wraps EVERY page in your app
   - It MUST contain <html> and <body> tags (only root layout needs this)
   - It's a Server Component by default (no "use client" needed)
   - Metadata export defines SEO tags (title, description, etc.)
   - Fonts are loaded via next/font for optimal performance
   - Children represent the page content that changes per route
   
   BEST PRACTICES:
   - Keep layout lightweight — it re-renders on every navigation
   - Import global CSS here (only once)
   - Use next/font instead of <link> tags for fonts (better performance)
   - Set lang attribute on <html> for accessibility
   ============================================================ */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import ThemeProvider from "./components/ThemeProvider";

// --- Font Configuration ---
// next/font automatically optimizes fonts: self-hosts them, eliminates
// layout shift, and prevents external network requests
const geistSans = Geist({
  variable: "--font-geist-sans",  // CSS variable name
  subsets: ["latin"],              // Only load needed character sets
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- Metadata for SEO ---
// This gets converted to <title> and <meta> tags in the <head>
export const metadata: Metadata = {
  title: {
    default: "Next.js Learning Guide",
    template: "%s | Next.js Guide",  // %s is replaced by page-specific title
  },
  description: "A comprehensive learning project covering all Next.js features with TypeScript and Tailwind CSS",
};

// --- Root Layout Component ---
// The `children` prop is the current page being rendered
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;  // Type for any valid JSX/React content
}>) {
  return (
    // suppressHydrationWarning: next-themes modifies the class attribute
    // on <html> before React hydrates, which would trigger a hydration
    // mismatch warning. This suppresses that expected, harmless warning.
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ThemeProvider must wrap everything that uses dark: classes */}
        <ThemeProvider>
          {/* Navbar is shared across ALL pages */}
          <Navbar />
          
          {/* Main content area — this is where each page renders */}
          <main className="min-h-screen pt-16">
            {children}
          </main>

          {/* Footer shared across all pages */}
          <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-gray-500">
            <p>Next.js Learning Guide — Built with Next.js 16, TypeScript &amp; Tailwind CSS</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
