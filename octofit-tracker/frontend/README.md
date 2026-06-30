# Octofit Tracker Frontend

React 19 + Vite presentation tier for the Octofit multi-tier application.

## Environment variable setup

By default, the frontend calls `/api/[component]/` and Vite proxies requests to
`http://localhost:8000` during development.

If you need a custom API origin (for example a deployed backend), define
`VITE_API_BASE_URL` in `.env.local`:

```bash
VITE_API_BASE_URL=https://your-api-host.example.com/api
```

When set, the frontend calls:

```text
/api/[component]/
```

When not set, the app uses the development proxy:

```text
http://localhost:8000/api/[component]/
```

## Run

```bash
npm run dev
```
