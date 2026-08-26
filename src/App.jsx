import { useMemo, useState } from 'react'
import './App.css'

const events = [
  { id: 1, date: 'Jun 18, 2024', type: 'Project shipped', title: 'Launched an accessible design system for Northstar', description: 'Maya led the system from audit to rollout, aligning 42 components across product and marketing.', skills: ['Systems thinking', 'Accessibility'], source: 'Portfolio case study', color: 'coral' },
  { id: 2, date: 'Apr 03, 2024', type: 'Peer endorsement', title: 'Recognized for unblocking complex team decisions', description: '“Maya brings clarity to ambiguous problems and leaves every room with a shared next step.”', skills: ['Communication', 'Leadership'], source: 'Endorsement from Jordan Lee, VP Product', color: 'mint' },
  { id: 3, date: 'Jan 22, 2024', type: 'Impact metric', title: 'Reduced onboarding time by 31% in one quarter', description: 'A guided setup flow helped new customers reach their first success moment faster.', skills: ['Product strategy', 'Data-informed'], source: 'Product launch notes', color: 'gold' },
  { id: 4, date: 'Oct 11, 2023', type: 'Talk / workshop', title: 'Hosted “Designing for trust” at Config Local', description: 'A practical workshop on making complex product decisions feel legible and human.', skills: ['Facilitation', 'UX research'], source: 'Event recording', color: 'blue' },
]
const filters = ['All evidence', 'Projects', 'Endorsements', 'Metrics']
function Icon({ children }) { return <span className="icon" aria-hidden="true">{children}</span> }

function App() {
  const [activeFilter, setActiveFilter] = useState('All evidence')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(1)
  const visibleEvents = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim()
    return events.filter((event) => {
      const matchesFilter = activeFilter === 'All evidence' || (activeFilter === 'Projects' && event.type === 'Project shipped') || (activeFilter === 'Endorsements' && event.type === 'Peer endorsement') || (activeFilter === 'Metrics' && event.type === 'Impact metric')
      const matchesQuery = !normalizedQuery || `${event.title} ${event.description} ${event.skills.join(' ')}`.toLowerCase().includes(normalizedQuery)
      return matchesFilter && matchesQuery
    })
  }, [activeFilter, query])
  const selectedEvent = events.find((event) => event.id === selectedId) ?? events[0]

  return (
    <main className="app-shell">
      <header className="topbar"><a className="brand" href="#top" aria-label="Trace home"><span>tr</span>ace</a><nav aria-label="Primary navigation"><a href="#candidates">Candidates</a><a className="active" href="#timeline">Evidence timeline</a><a href="#shortlist">Shortlist <span className="nav-count">4</span></a></nav><div className="top-actions"><button className="icon-button" type="button" aria-label="Notifications"><Icon>○</Icon></button><div className="user-avatar">AR</div></div></header>
      <section className="candidate-header" id="top"><div className="breadcrumb"><a href="#candidates">Candidates</a><span>/</span><span>Maya Anderson</span></div><div className="candidate-row"><div className="candidate-avatar">MA</div><div className="candidate-copy"><div className="eyebrow">Senior product designer</div><h1>Maya Anderson</h1><p>Brooklyn, NY <span className="dot">·</span> Open to product-led teams</p></div><div className="candidate-actions"><button className="secondary-button" type="button"><Icon>↗</Icon> View profile</button><button className="primary-button" type="button"><Icon>＋</Icon> Add to shortlist</button></div></div></section>
      <section className="content-grid" id="timeline"><div className="timeline-column"><div className="section-heading"><div><div className="eyebrow">Candidate evidence</div><h2>A career you can trace</h2></div><span className="evidence-count">12 signals</span></div><div className="toolbar"><div className="filter-group" role="group" aria-label="Filter evidence">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'filter active' : 'filter'} type="button" onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><label className="search-box"><Icon>⌕</Icon><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search evidence" aria-label="Search evidence" /></label></div><div className="timeline-list">{visibleEvents.length ? visibleEvents.map((event) => <button className={`timeline-event ${selectedId === event.id ? 'selected' : ''}`} key={event.id} type="button" onClick={() => setSelectedId(event.id)}><span className={`event-marker ${event.color}`}></span><span className="event-body"><span className="event-meta"><span>{event.date}</span><span className="event-type">{event.type}</span></span><strong>{event.title}</strong><span className="event-description">{event.description}</span><span className="skill-list">{event.skills.map((skill) => <span className="skill" key={skill}>{skill}</span>)}</span></span><span className="event-arrow">→</span></button>) : <div className="empty-state">No evidence matches that search.</div>}</div></div><aside className="detail-panel" aria-live="polite"><div className="detail-top"><span className={`detail-marker ${selectedEvent.color}`}></span><span>{selectedEvent.type}</span><button className="icon-button" type="button" aria-label="More actions">•••</button></div><div className="detail-date">{selectedEvent.date}</div><h2>{selectedEvent.title}</h2><p className="detail-description">{selectedEvent.description}</p><div className="confidence"><div><span className="eyebrow">Evidence confidence</span><strong>High confidence</strong></div><div className="confidence-ring">92</div></div><div className="detail-divider"></div><div className="detail-label">Supported by</div><div className="source-card"><div className="source-icon">↗</div><div><strong>{selectedEvent.source}</strong><span>Open supporting material</span></div><span>→</span></div><div className="detail-label">Skills demonstrated</div><div className="detail-skills">{selectedEvent.skills.map((skill) => <span className="detail-skill" key={skill}>{skill}</span>)}</div><button className="full-button" type="button">Open evidence <span>↗</span></button></aside></section>
      <footer><span>TRACE / Evidence workspace</span><span>Last updated today at 9:42 AM</span></footer>
    </main>
  )
}

export default App
