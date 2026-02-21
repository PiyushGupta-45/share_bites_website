# ShareBite Web

React + Vite + Tailwind web version of the ShareBite app, with a MongoDB Atlas Node/Express backend.

## Project Structure

- `client`: React web app (Vite + Tailwind CSS)
- `server`: Express API + MongoDB Atlas (copied and adapted from existing ShareBite backend)

## Features Ported to Web

- Email sign up and sign in
- Role-aware flows (`admin`, `restaurant`, `ngo_admin`, `user`)
- NGO listing (home)
- NGO needs (restaurant accept/ignore)
- NGO demand management (ngo_admin create/delete/list)
- Volunteer runs with delivery acceptance
- Impact dashboard
- Community hub
- Logistics alerts
- Trust and safety checklist
- Analytics dashboard
- Gamification and volunteer network
- Profile + admin tools (add NGO, add restaurant)

## Setup

### 1) Backend

```bash
cd server
cp .env.example .env
```

Set MongoDB Atlas values in `.env`, then:

```bash
npm install
npm run dev
```

### 2) Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:5000`.
