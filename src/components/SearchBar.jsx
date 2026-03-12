import { useCallback, useEffect, useId, useRef, useState } from 'react'
import './SearchBar.css'

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlightMatch(text, query) {
  const normalizedQuery = query.trim()

  if (!normalizedQuery) {
    return text
  }

  const expression = new RegExp(`(${escapeRegExp(normalizedQuery)})`, 'ig')
  const parts = text.split(expression)

  return parts.map((part, index) => {
    const isMatch = part.toLowerCase() === normalizedQuery.toLowerCase()

    return isMatch ? <mark key={`${part}-${index}`}>{part}</mark> : part
  })
}

function normalizeSearchResponse(response, fallbackQuery) {
  const query = typeof response?.query === 'string' ? response.query : fallbackQuery

  if (Array.isArray(response?.results)) {
    return { query, results: response.results }
  }

  if (Array.isArray(response?.data)) {
    return { query, results: response.data }
  }

  return { query, results: [] }
}

function SearchBar({
  buttonLabel = 'Search',
  debounceMs = 300,
  emptyMessage = 'No results found.',
  label = 'Search',
  minQueryLength = 1,
  onSearchSubmit,
  onSelect,
  placeholder = 'Search',
  searchFn,
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isFocused, setIsFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const requestIdRef = useRef(0)
  const containerRef = useRef(null)
  const inputId = useId()
  const listId = `${inputId}-results`
  const normalizedQuery = query.trim()
  const shouldSearch = normalizedQuery.length >= minQueryLength
  const showAriaResults = isFocused && (shouldSearch || isLoading || hasSearched)

  const performSearch = useCallback(async (searchQuery) => {
    const currentRequestId = requestIdRef.current + 1
    requestIdRef.current = currentRequestId
    setIsLoading(true)

    try {
      const response = await searchFn(searchQuery)

      if (requestIdRef.current !== currentRequestId) {
        return null
      }

      const normalizedResponse = normalizeSearchResponse(response, searchQuery)
      const normalizedResults = normalizedResponse.results.filter(
        (result) => typeof result === 'string',
      )

      setResults(normalizedResults)
      setHasSearched(true)
      setActiveIndex(-1)

      return {
        query: normalizedResponse.query,
        results: normalizedResults,
      }
    } catch {
      if (requestIdRef.current !== currentRequestId) {
        return null
      }

      setResults([])
      setHasSearched(true)
      setActiveIndex(-1)
      return null
    } finally {
      if (requestIdRef.current === currentRequestId) {
        setIsLoading(false)
      }
    }
  }, [searchFn])

  useEffect(() => {
    if (!shouldSearch) {
      setResults([])
      setIsLoading(false)
      setHasSearched(false)
      setActiveIndex(-1)
      return undefined
    }

    const timeoutId = window.setTimeout(async () => {
      await performSearch(normalizedQuery)
    }, debounceMs)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [debounceMs, normalizedQuery, performSearch, shouldSearch])

  useEffect(() => {
    function handlePointerDown(event) {
      if (!containerRef.current?.contains(event.target)) {
        setIsFocused(false)
        setActiveIndex(-1)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  async function executeSearch(rawSearchQuery = normalizedQuery) {
    const submitQuery = rawSearchQuery.trim()

    if (submitQuery.length < minQueryLength) {
      return
    }

    const returnedResponse = await performSearch(submitQuery)

    if (!returnedResponse) {
      return
    }

    onSearchSubmit?.(returnedResponse)
    setQuery('')
    setIsFocused(false)
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setIsFocused(true)
      setActiveIndex((currentIndex) => {
        if (!results.length) {
          return -1
        }

        return currentIndex < results.length - 1 ? currentIndex + 1 : 0
      })
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((currentIndex) => {
        if (!results.length) {
          return -1
        }

        return currentIndex > 0 ? currentIndex - 1 : results.length - 1
      })
    }

    if (event.key === 'Enter') {
      if (activeIndex >= 0 && results[activeIndex]) {
        event.preventDefault()
        handleResultSelect(results[activeIndex])
        return
      }

      executeSearch()
    }

    if (event.key === 'Escape') {
      setIsFocused(false)
      setActiveIndex(-1)
    }
  }

  async function handleResultSelect(result) {
    setActiveIndex(-1)
    setIsFocused(false)
    onSelect?.(result)
    await executeSearch(result)
  }

  return (
    <div className="searchbar" ref={containerRef}>
      <label className="searchbar-label" htmlFor={inputId}>
        {label}
      </label>

      <div className="searchbar-row">
        <div className="searchbar-input-wrap">
          <input
            id={inputId}
            type="search"
            value={query}
            placeholder={placeholder}
            className="searchbar-input"
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            aria-autocomplete="list"
            aria-controls={listId}
            aria-expanded={showAriaResults}
            aria-activedescendant={
              activeIndex >= 0 ? `${inputId}-option-${activeIndex}` : undefined
            }
          />
        </div>

        <button
          type="button"
          className="searchbar-button"
          onClick={() => executeSearch()}
          disabled={!shouldSearch || isLoading}
        >
          {isLoading ? 'Searching...' : buttonLabel}
        </button>
      </div>

      {showAriaResults ? (
        <div className="searchbar-panel">
          {isLoading ? (
            <p className="searchbar-state">Loading results...</p>
          ) : results.length ? (
            <ul id={listId} className="searchbar-results" role="listbox">
              {results.map((result, index) => {
                const isActive = index === activeIndex

                return (
                  <li key={`${result}-${index}`} role="presentation">
                    <button
                      id={`${inputId}-option-${index}`}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      className={`searchbar-result ${isActive ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => handleResultSelect(result)}
                    >
                      <span>{highlightMatch(result, normalizedQuery)}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : hasSearched ? (
            <p className="searchbar-state">{emptyMessage}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default SearchBar
