# ⚡ DbSmash — AI-Powered Database Schema Generator

**DbSmash** is a full-stack web application that leverages AI to transform natural language app ideas into professional database schemas and ER diagrams instantly.

> 🧠 Describe your app idea.  
> 🏗️ Select your database type.  
> 🚀 DbSmash generates and initializes your schema.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [License](#license)

## Project Structure

```
dbsmash/
├── frontend/               # React + Vite + TailwindCSS (Client)
│   ├── src/               # Source files (React components, contexts)
│   └── dist/              # Build output after `npm run build`
├── server/                # Node.js + Express + Socket.io (API + AI logic)
│   ├── index.js           # Server entry point
│   ├── routes/            # API routes
│   └── .env               # Environment variables (create manually)
└── README.md              # Project documentation
```

## Prerequisites

- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **Gemini API Key**: Obtain from your Gemini API provider
- **Upstash Redis**: Get REST URL from [Upstash](https://upstash.com)

## Environment Variables

Create a `.env` file in the `server/` directory with the following:

```env
GEMINI_API_KEY=your_gemini_api_key
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
```

> **Note**: Replace `your_gemini_api_key` and `your_upstash_redis_url` with your actual credentials. Add `.env` to `.gitignore` to avoid exposing sensitive data.

## Local Development

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

The backend runs on [http://localhost:3000](http://localhost:3000).

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend runs on [http://localhost:5173](http://localhost:5173).

> **Note**: Ensure the Socket.io connection in `frontend/src/SchemaContext.jsx` is set to:
> ```js
> const socket = io('http://localhost:3000');
> ```

## Usage

1. Open the app at [http://localhost:5173](http://localhost:5173).
2. In the Playground, enter a natural language prompt describing your app idea.
3. Select a database type (e.g., PostgreSQL, MySQL, SQLite).
4. DbSmash will generate a schema and ER diagram.

**Example Prompts**:
- `Create a blogging platform with users, posts, and comments`
- `Design an e-commerce site with customers, orders, and inventory`
- `Build a social app with user profiles, posts, likes, and follows`

## License

MIT License © [YourName]