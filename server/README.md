# Server — FoodWithReels

Quick start for the server component.

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (local or Atlas)
- Cloudinary account (for media upload)

## Setup

1. Install dependencies

```powershell
cd server
npm install
```

2. Create `.env` (copy from `.env.example`)

```powershell
copy .env.example .env
# then edit .env with real credentials
```

3. Start server

```powershell
npm run start
```

The server listens on the port set in `.env` (default `3000`). API routes are mounted at `/api/*`.

## Notes

- The server uses cookie-based JWT authentication. After registration/login the server sets a `token` cookie.
- For file uploads (profile images, videos) the server currently uses Cloudinary (see `src/Services/storage.services.js`).
- To call protected endpoints using curl, use the `-c` and `-b` flags to capture and send cookies.

## Useful commands

- `npm run start` — start with `nodemon` (development)

## Next steps

- Add production process manager (PM2) or containerize with Docker
- Add integration tests and CI pipeline
