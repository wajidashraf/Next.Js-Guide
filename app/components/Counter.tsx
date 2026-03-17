/* ============================================================
   COUNTER COMPONENT (Client Component)
   ============================================================
   
   KEY CONCEPTS:
   - Demonstrates useState hook for managing state
   - Shows event handling with onClick
   - TypeScript Props interface for type safety
   - This MUST be a Client Component because it uses useState
   
   REMEMBER:
   - State only exists in the browser (client-side)
   - Each user sees their own independent state
   - State resets on page refresh (it's not persistent)
   ============================================================ */

"use client";

import { useState } from "react";

// --- TypeScript: Define props this component accepts ---
interface CounterProps {
  initialValue?: number;  // ? means optional (defaults handled below)
  step?: number;          // How much to increment/decrement
  label?: string;
}

export default function Counter({ 
  initialValue = 0,  // Default value if not provided
  step = 1, 
  label = "Counter" 
}: CounterProps) {
  // useState returns [currentValue, setterFunction]
  const [count, setCount] = useState<number>(initialValue);

  return (
    <div className="inline-flex flex-col items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-3xl font-bold">{count}</span>
      <div className="flex gap-2">
        <button
          onClick={() => setCount(count - step)}
          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
        >
          - {step}
        </button>
        <button
          onClick={() => setCount(initialValue)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(count + step)}
          className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
        >
          + {step}
        </button>
      </div>
    </div>
  );
}
