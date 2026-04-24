# Portfolio — Project Guidelines

## About this project
Personal portfolio website for Aditya Mishra, hosted at adimyth.github.io.
Single-page site built with Next.js 15 (App Router), Tailwind CSS v4, and shadcn/ui (Radix variant).

## Stack
- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Deployment**: GitHub Pages via static export (`output: "export"`) — CI/CD through `.github/workflows/deploy.yml`

## Writing and copy style
- **No hyphens as list bullets or em-dashes in prose.** Use plain sentences.
- **No em dash in running text.** Restructure the sentence instead.
- Prefer active voice and direct language.
- Numbers over 999 should be written as "100K+" not "100,000+".
- Periods go at the end of every bullet point and sentence.
- Section labels (above headings) use UPPERCASE with wide letter-spacing.

## Design preferences
- **Dark mode by default** — the `dark` class is applied on `<html>` in `layout.tsx`.
- **Accent colour**: blue-ish (`oklch(0.65 0.2 250)`) set as `--primary` in `.dark` within `globals.css`.
- Rounded cards (`rounded-2xl`) throughout. No sharp corners.
- Subtle borders (`border-border/50`) with hover states that brighten to `border-border`.
- Generous section padding (`py-24`).
- Section structure: small uppercase label then large bold heading then content.

## Content source of truth
All copy and data lives in `lib/data.ts`. Edit that file to update any text, links, skills, jobs, or projects. Do not scatter copy across component files.

## Personal details
- Email: mishraaditya6991@gmail.com
- GitHub: https://github.com/adimyth
- LinkedIn: https://linkedin.com/in/adimyth (update if URL is different)
- Twitter: https://twitter.com/adimyth (update if handle is different)

## Component conventions
- One component per file under `components/`.
- All section components accept no props — they import directly from `lib/data.ts`.
- Use shadcn/ui primitives (`Badge`, `Card`, `Separator`, `Button`) for UI elements. Do not reach for raw HTML where a component exists.
- Icons come from `lucide-react`.

## Adding a new section
1. Add data to `lib/data.ts`.
2. Create a component in `components/`.
3. Import and render it in `app/page.tsx`.
4. Add a nav link in `components/Nav.tsx`.

## Deployment notes
- The repo must be named `adimyth.github.io` on GitHub for the site to resolve at the root domain.
- In the GitHub repo settings: Settings then Pages then Source then "GitHub Actions".
- Push to `main` triggers a build and deploy automatically.
- No `basePath` is needed because this is a root user page, not a project sub-page.
