# Dictionary Lookup - Next.js Frontend

Next.js 15 (App Router) application that consumes the Drupal Dictionary API to search and display word definitions.

**Tech Stack:** Next.js 15 with App Router, TypeScript, Tailwind CSS, React 19
**Note:** Using Next.js 15 to align with Charles River Laboratories' current tech stack.

## Prerequisites

- Node.js 18.x or 20.x
- npm
- Running Drupal backend from `../crl-dictionary-backend` (DDEV)

## Setup

```bash
# Install dependencies
npm install

# Create .env.local with your Drupal backend URL
echo "DRUPAL_BASE_URL=http://crl-dictionary-backend.ddev.site" > .env.local

# In .env.local set the Drupal base URL, e.g.
# DRUPAL_BASE_URL=http://crl-dictionary-backend.ddev.site
```

## Development

```bash
# Run dev server with Turbopack (Next.js 15 default)
npm run dev

# Open http://localhost:3000
```

## Build & Run for Production

```bash
npm run build
npm start
```

## Application Behavior

1. Enter a word in the search box on the home page.
2. If the word exists in Drupal, the app navigates to `/word/[word]` and shows its definitions.
3. If the word does **not** exist, an error message is shown inline on the form and **no navigation occurs**.
4. If the API call fails, an error message is also shown inline and **no navigation occurs**.

These behaviors are implemented using a client search form and server-side data fetching in the dynamic route using Next.js 15 App Router patterns.

## API Integration

The frontend calls the Drupal JSON:API endpoint:

```text
GET /jsonapi/node/dictionary_entry?filter[field_word]={word}
```

The response is mapped to strongly-typed TypeScript interfaces in `types/dictionary.ts`, and the fetch logic is centralized in `lib/drupal-api.ts`.

## Environment Variables

- `DRUPAL_BASE_URL` – Base URL for the Drupal backend (server-side only; **no** `NEXT_PUBLIC_` prefix). The value is read only in server components / route handlers so it is not exposed to the browser.

## Testing

This project uses **Jest** with **React Testing Library** to verify core search behavior.

### TypeScript vs Jest in tests

The test file `__tests__/search.test.tsx` uses Jest's global APIs (`jest.mock`, `jest.fn`, `describe`, `it`, `expect`) together with Next.js 15's Jest setup. At runtime this works correctly (tests pass), but TypeScript's understanding of the Jest namespace and globals can generate noisy editor warnings that don't reflect real failures. To keep the focus on behavior while avoiding type-only noise, this file is annotated with `// @ts-nocheck` at the top. This disables TypeScript checking for that test file only and is intentional for this technical exercise.

### Running tests

```bash
# Run all tests once
npm test

# Watch mode during development
npm run test:watch

# Coverage report
npm run test:coverage
```

### What is covered

The `SearchForm` component is tested in `__tests__/search.test.tsx` for:

- **Validation**: empty input shows an inline error and does **not** navigate.
- **Word not found**: API returns `null` → inline "not found" error, **no navigation**.
- **Word found**: successful result → navigates to `/word/[word]`.
- **API error**: thrown error → inline API error message, **no navigation**.

Jest is configured in `jest.config.mjs` (using `next/jest` for Next.js 15) and a global Jest DOM setup is defined in `jest.setup.ts`.
