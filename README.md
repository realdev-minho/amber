# AMBER — Premium E-Commerce & Marketplace System

Amber is a modern, high-performance e-commerce platform built with Next.js 16 (React 19, Tailwind CSS v4, Zustand) for the frontend and FastAPI (Python, SQLAlchemy 2.x, Asyncpg/SQLite) for the backend.

## Architecture

```
amber/
├── backend/       # FastAPI Python backend (REST API, Auth, Database Models)
├── frontend/      # Next.js 16 App Router Web Application
└── mobile/        # Vite + Capacitor Native Mobile Application
```

## Features

- **Obsidian Dark & Warm Amber Design System**: Glassmorphism tokens, custom animations, dark-mode first typography.
- **Full E-Commerce Workflow**: Product catalog with real-time filters, category rails, search, cart, wishlist, multi-step checkout, and order tracking.
- **FastAPI Backend**: Async SQLAlchemy 2.x, Pydantic v2 schemas, JWT authentication, and automated DB seeding.
- **Cross-Platform Mobile**: Capacitor Android integration.

## License

MIT
