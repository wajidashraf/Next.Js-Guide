"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type SignupValues = {
  fullName: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
};

type SignupErrors = Partial<Record<keyof SignupValues, string>>;

const initialValues: SignupValues = {
  fullName: "",
  email: "",
  password: "",
  agreeToTerms: false,
};

function validate(values: SignupValues): SignupErrors {
  const errors: SignupErrors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }

  if (!values.email.includes("@")) {
    errors.email = "Enter a valid email address.";
  }

  if (values.password.length < 8) {
    errors.password = "Password should be at least 8 characters.";
  }

  if (!values.agreeToTerms) {
    errors.agreeToTerms = "You must accept the terms to continue.";
  }

  return errors;
}

export default function SignupForm() {
  const [values, setValues] = useState<SignupValues>(initialValues);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const { name, type, checked, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    setValues(initialValues);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      <div>
        <label htmlFor="signup-fullName" className="mb-2 block text-sm font-medium">
          Full name
        </label>
        <input
          id="signup-fullName"
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-black dark:border-gray-700 dark:bg-gray-950 dark:focus:border-white"
        />
        {errors.fullName ? <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.fullName}</p> : null}
      </div>

      <div>
        <label htmlFor="signup-email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          id="signup-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-black dark:border-gray-700 dark:bg-gray-950 dark:focus:border-white"
        />
        {errors.email ? <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p> : null}
      </div>

      <div>
        <label htmlFor="signup-password" className="mb-2 block text-sm font-medium">
          Password
        </label>
        <input
          id="signup-password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-black dark:border-gray-700 dark:bg-gray-950 dark:focus:border-white"
        />
        {errors.password ? <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password}</p> : null}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input
            name="agreeToTerms"
            type="checkbox"
            checked={values.agreeToTerms}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-gray-300"
          />
          <span>I agree to the terms and understand this is a client-side demo form.</span>
        </label>
        {errors.agreeToTerms ? <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.agreeToTerms}</p> : null}
      </div>

      {submitted ? (
        <p className="text-sm text-green-600 dark:text-green-400">
          Signup form passed client-side validation successfully.
        </p>
      ) : null}

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        Validate on client
      </button>
    </form>
  );
}