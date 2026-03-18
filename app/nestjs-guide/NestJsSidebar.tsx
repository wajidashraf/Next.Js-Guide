"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "what-is-nestjs",    label: "What is NestJS" },
  { id: "mvc-pattern",       label: "MVC Pattern" },
  { id: "controllers",       label: "Controllers" },
  { id: "services",          label: "Services" },
  { id: "modules",           label: "Modules" },
  { id: "middleware",         label: "Middleware" },
  { id: "pipes-guards",      label: "Pipes & Guards" },
  { id: "database",          label: "Database Setup" },
  { id: "db-optimisation",   label: "DB Optimisation" },
  { id: "debugging",         label: "Debugging Issues" },
  { id: "performance",       label: "Performance" },
  { id: "tools-checklist",   label: "Tools & Checklist" },
];

export default function NestJsSidebar() {
  const [activeId, setActiveId] = useState<string>(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-10% 0% -60% 0%", threshold: 0 }
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
                      ? "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-semibold shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-red-600 text-white"
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
