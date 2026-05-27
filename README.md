# LifeOS

AI-powered productivity platform built with Next.js 14, Tailwind CSS, Framer Motion, and Firebase.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Firebase

Copy `.env.example` to `.env.local` and add your Firebase project credentials. The app runs without Firebase for UI development.

## Routes

| Path | Page |
|------|------|
| `/` | Dashboard |
| `/tasks` | Tasks |
| `/notes` | Notes |
| `/calendar` | Calendar |
| `/ai-assistant` | AI Assistant |
| `/settings` | Settings |

## Project structure

```
src/
├── app/(dashboard)/  # App Router pages & layouts
├── components/
│   ├── dashboard/    # Dashboard UI
│   ├── tasks/        # Tasks feature
│   ├── notes/        # Notes feature
│   ├── calendar/     # Calendar feature
│   ├── assistant/    # AI assistant feature
│   ├── settings/     # Settings feature
│   ├── layout/       # Shell, sidebar, transitions
│   └── ui/           # Reusable primitives
├── config/           # Navigation
├── data/mock/        # Mock data (no backend yet)
└── lib/              # Utils, Firebase client
```

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — production server
- `npm run lint` — ESLint
