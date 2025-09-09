# GitHub Copilot Instructions for DDD Taiwan 2025

You are an expert AI programming assistant for the DDD Taiwan 2025 Conference website project.

## Project Context
- **Tech Stack**: Next.js 15.5.2 + React 19 + TypeScript + Tailwind CSS
- **Deployment**: Static export (`output: 'export'`) to GitHub Pages
- **Languages**: Multilingual (zh-tw/en) with custom i18n system
- **Integration**: Accupass ticketing system

## Architecture Overview
```
app/                    # Next.js App Router pages
components/             # Reusable components + shadcn/ui
├── layout/            # Header, footer, hero sections
├── ui/                # shadcn/ui components
└── version-monitor.tsx # Debug tool (Ctrl+Shift+V)
config/                # Centralized configuration
lib/                   # Utilities, i18n, paths
locales/               # zh-tw.json, en.json
```

## Development Standards

### Core Requirements
- **Package Manager**: `pnpm` only (`pnpm dev`, `pnpm build`, `pnpm lint`)
- **Configuration**: All config from `@/config`, use getter functions for external links
- **Routing**: Use `<Link>` and `router.push()`, avoid `window.location.href`
- **Styling**: Static Tailwind classes with switch/case, no string interpolation
- **i18n**: `const { t } = useI18n(); t('key.subkey')` pattern

### UI/UX Patterns
- **Buttons**: Primary `bg-gradient-to-r from-blue-600 to-purple-600`, Secondary `bg-white/10`
- **Interactive**: Always add `cursor-pointer` + `hover:scale-105`
- **Responsive**: `md:grid-cols-2` for desktop, stack on mobile
- **Images**: WebP only, use `getOptimizedImagePath()`
- **Copy Actions**: Yellow theme (`bg-yellow-400/20`, `text-yellow-100`) with state icons
- **Feedback States**: Success (green) vs Manual (yellow) vs Error (red)
- **Animations**: `animate-fade-in` for state transitions, `transition-all duration-200` for interactions

## Ticket Marketing Architecture

### Configuration-Driven Design
```typescript
// config/tickets.ts
export const TICKET_SALE_CONFIG: TicketSaleConfig = {
  isTicketSaleActive: boolean,
  isEarlyBirdSoldOut?: boolean,
  purchaseUrl: string,
  promoCode?: { 
    isVisible: boolean, 
    code?: string 
  }
}
```

### Component Strategy
- **Marketing Section**: `TicketMarketingSection` for promotional content
- **Layout Optimization**: Regular ticket (left, prominent) + Early bird (right, muted)
- **State Management**: Use config flags for conditional rendering
- **Visual Hierarchy**: Gradient effects for active, grayscale for sold-out
- **Interactive Features**: Click-to-copy promo codes with fallback mechanisms

### Implementation Patterns
```tsx
// Conditional rendering based on config
{TICKET_SALE_CONFIG.promoCode?.isVisible && <PromoCode />}

// Visual hierarchy: active vs sold-out
const ticketStyle = isAvailable 
  ? "bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-purple-900/60"
  : "bg-slate-800/30 opacity-60"

// Multi-language support
<h2>{t('tickets.regularTitle')}</h2>
```

## Key Patterns & Solutions
1. **Config-driven features**: Use config flags instead of hardcoded states
2. **Visual hierarchy**: Prominent (gradient + effects) vs Muted (grayscale + opacity)  
3. **Interactive elements**: `cursor-pointer` + `hover:scale-105` + visual state changes
4. **Layout optimization**: Main content left, secondary right for better UX flow
5. **Multi-language**: All user-facing text through `t()` function with `tickets.*` namespace
6. **Clipboard compatibility**: Three-layer fallback (Clipboard API → execCommand → manual)
7. **State feedback**: Visual confirmation with timeout-based state reset

## Browser Compatibility Patterns

### Clipboard API Strategy
```typescript
// Three-layer fallback approach
const copyWithFallback = async (text: string) => {
  try {
    // Layer 1: Modern Clipboard API (secure contexts)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return 'success'
    }
    
    // Layer 2: Legacy execCommand (broader support)
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    document.body.appendChild(textArea)
    textArea.select()
    const result = document.execCommand('copy')
    document.body.removeChild(textArea)
    
    return result ? 'success' : 'manual'
  } catch {
    return 'manual' // Fallback to manual copy UI
  }
}
```

### State Management for UX
```typescript
const [copyState, setCopyState] = useState<'idle' | 'success' | 'manual'>('idle')

// Auto-reset with different timeouts for different states
useEffect(() => {
  if (copyState !== 'idle') {
    const timeout = copyState === 'manual' ? 4000 : 2000
    const timer = setTimeout(() => setCopyState('idle'), timeout)
    return () => clearTimeout(timer)
  }
}, [copyState])
```

## Performance Optimization
- **Images**: Pure WebP strategy, 90%+ size reduction
- **Static Export**: `outputFileTracingRoot` to project root
- **Code Splitting**: Lazy load non-critical components
- **Bundle Analysis**: Monitor route sizes in build output

## Development Workflow
### Pre-Development
- [ ] `pnpm dev` ready + check `isTicketSaleActive` status

### Implementation
- [ ] Config-driven features (avoid hardcoding)
- [ ] i18n for all text (`t()` function)
- [ ] Responsive design (`md:` prefixes)
- [ ] Visual hierarchy (prominent vs muted)

### Verification
- [ ] `pnpm build` success
- [ ] Multi-language switching works
- [ ] Button states reflect config
- [ ] Layout adapts mobile/desktop

## Documentation Standards
- **Focus**: Final implementation state, remove development history
- **Structure**: Problem → Solution → Implementation → Maintenance
- **Examples**: Complete code blocks with proper imports
- **Maintenance**: Clear operational guides for content updates

---
*Last Updated: January 9, 2025 | v4.1 - Added clipboard compatibility & promo code functionality*