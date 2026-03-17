/* ============================================================
   BASICS PAGE — JSX & React Fundamentals
   ============================================================
   
   This page teaches the absolute basics you need to know:
   - What is JSX?
   - Components (functions that return JSX)
   - Props (passing data to components)
   - Conditional rendering
   - Lists and .map()
   ============================================================ */

import type { Metadata } from "next";
import Card from "../components/Card";
import CodeExample from "../components/CodeExample";
import Counter from "../components/Counter";

export const metadata: Metadata = {
  title: "JSX & React Basics",
};

export default function BasicsPage() {
  // --- Variables can be used directly in JSX ---
  const greeting = "Hello, Next.js!";
  const currentYear = new Date().getFullYear();
  const isLoggedIn = true;

  // --- Arrays can be rendered using .map() ---
  const fruits: string[] = ["Apple", "Banana", "Cherry", "Date"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">📝 JSX & React Basics</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The fundamental building blocks you need before learning Next.js features.
      </p>

      {/* ============ SECTION 1: What is JSX? ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. What is JSX?</h2>
        <Card title="JSX = JavaScript + HTML" variant="info">
          <p className="mb-3">
            JSX lets you write HTML-like code inside JavaScript. It looks like HTML, 
            but it&apos;s actually JavaScript that gets converted to real HTML.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">className</code> instead of <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">class</code> (because class is a reserved word in JS)</li>
            <li>Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">htmlFor</code> instead of <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">for</code></li>
            <li>All tags must be closed: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">{"<img />"}</code> not <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">{"<img>"}</code></li>
            <li>Use curly braces <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">{"{}"}</code> to embed JavaScript expressions</li>
          </ul>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="JSX Basics"
            code={`// Using variables in JSX with curly braces {}
const name = "World";
return <h1>Hello, {name}!</h1>;

// Expressions work too
return <p>2 + 2 = {2 + 2}</p>;

// Calling functions
return <p>Today is {new Date().toLocaleDateString()}</p>;`}
          />
        </div>

        {/* Live example */}
        <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">▶ Live: Variables in JSX</p>
          <p className="font-semibold">{greeting}</p>
          <p>Current year: {currentYear}</p>
          <p>2 + 2 = {2 + 2}</p>
        </div>
      </section>

      {/* ============ SECTION 2: Components ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Components</h2>
        <Card title="Components = Reusable Building Blocks">
          <p className="mb-3">
            A component is just a <strong>function that returns JSX</strong>. Think of them 
            like custom HTML tags you create yourself.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Component names must start with an UPPERCASE letter</li>
            <li>Each component should be in its own file</li>
            <li>Export the component so other files can use it</li>
            <li>Components can use other components (composition)</li>
          </ul>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Creating a Component"
            code={`// File: app/components/Greeting.tsx

// A simple component (function that returns JSX)
export default function Greeting() {
  return <h1>Hello, World!</h1>;
}

// Using it in another file:
import Greeting from "./components/Greeting";

export default function Page() {
  return (
    <div>
      <Greeting />  {/* Use it like an HTML tag */}
      <Greeting />  {/* Reuse it multiple times! */}
    </div>
  );
}`}
          />
        </div>
      </section>

      {/* ============ SECTION 3: Props ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. Props (Passing Data)</h2>
        <Card title="Props = Properties passed to components" variant="info">
          <p className="mb-3">
            Props let you pass data from a parent component to a child component. 
            Think of them like <strong>function arguments</strong> for your components.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Component with Props (TypeScript)"
            code={`// Define what props this component accepts
interface GreetingProps {
  name: string;       // Required prop
  age?: number;       // Optional prop (? means optional)
}

// Destructure props in the function parameter
export default function Greeting({ name, age }: GreetingProps) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old</p>}
    </div>
  );
}

// Usage:
<Greeting name="Alice" age={25} />
<Greeting name="Bob" />  {/* age is optional */}`}
          />
        </div>
      </section>

      {/* ============ SECTION 4: Conditional Rendering ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">4. Conditional Rendering</h2>
        <Card title="Show different content based on conditions">
          <p>Three common patterns for conditional rendering in JSX:</p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Conditional Rendering Patterns"
            code={`// Pattern 1: Ternary operator (if/else)
{isLoggedIn ? <p>Welcome back!</p> : <p>Please log in</p>}

// Pattern 2: Logical AND (if only, no else)
{isLoggedIn && <p>Welcome back!</p>}

// Pattern 3: Early return in component
function Dashboard({ user }: { user: User | null }) {
  if (!user) return <p>Please log in</p>;
  return <p>Welcome, {user.name}</p>;
}`}
          />
        </div>

        {/* Live example */}
        <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">▶ Live: Conditional Rendering</p>
          {isLoggedIn ? (
            <p className="text-green-700 dark:text-green-300 font-medium">✅ User is logged in — Welcome back!</p>
          ) : (
            <p className="text-red-700">❌ User is not logged in</p>
          )}
        </div>
      </section>

      {/* ============ SECTION 5: Lists ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">5. Rendering Lists</h2>
        <Card title="Use .map() to render arrays">
          <p>
            To render a list of items, use JavaScript&apos;s <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.map()</code> method.
            Always provide a unique <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">key</code> prop for each item.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Rendering a List"
            code={`const fruits = ["Apple", "Banana", "Cherry"];

return (
  <ul>
    {fruits.map((fruit) => (
      <li key={fruit}>{fruit}</li>  // key must be unique!
    ))}
  </ul>
);`}
          />
        </div>

        {/* Live example */}
        <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">▶ Live: Rendered List</p>
          <div className="flex flex-wrap gap-2">
            {fruits.map((fruit) => (
              <span
                key={fruit}
                className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm border"
              >
                {fruit}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 6: State (Interactive) ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">6. State (Interactive Components)</h2>
        <Card title="useState makes components interactive" variant="warning">
          <p className="mb-3">
            State = data that can CHANGE over time. When state changes, the component 
            re-renders to show the new value.
          </p>
          <p>
            <strong>Important:</strong> useState requires <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">&quot;use client&quot;</code> directive 
            because state only exists in the browser.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="useState Hook"
            code={`"use client";  // REQUIRED for hooks!
import { useState } from "react";

export default function Counter() {
  // [value, setterFunction] = useState(initialValue)
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
          />
        </div>

        {/* Live example: Counter component */}
        <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">▶ Live: Counter Component (try clicking!)</p>
          <div className="flex flex-wrap gap-4">
            <Counter label="Default" />
            <Counter initialValue={10} step={5} label="Custom (step: 5)" />
          </div>
        </div>
      </section>

      {/* ============ CHEAT SHEET ============ */}
      <section className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4">📋 Quick Reference Cheat Sheet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">JSX Rules:</h3>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Use <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">className</code> not class</li>
              <li>• Close all tags: {"<br />"}</li>
              <li>• One root element per return</li>
              <li>• {"{}"} for JS expressions</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Component Rules:</h3>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• PascalCase names (MyComponent)</li>
              <li>• Must return JSX</li>
              <li>• Props are read-only</li>
              <li>• State needs &quot;use client&quot;</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
