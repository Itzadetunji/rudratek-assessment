# 🚀 Check Jobs

> A responsive jobs listing application with search, sort, and pagination. Browse opportunities, view details, and toggle dark mode with a glassmorphic UI.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Testing](#testing)

---

<a name="overview"></a>
## 🎯 Overview

Check Jobs is a modern web application for browsing and exploring job listings. The platform allows users to:

- **Browse Jobs**: View paginated job listings with title, department, location, role type, and posted date
- **Search**: Filter jobs by title, department, location, or role type
- **Sort**: Sort by any column (ascending or descending) with backend-driven ordering
- **View Details**: Navigate to individual job pages with full information
- **Dark Mode**: Toggle between light and dark themes with persistent preference

---

<a name="features"></a>
## ✨ Features

- 📋 **Jobs List**: Paginated table with search and sortable columns
- 🔍 **Search**: Debounced search across title, department, location, and role type
- ⬆️⬇️ **Sorting**: Click column arrows to sort; default is posted date descending
- 📄 **Job Details**: Dedicated page for each job with card-based layout
- 🌙 **Dark Mode**: Toggle with localStorage persistence and system preference fallback
- 🎨 **Glassmorphic UI**: Translucent surfaces with backdrop blur
- 📱 **Responsive**: Mobile-first layout with collapsible navbar
- ⚡ **Fast**: Built with Next.js 16, React 19, and TanStack Query
- 🧪 **Tested**: API routes covered with Bun test

---

<a name="getting-started"></a>
## 🚀 Getting Started

### Prerequisites

- Node.js 20+ or Bun
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/rudratek-assessment
cd rudratek-assessment
```

2. **Install dependencies**

```bash
npm install
# or
bun install
```

3. **Run the development server**

```bash
npm run dev
# or
bun dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

<a name="tech-stack"></a>
## 🛠 Tech Stack

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

### Backend

- **API Routes**: Next.js API Routes
- **Data**: In-memory dataset with [Faker](https://fakerjs.dev/) (40 jobs)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Development Tools

- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Testing**: [Bun Test](https://bun.sh/docs/cli/test)
- **Linting**: [Biome](https://biomejs.dev/)

---

<a name="screenshots"></a>
## 📸 Screenshots

### Jobs List Page

![Jobs List](./public/screenshots/jobs-list.png)

*Browse jobs with search, sort, and pagination.*

---

### Job Details Page

![Job Details](./public/screenshots/job-details.png)

*View full job information in a card layout.*

---

### Dark Mode

![Dark Mode](./public/screenshots/dark-mode.png)

*Toggle between light and dark themes.*

---

<a name="project-structure"></a>
## 📁 Project Structure

```
rudratek-assessment/
├── app/
│   ├── api/                    # API routes
│   │   └── jobs/
│   │       ├── route.ts        # GET /api/jobs (list, search, sort, paginate)
│   │       └── [id]/route.ts   # GET /api/jobs/:id (single job)
│   ├── jobs/                   # Jobs pages
│   │   ├── page.tsx            # Jobs list
│   │   └── [job_id]/page.tsx   # Job details
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── layout/
│   │   └── navbar.tsx          # Shared navbar with dark mode toggle
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── jobs/                   # Job types and data
│   │   ├── types.ts
│   │   └── data.ts
│   └── utils/
│       ├── api-error.ts        # Standardized error responses
│       └── axios.ts            # API client
├── providers/
│   └── query-provider.tsx      # TanStack Query provider
└── public/                     # Static assets
    ├── favicon.ico
    ├── theme-init.js           # Theme script (no flash)
    └── screenshots/            # README screenshots
```

---

<a name="testing"></a>
## 🧪 Testing

Run the test suite:

```bash
npm test
# or
bun test
```

Run only API tests:

```bash
bun run test:api
```

### Test Cases

![Test Cases](./public/screenshots/test-cases.png)

*API route tests with Bun.*
