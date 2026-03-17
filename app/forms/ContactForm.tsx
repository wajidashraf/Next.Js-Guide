"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact } from "./actions";
import type { ContactFormState } from "./types";

const initialContactFormState: ContactFormState = {
  success: false,
  message: "",
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-gray-200"
    >
      {pending ? "Submitting..." : "Send message"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialContactFormState);

  return (
    <form action={formAction} className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          placeholder="Jane Doe"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-black dark:border-gray-700 dark:bg-gray-950 dark:focus:border-white"
          aria-describedby={state.errors?.name ? "contact-name-error" : ""}
        />
        {state.errors?.name ? (
          <p id="contact-name-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
            {state.errors.name[0]}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="jane@example.com"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-black dark:border-gray-700 dark:bg-gray-950 dark:focus:border-white"
          aria-describedby={state.errors?.email ? "contact-email-error" : ""}
        />
        {state.errors?.email ? (
          <p id="contact-email-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
            {state.errors.email[0]}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Tell us what you want to build."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-black dark:border-gray-700 dark:bg-gray-950 dark:focus:border-white"
          aria-describedby={state.errors?.message ? "contact-message-error" : ""}
        />
        {state.errors?.message ? (
          <p id="contact-message-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
            {state.errors.message[0]}
          </p>
        ) : null}
      </div>

      {state.message ? (
        <p className={`text-sm ${state.success ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}