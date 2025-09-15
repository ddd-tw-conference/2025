# GitHub Copilot Instructions for DDD Taiwan 2025

Expert AI assistant for DDD Taiwan 2025 Conference website.

## Tech Stack
Next.js 15.5.2 + React 19 + TypeScript + Tailwind CSS + GitHub Pages + i18n (zh-tw/en)

## Core Standards ⚡
- **Files**: kebab-case (`promo-code-copy.tsx`)
- **Package**: `pnpm` only
- **Config**: Use `@/config`, no hardcoded values
- **i18n**: `const { t } = useI18n(); t('key.subkey')` - MANDATORY
- **Styling**: Static Tailwind classes, no string interpolation
- **Routing**: `<Link>` and `router.push()`, avoid `window.location.href`
- **Navigation**: URL params `?id=value` + `useSearchParams()` for state
- **Events**: Use `stopPropagation()` for nested clicks

## Key Patterns
- Config-driven features over hardcoded states
- Multi-language through `t()` function (REQUIRED)
- Event isolation with `stopPropagation()`
- Responsive design (`md:` prefixes)
- Three-layer clipboard fallback (API → execCommand → manual)

## Ticket System 🎫
```typescript
// config/tickets.ts - Current Status
export const TICKET_SALE_CONFIG = {
  isTicketSaleActive: true,        // ✅ Active
  isEarlyBirdSoldOut: true,       // ❌ Sold out
  purchaseUrl: "...",
  promoCode: { isVisible: true, code: "PS3ETZ" }  // ✅ Active
}

// Usage Pattern
{TICKET_SALE_CONFIG.promoCode?.isVisible && <PromoCode />}
```

## Browser Compatibility & React 19
```typescript
// Hydration Fix
<body suppressHydrationWarning={true}>

// Clipboard Fallback (3-layer)
const copyWithFallback = async (text: string) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return 'success'
    }
    // fallback to execCommand
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    const result = document.execCommand('copy')
    document.body.removeChild(textArea)
    return result ? 'success' : 'manual'
  } catch {
    return 'manual'
  }
}
```

## Development Workflow
```bash
# Standard Commands
pnpm dev          # Development mode
pnpm build        # Production build
pnpm build:analyze # Bundle analysis

# Serena AI Integration
uvx --from git+https://github.com/oraios/serena serena project index
```

## Essential Rules 🎯
1. **ALWAYS use t() for text** - No hardcoded strings
2. **Import from @/config** - No magic values
3. **Static Tailwind only** - No className interpolation
4. **stopPropagation()** - For nested event handling
5. **Config-driven features** - Use TICKET_SALE_CONFIG pattern

---
*v6.0 - Refined for clarity and token efficiency*