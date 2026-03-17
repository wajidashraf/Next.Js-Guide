/* ============================================================
   STYLING PAGE — Tailwind CSS Guide
   ============================================================
   
   TAILWIND CSS APPROACH:
   - Utility-first: Use small classes like "p-4", "text-blue-500"
   - No custom CSS files needed (mostly)
   - Responsive: Use "md:", "lg:" prefixes
   - Dark mode: Use "dark:" prefix
   - Hover/Focus: Use "hover:", "focus:" prefixes
   
   WHY TAILWIND?
   - No class name conflicts
   - Consistent design system
   - Smaller CSS bundles (only used classes)
   - Rapid development
   ============================================================ */

import type { Metadata } from "next";
import Card from "../components/Card";
import CodeExample from "../components/CodeExample";

export const metadata: Metadata = {
  title: "Styling with Tailwind CSS",
};

export default function StylingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">🎨 Styling with Tailwind CSS</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Tailwind CSS lets you style everything using utility classes — no custom CSS needed.
      </p>

      {/* ============ SECTION 1: How Tailwind Works ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. How Tailwind Works</h2>
        <Card title="Utility Classes = Tiny CSS building blocks" variant="info">
          <p className="mb-3">
            Instead of writing CSS like <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">margin-top: 16px</code>, 
            you use a class like <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">mt-4</code>. Each class does one thing.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Traditional CSS vs Tailwind"
            code={`/* Traditional CSS */
.card {
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
}

/* Tailwind CSS (same result!) */
<div className="p-6 rounded-xl bg-white shadow-md mb-4">

// The Tailwind version:
// - p-6       = padding: 1.5rem
// - rounded-xl = border-radius: 0.75rem  
// - bg-white  = background: white
// - shadow-md = box-shadow
// - mb-4      = margin-bottom: 1rem`}
            language="css"
          />
        </div>
      </section>

      {/* ============ SECTION 2: Common Classes ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Most Used Tailwind Classes</h2>
        
        {/* Spacing */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">📏 Spacing (margin & padding)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="text-left p-3 font-medium">Class</th>
                  <th className="text-left p-3 font-medium">CSS</th>
                  <th className="text-left p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                <tr><td className="p-3 font-mono">p-4</td><td className="p-3">padding: 1rem</td><td className="p-3">Padding on all sides</td></tr>
                <tr><td className="p-3 font-mono">px-4</td><td className="p-3">padding-left/right: 1rem</td><td className="p-3">Horizontal padding</td></tr>
                <tr><td className="p-3 font-mono">py-2</td><td className="p-3">padding-top/bottom: 0.5rem</td><td className="p-3">Vertical padding</td></tr>
                <tr><td className="p-3 font-mono">m-4</td><td className="p-3">margin: 1rem</td><td className="p-3">Margin on all sides</td></tr>
                <tr><td className="p-3 font-mono">mt-8</td><td className="p-3">margin-top: 2rem</td><td className="p-3">Top margin only</td></tr>
                <tr><td className="p-3 font-mono">gap-4</td><td className="p-3">gap: 1rem</td><td className="p-3">Gap between flex/grid children</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Scale: 1=0.25rem, 2=0.5rem, 4=1rem, 6=1.5rem, 8=2rem, 12=3rem, 16=4rem</p>
        </div>

        {/* Typography */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">✏️ Typography</h3>
          <div className="space-y-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border">
            <p className="text-xs text-gray-500">text-xs (0.75rem)</p>
            <p className="text-sm text-gray-500">text-sm (0.875rem)</p>
            <p className="text-base">text-base (1rem) — default</p>
            <p className="text-lg">text-lg (1.125rem)</p>
            <p className="text-xl font-semibold">text-xl font-semibold</p>
            <p className="text-2xl font-bold">text-2xl font-bold</p>
            <p className="text-3xl font-bold text-blue-600">text-3xl font-bold text-blue-600</p>
          </div>
        </div>

        {/* Colors */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">🎨 Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "blue-500", bg: "bg-blue-500" },
              { name: "red-500", bg: "bg-red-500" },
              { name: "green-500", bg: "bg-green-500" },
              { name: "yellow-500", bg: "bg-yellow-500" },
              { name: "purple-500", bg: "bg-purple-500" },
              { name: "pink-500", bg: "bg-pink-500" },
              { name: "gray-500", bg: "bg-gray-500" },
              { name: "orange-500", bg: "bg-orange-500" },
            ].map((color) => (
              <div key={color.name} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded ${color.bg}`} />
                <span className="text-xs font-mono">{color.name}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Each color has shades: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
          </p>
        </div>
      </section>

      {/* ============ SECTION 3: Flexbox & Grid ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. Flexbox & Grid Layout</h2>
        <Card title="The two main layout systems">
          <p>Flexbox = one-dimensional (row OR column). Grid = two-dimensional (rows AND columns).</p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Flexbox & Grid Patterns"
            code={`// --- FLEXBOX (row by default) ---
// Center items horizontally and vertically
<div className="flex items-center justify-center">

// Space items evenly in a row
<div className="flex justify-between items-center">

// Stack items vertically with gap
<div className="flex flex-col gap-4">

// Wrap items to next line
<div className="flex flex-wrap gap-2">

// --- GRID ---
// 3 equal columns
<div className="grid grid-cols-3 gap-4">

// Responsive grid: 1 col on mobile, 2 on tablet, 3 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`}
          />
        </div>

        {/* Live flex demos */}
        <div className="mt-4 space-y-4">
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800">
            <p className="text-xs text-gray-500 mb-2 font-mono">flex items-center justify-between</p>
            <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
              <span className="bg-blue-500 text-white px-3 py-1 rounded">Left</span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded">Center</span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded">Right</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800">
            <p className="text-xs text-gray-500 mb-2 font-mono">grid grid-cols-1 md:grid-cols-3 gap-4</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">Column 1</div>
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">Column 2</div>
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">Column 3</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 4: Responsive Design ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">4. Responsive Design</h2>
        <Card title='Mobile-first: use "md:", "lg:" prefixes' variant="info">
          <p className="mb-3">
            Tailwind is <strong>mobile-first</strong>. Classes without a prefix apply to ALL screens.
            Add prefixes to override for larger screens.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Responsive Breakpoints"
            code={`// Breakpoints:
// (none) = 0px and up (mobile first!)
// sm:    = 640px and up
// md:    = 768px and up (tablet)
// lg:    = 1024px and up (desktop)
// xl:    = 1280px and up (wide desktop)
// 2xl:   = 1536px and up

// Examples:
<div className="
  text-sm          // Mobile: small text
  md:text-base     // Tablet: normal text
  lg:text-lg       // Desktop: large text
">

<div className="
  grid grid-cols-1    // Mobile: 1 column
  md:grid-cols-2      // Tablet: 2 columns
  lg:grid-cols-3      // Desktop: 3 columns
  gap-4
">

<div className="
  p-4              // Mobile: small padding
  md:p-8           // Tablet: more padding
  lg:p-12          // Desktop: even more padding
">`}
          />
        </div>

        {/* Live responsive demo */}
        <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
            ▶ Live: Resize your browser to see this change!
          </p>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center font-medium">
            <span className="md:hidden">📱 Mobile View (&lt;768px)</span>
            <span className="hidden md:inline lg:hidden">📱 Tablet View (768px-1024px)</span>
            <span className="hidden lg:inline">🖥️ Desktop View (&gt;1024px)</span>
          </div>
        </div>
      </section>

      {/* ============ SECTION 5: Dark Mode ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">5. Dark Mode</h2>
        <Card title='Use "dark:" prefix for dark mode styles'>
          <p>
            Add <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">dark:</code> before any class 
            to apply it only in dark mode. It follows your OS preference by default.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Dark Mode Examples"
            code={`// Light mode: white bg, dark text
// Dark mode: dark bg, light text
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">

// Light mode: blue border
// Dark mode: blue-800 border
<div className="border-blue-200 dark:border-blue-800">

// Common pattern:
<div className="
  bg-gray-50       dark:bg-gray-900     // Background
  text-gray-900    dark:text-gray-100   // Text
  border-gray-200  dark:border-gray-700 // Border
">`}
          />
        </div>
      </section>

      {/* ============ SECTION 6: Hover, Focus & Transitions ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">6. Interactive States & Animations</h2>
        
        <div className="mt-4">
          <CodeExample
            title="Hover, Focus, and Transitions"
            code={`// Hover effect with smooth transition
<button className="
  bg-blue-500 
  hover:bg-blue-600      // Darker on hover
  transition-colors      // Smooth color change
  duration-200           // Animation speed
">

// Focus ring (accessibility!)
<input className="
  border border-gray-300
  focus:border-blue-500   // Blue border on focus
  focus:ring-2            // Ring around element
  focus:ring-blue-500     // Ring color
  focus:outline-none      // Remove default outline
">

// Group hover (parent hover affects child)
<div className="group">
  <p className="group-hover:text-blue-500">
    Turns blue when parent is hovered!
  </p>
</div>`}
          />
        </div>

        {/* Live interactive demos */}
        <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-3">▶ Live: Hover over these!</p>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Hover me (color)
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:scale-105 transition-transform">
              Hover me (scale)
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-shadow">
              Hover me (shadow)
            </button>
            <div className="group px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer">
              <span className="group-hover:text-red-500 transition-colors">Group hover parent →</span>
              <span className="text-gray-400 group-hover:text-blue-500 transition-colors"> child changes!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cheat Sheet */}
      <section className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4">📋 Tailwind Cheat Sheet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Layout:</h3>
            <ul className="space-y-1">
              <li>• <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">flex</code> / <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">grid</code> — layout mode</li>
              <li>• <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">items-center</code> — vertical center</li>
              <li>• <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">justify-between</code> — space between</li>
              <li>• <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">gap-4</code> — spacing between items</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Quick Tips:</h3>
            <ul className="space-y-1">
              <li>• Always add <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">transition-*</code> for hover effects</li>
              <li>• Use <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">focus:ring-2</code> for accessibility</li>
              <li>• Design mobile-first, then add md:/lg:</li>
              <li>• Always add dark: variants for dark mode</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
