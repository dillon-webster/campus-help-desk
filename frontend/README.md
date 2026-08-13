# Frontend Setup

## Prerequisites

- Node.js 22 or newer
- npm
- FastAPI running at `http://localhost:8000`

## Install

```bash
cd frontend
cp .env.example .env
npm install
```

## Run

```bash
npm run dev
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Environment variable

`VITE_API_BASE_URL` identifies the backend origin. Vite exposes only variables prefixed with `VITE_` to client code. Client-side environment variables are public and must never contain secrets.
