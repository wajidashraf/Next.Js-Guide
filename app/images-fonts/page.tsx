/* ============================================================
   IMAGES & FONTS PAGE
   ============================================================

   KEY CONCEPTS COVERED:
   - next/image  → Automatic image optimisation (resize, WebP, lazy load)
   - next/font   → Zero-layout-shift font loading (Google & local)

   WHY THESE MATTER FOR PERFORMANCE:
   - Images are usually the heaviest assets on a page
   - Fonts block rendering if loaded naively with <link>
   - Next.js handles both automatically so you get Core Web Vitals wins
     without any extra work
   ============================================================ */

import type { Metadata } from "next";
import Image from "next/image";
import { Geist } from "next/font/google";
import Card from "../components/Card";
import CodeExample from "../components/CodeExample";

export const metadata: Metadata = {
  title: "Images & Fonts",
  description: "Learn how next/image and next/font optimise performance in Next.js",
};

// ── Font demo (loaded at module level, same pattern as layout.tsx) ──
const geistDemo = Geist({
  subsets: ["latin"],
  variable: "--font-geist-demo",
  display: "swap",   // Show fallback font while loading, swap when ready
});

export default function ImagesFontsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">🖼️ Images &amp; Fonts</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
        Two of the easiest Next.js wins: automatic image optimisation with{" "}
        <code>next/image</code> and zero-layout-shift fonts with{" "}
        <code>next/font</code>.
      </p>

      {/* ────────────────────────────────────────────────────────
          PART 1 — next/image
      ──────────────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Part 1 — next/image</h2>

        {/* ── Why? ── */}
        <Card title="Why not just use <img>?" variant="warning">
          <p className="mb-3">
            A plain <code>&lt;img&gt;</code> tag sends the original file to every
            device, even a 4 MB JPEG to a phone that only needs a 300 px thumbnail.
            Next.js <code>Image</code> fixes that automatically:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>Resizes</strong> images to the exact size needed per device</li>
            <li><strong>Converts</strong> to WebP / AVIF (smaller modern formats)</li>
            <li><strong>Lazy loads</strong> by default — off-screen images load only when scrolled to</li>
            <li><strong>Prevents layout shift</strong> by reserving space with width + height</li>
            <li><strong>Caches</strong> optimised images on the CDN edge</li>
          </ul>
        </Card>

        {/* ── Basic usage ── */}
        <div className="mt-6">
          <CodeExample
            title="Basic next/image usage"
            code={`import Image from "next/image";

// Local image — import the file directly
import myPhoto from "/public/photo.jpg";

export default function Page() {
  return (
    // width & height tell Next.js the intrinsic size (px)
    // These are used to reserve space and avoid layout shift
    <Image
      src="/next.svg"      // Path relative to /public
      alt="Next.js logo"   // Always required for accessibility
      width={180}          // Intrinsic width in px
      height={38}          // Intrinsic height in px
      priority             // Add for above-the-fold images (disables lazy load)
    />
  );
}`}
          />
        </div>

        {/* ── Live demo ── */}
        <div className="mt-6">
          <Card title="✅ Live Demo — next/image rendering" variant="success">
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              The image below is served via <code>next/image</code>. Open DevTools
              → Network → Img to see it is served as WebP and only loaded when visible.
            </p>
            <div className="flex flex-wrap gap-8 items-end">
              {/* Fixed-size image */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-black rounded-xl p-4 flex items-center justify-center">
                  <Image
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                  />
                </div>
                <span className="text-xs text-gray-500">width=180 height=38</span>
              </div>

              {/* Smaller version — Next.js resizes automatically */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-black rounded-xl p-4 flex items-center justify-center">
                  <Image
                    src="/next.svg"
                    alt="Next.js logo small"
                    width={90}
                    height={19}
                  />
                </div>
                <span className="text-xs text-gray-500">
                  Same file, half size — Next.js resizes it
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* ── fill layout ── */}
        <div className="mt-6">
          <CodeExample
            title="fill — responsive images that stretch to fill a container"
            code={`import Image from "next/image";

// Use fill when you DO NOT know the image dimensions ahead of time
// (e.g. user-uploaded photos, CMS images)
// The PARENT must have position:relative and an explicit size

export default function Hero() {
  return (
    <div className="relative w-full h-64">   {/* ← must be relative */}
      <Image
        src="/hero.jpg"
        alt="Hero banner"
        fill                          // Stretches to fill the parent div
        sizes="100vw"                 // Hint for srcset generation
        className="object-cover"      // CSS object-fit
        priority                      // Above the fold — no lazy load
      />
    </div>
  );
}`}
          />
        </div>

        {/* ── Remote images ── */}
        <div className="mt-6">
          <CodeExample
            title="Remote images — configure allowed hostnames in next.config.ts"
            code={`// next.config.ts — you MUST whitelist remote image domains
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // pathname: "/photos/**",  // Optional — restrict path
      },
      {
        protocol: "https",
        hostname: "cdn.mycompany.com",
      },
    ],
  },
};

export default nextConfig;

// Then in your component:
<Image
  src="https://images.unsplash.com/photo-123?w=800"
  alt="Mountain landscape"
  width={800}
  height={600}
/>`}
          />
        </div>

        {/* ── Important props ── */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Important Props Reference</h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Prop</th>
                  <th className="text-left px-4 py-3 font-semibold">Type</th>
                  <th className="text-left px-4 py-3 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  ["src", "string | StaticImport", "Image path or imported file — required"],
                  ["alt", "string", "Accessible description — required (never leave empty)"],
                  ["width + height", "number", "Intrinsic dimensions — required unless fill"],
                  ["fill", "boolean", "Stretch to fill parent (parent needs position:relative)"],
                  ["priority", "boolean", "Disable lazy load for above-the-fold images (LCP)"],
                  ["sizes", "string", "Hint for srcset — e.g. '(max-width: 768px) 100vw, 50vw'"],
                  ["quality", "number (1-100)", "Compression level — default 75"],
                  ["placeholder", "'blur' | 'empty'", "Show blurred preview while loading (blur needs blurDataURL)"],
                  ["loading", "'lazy' | 'eager'", "Lazy is default; use eager only for priority images"],
                ].map(([prop, type, desc]) => (
                  <tr key={prop} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">{prop}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{type}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── blur placeholder ── */}
        <div className="mt-6">
          <CodeExample
            title="Blur placeholder while loading"
            code={`import Image from "next/image";
import myPhoto from "./photo.jpg";  // Static import

// When you IMPORT a local image, blurDataURL is auto-generated
<Image
  src={myPhoto}                 // Static import — no width/height needed!
  alt="My photo"
  placeholder="blur"            // Show blurred version while loading
  // blurDataURL is automatically set for static imports
/>

// For REMOTE images, you must provide blurDataURL manually:
<Image
  src="https://..."
  alt="Remote photo"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."  // tiny base64 preview
/>`}
          />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          PART 2 — next/font
      ──────────────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">Part 2 — next/font</h2>

        <Card title="Why not just use Google Fonts <link>?" variant="warning">
          <p className="mb-3">
            A standard <code>&lt;link rel="stylesheet" href="https://fonts.googleapis.com/..."&gt;</code> causes:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm mb-3">
            <li>An extra network request to Google's servers at render time</li>
            <li>Layout shift (CLS) — text reflowing when the font loads</li>
            <li>Privacy concern — user IPs sent to Google on every page load</li>
          </ul>
          <p className="text-sm">
            <code>next/font</code> self-hosts the font files at build time — zero
            external request, zero layout shift, better privacy.
          </p>
        </Card>

        {/* ── Google Fonts ── */}
        <div className="mt-6">
          <CodeExample
            title="Google Fonts via next/font/google"
            code={`// app/layout.tsx (import once at the root)
import { Inter, Roboto_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],        // Only download the character sets you need
  variable: "--font-inter",  // Exposes a CSS variable you can use anywhere
  display: "swap",           // "swap" = show fallback until font loads (no invisible text)
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  weight: ["400", "700"],    // Only download specific weights
});

export default function RootLayout({ children }) {
  return (
    // Apply CSS variables to <body> so they're available everywhere
    <html lang="en">
      <body className={\`\${inter.variable} \${robotoMono.variable}\`}>
        {children}
      </body>
    </html>
  );
}

// Then in Tailwind, extend your config to use them:
// tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      sans: ["var(--font-inter)"],
      mono: ["var(--font-roboto-mono)"],
    },
  },
}`}
          />
        </div>

        {/* ── Local fonts ── */}
        <div className="mt-6">
          <CodeExample
            title="Local / custom fonts via next/font/local"
            code={`import localFont from "next/font/local";

// Point to your font file(s) in the project
const myBrandFont = localFont({
  src: [
    {
      path: "../../public/fonts/BrandFont-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/BrandFont-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-brand",
  display: "swap",
});

// Use it the same way as Google Fonts
<body className={myBrandFont.variable}>...</body>`}
          />
        </div>

        {/* ── Live demo ── */}
        <div className="mt-6">
          <Card title="✅ Live Demo — Geist loaded via next/font" variant="success">
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              The <code>geistDemo</code> font variable is loaded at the top of this
              page file using <code>next/font/google</code>. Inspect the{" "}
              <code>--font-geist-demo</code> CSS variable in DevTools.
            </p>
            <div
              style={{ fontFamily: "var(--font-geist-demo), sans-serif" }}
              className={`${geistDemo.variable} space-y-2`}
            >
              <p className="text-2xl font-bold">The quick brown fox jumps over the lazy dog</p>
              <p className="text-base font-normal">
                This paragraph is rendered in Geist, self-hosted by Next.js — no
                request to fonts.googleapis.com.
              </p>
              <p className="text-sm text-gray-500">
                font-family: var(--font-geist-demo)
              </p>
            </div>
          </Card>
        </div>

        {/* ── Font display values ── */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">
            <code>display</code> Values Explained
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Value</th>
                  <th className="text-left px-4 py-3 font-semibold">Behaviour</th>
                  <th className="text-left px-4 py-3 font-semibold">Use when</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  ["auto", "Browser default (usually block)", "Generally avoid"],
                  ["block", "Invisible text until font loads (up to 3 s)", "Never — causes invisible text"],
                  ["swap", "Show fallback, swap when ready", "Most cases ✅ (next/font default)"],
                  ["fallback", "Very brief block, then fallback — swap only if fast", "When brand consistency matters"],
                  ["optional", "Tiny block, use cached font or fallback forever", "Performance-critical pages"],
                ].map(([val, beh, when]) => (
                  <tr key={val} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="px-4 py-3 font-mono text-purple-600 dark:text-purple-400">{val}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{beh}</td>
                    <td className="px-4 py-3 text-gray-500">{when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          PART 3 — Best Practices
      ──────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">💡 Best Practices</h2>
        <div className="space-y-4">
          <Card title="1. Always add priority to your LCP image" variant="info">
            <p className="text-sm">
              The <strong>Largest Contentful Paint (LCP)</strong> image is usually your
              hero or banner. Add <code>priority</code> so it is preloaded — without it
              the browser discovers the image late and your LCP score suffers.
            </p>
          </Card>

          <Card title="2. Never skip the alt attribute">
            <p className="text-sm">
              <code>alt</code> is required both for accessibility (screen readers) and
              SEO. Use a short description of what the image shows. For purely decorative
              images, pass an empty string (<code>alt=""</code>) so screen readers skip it.
            </p>
          </Card>

          <Card title="3. Use sizes for responsive layouts" variant="info">
            <p className="text-sm mb-2">
              Without <code>sizes</code>, Next.js generates a srcset assuming the image
              could be up to 100 vw wide. Provide a hint to avoid downloading oversized files:
            </p>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block">
              {`sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`}
            </code>
          </Card>

          <Card title="4. Load fonts once, at the root layout">
            <p className="text-sm">
              Import fonts in <code>app/layout.tsx</code> — not in individual pages.
              Each call to a font constructor (e.g. <code>Inter({})</code>) adds a new
              stylesheet. Keeping it at the root ensures a single load.
            </p>
          </Card>

          <Card title="5. Limit font variants to what you use" variant="warning">
            <p className="text-sm">
              Every weight and style is a separate file download. Only request what you
              actually use: <code>{`weight: ["400", "700"]`}</code> instead of all weights.
              Same for <code>subsets</code> — if your app is English-only, skip{" "}
              <code>cyrillic</code>, <code>greek</code>, etc.
            </p>
          </Card>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          PART 4 — Quick Reference
      ──────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">📋 Quick Reference</h2>
        <CodeExample
          title="Cheat sheet — next/image & next/font"
          code={`// ═══════════════ next/image ═══════════════

import Image from "next/image";

// Fixed size (local file in /public)
<Image src="/logo.svg" alt="Logo" width={200} height={50} priority />

// Fill parent container
<div className="relative h-64 w-full">
  <Image src="/hero.jpg" alt="Hero" fill sizes="100vw" className="object-cover" />
</div>

// Remote image (hostname must be in next.config.ts remotePatterns)
<Image src="https://cdn.example.com/photo.jpg" alt="..." width={800} height={600} />

// Static import (auto blurDataURL, no explicit width/height)
import photo from "./photo.jpg";
<Image src={photo} alt="Photo" placeholder="blur" />


// ═══════════════ next/font/google ═══════════════

import { Inter, Roboto_Mono } from "next/font/google";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Roboto_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "700"] });

<body className={\`\${sans.variable} \${mono.variable}\`}>...</body>


// ═══════════════ next/font/local ═══════════════

import localFont from "next/font/local";

const brand = localFont({
  src: "./fonts/Brand-Regular.woff2",
  variable: "--font-brand",
  display: "swap",
});


// ═══════════════ next.config.ts (remote images) ═══════════════

images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
  ],
},`}
        />
      </section>
    </div>
  );
}
