"use server";

import type { ContactFormState } from "./types";

export async function submitContact(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: ContactFormState["errors"] = {};

  if (name.length < 2) {
    errors.name = ["Name must be at least 2 characters."];
  }

  if (!email.includes("@") || email.length < 5) {
    errors.email = ["Enter a valid email address."];
  }

  if (message.length < 10) {
    errors.message = ["Message must be at least 10 characters."];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fix the highlighted fields and try again.",
      errors,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    message: `Thanks, ${name}. This demo form was processed by a Server Action.`,
    errors: {},
  };
}