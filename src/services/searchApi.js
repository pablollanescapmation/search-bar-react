const mockResults = [
  'grocery store list',
  'weekly meal planner',
  'this is a test',
  'a new item here',
  'project kickoff notes',
  'weekend travel ideas',
  'coffee shop checklist',
  'home office upgrades',
  'book club discussion topics',
  'birthday party supplies',
]

export async function searchContent(query = '') {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 700)
  })

  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return { data: mockResults }
  }

  const filteredResults = mockResults.filter((item) =>
    item.toLowerCase().includes(normalizedQuery),
  )

  return { data: filteredResults }
}