/* ============================================================
   FORMS PAGE
   ============================================================
   
   KEY CONCEPTS:
   - Next.js has TWO main ways to handle forms:
   
   1. SERVER ACTIONS (Recommended ✅)
      - Functions that run on the SERVER when a form is submitted
      - Defined with "use server" directive
      - Work WITHOUT JavaScript (progressive enhancement!)
      - Can be used in Server Components AND Client Components
      - Perfect for mutations: saving to DB, sending emails, etc.
   
   2. CLIENT-SIDE FORMS (When needed)
      - Use "use client" + useState for controlled inputs
      - Needed for: real-time validation, complex UI interactions,
        multi-step forms, or instant previews
   
   BEST PRACTICES:
   - Prefer Server Actions over API routes for form submissions
   - Always validate data on the server (never trust client input)
   - Use useActionState for form state + error handling
   - Use useFormStatus to show loading indicators
   - Use progressive enhancement — forms should work without JS
   ============================================================ */

import type { Metadata } from "next";
import Card from "../components/Card";
import CodeExample from "../components/CodeExample";
import ContactForm from "./ContactForm";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Forms & Server Actions",
  description: "Learn how to handle forms in Next.js with Server Actions and client-side techniques",
};

export default function FormsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">📝 Forms & Server Actions</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
        Next.js introduces <strong>Server Actions</strong> — a powerful way to handle
        form submissions that run on the server. No API routes needed!
      </p>

      {/* --------------------------------------------------------
         SECTION 1: What Are Server Actions?
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🚀 What Are Server Actions?</h2>
        <Card title="Server Actions = Server-Side Functions" variant="info">
          <p className="mb-3">
            Server Actions are <strong>async functions that execute on the server</strong>.
            You define them with the <code>&quot;use server&quot;</code> directive, and they can
            be called directly from your forms — no fetch() or API routes needed!
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>They run on the server even when called from Client Components</li>
            <li>They work without JavaScript enabled (progressive enhancement)</li>
            <li>They can access databases, file systems, and secrets directly</li>
            <li>Next.js automatically handles the HTTP request under the hood</li>
          </ul>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Basic Server Action Syntax"
            code={`// Option 1: Inline Server Action (inside a Server Component)
export default function MyPage() {
  async function handleSubmit(formData: FormData) {
    "use server";  // ← This makes it a Server Action
    
    const name = formData.get("name") as string;
    // Save to database, send email, etc.
    console.log("Received:", name);  // Logs on SERVER terminal
  }

  return (
    <form action={handleSubmit}>
      <input name="name" required />
      <button type="submit">Submit</button>
    </form>
  );
}

// Option 2: Separate file (recommended for reuse)
// app/actions.ts
"use server";

export async function submitForm(formData: FormData) {
  const email = formData.get("email") as string;
  // Validate and save...
}`}
          />
        </div>
      </section>

      {/* --------------------------------------------------------
         SECTION 2: Server Action With Validation
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">✅ Form Validation</h2>
        <Card title="Always Validate on the Server!" variant="warning">
          <p className="mb-3">
            Client-side validation is nice for UX, but <strong>never trust it for security</strong>.
            Always validate data inside your Server Action because:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Users can disable JavaScript and bypass client validation</li>
            <li>Malicious users can send requests directly to your endpoint</li>
            <li>Server Actions should return structured error objects, not throw</li>
          </ul>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Server Action with Validation Pattern"
            code={`"use server";

// TypeScript: Define the return type for form state
type FormState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
  };
};

export async function submitContact(
  previousState: FormState,  // Previous form state
  formData: FormData          // The submitted form data
): Promise<FormState> {
  // 1. Extract fields
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  // 2. Validate on the server
  const errors: FormState["errors"] = {};

  if (!name || name.trim().length < 2) {
    errors.name = ["Name must be at least 2 characters"];
  }
  if (!email || !email.includes("@")) {
    errors.email = ["Please enter a valid email"];
  }

  // 3. Return errors if validation failed
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors,
    };
  }

  // 4. Process the valid data (save to DB, etc.)
  // await db.contacts.create({ name, email });

  return { success: true, message: "Form submitted!" };
}`}
          />
        </div>
      </section>

      {/* --------------------------------------------------------
         SECTION 3: useActionState Hook
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🔄 useActionState Hook</h2>
        <Card title="Managing Form State with useActionState" variant="info">
          <p className="mb-3">
            <code>useActionState</code> (from React) connects a Server Action to form state.
            It gives you: the current state, a wrapped action, and a pending flag.
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Automatically tracks loading/pending state</li>
            <li>Passes previous state to your Server Action</li>
            <li>Returns updated state after the action completes</li>
            <li>Works with progressive enhancement (forms work without JS)</li>
          </ul>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="useActionState Usage"
            code={`"use client";
import { useActionState } from "react";
import { submitContact } from "./actions";

// Initial state that matches your FormState type
const initialState = {
  success: false,
  message: "",
  errors: {},
};

export default function ContactForm() {
  // useActionState returns:
  // - state: current form state (errors, success message, etc.)
  // - formAction: wrapped action to pass to <form action={...}>
  // - isPending: true while the action is running
  const [state, formAction, isPending] = useActionState(
    submitContact,  // Your Server Action
    initialState    // Initial state
  );

  return (
    <form action={formAction}>
      <input name="name" required />
      {/* Show server-side validation errors */}
      {state.errors?.name && (
        <p className="text-red-500">{state.errors.name[0]}</p>
      )}

      <input name="email" type="email" required />
      {state.errors?.email && (
        <p className="text-red-500">{state.errors.email[0]}</p>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </button>

      {/* Show success message */}
      {state.success && (
        <p className="text-green-500">{state.message}</p>
      )}
    </form>
  );
}`}
          />
        </div>
      </section>

      {/* --------------------------------------------------------
         SECTION 4: useFormStatus Hook
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">⏳ useFormStatus Hook</h2>
        <Card title="Loading States with useFormStatus">
          <p className="mb-3">
            <code>useFormStatus</code> (from <code>react-dom</code>) gives you the pending 
            state of the parent form. Use it in a <strong>child component</strong> of the form.
          </p>
        </Card>

        <div className="mt-4">
          <CodeExample
            title="Submit Button with Loading State"
            code={`"use client";
import { useFormStatus } from "react-dom";

// This component MUST be a child of a <form>
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={pending ? "opacity-50 cursor-wait" : ""}
    >
      {pending ? (
        <>
          <span className="animate-spin">⏳</span> Submitting...
        </>
      ) : (
        "Submit Form"
      )}
    </button>
  );
}

// Use it inside a form:
function MyForm() {
  return (
    <form action={myServerAction}>
      <input name="email" />
      <SubmitButton />  {/* ← Gets pending state automatically */}
    </form>
  );
}`}
          />
        </div>
      </section>

      {/* --------------------------------------------------------
         SECTION 5: Live Demo — Server Action Form
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🎯 Live Demo: Contact Form (Server Action)</h2>
        <Card title="Try it! This form uses a real Server Action" variant="success">
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            This form uses <code>useActionState</code> + a Server Action with validation.
            Try submitting empty fields or invalid data to see server-side validation.
          </p>
          <ContactForm />
        </Card>

        <div className="mt-4">
          <CodeExample
            title="How This Demo Works (3 files)"
            code={`// 1. actions.ts — Server Action with validation
"use server";
export async function submitContact(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  // Validate → return errors or success
}

// 2. ContactForm.tsx — Client Component with useActionState
"use client";
import { useActionState } from "react";
import { submitContact } from "./actions";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact, initialState
  );
  return <form action={formAction}>...</form>;
}

// 3. page.tsx — Server Component that renders the form
import ContactForm from "./ContactForm";
export default function FormsPage() {
  return <ContactForm />;  // Server page renders client form
}`}
          />
        </div>
      </section>

      {/* --------------------------------------------------------
         SECTION 6: Live Demo — Client-Side Form
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🖥️ Live Demo: Signup Form (Client-Side)</h2>
        <Card title="Client-Side Form with useState" variant="info">
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Sometimes you need client-side forms for real-time validation, conditional fields, 
            or complex UI. This form uses <code>useState</code> for instant feedback.
          </p>
          <SignupForm />
        </Card>
      </section>

      {/* --------------------------------------------------------
         SECTION 7: When to Use What
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🤔 Server Actions vs Client-Side Forms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="✅ Use Server Actions When">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Submitting data to a database</li>
              <li>Sending emails or notifications</li>
              <li>Simple forms (contact, login, signup)</li>
              <li>You want forms that work without JS</li>
              <li>Data mutations (create, update, delete)</li>
            </ul>
          </Card>
          <Card title="🖥️ Use Client-Side When">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Real-time validation as user types</li>
              <li>Complex multi-step form wizards</li>
              <li>Dynamic fields (add/remove inputs)</li>
              <li>Instant previews (e.g., markdown editor)</li>
              <li>Heavy client-side calculations</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* --------------------------------------------------------
         SECTION 8: Best Practices
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">💡 Form Best Practices</h2>
        <div className="space-y-4">
          <Card title="1. Always validate on the server" variant="warning">
            <p className="text-sm">
              Client validation is for UX. Server validation is for security.
              Never skip server-side validation — users can bypass any client code.
            </p>
          </Card>
          <Card title="2. Use proper HTML input types">
            <p className="text-sm">
              Use <code>type=&quot;email&quot;</code>, <code>type=&quot;tel&quot;</code>,{" "}
              <code>type=&quot;url&quot;</code>, etc. This gives mobile users the right keyboard
              and provides free built-in browser validation.
            </p>
          </Card>
          <Card title="3. Show loading states">
            <p className="text-sm">
              Disable the submit button and show a spinner while submitting.
              Use <code>useFormStatus</code> or the <code>isPending</code> from{" "}
              <code>useActionState</code>.
            </p>
          </Card>
          <Card title="4. Handle errors gracefully">
            <p className="text-sm">
              Return structured errors from Server Actions. Display field-level errors
              next to inputs, and general errors at the top of the form.
            </p>
          </Card>
          <Card title="5. Use labels and accessibility">
            <p className="text-sm">
              Every input needs a <code>&lt;label&gt;</code> with <code>htmlFor</code>.
              Add <code>aria-describedby</code> to link inputs to error messages.
              Use <code>required</code> attribute for mandatory fields.
            </p>
          </Card>
        </div>
      </section>

      {/* --------------------------------------------------------
         SECTION 9: Quick Reference
      -------------------------------------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">📋 Quick Reference</h2>
        <CodeExample
          title="Form Patterns Cheat Sheet"
          code={`// ═══════════ SERVER ACTION (Recommended) ═══════════
// actions.ts
"use server";
export async function myAction(prevState, formData: FormData) {
  const value = formData.get("field") as string;
  // validate, save to DB, return state
  return { success: true, message: "Saved!" };
}

// ═══════════ useActionState (Best for forms) ═══════════
"use client";
import { useActionState } from "react";
const [state, action, isPending] = useActionState(myAction, initialState);
<form action={action}>...</form>

// ═══════════ useFormStatus (Loading in child components) ═══════════
"use client";
import { useFormStatus } from "react-dom";
function SubmitBtn() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Submit</button>;
}

// ═══════════ Client-Side Only (When needed) ═══════════
"use client";
const [form, setForm] = useState({ name: "", email: "" });
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  await fetch("/api/submit", { method: "POST", body: JSON.stringify(form) });
};`}
        />
      </section>
    </div>
  );
}
