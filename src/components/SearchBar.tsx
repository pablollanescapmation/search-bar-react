import { type ReactNode, useCallback, useEffect, useId, useRef, useState } from 'react'
import {
  SearchBarButton,
  SearchBarContainer,
  SearchBarInput,
  SearchBarInputWrap,
  SearchBarLabel,
  SearchBarPanel,
  SearchBarResult,
  SearchBarResults,
  SearchBarRow,
  SearchBarState,
} from '../design-system/SearchBar.styles'
import type { NormalizedSearchResponse } from '../services/searchApi'

type SearchFnResponse =
  | NormalizedSearchResponse
  | {
      query?: unknown
      results?: unknown
    }

interface SearchBarProps {
  buttonLabel?: string
  debounceMs?: number
  emptyMessage?: string
  label?: string
  minQueryLength?: number
  onSearchSubmit?: (response: NormalizedSearchResponse) => void
  onSelect?: (result: string) => void
  placeholder?: string
  searchFn: (query: string) => Promise<SearchFnResponse>
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlightMatch(text: string, query: string): ReactNode {
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

function normalizeSearchResponse(
  response: SearchFnResponse,
  fallbackQuery: string,
): NormalizedSearchResponse {
  const query = typeof response?.query === 'string' ? response.query : fallbackQuery

  if ('results' in response && Array.isArray(response.results)) {
    return {
      query,
      results: response.results.filter((result): result is string => typeof result === 'string'),
    }
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
}: SearchBarProps) {
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const requestIdRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const inputId = useId()
  const listId = `${inputId}-results`
  const normalizedQuery = query.trim()
  const shouldSearch = normalizedQuery.length >= minQueryLength
  const showAriaResults = isFocused && (shouldSearch || isLoading || hasSearched)

  const performSearch = useCallback(
    async (searchQuery: string): Promise<NormalizedSearchResponse | null> => {
      const currentRequestId = requestIdRef.current + 1
      requestIdRef.current = currentRequestId
      setIsLoading(true)

      try {
        const response = await searchFn(searchQuery)

        if (requestIdRef.current !== currentRequestId) {
          return null
        }

        const normalizedResponse = normalizeSearchResponse(response, searchQuery)

        setResults(normalizedResponse.results)
        setHasSearched(true)
        setActiveIndex(-1)

        return normalizedResponse
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
    },
    [searchFn],
  )

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
    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setIsFocused(false)
        setActiveIndex(-1)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  async function executeSearch(rawSearchQuery: string = normalizedQuery): Promise<void> {
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

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
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
        void handleResultSelect(results[activeIndex])
        return
      }

      void executeSearch()
    }

    if (event.key === 'Escape') {
      setIsFocused(false)
      setActiveIndex(-1)
    }
  }

  async function handleResultSelect(result: string): Promise<void> {
    setActiveIndex(-1)
    setIsFocused(false)
    onSelect?.(result)
    await executeSearch(result)
  }

  return (
    <SearchBarContainer ref={containerRef}>
      <SearchBarLabel htmlFor={inputId}>{label}</SearchBarLabel>

      <SearchBarRow>
        <SearchBarInputWrap>
          <SearchBarInput
            id={inputId}
            type="search"
            value={query}
            placeholder={placeholder}
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
        </SearchBarInputWrap>

        <SearchBarButton
          type="button"
          onClick={() => void executeSearch()}
          disabled={!shouldSearch || isLoading}
        >
          {isLoading ? 'Searching...' : buttonLabel}
        </SearchBarButton>
      </SearchBarRow>

      {showAriaResults ? (
        <SearchBarPanel>
          {isLoading ? (
            <SearchBarState>Loading results...</SearchBarState>
          ) : results.length ? (
            <SearchBarResults id={listId} role="listbox">
              {results.map((result, index) => {
                const isActive = index === activeIndex

                return (
                  <li key={`${result}-${index}`} role="presentation">
                    <SearchBarResult
                      id={`${inputId}-option-${index}`}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      $isActive={isActive}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => void handleResultSelect(result)}
                    >
                      <span>{highlightMatch(result, normalizedQuery)}</span>
                    </SearchBarResult>
                  </li>
                )
              })}
            </SearchBarResults>
          ) : hasSearched ? (
            <SearchBarState>{emptyMessage}</SearchBarState>
          ) : null}
        </SearchBarPanel>
      ) : null}
    </SearchBarContainer>
  )
}

export default SearchBar