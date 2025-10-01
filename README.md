
# Clerk-Mongo Repo – High‑Level Overview

## 📖 Summary

This repository is a **Next.js 15** starter template that integrates:

| Feature | Library / Tool | Purpose |
|---------|----------------|---------|
| **Authentication** | `@clerk/nextjs` | Full‑stack user auth (sign‑in, sign‑up, session handling). |
| **Database** | `mongoose` (MongoDB) | Object‑document mapper for persisting user data. |
| **Server‑Side Logic** | Next.js API routes & middleware | Handles Clerk webhooks, protects routes, and connects to MongoDB. |
| **Styling** | Tailwind CSS (via `postcss.config.mjs`) | Utility‑first CSS framework for rapid UI development. |
| **UI Components** | Custom `Header`, `Loader` + Clerk UI components | Minimal layout with navigation and loading state. |

### Project Structure (key parts)

- **`src/app/`** – App Router pages (`page.js`, `about/page.jsx`, auth pages).  
- **`src/app/api/webhooks/route.js`** – Receives Clerk webhook events and creates/updates or deletes a user in MongoDB.  
- **`src/lib/`** – Helper modules:  
  - `mongodb/mongoose.js` – Singleton MongoDB connection.  
  - `models/user.model.js` – Mongoose schema for a Clerk‑linked user.  
  - `actions/user.js` – CRUD helpers used by the webhook handler.  
- **`src/components/`** – UI components (`Header.jsx`, `Loader.jsx`).  
- **`src/middleware.js`** – Clerk middleware protecting non‑public routes.  
- **`public/`** – Static SVG assets.  
- **Config files** – `package.json`, `next.config.mjs`, `eslint.config.mjs`, `postcss.config.mjs`, `jsconfig.json`.  

### How It Works

1. **User signs up / signs in** via Clerk UI components (`SignIn`, `SignUp`).  
2. Clerk triggers **webhook events** (`user.created`, `user.updated`, `user.deleted`).  
3. The **webhook route** verifies the request (`verifyWebhook`) and calls actions:  
   - `createOrUpdateUser` → upserts a document in MongoDB.  
   - `deleteUser` → removes the document.  
4. The **MongoDB connection** is lazily established and cached to avoid re‑connecting on each request.  
5. Protected pages are guarded by **Clerk middleware**; public routes (home, sign‑in/up, about, webhook endpoint) are exempt.

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/ashutoshk-20/clerk-mongo.git
cd clerk-mongo

# Install dependencies (npm, yarn, pnpm or bun)
npm install   # or yarn install / pnpm install / bun install

# Set up environment variables
# Create a .env.local file with:
#   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
#   CLERK_SECRET_KEY=your_clerk_secret_key
#   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/<db>?retryWrites=true&w=majority

# Run the development server
npm run dev   # or yarn dev / pnpm dev / bun dev

# Open http://localhost:3000 in your browser
```

## 📦 Scripts

| Script | Description |
|--------|-------------|
| `dev`   | Starts Next.js in development mode. |
| `build` | Builds the production bundle. |
| `start` | Starts the production server after a build. |
| `lint`  | Runs ESLint with Next.js core‑web‑vitals rules. |

## 🛠️ Extending the Template

- **Add more models** in `src/lib/models/` and corresponding actions.  
- **Create additional API routes** under `src/app/api/`.  
- **Customize UI** with Tailwind or replace components in `src/components/`.  
- **Switch to TypeScript** by renaming files and updating `tsconfig.json`.

## 📚 Useful Links

- **Next.js Docs** – https://nextjs.org/docs  
- **Clerk Docs** – https://clerk.com/docs  
- **Mongoose Docs** – https://mongoosejs.com/docs/  

---

*This README provides a concise overview for developers looking to explore or extend the Clerk‑Mongo starter template.*
