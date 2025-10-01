# Design Guidelines: AI Cases Dataset Viewer

## Design Approach

**Selected System:** Shadcn UI with Tailwind CSS (Design System Approach)

**Justification:** This is a utility-focused, information-dense application where efficiency, clarity, and usability are paramount. Shadcn UI provides accessible, beautifully crafted components that work seamlessly with Tailwind's utility-first approach, perfect for data-heavy interfaces requiring clear hierarchy and professional aesthetics.

**Key Design Principles:**
- **Clarity First:** Information hierarchy prioritizes quick scanning and comprehension
- **Professional Sophistication:** Modern, refined aesthetic suitable for enterprise contexts
- **Data Density Balance:** Present comprehensive information without overwhelming users
- **Accessibility:** WCAG-compliant with excellent keyboard navigation and screen reader support

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Background: 222 47% 11% (deep slate)
- Surface: 217 33% 17% (elevated cards)
- Border: 217 28% 30% (subtle divisions)
- Primary: 217 91% 60% (vibrant blue - CTAs, links)
- Accent: 142 76% 36% (emerald green - success states, highlights)
- Text Primary: 210 40% 98%
- Text Secondary: 217 11% 65%

**Light Mode:**
- Background: 0 0% 100%
- Surface: 210 20% 98%
- Border: 214 32% 91%
- Primary: 217 91% 60%
- Accent: 142 71% 45%
- Text Primary: 222 47% 11%
- Text Secondary: 215 16% 47%

### B. Typography

**Font Families:**
- Primary: 'Inter' (headings, UI elements)
- Secondary: 'Inter' (body text, data)

**Type Scale:**
- Page Title: text-4xl font-bold (36px)
- Section Headers: text-2xl font-semibold (24px)
- Card Titles: text-lg font-semibold (18px)
- Body: text-base (16px)
- Meta/Labels: text-sm font-medium (14px)
- Captions: text-xs (12px)

### C. Layout System

**Tailwind Spacing Units:** Consistently use 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-4, p-6, p-8
- Section spacing: space-y-6, space-y-8
- Grid gaps: gap-4, gap-6, gap-8
- Margins: m-4, my-8, mx-auto

**Container Strategy:**
- Max width: max-w-7xl mx-auto
- Horizontal padding: px-4 sm:px-6 lg:px-8
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

### D. Component Library

**Navigation:**
- Fixed header with brand, search bar, and view toggles
- Breadcrumb navigation in detail views
- Subtle shadow on scroll: shadow-sm

**List/Grid View:**
- Card-based design with hover elevation
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Card styling: rounded-lg border bg-card shadow-sm hover:shadow-md
- Each card displays: title, category badge, key metrics, brief description, "View Details" link

**Filters & Search:**
- Left sidebar (desktop) or collapsible drawer (mobile)
- Search input with magnifying glass icon
- Category filters as checkboxes grouped by type
- Clear filters button
- Applied filters shown as dismissible badges

**Detail View:**
- Two-column layout on desktop (8-col content, 4-col metadata sidebar)
- Stacked on mobile
- Information grouped in sections with clear headers
- Metadata cards in sidebar: category, status, date, tags
- Related cases section at bottom

**Data Display:**
- Use tables for structured comparison data
- Badge components for categories/tags: rounded-full px-3 py-1 text-xs
- Definition lists for key-value pairs
- Progress indicators if relevant to AI case metrics

**Interactive Elements:**
- Primary buttons: solid primary color, rounded-md px-4 py-2
- Secondary buttons: outline variant
- Links: underline-offset-4 hover:underline
- Cards: Interactive with subtle hover states

### E. Animations

**Minimal & Purposeful:**
- Card hover: transition-shadow duration-200
- Page transitions: fade-in only (no slides or complex animations)
- Filter panel: smooth expand/collapse (transition-all duration-300)
- No decorative animations - functionality over flair

## Images

**Hero Section:**
- **Location:** Top of landing/home page
- **Description:** Abstract visualization of AI/data concepts - interconnected nodes, neural networks, or geometric patterns suggesting intelligence and organization. Gradient overlay from transparent to background color for text readability
- **Dimensions:** Full-width, height 40vh to 50vh
- **Treatment:** Subtle blur or opacity overlay, ensure high contrast for overlaid text

**Additional Images:**
- Optional case thumbnails if dataset includes images
- Icon library: Lucide Icons (via Shadcn UI) for UI elements

## Page-Specific Layouts

**List View:**
- Hero with search bar and filter count
- Filter sidebar + main grid area
- Pagination or infinite scroll at bottom
- Empty state with illustration if no results

**Detail View:**
- Breadcrumb navigation
- Page header with title and primary action
- Content area with progressive disclosure (tabs or accordion if extensive data)
- Sidebar with at-a-glance metadata
- Related/similar cases carousel