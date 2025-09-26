# BestKit: Node + Express + TypeScript + MongoDB (No Docker)

Opinionated, minimal, and production-ready backend starter. Includes:

- Express 5, TypeScript, ESLint (flat), Prettier
- Mongoose (MongoDB), environment validation (Zod)
- Security middleware (helmet, cors, rate limit), structured logging (morgan)
- Auth flow (register, login) with JWT and protected user route
- Clean layering: routes → controllers → models → utils/middleware

## Quick start

1) Copy env and configure

```
cp .env.example .env
# set MONGO_URI and JWT_SECRET
```

2) Install and run

```
npm ci
npm run dev
# Server: http://localhost:4000 (change via PORT)
```

3) Build and run prod

```
npm run build
npm start
```

## Scripts

- `npm run dev` – live-reload dev server (ts-node-dev)
- `npm run build` – compile TypeScript to `dist/`
- `npm start` – run compiled server
- `npm run typecheck` – strict type checking
- `npm run lint` / `lint:fix` – ESLint (flat config)

## Project structure

```
src/
  app.ts                 # Express app, middleware, routes
  server.ts              # Bootstrap + DB connect
  config/
    env.ts               # .env validation (Zod)
    db.ts                # Mongoose connection
    logger.ts            # HTTP logger (morgan)
  middleware/
    auth.ts              # JWT auth guard
    errorHandler.ts      # Centralized error handler
    validate.ts          # Zod request validation
  models/
    user.model.ts        # User schema
  controllers/
    auth.controller.ts   # register, login
    user.controller.ts   # me (profile)
  routes/
    auth.routes.ts       # /api/auth
    user.routes.ts       # /api/users
    index.ts             # mount routes
  schemas/
    auth.schema.ts       # Zod schemas
  utils/
    jwt.ts, passwords.ts, httpErrors.ts
```

## API

- `GET /health` – health check
- `POST /api/auth/register` – { name, email, password }
- `POST /api/auth/login` – { email, password } → { token }
- `GET /api/users/me` – Auth: `Authorization: Bearer <token>`

## Notes

- No Docker by design. Run your MongoDB locally or via a managed service.
- JWT secret must be a long random string; rotate regularly.
- Keep dependencies up-to-date and run `npm audit` periodically.
