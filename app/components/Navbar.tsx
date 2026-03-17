/* ============================================================
   NAVBAR COMPONENT (Client Component)
   ============================================================
   
   KEY CONCEPTS:
   - "use client" makes this a CLIENT Component (runs in browser)
   - Client Components are needed when you use:
     → useState, useEffect, or any React hooks
     → Browser APIs (window, document, localStorage)
     → Event handlers (onClick, onChange, etc.)
     → Third-party libraries that use browser features
   
   - WITHOUT "use client" → Server Component (default in Next.js)
   - WITH "use client" → Client Component (runs in browser)
   
   LINK COMPONENT:
   - Always use <Link> from next/link instead of <a> tags
   - Link enables client-side navigation (no full page reload)
   - It automatically prefetches linked pages for instant navigation
   
   usePathname HOOK:
   - Returns the current URL path (e.g., "/routing")
   - Useful for highlighting the active navigation link
   ============================================================ */

"use client"; // ← This directive makes it a Client Component

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";

// --- TypeScript: Define the shape of a navigation item ---
interface NavItem {
  label: string;
  href: string;
}

// --- Navigation items array (typed with our interface) ---
const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Basics", href: "/basics" },
  { label: "Routing", href: "/routing" },
  { label: "Components", href: "/server-vs-client" },
  { label: "Data Fetching", href: "/data-fetching" },
  { label: "Styling", href: "/styling" },
  { label: "TypeScript", href: "/typescript-guide" },
  { label: "API Routes", href: "/api-routes" },
  { label: "Forms", href: "/forms" },
  { label: "Images", href: "/images-fonts" },
  { label: "Best Practices", href: "/best-practices" },
  { label: "GitHub & Deploy", href: "/github-deploy" },
];

export default function Navbar() {
  // --- React Hooks (only available in Client Components) ---
  const pathname = usePathname();       // Get current route
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

  // useTheme from next-themes gives us:
  // - theme: current theme string ("light" | "dark" | "system")
  // - setTheme: function to change the theme
  // - resolvedTheme: actual theme after resolving "system" ("light" or "dark")
  const { setTheme } = useTheme();

  // HYDRATION NOTE: We intentionally do NOT read resolvedTheme here.
  // resolvedTheme is undefined on the server — reading it to render different
  // content (icons, titles) causes a server/client HTML mismatch → hydration error.
  // Solution: always render BOTH icons and use CSS dark: classes to show/hide them.
  // The .dark class on <html> controls which icon is visible via CSS —
  // no JavaScript or useEffect needed, no mismatch possible.
  function toggleTheme() {
    // We read resolvedTheme only inside the click handler (client-only),
    // so it's safe here — handlers never run during SSR.
    setTheme(
      document.documentElement.classList.contains("dark") ? "light" : "dark"
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link href="/" className="font-bold text-lg text-blue-600">
            📘 Next.js Guide
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            {/* Theme toggle button — cycles light ↔ dark
                BOTH icons are always rendered. CSS dark: classes control
                which is visible. This way server and client HTML always
                match — no hydration mismatch. */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors w-9 h-9 flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {/* Moon: visible in light mode, hidden in dark mode */}
              <span className="dark:hidden">🌙</span>
              {/* Sun: hidden in light mode, visible in dark mode */}
              <span className="hidden dark:inline">☀️</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-2 border-t border-gray-200 dark:border-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)} // Close menu on click
                className={`block px-3 py-2 rounded-md text-sm ${
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
