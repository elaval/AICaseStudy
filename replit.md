# AI Cases Dataset Viewer

## Overview

This is a full-stack web application for browsing and exploring AI case studies. The application presents a dataset of AI implementations across various industries and categories, providing search, filtering, and detailed viewing capabilities. Built with a modern React frontend and Express backend, it uses a PostgreSQL database (via Drizzle ORM) for data persistence and features a dark/light theme with a sophisticated UI powered by Shadcn UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript and Vite as the build tool

**UI Component System**: Shadcn UI (based on Radix UI primitives) with Tailwind CSS for styling. This provides:
- Accessible, pre-built components with WCAG compliance
- Consistent design system with customizable theming
- Dark/light mode support through ThemeProvider
- Inter font family for typography

**State Management**: 
- React Query (@tanstack/react-query) for server state management and data fetching
- Local React state (useState, useMemo) for UI interactions like filters and search
- Currently uses static JSON data (ai-cases.json) but architected for API integration

**Routing**: Wouter for lightweight client-side routing

**Key Features**:
- Hero section with search functionality
- Filter sidebar supporting category and status filters
- Card-based grid layout for case listings
- Detail view for individual cases
- Empty state handling
- Theme toggling (dark/light modes)

**Design System**:
- Custom color palette defined in CSS variables for both light and dark modes
- Sophisticated border and shadow system for depth
- Consistent spacing and typography scale
- Professional, data-dense design suitable for enterprise contexts

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js

**API Structure**: RESTful API with `/api` prefix for all routes (currently minimal implementation)

**Build Process**:
- Development: TSX for hot reloading
- Production: esbuild for bundling server code
- Frontend built separately with Vite

**Storage Layer**: 
- Interface-based storage abstraction (IStorage)
- In-memory implementation (MemStorage) for development
- Designed to swap with database-backed implementation
- Supports user management and AI cases CRUD operations

**Development Features**:
- Request/response logging middleware
- Vite integration for HMR in development
- Error handling middleware
- Session support ready (connect-pg-simple dependency present)

### Data Storage

**ORM**: Drizzle ORM with PostgreSQL dialect

**Database Schema** (defined in shared/schema.ts):
1. **users** table:
   - id (UUID primary key)
   - username (unique text)
   - password (text)

2. **ai_cases** table:
   - id (UUID primary key)
   - Core fields: title, category, status, description
   - Metadata: industry, technology, impact, dateImplemented, organization
   - Additional: keyMetrics, challenges, solutions

**Migration Strategy**: Drizzle Kit for schema migrations with `db:push` command

**Current Data Source**: Static JSON file (ai-cases.json) containing pre-populated case studies, ready to be migrated to database

### External Dependencies

**Database**:
- PostgreSQL via @neondatabase/serverless (Neon Database integration)
- Drizzle ORM for type-safe database operations
- Connection via DATABASE_URL environment variable

**UI Component Libraries**:
- Radix UI primitives (@radix-ui/*) for accessible component foundations
- Lucide React for iconography
- Embla Carousel for carousel components
- CMDK for command palette functionality
- React Hook Form with Zod resolvers for form validation

**Utilities**:
- class-variance-authority (CVA) for component variant management
- clsx and tailwind-merge for className composition
- date-fns for date formatting and manipulation

**Build & Development Tools**:
- Vite for frontend bundling and development
- esbuild for backend bundling
- TypeScript for type safety
- Replit-specific plugins for development environment integration

**Styling**:
- Tailwind CSS for utility-first styling
- PostCSS with Autoprefixer
- Custom CSS variables for theming

**Data Validation**:
- Zod for runtime type validation
- Drizzle-zod for schema-to-Zod type generation