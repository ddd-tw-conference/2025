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

### Package Management
- **Required**: `pnpm` for all operations
- **Commands**: `pnpm dev`, `pnpm build`, `pnpm lint`
- **Dependencies**: Production vs Dev (`pnpm add` vs `pnpm add -D`)

### Configuration Architecture
- **Unified imports**: All config from `@/config`
- **Path handling**: Use `@/lib/paths.ts` for basePath-aware URLs
- **External links**: Manage in `config/tickets.ts`, use getter functions

### Next.js 15.5.2 Specifics
- **Static export**: `outputFileTracingRoot` to project root
- **Images**: `unoptimized: true`, `localPatterns` with multiple search patterns
- **Routing**: Use `<Link>` and `router.push()`, avoid `window.location.href`

### Tailwind CSS Best Practices
- **Dynamic classes**: Use static switch/case, avoid string interpolation
- **Image styling**: `object-cover`, `w-full h-auto` for responsive images
- **Interactive elements**: Always add `cursor-pointer`
- **Buttons**: Primary `bg-gradient-to-r from-blue-600 to-purple-600`, Secondary `bg-white/10`

### Internationalization
```tsx
const { t } = useI18n()
<button>{t('button.contactUs')}</button>

// Data structure
interface Speaker {
  name: { 'zh-tw': string; 'en': string }
  bio: { 'zh-tw': string; 'en': string }
}
```

## Performance Optimization

### Image Optimization
- **Strategy**: Pure WebP approach - only WebP format for maximum efficiency
- **Tools**: `pnpm add -D sharp` + custom scripts
```bash
node scripts/generate-all-webp.js     # Convert all images to WebP
node scripts/check-image-sizes.js     # Analysis
node scripts/test-image-optimization.js # Verify optimization
```
- **Implementation**: Use `getOptimizedImagePath()` for automatic format handling
- **File Management**: Keep only WebP files, remove PNG/JPG originals
- **Benefits**: 92%+ size reduction, faster loading, simplified maintenance

### Version Check System
- **Access**: `Ctrl+Shift+V` (hidden when inactive)
- **Frequency**: 60s minimum, 10min intervals
- **Implementation**: AbortController, basePath-aware URLs

## Ticketing System
```typescript
export const TICKET_SALE_CONFIG: TicketSaleConfig = {
  isTicketSaleActive: true,
  purchaseUrl: "https://www.accupass.com/eflow/ticket/..."
}

const handleTicketClick = () => window.open(getTicketPurchaseUrl(), '_blank')
```

## Key Patterns & Solutions
1. **Button contrast**: `bg-white/10` for transparent backgrounds
2. **Fixed header**: `relative z-50 md:fixed` + `h-20` spacing
3. **Error handling**: Categorize (build/runtime/display), root cause analysis
4. **File recovery**: `git checkout HEAD -- filename`
5. **Documentation**: Focus on final state, remove development history
6. **SEO sitemap/robots**: Use `CONFIG.deployment.baseUrl` directly for sitemap URLs, avoid `getRoutePath()` to prevent path duplication; remove `public/robots.txt` when using `app/robots.ts`
7. **Pure WebP strategy**: Delete original formats after WebP conversion, use direct `.webp` paths in code, implement backward compatibility via `getOptimizedImagePath()`

## Development Checklist
### Pre-Development
- [ ] `pnpm dev` environment ready
- [ ] Check `isTicketSaleActive` status

### Verification  
- [ ] i18n (`t()` function), responsive design, contrast ≥ 4.5:1
- [ ] `pnpm build` success, static files in `out/`

### Pre-Deployment
- [ ] Assess copilot-instructions.md updates for new patterns/solutions
- [ ] Confirm with user before git operations
- [ ] Verify WebP images load correctly, check file sizes optimization

## WebP Optimization Workflow
When implementing image optimization:
1. **Convert**: Use `scripts/generate-all-webp.js` for all image formats
2. **Verify**: Check 90%+ size reduction with `scripts/check-image-sizes.js`
3. **Update Code**: Replace paths to use `.webp` extensions directly
4. **Clean**: Remove original PNG/JPG files after verification
5. **Test**: Ensure `getOptimizedImagePath()` handles backward compatibility
6. **Document**: Record optimization results (typical: 3.8MB → 296KB)

---
*Last Updated: December 8, 2025 | v3.1 - Added Pure WebP Strategy & Optimization Workflow*