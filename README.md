# MathBridge — Supabase + Vercel

Algebra pilot: 16 skills, 144 deterministic practice questions, diagnostic routing, lessons, Urdu key-idea summaries, hints, saved progress, mistake notebook and CSV reports.

## Connected database

Supabase project: `myuvjnmwdodrpkuvvplk`.
Tables `mathbridge_learning` and `mathbridge_members` have been created with row-level security. The invited email is `maazatiq78@gmail.com`. Learners cannot add invitations or access another user's progress. Anonymous API access is denied. Account access is verified by Supabase Auth on every learning API request. No service-role key is used.

## Run locally

Use Node 22.13+ and pnpm. Copy `.env.example` to `.env.local` and set the Supabase **publishable** key (never a secret/service-role key).

```
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test:curriculum
pnpm build
pnpm start
```

## Windows quick deployment

The workspace could not reach Vercel's API because of its network access policy. No Vercel deployment has been created from here.

1. Install Node.js 24 LTS if you do not already have it.
2. Extract this ZIP and open the `mathbridge` folder.
3. Double-click `deploy.cmd`.
4. Follow the Vercel login prompt. Deployment settings are prefilled from `supabase.public.json`.
5. Complete the Supabase URL Configuration steps printed by the script.

`supabase.public.json` contains only the client-safe publishable key and project URL. It contains no service-role key, database password or Vercel token. The script does not install or purchase a paid plan.

## Deploy to your Vercel account

Sign into Vercel, link this directory as a new Next.js project named `mathbridge`, and set these variables for Production and Preview:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Run `vercel --prod`. The build and install commands are set in `vercel.json`.

In Supabase Authentication → URL Configuration, add the final Vercel URL to Redirect URLs and set Site URL to that address. This is required for account confirmation and password-reset links. Use exact URLs, including the local development URL only when needed. Do not enable wildcard redirects to arbitrary domains.

Open the deployed app and choose Create account using the invited email. Confirm the email, then sign in. If the Supabase default email service rejects a recipient, verify that the invited email belongs to the project's organization or configure your SMTP provider; the default sender is limited and unsuitable for a public student launch.

## Verification and remaining gates

- Production Next.js build and TypeScript checks pass.
- Curriculum tests validate all 144 generated numeric answers, fraction input, prerequisite paths and evidence rules.
- Live Supabase RLS tests pass for invited-user visibility, outsider isolation, outsider write rejection and invitation write rejection.
- The production homepage returns HTTP 200; the API rejects missing and invalid access tokens with HTTP 401.
- Local browser preview could not connect in this environment; visual auth-screen QA remains outstanding.
- Full end-to-end sign-in requires the owner's email confirmation and final redirect URL configuration.
- Prior ChatGPT-hosted progress has not been migrated. That original app remains available separately; no existing learning data was overwritten.

## Existing project advisory

Supabase reports an existing `public.rls_auto_enable()` event-trigger function as executable by API roles. This was present before MathBridge and is not used by the app. Review the existing project's intended permissions before changing it: https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable

## Pilot limits

The question bank needs educator review before a wider student rollout. The rules are not a validated mastery model. There are no teacher rosters, research experiments, offline packs, or automated proof checking. Urdu support is key-idea summaries, not full translation.
