# Search Bar React Demo

A React + Vite project that exposes a reusable SearchBar component with debounced async search, keyboard navigation, and accessible result semantics.

## Storybook Documentation

This repository now includes Storybook as the primary integration and API documentation system.

- Component stories: `Components/SearchBar`
- Integration guide: `Guides/SearchBar Integration`

Run Storybook:

```bash
npm install
npm run storybook
```

Build static docs:

```bash
npm run build-storybook
```

## Run The App

```bash
npm run dev
```

Then open the Vite URL printed in the terminal (typically `http://localhost:5173`).

## SearchBar API (Quick Reference)

`SearchBar` accepts these key props:

- `searchFn(query)`: async function returning backend search payload.
- `onSearchSubmit(response)`: callback fired after a committed search (Enter, button click, or option select).
- `onSelect(result)`: callback fired when a list item is selected.
- `debounceMs`: delay before executing search requests.
- `minQueryLength`: minimum trimmed query length before searching.
- `label`, `placeholder`, `buttonLabel`, `emptyMessage`: UI text customization.

## Backend Payload Expectations

The component and `searchContent` service normalize backend payloads into:

```ts
{
  query: string
  results: string[]
}
```

Accepted response shapes from your backend:

```json
{ "query": "roadmap", "results": ["Roadmap Q3 priorities"] }
```

Normalization behavior:

- Missing `query` falls back to the submitted query.
- `results` is the only supported result collection key.
- Non-string items are filtered out.
- Unknown shapes resolve to an empty `results` array.

Configure API endpoint with `.env`:

```env
VITE_SEARCH_API_URL=/api/search
```

## Quality Commands

```bash
npm run lint
npm run typecheck
npm run build
```
