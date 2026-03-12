import { useState } from 'react'
import SearchBar from './components/SearchBar'
import { searchContent } from './services/searchApi'
import './App.css'

function App() {
  const [submittedSearch, setSubmittedSearch] = useState(null)

  return (
    <main className="app-shell">
      <div className="backdrop backdrop-left" aria-hidden="true" />
      <div className="backdrop backdrop-right" aria-hidden="true" />

      <section className="hero-panel">
        <span className="eyebrow">Reusable async search</span>
        <h1>WAHOO SEARCH</h1>
        <p className="hero-copy">
          Type a query to update autocomplete suggestions for assistive tech.
          Press Enter, click Search, or choose an option to display the server
          response in the results panel below.
        </p>

        <SearchBar
          label="Search demo content"
          placeholder="Search for content"
          buttonLabel="Search"
          debounceMs={350}
          searchFn={searchContent}
          emptyMessage="No matching content was returned by the server."
          onSearchSubmit={setSubmittedSearch}
        />

        <div className="helper-grid" aria-label="Search instructions">
          <article>
            <h2>Live backend calls</h2>
            <p>Typing updates the aria suggestion list as requests return.</p>
          </article>
          <article>
            <h2>Explicit commit</h2>
            <p>Visible results update only on click, Enter, or list selection.</p>
          </article>
          <article>
            <h2>Reusable</h2>
            <p>The component accepts a search function and configurable labels.</p>
          </article>
        </div>
      </section>

      <section className="selection-panel" aria-live="polite">
        <span className="selection-label">Search results</span>
        {submittedSearch ? (
          <>
            <h2>Results for "{submittedSearch.query}"</h2>
            {submittedSearch.results.length ? (
              <ul className="selection-results-list">
                {submittedSearch.results.map((result, index) => (
                  <li key={`${result}-${index}`}>{result}</li>
                ))}
              </ul>
            ) : (
              <p>No results were returned for this query.</p>
            )}
          </>
        ) : (
          <>
            <h2>No results submitted yet</h2>
            <p>Submit a search to render the backend response here.</p>
          </>
        )}
      </section>
    </main>
  )
}

export default App
