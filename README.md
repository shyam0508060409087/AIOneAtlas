# OneAtlas

OneAtlas is an internship project, frontend product experience for an AI-native app builder. It presents a polished public homepage, product page, dashboard, template library, workspace preview, and roadmap flow using a production-ready Next.js frontend stack.

## Live Deployment

Deployed on Vercel:

```text
https://ai-one-atlas.vercel.app/
```

## Tech Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Zustand
- shadcn/ui-compatible component setup
- Framer Motion
- ESLint

## Features

- Public landing page for the OneAtlas product experience
- Product page explaining the platform surface and builder flow
- Dashboard view with app status, prompt input, and template previews
- Template library with category filtering, search, preview, compare, and save interactions
- Workspace interface with generated app preview and AI assistant rail
- Product roadmap page with phase and status tracking
- Responsive, dark, modular UI with glassmorphism and soft interaction states
- Required brand color palette applied through Tailwind and global CSS tokens

## Design System

The UI follows the provided brand palette:

```text
Primary:
#635BFF
#7A73FF
#0A2540
#1A1F36

Accent:
#FF5996
#FFB17A
#00D4B1
#00D4FF
#F8BC42
```

Typography uses Inter as the primary font with system fallbacks.

## Project Structure

```text
app/                  App Router pages
components/           Reusable UI, layout, AI, template, and workspace components
components/ui/        UI primitives and shadcn/ui-compatible components
hooks/                Custom React hooks
lib/                  Static data, utilities, and Zustand store
styles/               Global Tailwind CSS styles
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Verification

Run these checks before deployment:

```bash
npm run lint
npm run type-check
npm run build
```

## Production

Build the project:

```bash
npm run build
```

Run the production server locally:

```bash
npm run start
```

## Vercel Deployment

Recommended Vercel settings:

```text
Framework Preset: Next.js
Build Command: npm run build
Install Command: npm install
Output Directory: .next
```

No environment variables are required for the current frontend-only implementation.

## Notes

This project is currently frontend-focused. It uses static/local data and client-side interactions to demonstrate the complete OneAtlas product experience.
