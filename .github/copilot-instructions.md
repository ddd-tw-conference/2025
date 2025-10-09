# GitHub Copilot Instructions for DDD Taiwan 2025

## 🚀 Tech Stack
**Next.js 15.5.2 + React 19 + TypeScript + Tailwind CSS + i18n (zh-tw/en)**

## ⚡ Core Standards
- **Files**: kebab-case | **Package**: `pnpm` only
- **Config**: `@/config` imports, no hardcoded values
- **i18n**: `const { t } = useI18n(); t('key.subkey')` **MANDATORY**
- **Styling**: Static Tailwind, no className interpolation
- **Events**: `stopPropagation()` for nested clicks

## 🎯 Key Patterns
- **Config-driven**: `TICKET_SALE_CONFIG` controls features
- **Multi-language**: `t()` function REQUIRED everywhere
- **Data linking**: `speakerIds[]` + `getSpeakerById()`
- **Safety**: `{array.length > 0 && <Component />}`
- **IDs**: kebab-case (`"michael-chen"`)
- **Colors**: Only 6 allowed: `blue|purple|green|indigo|orange|pink`

## 🏗️ Data Architecture
```typescript
interface Segment {
  speakerIds: string[]  // getSpeakerById() query
  type: 'knowledge' | 'workshop' | 'practice' | 'break'
}
// Pattern: {segment.speakerIds.length > 0 && <ExpertInfo />}
```

## 🚨 Critical Rules
1. **t() MANDATORY** - Zero hardcoded strings
2. **@/config imports** - Zero magic values  
3. **Static Tailwind** - Zero interpolation
4. **array.length checks** - Before rendering
5. **getColorClasses()** - Update ALL when adding colors

## 🔧 Development
```bash
pnpm dev                              # Dev mode
node scripts/generate-all-webp.js     # Image optimization
Start-Process pwsh                    # Stable dev server (PowerShell)
```

## 🤖 MCP Servers
- **Context7**: `resolve-library-id` → `get-library-docs`
- **Serena**: `find_symbol`, `search_for_pattern`, `get_symbols_overview` 
- **Chrome**: `navigate_page`, `take_snapshot`, `click`

## ⚠️ Pitfalls
- Only 6 colors - update `getColorClasses()` when adding
- `getSpeakerById()` returns null - handle it
- `<body suppressHydrationWarning={true}/>` required

---
*v7.0 - Token-optimized version*