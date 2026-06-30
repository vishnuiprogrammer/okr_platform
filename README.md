# OKR Platform API

A simple REST API for managing Objectives and Key Results (OKRs) built with Node.js, Express, and MySQL.

## 🚀 Live API

Base URL:
`https://okr-platform.onrender.com/api/v1`

> Note: Since the app is hosted on Render’s free tier, the first request may take around 1 minute to respond.

---

## 🛠️ Tech Stack

* Node.js + Express.js
* MySQL (Aiven Cloud)
* JWT Authentication
* Winston Logger
* Render Deployment

---

## 📂 Project Structure

```bash
src/
├── config/        # DB & environment setup
├── controllers/   # Request handlers
├── services/      # Business logic
├── routes/        # API routes
├── middleware/    # Auth & logging
└── utils/         # JWT helpers
```

---

## ⚙️ Setup

### 1. Clone the project

```bash
git clone https://github.com/vishnuiprogrammer/okr_platform.git
cd okr_platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
PORT=3000

JWT_SECRET_KEY=your_secret
REFRESH_SECRET_KEY=your_refresh_secret

DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_DATABASE_NAME=your_db

FRONTEND_URL=http://localhost:5173
```

### 4. Run the server

```bash
npm run dev
```

Server:
`http://localhost:3000`

---

## 🔐 Authentication

The API uses JWT authentication with:

* Access Token (15 min)
* Refresh Token (7 days)

### Login

```http
POST /auth/login
```

Response:

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

Use token in headers:

```http
Authorization: Bearer <token>
```

---

## 📖 Main APIs

### Auth

* Register
* Login
* Refresh Token
* Logout
* Profile

### Objectives

* Create objectives
* Get objectives
* Get hierarchy
* View key results

### Key Results

* Create key results
* Update progress
* View progress history

### Users

* Get users
* Assign roles
* Assign teams
* View my OKRs

---

## 🌍 CORS

Frontend URLs are allowed through environment configuration.

Example:

* `http://localhost:5173`
* Production frontend URL

---

## 🚀 Deployment

| Service     | Platform    |
| ----------- | ----------- |
| Backend API | Render      |
| Database    | Aiven MySQL |

Render automatically redeploys when changes are pushed to the `main` branch.

---

## 👨‍💻 Author

Developed by Vishnu B
