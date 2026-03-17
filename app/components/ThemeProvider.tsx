/* ============================================================
   THEME PROVIDER (Client Component)
   ============================================================

   KEY CONCEPTS:
   - next-themes manages dark/light mode for Next.js apps
   - It stores the user's preference in localStorage
   - It adds/removes the "dark" class on <html> automatically
   - ThemeProvider must be a Client Component ("use client")
   - We wrap it here so layout.tsx stays a Server Component
   
   WHY WRAP IT?
   - layout.tsx is a Server Component (no "use client")
   - next-themes' ThemeProvider needs "use client"
   - Solution: create this thin wrapper client component and
     import it in layout.tsx — the rest of layout stays server-side

   PROPS EXPLAINED:
   - attribute="class"  → adds class="dark" to <html> (not data-theme)
   - defaultTheme="system" → follows OS preference on first visit
   - enableSystem={true}  → allows "system" as a valid theme option
   - disableTransitionOnChange → prevents flash of wrong colors during
     theme switch by temporarily disabling CSS transitions
   ============================================================ */

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"          // Adds class="dark" to <html>
      defaultTheme="system"      // First visit follows OS preference
      enableSystem               // Allows "system" option in toggle
      disableTransitionOnChange  // No flash when switching themes
    >
      {children}
    </NextThemesProvider>
  );
}
