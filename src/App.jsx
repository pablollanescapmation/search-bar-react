import { useState } from 'react'
import SearchBar from './components/SearchBar'
import { searchContent } from './services/searchApi'
import './App.css'

function App() {
  const [selectedResult, setSelectedResult] = useState('')

  return (
    <main className="app-shell">
      <div className="backdrop backdrop-left" aria-hidden="true" />
      <div className="backdrop backdrop-right" aria-hidden="true" />

      <section className="hero-panel">
        <span className="eyebrow">Reusable async search</span>
        <h1>Find backend content with a focused, modern search bar.</h1>
        <p className="hero-copy">
          Type a query, wait for the debounced request, then move through the
          results with the keyboard. Use the arrow keys to navigate, Enter to
          select, and Escape to close the panel.
        </p>

        <SearchBar
          label="Search demo content"
          placeholder="Search for content"
          buttonLabel="Search"
          debounceMs={350}
          searchFn={searchContent}
          emptyMessage="No matching content was returned by the server."
          onSelect={setSelectedResult}
        />

        <div className="helper-grid" aria-label="Search instructions">
          <article>
            <h2>Debounced</h2>
            <p>Requests wait briefly while the user is still typing.</p>
          </article>
          <article>
            <h2>Keyboard ready</h2>
            <p>Arrow keys, Enter, and Escape all work from the input.</p>
          </article>
          <article>
            <h2>Reusable</h2>
            <p>The component accepts a search function and configurable labels.</p>
          </article>
        </div>
      </section>

      <section className="selection-panel" aria-live="polite">
        <span className="selection-label">Selected result</span>
        {selectedResult ? (
          <>
            <h2>{selectedResult}</h2>
            <p>
              This section updates after a user clicks a result or confirms one
              from the keyboard.
            </p>
          </>
        ) : (
          <>
            <h2>No result selected yet</h2>
            <p>Choose any search result above to display it here.</p>
          </>
        )}
      </section>
    </main>
  )
}

export default App
