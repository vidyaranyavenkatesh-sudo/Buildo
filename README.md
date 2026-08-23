# Buildo

Type a prompt, your own Gemini API key generates a full HTML site, preview it live,
save it to your account, and download it. Built with Next.js (App Router) + Supabase
(auth + database) + the Gemini API.

Runs on `localhost:3000` and deploys to both Netlify and Vercel with zero code changes.

---

## 1. What you need first

- Node.js 20.9+ installed (required by Next.js 16)
- A free [Supabase](https://supabase.com) account
- A free [Gemini API key](https://aistudio.google.com/apikey) (Google AI Studio)

---

## 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) → **New Project**. Pick any name/region, set a database password.
2. Once the project is ready, open **SQL Editor → New query**, paste the contents of
   `supabase-schema.sql` (included in this project), and click **Run**.
   This creates the `projects` table and locks it down with Row Level Security so
   each user can only see their own projects.
3. Go to **Project Settings → API Keys**. Copy:
   - **Project URL** (top of the page) → this is `NEXT_PUBLIC_SUPABASE_URL`
   - **Publishable key** (or **anon** key on the "Legacy API Keys" tab if you don't
     see a Publishable key yet — both work) → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Set your Site URL.** Go to **Authentication → URL Configuration** and set
   **Site URL** to `http://localhost:3000` while developing locally. Once you deploy,
   add your live URL (e.g. `https://your-app.vercel.app`) both here and under
   **Redirect URLs**.
5. **Wire up email confirmation.** "Confirm email" is on by default under
   **Authentication → Sign In / Providers → Email** — leave it on. But the default
   confirmation link points at a generic Supabase page, not your app, so you need to
   point it at the `app/auth/confirm/route.js` handler already included in this
   project:
   - Go to **Authentication → Emails → Confirm signup** (older dashboards: **Email
     Templates → Confirm signup**).
   - Find the confirmation link in the template — it looks like
     `<a href="{{ .ConfirmationURL }}">Confirm your mail</a>`.
   - Replace `{{ .ConfirmationURL }}` with:
     `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`
   - Save the template.

   With this in place: a user signs up → gets an email → clicks the link → it hits
   `/auth/confirm` in your app → that route verifies the token and logs them in →
   redirects to `/dashboard`. If the link is expired or already used, it redirects to
   a friendly `/auth/error` page instead of showing a raw error.

---

## 3. Get a Gemini API key

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey), sign in,
   click **Create API key**. No credit card required for the free tier.
2. Copy the key — this is `GEMINI_API_KEY`.

Google renames/retires Gemini model IDs every few months. This project defaults to
`gemini-2.5-flash`. If generation ever starts failing with a 404, check
[ai.google.dev/gemini-api/docs/models](https://ai.google.dev/gemini-api/docs/models)
for the current free-tier model name and set `GEMINI_MODEL` to it — no code change
needed.

---

## 4. Run it locally

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file
cp .env.local.example .env.local

# 3. Open .env.local and fill in the three values from steps 2 and 3 above:
#    NEXT_PUBLIC_SUPABASE_URL=...
#    NEXT_PUBLIC_SUPABASE_ANON_KEY=...
#    GEMINI_API_KEY=...

# 4. Start the dev server
npm run dev
```

Open **http://localhost:3000** — sign up, create a project, describe a site, and it
generates + previews live in the iframe on the right.

---

## 5. Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo. Vercel
   auto-detects Next.js, no config needed.
3. Under **Environment Variables**, add the same three variables from your
   `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`
   - `GEMINI_MODEL` (optional)
4. Deploy. Done.

---

## 6. Deploy to Netlify

This project already includes `netlify.toml` with the Next.js plugin configured.

1. Push this folder to a GitHub repo.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an
   existing project**, pick the repo. Build command and plugin are already set via
   `netlify.toml`.
3. Under **Site configuration → Environment variables**, add the same three (or four)
   variables as above.
4. Deploy. Done.

---

## How it works

- **Auth**: Supabase email/password auth. `proxy.js` (Next.js 16's replacement for the old
  `middleware.js` convention) refreshes the session cookie on every request; server components
  (`app/dashboard/page.js`, `app/builder/[id]/page.js`) check `supabase.auth.getUser()` and
  redirect to `/login` if there's no session.
- **Database**: one `projects` table (see `supabase-schema.sql`) storing each
  project's current HTML and its prompt history as JSON, scoped to the owning user
  via Row Level Security — so all reads/writes from the browser are safe without a
  custom backend.
- **Generation**: `app/api/generate/route.js` is the only place `GEMINI_API_KEY` is
  read — it never reaches the browser. It sends your prompt (plus the current page's
  HTML, if you're iterating) to the Gemini API with a system prompt that forces a
  single self-contained HTML document back, then returns that HTML to the client.
- **Preview**: the returned HTML is rendered in a sandboxed `<iframe srcDoc={html}>`
  — nothing is written to disk until you click Save or Download.
- **Save**: writes `html_content` + `prompt_history` back to the project's row in
  Supabase.
- **Download**: exports the current HTML as a standalone `.html` file you can host
  anywhere.

## Project structure

```
app/
  page.js                 landing page
  login/page.js            sign in / sign up
  dashboard/
    page.js                 server: auth guard + fetch projects
    DashboardClient.js       client: list, create, delete projects
  builder/[id]/
    page.js                 server: auth guard + fetch one project
    BuilderClient.js         client: prompt box, iframe preview, save, download
  api/generate/route.js     server-only: calls Gemini, keeps API key secret
  auth/confirm/route.js     handles the email confirmation link, creates the session
  auth/error/page.js        shown if a confirmation link is expired/invalid
lib/supabase/
  client.js                 browser Supabase client
  server.js                 server Supabase client (cookies-based)
proxy.js                     refreshes the Supabase session cookie on every request
supabase-schema.sql          run once in Supabase's SQL editor
netlify.toml                 Netlify build config
```

## Extending it

- **Multi-page sites**: currently each project is a single HTML file. You could
  extend the `projects` table with a `pages` JSON array and have the builder UI
  switch between them.
- **Templates**: seed new projects with a starter HTML block per category (portfolio,
  bakery, coaching site, etc.) instead of the blank page, to steady the AI's first
  output.
- **Visual editing**: add click-to-edit text in the iframe using
  `contenteditable` + a `postMessage` bridge back to the parent, so small tweaks
  don't need a full re-prompt.
