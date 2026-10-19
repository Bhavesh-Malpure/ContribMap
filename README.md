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
