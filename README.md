# Tutorial Platform

A professional tutorial/mentorship platform built with React, TypeScript, and modern web technologies.

## 🎨 Design Theme

**Professional Academy** - Clean, trustworthy educational platform aesthetic

- **Primary Color**: Deep Blue (#1e40af)
- **Accent Color**: Vibrant Orange (#f59e0b)
- **Typography**: Inter (body), Outfit (headings)

## 🚀 Tech Stack

- **Framework**: React 18+ with Vite 5+
- **Language**: TypeScript 5+
- **Routing**: React Router DOM 6+
- **Styling**: Tailwind CSS
- **UI Components**: Ant Design
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Backend (Future)**: Firebase (Auth, Firestore, Storage, Functions)
- **Package Manager**: Bun

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── layout/          # Layout components (Header, Footer, etc.)
│   ├── student/         # Student-specific components
│   └── admin/           # Admin/instructor components
├── pages/
│   ├── public/          # Landing, About, Pricing, Contact
│   ├── auth/            # Login, Signup, Password Reset
│   ├── student/         # Student dashboard pages
│   └── admin/           # Admin dashboard pages
├── routes/              # React Router configuration
├── styles/              # Global styles & theme
├── lib/
│   ├── services/        # API service layer
│   └── mockData/        # Mock data for development
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── config/              # Firebase and other configs
```

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

### Development

Start the development server:

```bash
bun run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
bun run build
```

Preview the production build:

```bash
bun run preview
```

## 🎯 Features (Planned)

### For Students

- AI-powered personalized curriculum
- Progress tracking and analytics
- Resource library with bookmarks
- Meeting scheduling with instructor
- Certificate generation and sharing
- Interactive learning modules

### For Instructors/Admins

- Student management dashboard
- Curriculum builder with drag-and-drop
- Submission review queue with AI assistance
- Analytics and reporting
- Meeting calendar management
- Certificate issuance

## 🔐 Firebase Setup (Future)

When ready to integrate Firebase:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Copy `.env.example` to `.env`
3. Add your Firebase configuration to `.env`
4. Uncomment Firebase initialization in `src/config/firebase.ts`

## 📝 Development Roadmap

See [frontend_implementation_plan.md](/.gemini/antigravity/brain/28621f2d-0bf7-4f2d-b273-57361bfd2079/frontend_implementation_plan.md) for the complete development plan.

Current progress tracked in [task.md](/.gemini/antigravity/brain/28621f2d-0bf7-4f2d-b273-57361bfd2079/task.md).

## 🎨 Design System

- **Colors**: Professional Academy theme with deep blue primary and vibrant orange accent
- **Typography**: Google Fonts (Inter, Outfit)
- **Components**: Ant Design with custom theme
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Icons**: Lucide React for consistent iconography

## 📄 License

Private project - All rights reserved

---

**Status**: 🚧 Phase 1 Complete - Project setup and foundation ready
