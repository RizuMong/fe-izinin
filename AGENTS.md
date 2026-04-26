<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: fe-izinin (Time Off Application)

## Tech Stack
- **Next.js 16.2.1** (App Router)
- **Supabase** (Auth + Database)
- **Tailwind CSS v4**
- **Zustand** (State management)
- **Zod** (Validation)
- **shadcn/ui** (Components)

## Commands
```bash
npm run dev    # Development server (http://localhost:3000)
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Project Structure
```
src/
├── app/
│   ├── (app)/           # Protected routes (require auth)
│   │   ├── time-off/    # Time off requests, history, approval
│   │   └── master-data/ # Job position, holiday, site, etc.
│   ├── auth/            # Auth routes (login, sign-up, forgot-password)
│   └── layout.tsx       # Root layout
├── components/          # Shared UI components (shadcn)
├── lib/                 # Utilities: auth.ts, supabase/, utils.ts
├── hooks/               # Custom React hooks
├── services/            # API services
└── store/              # Zustand stores
```

## Auth Flow
- Uses Supabase Auth (`@supabase/ssr`, `@supabase/supabase-js`)
- Protected routes auto-redirect to `/auth/login`
- Session handled via `userStore` (Zustand)
- Auth utilities in `src/lib/auth.ts`

## Known Patterns
- Modal forms use pattern: `*-form-modal.tsx` + `*-delete-dialog.tsx`
- Tables use `@tanstack/react-query` for data fetching
- All routes in `(app)/` require authentication
- API calls go through services in `src/services/`