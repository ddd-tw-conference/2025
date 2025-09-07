# GitHub Copilot Instructions for DDD Taiwan 2025

You are an expert AI programming assistant for the DDD Taiwan 2025 Conference website project.

## Project Context
- **Purpose**: Conference website for DDD Taiwan 2025
- **Tech Stack**: Next.js 15.5.2 + TypeScript + Tailwind CSS
- **Deployment**: Static export to GitHub Pages
- **Languages**: Multilingual support (zh-tw/en)
- **Integration**: Accupass ticketing system

## Architecture Overview
- **Framework**: Next.js 15.5.2 (App Router) + React 19 + TypeScript
- **UI Library**: Tailwind CSS + shadcn/ui components
- **Deployment**: Static export (`output: 'export'`) to GitHub Pages
- **Internationalization**: Custom i18n system (zh-tw/en)
- **External Services**: Accupass ticketing integration

## Key Files & Directories
```
app/
├── tickets/page.tsx    # Ticketing page with Accupass integration
├── not-found.tsx      # 404 page with smart contact features
└── error.tsx          # Error handling page

components/
├── layout/
│   ├── header.tsx     # Responsive fixed navigation
│   ├── footer.tsx     # Site footer
│   └── hero-section.tsx # Landing page hero
└── ui/                # shadcn/ui components

contexts/
└── i18n-context.tsx   # Internationalization context

lib/
├── data/               # Speaker/agenda data modules (multilingual)
├── i18n.ts           # Internationalization core
└── utils.ts          # Utility functions

config/
├── tickets.ts        # Ticket sale controls & purchase URL
├── agenda.ts         # Session patterns & time calculations
└── app.ts            # Application configuration

locales/
├── zh-tw.json        # Traditional Chinese
└── en.json           # English
```

## Development Guidelines

### Primary Technology Stack
- **Package Manager**: pnpm (required for all operations)
- **Runtime Commands**: `pnpm dev`, `pnpm build`, `pnpm lint`
- **Build Target**: Static export for GitHub Pages deployment

### Auxiliary Tools Usage
- **Python Environment**: Only use if explicit Python scripts exist in project
- **Configuration Priority**: Next.js/Node.js solutions preferred over Python alternatives
- **Tool Selection**: Prefer project-native tools unless specific requirements demand alternatives

### Next.js 15.5.2 Best Practices
- Image configuration uses `localPatterns` with multiple search patterns (`search: ''` and `search: '?v=*'`)
- For static exports, set `outputFileTracingRoot` to project root directory

### Tailwind CSS Guidelines
- **Dynamic Classes**: Avoid string interpolation; use static switch/case definitions
- **Safelist Protection**: Add frequently-used dynamic classes to safelist if needed
- **Cursor Styling**: Always explicitly set `cursor-pointer` for interactive elements

### SSR/CSR Consistency
- Avoid non-deterministic functions (`Math.random()`, `Date.now()`) in rendering logic
- Use deterministic seeds for UI state to ensure server-client consistency

### Responsive Design
- Choose appropriate breakpoints based on content needs (e.g., `xl` to prevent content hiding on medium screens)

### Debugging Workflow
- Categorize errors (build, runtime, display) and prioritize blocking issues
- Perform root cause analysis and regression testing

### Internationalization
- Use type-safe functions like `getLocalizedText` for multilingual data access
- Ensure default language fallback consistency
```tsx
// Correct usage
const { t } = useI18n()
<button>{t('button.contactUs')}</button>

// Data structure
interface Speaker {
  name: { 'zh-tw': string; 'en': string }
  bio: { 'zh-tw': string; 'en': string }
}
```

### UI & Navigation Standards
```tsx
// Primary button: bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold
// Secondary button: bg-white/10 border-white/30 text-white backdrop-blur-sm font-medium hover:bg-white/20
// Fixed header: relative z-50 md:fixed md:top-0 md:left-0 md:right-0
// Header spacing: <div className="hidden md:block h-20"></div>

// Navigation patterns
Internal pages: <Link href="/tickets">
Programmatic: router.push('/agenda')
External links: <Button asChild><a href="url" target="_blank">
Purchase: window.open(getTicketPurchaseUrl(), '_blank')
```

### Git & Debugging
```bash
git checkout HEAD -- path/to/file.tsx  # Restore files
git status && git diff                  # Review changes
```
- Categorize errors: build, runtime, display
- Use deterministic functions (avoid Math.random(), Date.now())

### External Link Management
- All external links (e.g., Accupass ticket URLs) must be managed in configuration files (such as `config/tickets.ts`)
- Do not hardcode external URLs in components, pages, or documentation
- Always use getter functions from configuration for referencing external links in code, documentation, and examples
- This ensures maintainability, consistency, and easy future updates

## Ticketing System

### Configuration
```typescript
export interface TicketSaleConfig {
  isTicketSaleActive: boolean
  earlyBirdSaleStartDate?: string // YYYY-MM-DD format
  regularSaleStartDate?: string // YYYY-MM-DD format
  saleEndDate?: string // YYYY-MM-DD format
  purchaseUrl: string // Accupass 購票連結
}

export const TICKET_SALE_CONFIG: TicketSaleConfig = {
  isTicketSaleActive: true,
  earlyBirdSaleStartDate: "2025-09-03",
  regularSaleStartDate: "2025-10-16",
  saleEndDate: "2025-11-07",
  purchaseUrl: "https://www.accupass.com/eflow/ticket/2508301008076132622520"
}

export const getTicketPurchaseUrl = (): string => TICKET_SALE_CONFIG.purchaseUrl

// Ticket purchase implementation
const handleTicketClick = () => {
  window.open(getTicketPurchaseUrl(), '_blank')
}
```

## Resolved Issues (Key Patterns)

1. **Button Readability**: Use `bg-white/10` for transparent button contrast
2. **SPA Routing**: Use Next.js `<Link>` and `router.push()`, avoid `window.location.href`
3. **Email Contact**: Add error handling with clipboard fallback for `mailto:`
4. **External Services**: Use `window.open()` with proper URL parameters
5. **Fixed Header**: `relative z-50 md:fixed md:top-0` + spacing `h-20`
6. **File Recovery**: `git checkout HEAD -- filename` to restore corrupted files
7. **Tailwind Dynamic Classes**: Use static definitions instead of string interpolation
8. **Documentation**: Focus on final conclusions, remove historical development records

## Documentation Standards

### Content Organization
- **Structure**: Overview → Implementation → Results → Future
- **Clarity**: Remove version history, keep only current final state
- **Consistency**: Ensure naming consistency across all files (e.g., 基礎知識 not 知識科普)
- **Readability**: Use logical flow that guides readers from concept to implementation

## Development Checklist

### Pre-Development
- [ ] `pnpm dev` to start local environment  
- [ ] Check `isTicketSaleActive` status

### Verification
- [ ] Button contrast ≥ 4.5:1, use i18n (`t()` function), responsive design
- [ ] Internal routing (Next.js methods), external links (Accupass), language switching
- [ ] `pnpm build` success, static files in `out/`, images in `public/`

### Pre-Deployment
- [ ] **Instructions Update Protocol**: After modifications, assess copilot-instructions.md updates:
    - New patterns/solutions discovered
    - API/configuration changes  
    - Technical challenges resolved
    - Documentation improvements and content organization
    - **Optimization guidelines**: Balance clarity, conciseness, and completeness
        - Remove redundant sections and version histories
        - Focus on final conclusions over development process
        - Use compact formats for reference information
        - Prioritize actionable guidance and current best practices
    - Confirm with user before git operations

## Contact Information
- **Technical Support**: dddtw2018@gmail.com
- **Repository**: ddd-tw-conference/2025
- **Deployment**: GitHub Pages

---
*Last Updated: September 7, 2025 | v2.6 - Added Tailwind CSS guidelines, documentation standards, and updated version numbers*