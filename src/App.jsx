import React, { useEffect, useState } from 'react'
import { evidenceItems, filters, formatEvidenceDate, getVisibleEvidence, normalizeEvidence } from './evidence.js'

function Icon({ children }) {
  return <span className="icon" aria-hidden="true">{children}</span>
}

function App({ evidence = evidenceItems }) {
  const normalizedEvidence = evidence.map(normalizeEvidence)
  const [activeFilter, setActiveFilter] = useState('All evidence')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(normalizedEvidence[0]?.id ?? null)
  const visibleEvidence = getVisibleEvidence(normalizedEvidence, activeFilter, query)
  const selectedEvent = visibleEvidence.find((item) => item.id === selectedId) ?? visibleEvidence[0] ?? null

  useEffect(() => {
    if (selectedEvent && selectedEvent.id !== selectedId) setSelectedId(selectedEvent.id)
  }, [selectedEvent, selectedId])

  return (
    <main className="app-shell">
      <header className="topbar"><a className="brand" href="#top" aria-label="TRACE home"><span>tr</span>ace</a><nav aria-label="Primary navigation"><a href="#candidates">Candidates</a><a className="active" href="#timeline" aria-current="page">Evidence timeline</a><a href="#shortlist">Shortlist <span className="nav-count">4</span></a></nav><div className="top-actions"><button className="icon-button" type="button" aria-label="Notifications"><Icon>○</Icon></button><div className="user-avatar" aria-label="Reviewer profile">AR</div></div></header>
      <section className="candidate-header" id="top"><div className="breadcrumb"><a href="#candidates">Candidates</a><span aria-hidden="true">/</span><span>Maya Anderson</span></div><div className="candidate-row"><div className="candidate-avatar" aria-hidden="true">MA</div><div className="candidate-copy"><div className="eyebrow">Senior product designer</div><h1>Maya Anderson</h1><p>Brooklyn, NY <span className="dot" aria-hidden="true">·</span> Open to product-led teams</p></div><div className="candidate-actions"><button className="secondary-button" type="button"><Icon>↗</Icon> View profile</button><button className="primary-button" type="button"><Icon>＋</Icon> Add to shortlist</button></div></div></section>
      <section className="content-grid" id="timeline"><div className="timeline-column"><div className="section-heading"><div><div className="eyebrow">Candidate evidence</div><h2>A career you can trace</h2></div><span className="evidence-count" aria-label={`${normalizedEvidence.length} evidence signals`}>{normalizedEvidence.length} signals</span></div><div className="toolbar"><div className="filter-group" role="group" aria-label="Filter evidence">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'filter active' : 'filter'} type="button" aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><label className="search-box"><Icon>⌕</Icon><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search evidence" aria-label="Search evidence" /></label></div><div className="timeline-list" aria-label="Evidence items">{visibleEvidence.length ? visibleEvidence.map((event) => <button className={`timeline-event ${selectedEvent?.id === event.id ? 'selected' : ''}`} key={event.id} type="button" aria-pressed={selectedEvent?.id === event.id} onClick={() => setSelectedId(event.id)}><span className={`event-marker ${event.color}`} aria-hidden="true"></span><span className="event-body"><span className="event-meta"><span>{formatEvidenceDate(event.date)}</span><span className="event-type">{event.type}</span></span><strong>{event.title}</strong><span className="event-description">{event.description || 'Description unavailable.'}</span><span className="skill-list">{event.skills.length ? event.skills.map((skill) => <span className="skill" key={skill}>{skill}</span>) : <span className="skill">No skills listed</span>}</span></span><span className="event-arrow" aria-hidden="true">→</span></button>) : <div className="empty-state" role="status">No evidence matches the current filters.</div>}</div></div><aside className="detail-panel" aria-live="polite" aria-atomic="true">{selectedEvent ? <><div className="detail-top"><span className={`detail-marker ${selectedEvent.color}`} aria-hidden="true"></span><span>{selectedEvent.type}</span><button className="icon-button" type="button" aria-label="More actions">•••</button></div><div className="detail-date">{formatEvidenceDate(selectedEvent.date)}</div><h2>{selectedEvent.title}</h2><p className="detail-description">{selectedEvent.description || 'Description unavailable.'}</p><div className="confidence"><div><span className="eyebrow">Evidence confidence</span><strong>High confidence</strong></div><div className="confidence-ring" aria-label="92 percent confidence">92</div></div><div className="detail-divider"></div><div className="detail-label">Supported by</div><div className="source-card"><div className="source-icon" aria-hidden="true">↗</div><div><strong>{selectedEvent.source || 'No source provided.'}</strong><span>{selectedEvent.source ? 'Open supporting material' : 'Source information unavailable'}</span></div><span aria-hidden="true">→</span></div><div className="detail-label">Skills demonstrated</div><div className="detail-skills">{selectedEvent.skills.length ? selectedEvent.skills.map((skill) => <span className="detail-skill" key={skill}>{skill}</span>) : <span className="detail-skill">No skills listed</span>}</div><button className="full-button" type="button">Open evidence <span aria-hidden="true">↗</span></button></> : <div className="detail-empty">Select an evidence item to inspect its details.</div>}</aside></section>
      <footer><span>TRACE / Evidence workspace</span><span>Last updated today at 9:42 AM</span></footer>
    </main>
  )
}

export default App
