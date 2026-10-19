<div align="center">

# 🧭 ContribMap

### Find your next open-source contribution.

**Discover GitHub issues that match your skills, experience, and interests.**

ContribMap helps developers find meaningful open-source issues through skill-based matching, beginner-friendly filters, and personalized recommendations.

<br />

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![GitHub API](https://img.shields.io/badge/GitHub%20REST%20API-181717?style=for-the-badge&logo=github&logoColor=white)

</div>

---

## 📌 Table of Contents

- [About ContribMap](#-about-contribmap)
- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Features](#-features)
- [How Matching Works](#-how-matching-works)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Database Setup](#-database-setup)
- [API Endpoints](#-api-endpoints) 
- [Design System](#-design-system)
- [Security](#-security)
- [Current Scope](#-current-scope)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌍 About ContribMap

Open source provides incredible opportunities to learn, collaborate, and build real-world software. However, finding the right issue to work on can be challenging, especially for developers making their first contribution.

**ContribMap** is an open-source contribution discovery platform that connects developers with GitHub issues relevant to their technical skills and experience.

Instead of browsing hundreds of unrelated issues, contributors can create a profile, discover relevant opportunities, understand why an issue matches their skills, and save issues for later.

> **Our mission:** Make open-source contribution discovery simpler, smarter, and more accessible to everyone.

## ❗ The Problem

Developers who want to contribute to open source often face several challenges:

- 🔎 Finding relevant issues across numerous repositories.
- 🧩 Identifying issues that match their technical skills.
- 🌱 Discovering beginner-friendly opportunities.
- ⏳ Avoiding outdated or unsuitable issues.
- 📌 Keeping track of interesting issues and contribution progress.
- 🤔 Understanding whether an issue is a good fit before investing time in it.

## 💡 Our Solution

ContribMap brings issue discovery and personalized matching into one place.

1. **Build your profile:** Select your technical skills and preferences.
2. **Discover issues:** Search public GitHub issues through the GitHub REST API.
3. **Filter opportunities:** Narrow results by relevant criteria and beginner-friendly labels.
4. **Get matched:** Rank issues using a transparent matching score.
5. **Understand recommendations:** Review the reasons behind a match.
6. **Save issues:** Bookmark interesting opportunities and track their status.

## ✨ Features

### 👤 User Profiles

- User registration and login.
- Personalized developer profiles.
- Technical skill selection.
- Skill-based recommendations.

### 🔍 GitHub Issue Discovery

- Discover issues from public GitHub repositories.
- Search and filter available issues.
- View issue details and repository information.
- Open the original issue on GitHub.

### 🎯 Smart Matching

- Calculate a matching score for discovered issues.
- Consider technical skill overlap.
- Account for difficulty fit and beginner-friendly labels.
- Consider issue freshness.
- Explain why an issue may be relevant.

### 🔖 Bookmarks and Tracking

- Save interesting issues.
- View saved issues.
- Update contribution-tracking status.
- Remove bookmarks when they are no longer needed.

### 🛡️ Backend Infrastructure

- RESTful API architecture.
- Authentication middleware.
- Request validation.
- Rate limiting.
- Centralized error handling.
- MySQL-backed data access.

---

## 🧮 How Matching Works

ContribMap uses a weighted scoring model to rank issues according to contributor preferences.

| Matching factor | Weight |
|---|---:|
| Technical skill overlap | 50% |
| Difficulty fit | 20% |
| Beginner-friendly labels | 20% |
| Issue freshness | 10% |
| **Total** | **100%** |

### Matching formula

```text
Match Score =
    (Skill Overlap × 0.50)
  + (Difficulty Fit × 0.20)
  + (Beginner Labels × 0.20)
  + (Issue Freshness × 0.10)
```

Each factor is evaluated on a normalized scale, allowing the final score to be represented from 0 to 100.

**Example:** Suppose an issue receives these component scores:

| Factor | Component score | Weighted score |
|---|---:|---:|
| Skill overlap | 90 | 45 |
| Difficulty fit | 80 | 16 |
| Beginner labels | 100 | 20 |
| Freshness | 70 | 7 |
| **Final match score** | | **88/100** |

A higher score indicates a stronger match according to the configured criteria. It is a recommendation score, not a guarantee that a maintainer will accept a contribution.

---

## 🏗️ System Architecture

ContribMap follows a client-server architecture. The React frontend communicates with a Node.js and Express REST API. The backend coordinates authentication, matching, database operations, and GitHub issue discovery.

```mermaid
flowchart TB
    USER(["👤 Contributor"])

    subgraph FRONTEND["Frontend — React + Vite"]
        UI["Pages and UI Components"]
        AUTH["Authentication Context"]
        APICLIENT["API Service Layer"]

        UI --> AUTH
        UI --> APICLIENT
        AUTH --> APICLIENT
    end

    subgraph BACKEND["Backend — Node.js + Express"]
        ROUTES["REST API Routes"]
        MIDDLEWARE["Authentication · Validation<br/>Rate Limiting · Error Handling"]
        CONTROLLERS["Controllers"]
        SERVICES["Application Services"]

        MATCHING["Issue Matching Service"]
        DATAACCESS["Repositories / Data Access"]
        GITHUBCLIENT["GitHub API Client"]

        ROUTES --> MIDDLEWARE
        MIDDLEWARE --> CONTROLLERS
        CONTROLLERS --> SERVICES
        SERVICES --> MATCHING
        SERVICES --> DATAACCESS
        SERVICES --> GITHUBCLIENT
    end

    DATABASE[("MySQL Database")]
    GITHUB["GitHub REST API"]

    USER --> UI
    APICLIENT <-->|"HTTP / JSON"| ROUTES
    DATAACCESS <--> DATABASE
    GITHUBCLIENT <-->|"Issue Search and Data"| GITHUB

    classDef frontend fill:#E8F0F2,stroke:#4F5D65,color:#263238
    classDef backend fill:#F2EFE9,stroke:#4F5D65,color:#263238
    classDef external fill:#F7D6D0,stroke:#B5ABA0,color:#263238

    class UI,AUTH,APICLIENT frontend
    class ROUTES,MIDDLEWARE,CONTROLLERS,SERVICES,MATCHING,DATAACCESS,GITHUBCLIENT backend
    class DATABASE,GITHUB external
```

### Request lifecycle

1. A contributor interacts with the React interface.
2. The frontend API service sends a request to the Express backend.
3. Middleware processes authentication, validation, and request limits where applicable.
4. Controllers delegate the request to the appropriate application service.
5. Services retrieve or update application data and call the GitHub API when required.
6. The matching service ranks issues using the configured scoring model.
7. The API returns structured JSON to the frontend.
8. React displays the results to the contributor.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Component-based frontend |
| Vite | Frontend development server and build tooling |
| JavaScript | Application development |
| Node.js | Backend runtime |
| Express.js | REST API and routing |
| MySQL | Relational database |
| GitHub REST API | Public repository and issue discovery |
| JWT | Token-based authentication, where configured |
| CSS | Styling and responsive layouts |
| npm | Dependency management and scripts |

---

## 📂 Project Structure

```text
ContribMap/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   └── issues/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── integrations/
│   │   ├── middleware/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   └── package.json
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── LICENSE
```

*Note: The tree highlights the main application areas. Exact filenames and additional directories may differ slightly between versions.*

---
## 🚀 Getting Started

Follow these steps to run ContribMap locally.

### Prerequisites

Install the following software before proceeding:

- [Node.js](https://nodejs.org/) — use a version compatible with the project's dependencies.
- [npm](https://www.npmjs.com/) — included with Node.js.
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/).
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) — recommended for database management.
- [Git](https://git-scm.com/).

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd ContribMap
```

Replace `<YOUR_REPOSITORY_URL>` with the actual Git repository URL.

### 2. Install dependencies

From the project root, run:

```bash
npm run install:all
```

If this script is unavailable in your current checkout, install the root and application dependencies according to the scripts in the respective `package.json` files.

### 3. Configure environment variables

Create the client and server environment files using the supplied examples, as applicable.

```bash
# From the project root

# Windows Command Prompt
copy server\.env.example server\.env
copy client\.env.example client\.env
```

If an example file is not present in one of these directories, create the corresponding `.env` file using the variables required by that application's configuration.

See [Environment Configuration](#-environment-configuration).

### 4. Configure MySQL

1. Start your MySQL server.
2. Open MySQL Workbench and connect to your local MySQL instance.
3. Create the application database.
4. Create the required tables and relationships.
5. Configure the server's database credentials.

See [Database Setup](#-database-setup).

### 5. Start the application

Run the frontend and backend together, if the root development script is configured to start both:

```bash
npm run dev
```

Alternatively, use separate terminals:

```bash
npm run dev:server
```

```bash
npm run dev:client
```

### 6. Open the application

The default development addresses are expected to be:

- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:4000`
- **Health check:** `http://localhost:4000/api/health`

These addresses depend on the environment configuration and the actual startup scripts.

---

## ⚙️ Environment Configuration

Keep credentials in environment variables rather than hardcoding them into application code.

Typical configuration categories include:

| Variable category | Purpose |
|---|---|
| Server port | Port used by the Express application |
| Database host | MySQL server hostname |
| Database port | MySQL connection port |
| Database name | Application database |
| Database user | Database account |
| Database password | Database credential |
| JWT secret | Token signing secret, if JWT authentication is enabled |
| GitHub token | Optional token for GitHub API access and higher rate limits |
| Client API URL | Backend API base URL |

The actual variable names must match those read by the existing application configuration.

**Important security practices:**

- Never commit `.env` files containing real credentials.
- Keep `.env.example` limited to placeholder values.
- Use strong, unique secrets.
- Do not expose server-side GitHub tokens through frontend environment variables.
- Rotate any credential that has been accidentally published.

---

## 🗄️ Database Setup

ContribMap uses MySQL as its relational data store.

The database is intended to support entities such as:

- Users and authentication data.
- Skills and user-skill associations.
- Repository and issue information.
- Issue labels and skill associations.
- Bookmarks and contribution-tracking status.

The exact tables, column names, constraints, and indexes must match the SQL queries and repository implementations in the current source code.

### Setup checklist

- [ ] Start the MySQL service.
- [ ] Create the application database.
- [ ] Create tables matching the backend repository queries.
- [ ] Add primary keys and appropriate foreign keys.
- [ ] Configure database environment variables.
- [ ] Verify that the backend connects successfully.
- [ ] Test registration, login, issue discovery, and bookmarking.

> **Schema note:** Do not assume that every planned feature already has a database table. Create tables based on the implemented code and current requirements.

---

## 🔌 API Endpoints

The following table summarizes the application's expected API surface. Confirm the current route definitions and authentication requirements in `server/src/routes/` before relying on individual endpoints.

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Check API health |
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login` | Authenticate a user |
| `GET` | `/api/profile` | Retrieve the current user's profile |
| `PUT` | `/api/profile` | Update the current user's profile |
| `GET` | `/api/skills` | Retrieve available skills |
| `GET` | `/api/issues` | Search or discover issues |
| `GET` | `/api/issues/:id` | Retrieve issue details |
| `GET` | `/api/bookmarks` | Retrieve saved issues |
| `POST` | `/api/bookmarks` | Save an issue |
| `PATCH` | `/api/bookmarks/:id` | Update bookmark or tracking data |
| `DELETE` | `/api/bookmarks/:id` | Remove a bookmark |

### Example health check

```bash
curl http://localhost:4000/api/health
```

### Example issue discovery request

```bash
curl "http://localhost:4000/api/issues"
```

The supported query parameters, response format, and authorization requirements depend on the current route implementation.

---
## 🎨 Design System

ContribMap uses a calm, developer-focused interface inspired by GitHub's practical UI conventions.

| Color | Hex | Usage |
|---|---|---|
| Warm Off-White | `#F2EFE9` | Primary background |
| Deep Slate Blue | `#4F5D65` | Main accents and visual structure |
| Muted Taupe | `#B5ABA0` | Secondary accents and borders |

### Typography

- **Headings:** `Roboto`, `-apple-system`, `BlinkMacSystemFont`, `"Helvetica Neue"`, `"Segoe UI"`, sans-serif.
- **Body text:** `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Helvetica`, `Arial`, sans-serif.
- **Code and technical text:** monospace stacks such as `"SFMono-Regular"`, `Consolas`, and `Inconsolata`.

### Interface principles

- Clear information hierarchy.
- Readable issue cards.
- Consistent spacing and typography.
- Responsive layouts.
- Visible matching explanations.
- Accessible contrast and interaction states.

---

## 🔐 Security

Security is an important part of the application architecture.

ContribMap includes or is designed around the following protections, depending on the route and configuration:

- Authentication middleware for protected resources.
- Request validation.
- Rate limiting.
- Centralized error handling.
- Environment-based secret management.
- Parameterized database queries where supported by the repository layer.

Never trust client-provided user IDs or authorization claims without server-side verification. Protected profile and bookmark operations should always be scoped to the authenticated user.

---

## 🎯 Current Scope

### Included in the MVP

- User authentication and profiles.
- Technical skill selection.
- GitHub issue discovery.
- Issue filtering and matching scores.
- Match explanations.
- Issue details.
- Bookmark management.
- Contribution-status tracking.

### Not included in the current MVP

- Automatically submitting applications to repositories.
- Automatically commenting on GitHub issues.
- Automatically creating pull requests.
- Guaranteeing issue availability or maintainer acceptance.

Contributors can open the original GitHub issue and participate using GitHub's own contribution workflow.

---

## 🚧 Future Enhancements

Potential improvements for future releases include:

- 📊 Contribution history and progress analytics.
- 🔔 Personalized notifications.
- 🧑‍💻 Maintainer profiles and repository management.
- 🧠 More advanced recommendation strategies.
- 📈 Improved matching explanations.
- 🔍 Expanded search and filtering.
- 🕓 Search history.
- 🏆 Contribution milestones and achievements.
- 🌐 Additional integrations with developer platforms.

These are future possibilities, not claims that the features are already implemented.

---

## 🧪 Testing

The backend test suite has been run during development, with **16 tests passing** in that test run.

To run the tests in your current environment:

```bash
npm test
```

If the root test script is not configured for your checkout, use the test script defined in `server/package.json`.

Run the frontend production build before release:

```bash
npm run build
```

Resolve dependency installation or build errors before treating the application as production-ready.

---

## 🤝 Contributing

Contributions, suggestions, bug reports, and improvements are welcome.

### How to contribute

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run relevant tests.
5. Commit your changes with a clear message.
6. Open a pull request describing the improvement.

Example:

```bash
git checkout -b feat/improve-issue-matching
git add .
git commit -m "feat: improve issue matching"
git push origin feat/improve-issue-matching
```

Please avoid committing credentials, generated build artifacts, or unrelated changes.

---

## 📄 License

ContribMap includes a `LICENSE` file in the repository root. Refer to that file for the applicable license and redistribution terms.

---

<div align="center">

### 🌱 Every great contributor starts somewhere.

**Find an issue. Learn something new. Make an impact.**
Made with Bhavesh🙋‍♂️ for the open-source community.

</div>
