# AI Development Rules for Ethereal

This document outlines the technical stack and development guidelines for the Ethereal web application. Adhering to these rules ensures consistency and maintainability of the codebase.

## Tech Stack

The application is built with the following technologies:

*   **Framework:** Svelte 5 (using Runes for reactivity).
*   **Language:** TypeScript.
*   **Build Tool:** Vite.
*   **Styling:** Tailwind CSS for utility-first styling, with DaisyUI for pre-built UI components.
*   **Icons:** Lucide Svelte (`@lucide/svelte`) for all vector icons.
*   **Proxy Engine:** Utilizes the Scramjet proxy engine along with Bare Mux for handling web traffic.
*   **State Management:** Svelte 5 Runes (`$state`, `$derived`, `$effect`) are used for all state management.

## Development Guidelines

### Styling and UI Components

*   **Styling:** Always use Tailwind CSS utility classes for styling.
*   **Components:** For common UI elements like buttons, inputs, modals, and dropdowns, use components from the DaisyUI library. This ensures a consistent look and feel.
*   **Responsiveness:** All UI components and layouts must be fully responsive and work on both desktop and mobile devices.

### Icons

*   **Icon Library:** Only use icons from the `@lucide/svelte` package. This keeps the icon style consistent throughout the application.

### State Management

*   **Reactivity:** Use Svelte 5 Runes (`$state`, `$effect`, `$derived`) for managing all reactive state within components. Avoid introducing external state management libraries.

### Routing

*   **Single Page Application (SPA):** The application operates as a single page. There is no formal routing library.
*   **View Management:** UI views are conditionally rendered within `src/App.svelte` based on the state of `proxyManager.isProxyOpen`.

### Code Structure

*   **Components:** Svelte components are located in the `src/` directory.
*   **Configuration:** Application-specific configurations (like proxy URLs and themes) are in `src/ethereal.ts`.
*   **Core Logic:** The main application logic is in `src/App.svelte`, with proxy management handled in `src/proxy.svelte.ts`.