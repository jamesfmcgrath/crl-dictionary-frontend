# Dictionary Lookup - Next.js Frontend

Next.js 15 (App Router) application that consumes the Drupal Dictionary API to search and display word definitions.

**Tech Stack:** Next.js 15 with App Router, TypeScript, Tailwind CSS, React 19  
**Note:** Using Next.js 15 to align with Charles River Laboratories' current tech stack.

## Prerequisites

- Node.js 18.x or 20.x
- npm or yarn
- Running Drupal backend

## Setup
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local and set:
# DRUPAL_BASE_URL=http://drupal-dictionary.ddev.site
```

## Development
```bash
# Run dev server with Turbopack (Next.js 15 default)
npm run dev

# Open http://localhost:3000
```

## Testing
```bash
# Run Jest tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

## Build for Production
```bash
npm run build
npm start
```

## Usage

1. Enter a word in the search box
2. If the word exists in Drupal, you'll be navigated to `/word/[word]`
3. If the word doesn't exist, an error message displays inline (no navigation)

## API Integration

Fetches data from Drupal JSON:API endpoint:
```
GET /jsonapi/node/dictionary_entry?filter[field_word]={word}
```

## Environment Variables

- `DRUPAL_BASE_URL` - Base URL for Drupal backend (server-side only, no NEXT_PUBLIC_ prefix)
