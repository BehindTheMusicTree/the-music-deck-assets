<!-- BEGIN:nextjs-agent-rules -->
# Next.js — key differences from training data

This project uses a newer Next.js with breaking changes. Key differences:

## Cache Components (enabled in this project)

`next.config.ts` sets `cacheComponents: true`. This changes the entire caching and rendering model:

- **`use cache` directive** replaces `fetch` caching options. Add `'use cache'` at the top of async functions or components to cache their output. Use `cacheLife('hours')` / `cacheLife('days')` etc. to set TTL. Use `cacheTag('name')` to enable targeted invalidation.
- **Partial Prerendering (PPR) is the default.** Static/cached content goes into the static shell; dynamic content streams via `<Suspense>`.
- **All dynamic data must be wrapped in `<Suspense>`** or marked with `use cache`. Accessing `cookies()`, `headers()`, `params`, or `searchParams` outside a Suspense boundary throws `Uncached data was accessed outside of <Suspense>`.
- **`params` is now a Promise**: `params: Promise<{ slug: string }>` — you must `await params` before using it. Do this inside a Suspense-wrapped component so it doesn't block the static shell.
- **Route Handlers** follow the same prerendering model as pages when `cacheComponents` is enabled.

## Instant navigations

- Export `unstable_instant = { prefetch: 'static' }` from a page/layout to opt into validation that the route produces an instant static shell on every client navigation.
- **Suspense alone is not enough** — the boundary must be at the right level relative to the shared layout entry point. A Suspense in the root layout is invisible to sibling client navigations.
- Enable DevTools with `experimental: { instantNavigationDevToolsToggle: true }` in `next.config.ts`.
- Use `export const unstable_instant = false` on a layout to exempt it from validation.

## Patterns

```tsx
// Cached data function
async function getProduct(slug: string) {
  'use cache'
  cacheLife('hours')
  return db.products.findOne(slug)
}

// Page with dynamic param — params is a Promise
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <>
      <Suspense fallback={<p>Loading…</p>}>
        {params.then(({ slug }) => <ProductInfo slug={slug} />)}
      </Suspense>
      <Suspense fallback={<p>Checking stock…</p>}>
        <LiveInventory params={params} />
      </Suspense>
    </>
  )
}

async function ProductInfo({ slug }: { slug: string }) {
  'use cache'
  const p = await getProduct(slug)
  return <h1>{p.name}</h1>
}
```

## Non-deterministic values

Call `connection()` from `next/server` before `Math.random()` / `Date.now()` / `crypto.randomUUID()` if you want a fresh value per request, and wrap in `<Suspense>`. Or add `'use cache'` to cache a single value until revalidation.

## When to check the raw docs

If you need details not covered above, read the specific file in `node_modules/next/dist/docs/` — do not read the whole tree. Key files:
- `01-app/01-getting-started/08-caching.md` — full Cache Components reference
- `01-app/02-guides/instant-navigation.md` — instant navigation guide
- `01-app/03-api-reference/03-file-conventions/02-route-segment-config/instant.md` — `unstable_instant` API
<!-- END:nextjs-agent-rules -->
