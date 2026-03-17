/* ============================================================
   TYPESCRIPT GUIDE PAGE
   ============================================================
   
   TypeScript adds types to JavaScript, catching errors before
   your code even runs. Essential for large projects.
   
   KEY CONCEPTS:
   - Types = what shape your data has
   - Interfaces = contracts for objects
   - Generics = reusable types with placeholders
   - Type safety = errors caught at compile time, not runtime
   ============================================================ */

import type { Metadata } from "next";
import Card from "../components/Card";
import CodeExample from "../components/CodeExample";

export const metadata: Metadata = {
  title: "TypeScript in Next.js",
};

export default function TypeScriptGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">🔷 TypeScript in Next.js</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        TypeScript makes your code safer by catching errors before they happen.
      </p>

      {/* ============ SECTION 1: Why TypeScript? ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Why TypeScript?</h2>
        <Card title="TypeScript = JavaScript + Types" variant="info">
          <p className="mb-3">Think of TypeScript as spell-check for your code:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Catches bugs before you run your code</li>
            <li>Better autocomplete in your editor (VS Code)</li>
            <li>Self-documenting code (types describe the data)</li>
            <li>Easier refactoring (rename something, TS finds all usages)</li>
          </ul>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="JavaScript vs TypeScript"
            code={`// ❌ JavaScript — this bug is only found at RUNTIME
function greet(name) {
  return "Hello, " + name.toUpperCase();
}
greet(42); // CRASH! 42.toUpperCase is not a function

// ✅ TypeScript — this bug is caught IMMEDIATELY in your editor
function greet(name: string): string {  // name MUST be a string
  return "Hello, " + name.toUpperCase();
}
greet(42); // ❌ Error: Argument of type 'number' is 
           //    not assignable to parameter of type 'string'`}
          />
        </div>
      </section>

      {/* ============ SECTION 2: Basic Types ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Basic Types</h2>
        <CodeExample
          title="TypeScript Basic Types"
          code={`// --- Primitive Types ---
let name: string = "Alice";       // Text
let age: number = 25;             // Number (int or float)
let isActive: boolean = true;     // True or false
let data: null = null;            // Null
let nothing: undefined = undefined; // Undefined

// --- Arrays ---
let numbers: number[] = [1, 2, 3];
let names: string[] = ["Alice", "Bob"];
let mixed: (string | number)[] = ["hello", 42]; // Union type array

// --- Objects ---
let user: { name: string; age: number } = {
  name: "Alice",
  age: 25,
};

// --- Special Types ---
let anything: any = "I can be anything"; // AVOID! Defeats the purpose
let unknown: unknown = "Safer than any"; // Must check type first
let id: string | number = "abc";         // Union: string OR number

// --- Type Assertion ---
const input = document.getElementById("myInput") as HTMLInputElement;
// Tells TypeScript: "I know this is an input element"`}
        />
      </section>

      {/* ============ SECTION 3: Interfaces ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. Interfaces & Types</h2>
        <Card title="Interfaces define the shape of objects">
          <p>Use interfaces to describe what properties an object must have. Think of them as blueprints or contracts.</p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Interfaces in Action"
            code={`// --- Define an interface (blueprint) ---
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;        // ? means OPTIONAL
  role: "admin" | "user" | "moderator";  // Union literal type
}

// --- Using the interface ---
const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  // age is optional, so we can skip it
  role: "admin",
};

// --- Interface for component props ---
interface ButtonProps {
  label: string;
  onClick: () => void;           // Function that returns nothing
  variant?: "primary" | "secondary"; // Optional with union type
  disabled?: boolean;
}

function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// --- Extending interfaces (inheritance) ---
interface Admin extends User {
  permissions: string[];  // Admin has everything User has, plus this
}

// --- Type alias (alternative to interface) ---
type Status = "loading" | "success" | "error";
type ID = string | number;`}
          />
        </div>
      </section>

      {/* ============ SECTION 4: TypeScript in Next.js ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">4. TypeScript in Next.js Specifically</h2>
        <CodeExample
          title="Common Next.js TypeScript Patterns"
          code={`// --- Page Component with Metadata ---
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Page",
  description: "Page description",
};

export default function Page() {
  return <h1>Hello</h1>;
}

// --- Dynamic Route Page Props ---
interface PageProps {
  params: Promise<{ id: string }>;       // URL parameters
  searchParams: Promise<{ q?: string }>; // Query string (?q=hello)
}

export default async function ProductPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { q } = await searchParams;
  return <h1>Product {id}, Search: {q}</h1>;
}

// --- Layout Props ---
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}

// --- Server Action ---
async function submitForm(formData: FormData): Promise<void> {
  "use server";
  const name = formData.get("name") as string;
  // Process the form...
}

// --- API Route Handler ---
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello" });
}`}
        />
      </section>

      {/* ============ SECTION 5: Generics ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">5. Generics (Reusable Types)</h2>
        <Card title="Generics = Type placeholders" variant="info">
          <p>
            Generics let you write functions and components that work with ANY type 
            while still being type-safe. Think of them as &quot;type variables.&quot;
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Generics Examples"
            code={`// --- Generic Function ---
// T is a placeholder — it becomes whatever type you pass in
function getFirst<T>(items: T[]): T {
  return items[0];
}

const firstNumber = getFirst<number>([1, 2, 3]);    // Returns number
const firstString = getFirst<string>(["a", "b"]);   // Returns string
// TypeScript knows the exact return type!

// --- Generic Interface ---
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Use with different data types:
type UserResponse = ApiResponse<User>;
// { data: User, status: number, message: string }

type PostsResponse = ApiResponse<Post[]>;
// { data: Post[], status: number, message: string }

// --- Generic React Component ---
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}

// Usage:
<List<User>
  items={users}
  renderItem={(user) => <li key={user.id}>{user.name}</li>}
/>`}
          />
        </div>
      </section>

      {/* ============ SECTION 6: Utility Types ============ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">6. Useful Utility Types</h2>
        <CodeExample
          title="Built-in TypeScript Utility Types"
          code={`interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

// Partial<T> — Make all properties optional
type EditUser = Partial<User>;
// { id?: number, name?: string, email?: string, avatar?: string }

// Pick<T, K> — Select specific properties
type UserPreview = Pick<User, "id" | "name">;
// { id: number, name: string }

// Omit<T, K> — Remove specific properties
type CreateUser = Omit<User, "id">;
// { name: string, email: string, avatar: string }

// Record<K, T> — Object with specific key and value types
type UserRoles = Record<string, "admin" | "user">;
// { [key: string]: "admin" | "user" }

// Readonly<T> — Make all properties read-only
type ReadonlyUser = Readonly<User>;
const user: ReadonlyUser = { id: 1, name: "Alice", ... };
// user.name = "Bob";  ❌ Error! Cannot reassign`}
        />
      </section>

      {/* Summary */}
      <section className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4">📋 TypeScript Cheat Sheet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Must Know:</h3>
            <ul className="space-y-1">
              <li>• <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">string, number, boolean</code> — primitives</li>
              <li>• <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">interface</code> — define object shapes</li>
              <li>• <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">type A | B</code> — union types</li>
              <li>• <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">prop?: type</code> — optional property</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Best Practices:</h3>
            <ul className="space-y-1">
              <li>• Avoid <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">any</code> — use <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">unknown</code> if needed</li>
              <li>• Always type component props</li>
              <li>• Use <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">import type</code> for type-only imports</li>
              <li>• Enable <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">strict: true</code> in tsconfig</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
