## Lunch Web Page – DevOps Runbook

This project is a React + TypeScript single page application built with Vite.

### Prerequisites

- **Node.js**: v18 or newer (LTS recommended)
- **Package manager**: `pnpm` (recommended for this project)
- **Git**: to clone the repository (optional if you already have the files)

### 1. Install dependencies

From the project root:

```bash
pnpm install
```

This reads `package.json` and installs all runtime and dev dependencies into a pnpm store.

### 2. Run the app in development

```bash
pnpm dev
```

- **Default URL**: `http://localhost:5173` (Vite default; check terminal output for the actual port)
- Supports hot-reload during development.

### 3. Build for production

```bash
pnpm build
```

This will:

- Type-check the project with TypeScript (`tsc -b`)
- Generate an optimized static build under `dist/` using Vite

### 4. Preview the production build locally

After building:

```bash
pnpm preview
```

This starts a local web server that serves the built `dist/` assets for final verification.

### 5. Lint & format (CI / quality gates)

- **Lint check**:

```bash
pnpm lint
```

- **Format code (Prettier)**:

```bash
pnpm format
```

These commands are suitable for CI pipelines to enforce code quality before build/deploy.

### 6. Typical CI pipeline outline (example)

1. **Checkout code**
2. **Install Node** (v18+)
3. **Install deps**: `pnpm install`
4. **Static checks**: `pnpm lint`
5. **Build**: `pnpm build`
6. **Publish artifact**: upload `dist/` to your chosen static hosting (S3 + CDN, Netlify, Vercel, Nginx, etc.)

