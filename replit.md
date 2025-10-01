# AI Cases Dataset Viewer

## Overview

This is a **pure static web application** for browsing and exploring AI case studies, deployable to GitHub Pages or any static hosting service. The application presents a dataset of 102 AI implementations across various industries and categories, providing search, filtering, and detailed viewing capabilities. Built with React and TypeScript, it uses a static JSON data file (parsed from Excel) and features a dark/light theme with a sophisticated UI powered by Shadcn UI components.

**Deployment Ready**: This app is fully static with no backend dependencies and can be deployed to GitHub Pages, Netlify, Vercel, or any static hosting service.

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
- Local React state (useState, useMemo) for UI interactions like filters and search
- Static JSON data loaded at build time from client/src/data/ai-cases.json
- All data processing (filtering, searching) happens client-side

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

### Data Source

**Excel to JSON Conversion**: 
- Source: Excel file at `attached_assets/Report Summary_1759337111366.xlsx`
- Parser script: `scripts/parse-excel.js` (Node.js script using xlsx package)
- Output: `client/src/data/ai-cases.json` containing 102 AI cases

**Data Processing**:
- Excel file is parsed once at build time
- Data is mapped to AICase schema with deterministic IDs
- Only relevant cases (is_relevant=true) are included
- Categories extracted from use_case_tags, statuses derived from relevance_score

**Schema** (defined in shared/schema.ts):
- id: Deterministic ID from sector-title-index
- Core fields: title, category, status, description
- Metadata: industry, technology, impact, dateImplemented, organization
- Additional: keyMetrics, challenges, solutions

**Static Deployment**: 
- JSON data is bundled with the frontend at build time
- No database or backend API required
- All filtering and search happens client-side

### External Dependencies

**Data Processing** (build-time only):
- xlsx for parsing Excel files (used in scripts/parse-excel.js)

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