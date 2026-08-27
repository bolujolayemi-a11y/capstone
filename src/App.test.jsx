import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'
import { evidenceItems } from './evidence.js'

function renderApp(items = evidenceItems) {
  return render(<App evidence={items} />)
}

describe('Evidence timeline', () => {
  it('renders evidence items and derives the count from data', () => {
    renderApp(evidenceItems.slice(0, 2))
    expect(screen.getAllByText('Launched an accessible design system for Northstar').length).toBeGreaterThan(0)
    expect(screen.getByText('2 signals')).toBeInTheDocument()
  })

  it.each([['Projects', 'Launched an accessible design system for Northstar'], ['Endorsements', 'Recognized for unblocking complex team decisions'], ['Metrics', 'Reduced onboarding time by 31% in one quarter']])('filters by %s', (filter, result) => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: filter }))
    expect(screen.getAllByText(result).length).toBeGreaterThan(0)
    if (filter !== 'Metrics') expect(screen.queryAllByText('Reduced onboarding time by 31% in one quarter')).toHaveLength(0)
  })

  it('searches title, description, and skills case-insensitively with trimmed input', () => {
    renderApp()
    fireEvent.change(screen.getByRole('textbox', { name: 'Search evidence' }), { target: { value: '  ACCESSIBILITY ' } })
    expect(screen.getAllByText('Launched an accessible design system for Northstar').length).toBeGreaterThan(0)
    expect(screen.queryByText('Reduced onboarding time by 31% in one quarter')).not.toBeInTheDocument()
  })

  it('combines search with the active filter', () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: 'Projects' }))
    fireEvent.change(screen.getByRole('textbox', { name: 'Search evidence' }), { target: { value: 'leadership' } })
    expect(screen.getByText('No evidence matches the current filters.')).toBeInTheDocument()
  })

  it('updates the detail panel when an item is selected', () => {
    renderApp()
    fireEvent.click(screen.getAllByRole('button', { name: /Reduced onboarding time/ })[0])
    expect(screen.getByRole('heading', { name: 'Reduced onboarding time by 31% in one quarter' })).toBeInTheDocument()
    expect(screen.getByText('Product launch notes')).toBeInTheDocument()
  })

  it('shows an empty state for no matches', () => {
    renderApp()
    fireEvent.change(screen.getByRole('textbox', { name: 'Search evidence' }), { target: { value: 'not present' } })
    expect(screen.getByText('No evidence matches the current filters.')).toBeInTheDocument()
  })

  it('handles missing optional fields and unknown types', () => {
    renderApp([{ id: 'incomplete', date: '2025-01-01', type: 'Mystery signal', title: 'A partial signal' }])
    expect(screen.getAllByText('A partial signal').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Mystery signal').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Description unavailable.').length).toBeGreaterThan(0)
    expect(screen.getByText('No source provided.')).toBeInTheDocument()
  })

  it('supports keyboard interaction with filters and evidence', () => {
    renderApp()
    const filter = screen.getByRole('button', { name: 'Metrics' })
    filter.focus()
    fireEvent.keyDown(filter, { key: 'Enter' })
    fireEvent.click(filter)
    expect(filter).toHaveAttribute('aria-pressed', 'true')
    const item = screen.getAllByRole('button', { name: /Reduced onboarding time/ })[0]
    item.focus()
    fireEvent.keyDown(item, { key: 'Enter' })
    fireEvent.click(item)
    expect(item).toHaveAttribute('aria-pressed', 'true')
  })
})
