"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "server-vs-client", label: "Server vs Client", icon: "⚡" },
  { id: "typescript",        label: "TypeScript",       icon: "🔷" },
  { id: "performance",       label: "Performance",      icon: "🚀" },
  { id: "data-fetching",     label: "Data Fetching",    icon: "📡" },
  { id: "security",          label: "Security",         icon: "🔐" },
  { id: "seo",               label: "SEO & Metadata",   icon: "🔍" },
  { id: "error-handling",    label: "Error Handling",   icon: "⚠️" },
  { id: "accessibility",     label: "Accessibility",    icon: "♿" },
  { id: "project-org",       label: "Project Structure",icon: "📁" },
  { id: "checklist",             label: "Pre-Launch",         icon: "✅" },
  { id: "measuring-performance",  label: "Measuring Perf",      icon: "📊" },
];

export default function BestPracticesSidebar() {
  const [activeId, setActiveId] = useState<string>(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting entry
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Section is "active" when its top edge is in the upper third of the viewport
        rootMargin: "-10% 0% -60% 0%",
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden lg:block w-52 shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 px-2">
        On this page
      </p>
      <nav>
        <ul className="space-y-0.5">
          {sections.map(({ id, label }, index) => {
            const isActive = activeId === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {/* Step number circle */}
                  <span
                    className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="leading-snug">{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Divider + back-to-top */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <a
          href="#"
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <span>↑</span> Back to top
        </a>
      </div>
    </aside>
  );
}
