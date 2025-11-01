## FoodWithReels — Project Documentation

Last updated: 2025-11-01

### Overview

FoodWithReels is a full-stack web application for sharing food-related videos and connecting regular users with food partners (shops/restaurants). It includes:

- A React + Vite frontend (client/)
- An Express + Node backend (server/) with MongoDB
- Media uploads (profile images, videos) stored via Cloudinary

This document explains the project structure, how to set it up locally, environment variables, available API endpoints, and helpful commands.

## Table of contents

- Project structure
- Tech stack
- Prerequisites
- Environment variables
- Setup & run (development)
- API reference (main endpoints)
- Frontend notes
- Deployment hints
- Next steps / Improvements

## Project structure (top-level)

- client/ — React front-end (Vite)
  - src/ — React source
  - package.json — client scripts/deps
- server/ — Express backend
  - src/ — server source
    - controller/ — controllers (auth, foodItem, FoodPartnerAuth, follower, payment, comment)
    - model/ — Mongoose models
    - Routes/ — route files for users, food partners, food items
    - Services/ — media storage (Cloudinary)
    - db/ — MongoDB connection
  - package.json — server scripts/deps
- videos/ — sample video assets

## Tech stack

- Frontend: React 19, Vite, Tailwind CSS, react-router, axios
- Backend: Node.js, Express, MongoDB (mongoose), JWT, bcrypt
- Media: Cloudinary (via server/src/Services/storage.services.js)
- Other: multer for multipart handling, cookie-parser, cors

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (Atlas or local)
- Cloudinary account (for media uploads) or adjust storage.services to another provider

## Environment variables (.env)

Create a `.env` file in the `server/` directory. Required variables observed in code:

```
PORT=3000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/foodwithreels?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Only set production-grade secrets for deployment.

## Setup & Run (development)

1. Clone repo and open terminal.

Server

```
cd server
npm install
# create .env using the template above
npm run start
```

This runs `nodemon server.js` (as defined in `server/package.json`). The server entry loads `src/app.js` which mounts routes at `/api/*`.

Client

```
cd client
npm install
npm run dev
```

The client runs on Vite (default port 5173). `FRONTEND_URL` in the server `.env` should match the client origin to allow CORS.

## API Reference (high-level)

All server routes are prefixed by the paths registered in `src/app.js`.

Base paths:
- /api/users — User related endpoints
- /api/foodPartners — Food partner auth/profile
- /api/foodItem — Food item (video) endpoints

### /api/users

- POST /register (multipart/form-data)
  - Description: Register a new user with profile image upload. Expects `profileImage` file and fields `name`, `email`, `password`.
  - Response: 201 with created user and cookie `token` set.

- POST /login
  - Description: Login with { email, password }. Sets cookie `token`.

- POST /logout
  - Description: Clears auth cookie.

- PUT /updateUser (protected)
  - Description: Update user profile (controller has updateUser implementation). Requires auth token cookie.

- GET /FetchFoodPartner (protected)
  - Description: Fetch food partner profile (calls FoodPartner controller).

- GET /likedpost (protected)
  - Description: Fetch liked posts for user.

- GET /search (protected)
  - Description: Search for users and food partners by query parameter `?query=`.

- POST /create-payment-order (protected)
- POST /confirm-payment (protected)
  - Description: Payment related endpoints (payment.controller).

- GET /myorders (protected)
  - Description: Get orders by user id query param `?id=`.

- POST /addComment, GET /getAllComments (protected)

- POST /follow, POST /unfollow (protected) — follow management

- GET /showProfileCardUser (protected)

- GET /fetchIsAlredyFollowed (protected) — check follow status

### /api/foodPartners

- POST /register (multipart/form-data)
  - Description: Register a food partner. Accepts `profileImage` file and fields `name`, `shopName`, `email`, `password`, `phone`.

- POST /login
  - Description: Food partner login.

- POST /logout

- GET /FetchPartnerItem
  - Description: Get items for a specific partner by query param `?id=`.

- POST /follow, POST /unfollow (protected)

### /api/foodItem

- POST / (protected as authFoodPartner)
  - Description: Upload a new food video (multipart with `video` file). Fields: `name`, `price`, `description`.

- GET /foodItems
  - Description: Fetch all food items.

- GET /getItem?id=<id>
  - Description: Fetch a single food item by id.

- POST /like (protected)
  - Description: Like / unlike a food item. Query param `?id=<foodId>`.

- GET /likeStatus?id=<foodId> (protected)
  - Description: Check whether current user has liked a food item.

## Frontend notes

- The client stores minimal session information in `sessionStorage` (see `SignupBox.jsx` and other components). Authentication is cookie-based: the server sets a `token` cookie after login/register. Ensure your browser and client requests send cookies (`withCredentials: true` in axios).
- The client uses Axios with multipart uploads for profile images and videos.

## Deployment hints

- Set NODE_ENV=production and provide production-ready values for `MONGODB_URI`, Cloudinary credentials and `JWT_SECRET`.
- Consider using a process manager (PM2) or Docker for the server.
- Configure CORS `FRONTEND_URL` to the production domain.

## Tests & checks

- There are no automated tests in the repository currently. Add basic unit and integration tests for controllers and API endpoints.

## Next steps / Improvements

- Add Swagger / OpenAPI docs for full API reference.
- Add E2E tests for signup/login flows.
- Add CI pipeline for linting, tests, and deployment.
- Add rate limiting and stronger validation on inputs.

## Contact / Contributors

This project is in the `Webdevshivamyadav/foodwithreels` repository.

