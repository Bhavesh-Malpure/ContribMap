# ContribMap

ContribMap is a personalized discovery and tracking layer for GitHub issues. Beginner and early-stage developers choose skills and experience, see ranked open issues, bookmark them, and track **Interested**, **In Progress**, or **Completed**. Contribution work still happens on GitHub.

Stack: **React + Node.js + Express.js + MySQL**. GitHub REST API is used for public issue discovery.

## Run locally

1. Copy environment templates:

   - `server/.env.example` → `server/.env`
   - `client/.env.example` → `client/.env`

2. Create the MySQL database and tables yourself (no SQL files are shipped yet). Then set `DB_*` in `server/.env`.

3. Install and start both apps:

```bash
npm run install:all
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:4000/api/health

## Expected MySQL tables

Create these yourself so the repositories can run. Use InnoDB, primary keys, foreign keys, and unique constraints.

| Table | Purpose |
| --- | --- |
| `users` | `id`, `name`, `email` UNIQUE, `password_hash`, `experience_level`, `created_at` |
| `skills` | `id`, `name` UNIQUE, `category` |
| `user_skills` | `user_id`, `skill_id` — unique pair |
| `repositories` | cached GitHub repos (`github_repo_id` UNIQUE, `full_name`, `description`, `html_url`, `primary_language`, `stars`, `updated_at`) |
| `issues` | cached issues (`github_issue_id` UNIQUE, `repository_id`, `title`, `body_excerpt`, `html_url`, `state`, `labels`, `difficulty_estimate`, `github_updated_at`, `fetched_at`) |
| `issue_skills` | `issue_id`, `skill_id` — unique pair |
| `bookmarks` | `user_id`, `issue_id`, `status`, `created_at` — UNIQUE (`user_id`, `issue_id`) |

Seed a controlled skill list (JavaScript, React, Python, HTML, CSS, SQL, and similar) before using profile setup.

Issue discovery can still return live GitHub results if MySQL is not connected. Registration, profile, and bookmarks require the database.

## Matching score (0–100)

| Factor | Weight |
| --- | --- |
| Skill overlap | 50 |
| Difficulty fit | 20 |
| Beginner-friendly labels | 20 |
| Freshness | 10 |

## API

| Method | Route | Auth |
| --- | --- | --- |
| POST | `/api/auth/register` | no |
| POST | `/api/auth/login` | no |
| GET/PUT | `/api/profile` | yes |
| GET | `/api/skills` | yes |
| GET | `/api/issues` | yes |
| GET | `/api/issues/:id` | yes |
| GET/POST | `/api/bookmarks` | yes |
| PATCH/DELETE | `/api/bookmarks/:id` | yes |

## Version 1 boundary

In scope: accounts, skills, discovery, scoring, bookmarks, status tracking.

Out of scope: maintainer portal, in-app applications, GitHub write actions, chat, gamification, AI recommendations.
