import type { Meta, StoryObj } from '@storybook/react-vite'
import SearchBar from './SearchBar'

type SearchResponse = {
  query: string
  results: string[]
}

type SearchImplementationOptions = {
  delayMs?: number
  errorOnQueries?: string[]
}

const sampleResults = [
  'Apollo launch schedule',
  'Application architecture diagram',
  'Apple orchard inventory',
  'API authentication guide',
  'Billing account history',
  'Customer support escalation path',
  'Data retention policy',
  'Design review checklist',
  'Developer onboarding handbook',
  'Release timeline',
  'Roadmap Q3 priorities',
  'System status dashboard',
]

function wait(delayMs: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayMs)
  })
}

function createSearchImplementation(
  options: SearchImplementationOptions = {},
): (query: string) => Promise<SearchResponse> {
  const { delayMs = 350, errorOnQueries = [] } = options

  return async (query: string) => {
    const normalizedQuery = query.trim()

    await wait(delayMs)

    if (errorOnQueries.some((value) => value.toLowerCase() === normalizedQuery.toLowerCase())) {
      throw new Error('Simulated backend failure')
    }

    const normalizedResults = sampleResults.filter((item) =>
      item.toLowerCase().includes(normalizedQuery.toLowerCase()),
    )

    return {
      query: normalizedQuery,
      results: normalizedResults,
    }
  }
}

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    onSearchSubmit: { action: 'search submitted' },
    onSelect: { action: 'result selected' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Reusable async search input with debounce, keyboard navigation, and accessibility semantics.',
          '',
          'Integration checklist:',
          '- Provide a searchFn that returns a promise with { query, results }.',
          '- Wire onSearchSubmit when the host app needs the committed backend response.',
          '- Use minQueryLength and debounceMs to protect backend throughput.',
          '- Keep result entries as plain strings because non-string values are ignored during normalization.',
          '',
          'Backend response contract accepted by the component:',
          '- query?: string',
          '- results?: string[]',
          '',
          'Any other shape is normalized to an empty result list.',
        ].join('\n'),
      },
    },
  },
  args: {
    label: 'Search content',
    placeholder: 'Type to search…',
    buttonLabel: 'Search',
    emptyMessage: 'No matching content was returned by the server.',
    debounceMs: 350,
    minQueryLength: 2,
    searchFn: createSearchImplementation(),
  },
} satisfies Meta<typeof SearchBar>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const OneCharacterMinimum: Story = {
  args: {
    minQueryLength: 1,
  },
}

export const SlowBackend: Story = {
  args: {
    debounceMs: 600,
    searchFn: createSearchImplementation({ delayMs: 1200 }),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use this scenario to see loading-state behavior when the backend has high latency.',
      },
    },
  },
}

export const EmptyResults: Story = {
  args: {
    searchFn: async (query: string) => ({
      query,
      results: [],
    }),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the no-results UX after a successful response with an empty array payload.',
      },
    },
  },
}

export const ErrorFromBackend: Story = {
  args: {
    searchFn: createSearchImplementation({ errorOnQueries: ['error', 'fail'] }),
  },
  parameters: {
    docs: {
      description: {
        story:
          'When searchFn throws, SearchBar gracefully falls back to empty state without crashing host UI.',
      },
    },
  },
}
