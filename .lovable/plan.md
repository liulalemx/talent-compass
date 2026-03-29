

## Plan: Add Light/Dark Mode Toggle

### Overview
Add a theme toggle button to the header bar. The project already has `next-themes` installed and dark mode CSS variables defined in `index.css`. Just need to wire up the `ThemeProvider` and add a toggle.

### Steps

1. **`src/App.tsx`** — Wrap the app with `ThemeProvider` from `next-themes`
   - Add `<ThemeProvider attribute="class" defaultTheme="system" enableSystem>` around the existing tree

2. **`src/components/ThemeToggle.tsx`** — Create a new component
   - Sun/Moon icon button using `useTheme()` from `next-themes`
   - Cycles between light and dark modes on click

3. **`src/components/AppLayout.tsx`** — Add the `ThemeToggle` to the header
   - Place it in the right side of the header bar (replacing the empty `<div />`)

### Technical Notes
- Dark mode variables already exist in `index.css` under `.dark`
- Tailwind is configured with `darkMode: ["class"]` — compatible with next-themes
- The Sonner toaster already uses `useTheme` so it will automatically adapt

