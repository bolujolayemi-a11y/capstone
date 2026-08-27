export const evidenceItems = [
  {
    id: 'northstar-design-system',
    date: '2024-06-18',
    type: 'Project shipped',
    title: 'Launched an accessible design system for Northstar',
    description: 'Maya led the system from audit to rollout, aligning 42 components across product and marketing.',
    skills: ['Systems thinking', 'Accessibility'],
    source: 'Portfolio case study',
    color: 'coral',
  },
  {
    id: 'peer-endorsement',
    date: '2024-04-03',
    type: 'Peer endorsement',
    title: 'Recognized for unblocking complex team decisions',
    description: 'Maya brings clarity to ambiguous problems and leaves every room with a shared next step.',
    skills: ['Communication', 'Leadership'],
    source: 'Endorsement from Jordan Lee, VP Product',
    color: 'mint',
  },
  {
    id: 'onboarding-metric',
    date: '2024-01-22',
    type: 'Impact metric',
    title: 'Reduced onboarding time by 31% in one quarter',
    description: 'A guided setup flow helped new customers reach their first success moment faster.',
    skills: ['Product strategy', 'Data-informed'],
    source: 'Product launch notes',
    color: 'gold',
  },
  {
    id: 'config-workshop',
    date: '2023-10-11',
    type: 'Talk / workshop',
    title: 'Hosted “Designing for trust” at Config Local',
    description: 'A practical workshop on making complex product decisions feel legible and human.',
    skills: ['Facilitation', 'UX research'],
    source: 'Event recording',
    color: 'blue',
  },
]

export const filters = ['All evidence', 'Projects', 'Endorsements', 'Metrics']

const filterTypes = {
  Projects: 'Project shipped',
  Endorsements: 'Peer endorsement',
  Metrics: 'Impact metric',
}

export function normalizeEvidence(item, index = 0) {
  const rawSkills = Array.isArray(item?.skills) ? item.skills : []
  return {
    id: item?.id ?? `evidence-${index}`,
    date: item?.date ?? '',
    type: typeof item?.type === 'string' && item.type.trim() ? item.type : 'Other evidence',
    title: item?.title ?? 'Untitled evidence',
    description: item?.description ?? '',
    skills: rawSkills.filter((skill) => typeof skill === 'string' && skill.trim()),
    source: item?.source ?? '',
    color: item?.color ?? 'neutral',
  }
}

export function getVisibleEvidence(items, activeFilter, query) {
  const normalizedQuery = query.trim().toLowerCase()
  const type = filterTypes[activeFilter]
  return items.map(normalizeEvidence).filter((item) => {
    const matchesFilter = !type || item.type === type
    const searchableText = `${item.title} ${item.description} ${item.skills.join(' ')}`.toLowerCase()
    return matchesFilter && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })
}

export function formatEvidenceDate(value) {
  if (!value) return 'Date unavailable'
  const date = new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}
