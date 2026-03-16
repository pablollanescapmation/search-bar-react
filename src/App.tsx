import { useState } from 'react'
import SearchBar from './components/SearchBar'
import {
  AppShell,
  BackdropLeft,
  BackdropRight,
  Eyebrow,
  HelperCard,
  HelperGrid,
  HeroCopy,
  HeroPanel,
  HeroTitle,
  SelectionLabel,
  SelectionPanel,
  SelectionResultsList,
} from './design-system/App.styles'
import { searchContent, type NormalizedSearchResponse } from './services/searchApi'

function App() {
  const [submittedSearch, setSubmittedSearch] = useState<NormalizedSearchResponse | null>(
    null,
  )

  return (
    <AppShell>
      <BackdropLeft aria-hidden="true" />
      <BackdropRight aria-hidden="true" />

      <HeroPanel>
        <Eyebrow>Reusable async search</Eyebrow>
        <HeroTitle>WAHOO SEARCH</HeroTitle>
        <HeroCopy>
          Type a query to update autocomplete suggestions for assistive tech.
          Press Enter, click Search, or choose an option to display the server
          response in the results panel below.
        </HeroCopy>

        <SearchBar
          label="Search demo content"
          placeholder="Search for content"
          buttonLabel="Search"
          debounceMs={350}
          searchFn={searchContent}
          emptyMessage="No matching content was returned by the server."
          onSearchSubmit={setSubmittedSearch}
        />

        <HelperGrid aria-label="Search instructions">
          <HelperCard>
            <h2>Live backend calls</h2>
            <p>Typing updates the aria suggestion list as requests return.</p>
          </HelperCard>
          <HelperCard>
            <h2>Explicit commit</h2>
            <p>Visible results update only on click, Enter, or list selection.</p>
          </HelperCard>
          <HelperCard>
            <h2>Reusable</h2>
            <p>The component accepts a search function and configurable labels.</p>
          </HelperCard>
        </HelperGrid>
      </HeroPanel>

      <SelectionPanel aria-live="polite">
        <SelectionLabel>Search results</SelectionLabel>
        {submittedSearch ? (
          <>
            <h2>Results for "{submittedSearch.query}"</h2>
            {submittedSearch.results.length ? (
              <SelectionResultsList>
                {submittedSearch.results.map((result, index) => (
                  <li key={`${result}-${index}`}>{result}</li>
                ))}
              </SelectionResultsList>
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
      </SelectionPanel>
    </AppShell>
  )
}

export default App