# GitHub Copilot Instructions for DDD Taiwan 2025

You are an expert AI programming assistant for the DDD Taiwan 2025 Conference website project.

## Project Context
- **Purpose**: Conference website for DDD Taiwan 2025
- **Tech Stack**: Next.js 15 + TypeScript + Tailwind CSS
- **Deployment**: Static export to GitHub Pages
- **Languages**: Multilingual support (zh-tw/en)
- **Integration**: Accupass ticketing system

## Architecture Overview
- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
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

components/layout/
└── header.tsx         # Responsive fixed navigation

lib/
├── ticket-config.ts   # Ticket sale controls (isTicketSaleActive)
├── data/conference.ts # Speaker/agenda data (multilingual)
└── i18n.ts           # Internationalization core

locales/
├── zh-tw.json        # Traditional Chinese
└── en.json           # English
```

## Development Guidelines

### Command Operations
- Prefer command-line operations for cross-platform consistency
- Use `pnpm` commands for execution, compilation, and debugging (`pnpm dev`, `pnpm build`, `pnpm lint`)

### Next.js 15 Best Practices
- Image configuration must support query strings (`localPatterns` with `search: '?*'`)
- For static exports, set `outputFileTracingRoot` to project root directory

### SSR/CSR Consistency
- Avoid non-deterministic functions (`Math.random()`, `Date.now()`) in rendering logic
- Use deterministic seeds (dates, indices) for UI state to ensure server-client consistency

### Responsive Design
- Choose appropriate breakpoints based on content needs (e.g., `xl` to prevent content hiding on medium screens)

### Debugging Workflow
- Categorize errors (build, runtime, display) and prioritize blocking issues
- Perform root cause analysis and regression testing

### Internationalization Type Safety
- Use type-safe functions like `getLocalizedText` for multilingual data access
- Ensure default language fallback consistency

### Git Best Practices
```bash
# Restore damaged files using Git
git checkout HEAD -- path/to/damaged-file.tsx

# Check file modification status
git status

# View specific modifications
git diff path/to/file.tsx
```

### UI Design Patterns
```tsx
// Primary buttons with gradient and high contrast
<Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">

// Secondary buttons with transparency and glass effect
<Button className="bg-white/10 border-white/30 text-white backdrop-blur-sm font-medium hover:bg-white/20">

// Responsive fixed header (desktop fixed, mobile relative)
<header className="relative z-50 md:fixed md:top-0 md:left-0 md:right-0">

// Spacing to prevent fixed header overlap
<div className="hidden md:block h-20"></div>
```

### Navigation Standards
| Scenario | Method | Example |
|----------|--------|---------|
| Internal pages | `<Link>` + `asChild` | `<Button asChild><Link href="/tickets">` |
| Programmatic navigation | `router.push()` | `router.push('/agenda')` |
| External links | `window.open()` | `window.open(ticketUrl, '_blank')` |

### Internationalization Usage
```tsx
// Correct approach
const { t } = useI18n()
<button>{t('button.contactUs')}</button>

// Data structure
interface Speaker {
  name: { 'zh-tw': string; 'en': string }
  bio: { 'zh-tw': string; 'en': string }
}
```

## Ticketing System

### Configuration
```typescript
export const TICKET_SALE_CONFIG = {
  isTicketSaleActive: true,
  earlyBirdSaleStartDate: "2025-09-03",
  regularSaleStartDate: "2025-10-16"
}

// Ticket purchase implementation
const handleTicketClick = () => {
  const ticketUrl = 'https://www.accupass.com/event/2508301008076132622520'
  window.open(ticketUrl, '_blank', 'noopener,noreferrer')
}
```

## Resolved Issues

### 1. Button Readability ✅
- **Issue**: Transparent button text was unclear
- **Solution**: Added `bg-white/10` background for better contrast

### 2. Routing Issues ✅  
- **Issue**: `window.location.href` breaks SPA routing
- **Solution**: Use Next.js `<Link>` and `router.push()` consistently

### 3. Email Contact ✅
- **Issue**: `mailto:` shows blank in some environments
- **Solution**: Error handling with clipboard fallback

### 4. Accupass Integration ✅
- **Issue**: Ticket button couldn't connect to external service
- **Solution**: Use `window.open()` with correct URL parameters

### 5. Fixed Navigation Header ✅
- **Issue**: Long homepage content requires scrolling back to top for navigation
- **Solution**: Fixed header on desktop, relative on mobile
- **Implementation**: `relative z-50 md:fixed md:top-0 md:left-0 md:right-0`
- **Companion**: Add `<div className="hidden md:block h-20"></div>` to prevent overlap

### 6. Git File Recovery ✅
- **Issue**: Editor accidentally corrupting file content
- **Solution**: Use `git checkout HEAD -- filename` to restore files
- **Prevention**: Avoid deleting and recreating files (loses Git history)

## Development Checklist

### Pre-Development
- [ ] `pnpm dev` to start local environment  
- [ ] Check `isTicketSaleActive` status

### UI Verification
- [ ] Button contrast ratio ≥ 4.5:1
- [ ] All text uses i18n (`t()` function)
- [ ] Responsive design (sm/md/lg)
- [ ] Header correctly fixed on desktop

### Functionality Testing
- [ ] Internal routing uses Next.js methods
- [ ] Ticket links properly open Accupass
- [ ] Language switching works correctly
- [ ] Contact features have error handling

### Pre-Deployment
- [ ] `pnpm build` completes without errors
- [ ] Static files generated to `out/` directory
- [ ] All images located in `public/`

## Contact Information
- **Technical Support**: dddtw2018@gmail.com
- **Repository**: ddd-tw-conference/2025
- **Deployment**: GitHub Pages

---
*Last Updated: September 6, 2025 | v2.3 - Added AI-assisted debugging experience and best practices*
