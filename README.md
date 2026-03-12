# Search Bar React Demo

A React + Vite project that demonstrates a reusable, async search bar component with keyboard support, debounced requests, and highlighted matches.

## What This App Does

The app renders a hero section with a configurable `SearchBar` component and a separate panel that displays the currently selected result.

When a user types in the input:

- Search requests are debounced (default 350ms in this app).
- Results are fetched asynchronously through `searchFn`.
- Matching text inside each result is highlighted.
- The user can navigate with the keyboard:
	- `ArrowDown` and `ArrowUp` move through results.
	- `Enter` selects the active result (or executes a search).
	- `Escape` closes the result panel.
- Clicking a result also selects it.

If the user executes a search and no exact match exists, the current query is selected and shown in the selected-result panel.

## Data Source

This demo uses a mock async API in `src/services/searchApi.js`:

- Adds an artificial delay (`700ms`) to simulate network latency.
- Filters a static list by case-insensitive substring matching.
- Returns results in the shape: `{ data: string[] }`.

## Project Structure

- `src/App.jsx`: Page layout and SearchBar integration.
- `src/components/SearchBar.jsx`: Reusable search bar logic and UI behavior.
- `src/components/SearchBar.css`: SearchBar styles.
- `src/services/searchApi.js`: Mock async search service.

## Run Locally

### Prerequisites

- Node.js 18+
- npm

### Commands

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite (typically `http://localhost:5173`).

Additional scripts:

```bash
npm run build
npm run preview
npm run lint
```

## SearchBar Component API

`SearchBar` is designed to be reusable and is driven by props:

- `searchFn(query)`: async function returning `{ data: string[] }`
- `onSelect(result)`: callback fired when a result is selected
- `debounceMs` (default: `300`)
- `minQueryLength` (default: `1`)
- `label`, `placeholder`, `buttonLabel`
- `emptyMessage`

### Minimal Integration Example

```jsx
<SearchBar
	label="Search demo content"
	placeholder="Search for content"
	buttonLabel="Search"
	debounceMs={350}
	searchFn={searchContent}
	emptyMessage="No matching content was returned by the server."
	onSelect={setSelectedResult}
/>
```

## Notes

- The results panel is shown while the input is focused and there is an active search state.
- Out-of-order async responses are ignored to prevent stale result rendering.
