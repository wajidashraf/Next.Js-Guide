/* ============================================================
   CARD COMPONENT (Server Component)
   ============================================================
   
   KEY CONCEPTS:
   - No "use client" → this is a SERVER Component by default
   - Server Components are rendered on the server
   - They can't use hooks, state, or browser APIs
   - But they're faster and produce smaller JavaScript bundles
   
   TYPESCRIPT:
   - ReactNode type covers: strings, numbers, JSX, arrays, null
   - Using interface to define the component's props
   
   TAILWIND:
   - Demonstrates common Tailwind patterns: padding, rounded 
     corners, shadows, hover effects, dark mode, responsive design
   ============================================================ */

// No "use client" → Server Component (DEFAULT in Next.js)

// --- TypeScript: Props interface ---
interface CardProps {
  title: string;
  children: React.ReactNode;  // Any renderable content
  variant?: "default" | "info" | "warning" | "success"; // Union type
}

// --- Variant styles using a TypeScript Record type ---
const variantStyles: Record<string, string> = {
  default: "border-gray-200 dark:border-gray-700",
  info: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950",
  warning: "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950",
  success: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950",
};

export default function Card({ title, children, variant = "default" }: CardProps) {
  return (
    <div className={`rounded-xl border p-6 ${variantStyles[variant]}`}>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
