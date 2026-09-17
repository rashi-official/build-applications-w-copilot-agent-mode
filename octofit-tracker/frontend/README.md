# OctoFit Tracker Frontend

The presentation tier uses React 19 and Vite and connects to the API from the Express backend.

## Required environment variable

Set `VITE_CODESPACE_NAME` in `.env.local` when running inside GitHub Codespaces so the frontend can build the correct API URL:

```bash
VITE_CODESPACE_NAME=<your-codespace-name>
```

When `VITE_CODESPACE_NAME` is unset, the app falls back to `http://localhost:8000` instead of building a broken `https://undefined-8000.app.github.dev` URL.

## API URL behavior

The frontend uses this pattern when the variable is present:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

For local development, it falls back to:

```text
http://localhost:8000/api/[component]/
```

## Local development

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
