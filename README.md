# Project Overview

Mini Quiz Ambis adalah platform kuis berbasis web untuk membantu pengguna berlatih dan menguji pengetahuan melalui berbagai subtest.

## Tech Stack

- Frontend: Next.js (App Router)
  - Library:
    - tailwind-merge
    - cva
    - clsx
    - shadcn ui
    - react-hook-form
    - zod validation
    - tanstack react query
    - zustand
- Backend (AI-generated)

## Folder Structure

```
.
└── mini-quiz/
    ├── public
    ├── src/
    │   ├── app/
    │   │   ├── (auth)/
    │   │   │   ├── login/
    │   │   │   │   ├── _components/
    │   │   │   │   ├── _hooks/
    │   │   │   │   └── page.tsx
    │   │   │   ├── register/
    │   │   │   │   ├── _components/
    │   │   │   │   ├── _hooks/
    │   │   │   │   ├── success/
    │   │   │   │   └── page.tsx
    │   │   │   └── layout.tsx
    │   │   ├── (dashboard)/
    │   │   ├── api/
    │   │   │   ├── auth/
    │   │   │   ├── profile/
    │   │   │   └── quiz/
    │   │   ├── favicon.ico
    │   │   ├── global.css
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── components/
    │   │   ├── common/
    │   │   └── ui/
    │   ├── config/
    │   ├── constants/
    │   ├── hooks/
    │   ├── libs/
    │   │   ├── axios/
    │   │   ├── store/
    │   │   └── utils.ts
    │   ├── provider/
    │   ├── services/
    │   ├── types/
    │   ├── validations/
    │   └── proxy.ts
    ├── .env.example
    ├── .gitignore
    ├── components.json
    ├── eslint.config.mjs
    ├── next-env.d.ts
    ├── next.config.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── README.md
    └── tsconfig.json
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/gemadp01/mini-quiz.git
```

Go to the project directory

```bash
  cd mini-quiz
```

Copy .env from .env.example

```bash
    cp .env.example .env
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Authors

- [@gemadp01](https://www.github.com/gemadp01)
