# GitHub Copilot Instructions for DDD Taiwan 2025

## Tech Stack
Next.js 15.5.2 + React 19 + TypeScript + Tailwind CSS + i18n (zh-tw/en)

## Core Standards
- **Files**: kebab-case, **Package**: `pnpm` only
- **Config**: Use `@/config`, no hardcoded values
- **i18n**: `const { t } = useI18n(); t('key.subkey')` - **MANDATORY**
- **Styling**: Static Tailwind classes, no string interpolation
- **Routing**: `<Link>` and `router.push()`
- **Navigation**: URL params `?id=value` + `useSearchParams()`
- **Events**: Use `stopPropagation()` for nested clicks

## Key Patterns
- Config-driven features (`TICKET_SALE_CONFIG`)
- Multi-language with `t()` function (REQUIRED)
- Data linking via IDs: `speakerIds` arrays + `getSpeakerById()`
- Backward compatibility: Check `array.length` before rendering
- Speaker ID format: kebab-case (`"michael-chen"`)
- Color constraints: `"blue" | "purple" | "green" | "indigo" | "orange" | "pink"`

## Data Architecture
```typescript
// Segment structure: speakerIds links to speakers.ts
interface Segment {
  speakerIds: string[]  // Query with getSpeakerById()
  type: 'knowledge' | 'workshop' | 'practice' | 'break'
}
// Conditional: {segment.speakerIds.length > 0 && <ExpertInfo />}
```

## Critical Rules
1. **ALWAYS use t()** - No hardcoded strings
2. **Import from @/config** - No magic values
3. **Static Tailwind** - No className interpolation
4. **Extend, don't modify types** - Use `array.length` checks
5. **Add new colors to ALL components** - Check `getColorClasses()` coverage

## Development
```bash
pnpm dev                              # Dev mode
node scripts/generate-all-webp.js     # Image optimization
Start-Process pwsh                    # Stable dev server (PowerShell)
```

## MCP Servers
- **Context7**: Up-to-date library docs (`resolve-library-id` → `get-library-docs`)
- **Serena**: Codebase navigation (`find_symbol`, `search_for_pattern`, `get_symbols_overview`)
- **Chrome**: UI testing (`navigate_page`, `take_snapshot`, `click`, `take_screenshot`)

## Pitfalls
- Only 6 colors allowed - must update `getColorClasses()`
- Use `getSpeakerById()`, handle null returns
- Add `suppressHydrationWarning={true}` to `<body>`

---
*v7.0 - Token-optimized version*