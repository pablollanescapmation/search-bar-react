const SEARCH_API_URL = import.meta.env.VITE_SEARCH_API_URL ?? '/api/search'

export interface NormalizedSearchResponse {
  query: string
  results: string[]
}

interface SearchPayload {
  message?: unknown
  query?: unknown
  results?: unknown
  data?: unknown
}

async function getResponsePayload(response: Response): Promise<SearchPayload> {
  const payload: SearchPayload | null = await response.json().catch(() => null)

  if (!response.ok) {
    const message =
      typeof payload?.message === 'string'
        ? payload.message
        : `Search request failed with status ${response.status}`

    throw new Error(message)
  }

  return payload ?? {}
}

function normalizeResponse(
  payload: SearchPayload,
  fallbackQuery: string,
): NormalizedSearchResponse {
  const normalizedQuery = typeof payload.query === 'string' ? payload.query : fallbackQuery

  if (Array.isArray(payload.results)) {
    return {
      query: normalizedQuery,
      results: payload.results.filter((item): item is string => typeof item === 'string'),
    }
  }

  if (Array.isArray(payload.data)) {
    return {
      query: normalizedQuery,
      results: payload.data.filter((item): item is string => typeof item === 'string'),
    }
  }

  return {
    query: normalizedQuery,
    results: [],
  }
}

export async function searchContent(query: string = ''): Promise<NormalizedSearchResponse> {
  const normalizedQuery = query.trim()
  const response = await fetch(SEARCH_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: normalizedQuery }),
  })

  const payload = await getResponsePayload(response)
  return normalizeResponse(payload, normalizedQuery)
}