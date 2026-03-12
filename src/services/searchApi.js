const SEARCH_API_URL = import.meta.env.VITE_SEARCH_API_URL

async function getResponsePayload(response) {
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const message =
      typeof payload?.message === 'string'
        ? payload.message
        : `Search request failed with status ${response.status}`

    throw new Error(message)
  }

  return payload
}

function normalizeResponse(payload, fallbackQuery) {
  const normalizedQuery =
    typeof payload?.query === 'string' ? payload.query : fallbackQuery

  if (Array.isArray(payload?.results)) {
    return {
      query: normalizedQuery,
      results: payload.results.filter((item) => typeof item === 'string'),
    }
  }

  if (Array.isArray(payload?.data)) {
    return {
      query: normalizedQuery,
      results: payload.data.filter((item) => typeof item === 'string'),
    }
  }

  return {
    query: normalizedQuery,
    results: [],
  }
}

export async function searchContent(query = '') {
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
