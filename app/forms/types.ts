// Shared types for the forms route — imported by both actions.ts and ContactForm.tsx
// Keeping this in a plain .ts file (no "use server"/"use client") means it is
// safe to import from either server or client modules.

export type ContactFormState = {
  success: boolean;
  message: string;
  errors: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};
