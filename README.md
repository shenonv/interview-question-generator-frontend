# AI Interview Question Generator

A modern web application that generates personalized interview questions based on job roles, built with Next.js 13+ and TypeScript.

## Features

- 🔐 User Authentication System
  - Login/Signup functionality
  - Protected routes using AuthGuard
  - Token-based authentication

- 💼 Role-based Interview Questions
  - Select specific job roles
  - Personalized question generation
  - Progress tracking during interviews

- 🎨 Modern UI/UX
  - Responsive design using Tailwind CSS
  - Dark/Light theme support
  - Loading states and transitions
  - Toast notifications
  - Sidebar navigation

- 📊 Results Analysis
  - Interview completion tracking
  - Answer summaries
  - Performance metrics

## Tech Stack

- **Framework**: [Next.js 13+](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: 
  - [shadcn/ui](https://ui.shadcn.com/)
  - [Radix UI](https://www.radix-ui.com/)
  - [Lucide Icons](https://lucide.dev/)
- **State Management**: Custom store implementation

## Project Structure

```
├── app/                 # Next.js 13 app directory
│   ├── api/            # API routes
│   ├── dashboard/      # Dashboard pages
│   ├── interview/      # Interview interface
│   ├── login/         # Authentication pages
│   ├── results/       # Results display
│   └── role-selection/ # Role selection interface
├── components/         # Reusable components
├── hooks/             # Custom React hooks
├── lib/               # Utilities and helpers
├── public/            # Static assets
└── styles/            # Global styles
```

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

