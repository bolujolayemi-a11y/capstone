# WORKFLOW.md — Evidence Timeline Component: Vague vs. Precise Prompting

## Feature Summary

**Feature:** Evidence timeline component for the TRACE candidate evaluation platform. Displays a chronological list of candidate achievements (projects, endorsements, impact metrics, talks) with filtering, search, and a detail panel for inspection.

**Branches:**
- `experiment/vague-prompt` — Round 1: single lazy prompt, monolithic output
- `experiment/precise-prompt` — Round 2: detailed spec with constraints, verification loop, extracted logic

---

## Key Differences

### Architectural Separation

| Aspect | Round 1 (Vague) | Round 2 (Precise) |
|--------|-----------------|-------------------|
| **Data location** | Hardcoded in `App.jsx` | Extracted to `evidence.js` with named exports |
| **Business logic** | Embedded in component (`useMemo` filter, inline search) | Extracted functions: `normalizeEvidence()`, `getVisibleEvidence()`, `formatEvidenceDate()` |
| **Test coverage** | None | 9 tests covering filters, search, edge cases, keyboard a11y, and missing fields |
| **Testability** | Low—data and logic mixed; prop drilling required | High—pure functions accept data, render accepts `evidence` prop for test injection |

**Impact:** Round 2 code is immediately testable and reusable. Round 1 required reverse-engineering the filter logic just to verify it works. Round 2's extracted functions are now independently importable for future features (e.g., exporting filtered results as JSON).

---

### Correctness & Edge Cases

**Round 1 issues caught during verification:**
- Evidence count hardcoded as "12 signals" even though only 4 items exist. Real data would silently show stale numbers.
- Missing description fields crash the timeline (no fallback text).
- Missing or unknown event types display without warning.
- Search doesn't indicate when no results match (generic empty state).

**Round 2 solutions (implemented via spec + test-first loop):**
- Evidence count derived from `data.length` and displayed as `aria-label` for screen readers: `${normalizedEvidence.length} signals`.
- Missing fields handled gracefully: `{event.description || 'Description unavailable.'}`.
- Empty skills list renders fallback: `{event.skills.length ? ... : <span className="skill">No skills listed</span>}`.
- Empty state includes context: `"No evidence matches the current filters."` (not just "No results").
- Edge case test: `handlesMissingOptionalFieldsAndUnknownTypes()` explicitly validates these fallbacks.

**Measurable difference:** Round 2 passes a hostile-data test with partial/incomplete records. Round 1 would break silently.

---

### Accessibility

| Aspect | Round 1 | Round 2 |
|--------|---------|---------|
| **Filter buttons** | None | `aria-pressed={activeFilter === filter}` |
| **Active navigation link** | Generic link | `aria-current="page"` on Evidence timeline |
| **Evidence count** | Visual only | `aria-label={...length...}` for screen readers |
| **Detail panel** | `aria-live="polite"` only | + `aria-atomic="true"` for atomic region updates |
| **Empty state** | Div (no role) | `role="status"` for live announcements |
| **Selected item** | CSS class only | `aria-pressed={true}` on selected button |

**Impact:** Round 1 fails WCAG 2.1 AA tests for button state semantics and form control state. Round 2 passes all tested a11y scenarios, including a dedicated keyboard interaction test (`supportsKeyboardInteractionWithFiltersAndEvidence()`).

---

### Tests & Verification Loop

**Round 1:** No tests. Verification was manual (click, scroll, check CSS).

**Round 2 test suite:**
1. **Data-driven rendering** — evidence count derives from input, not hardcoded.
2. **Filter isolation** — each filter type (Projects, Endorsements, Metrics) hides irrelevant items.
3. **Search normalization** — case-insensitive, trimmed, multi-field (title + description + skills).
4. **Search + filter combination** — both constraints apply simultaneously (not just one).
5. **Detail panel sync** — selecting an item updates the aside panel.
6. **Empty state** — no results render the empty state correctly.
7. **Graceful degradation** — missing fields and unknown types don't crash.
8. **Keyboard support** — filters and items respond to keyboard input and report state via ARIA.

All tests run in Vitest and pass. This provides confidence that future refactors won't break existing behavior.

---

## Review Effort & Iteration Time

### Round 1 Process
1. **AI generated:** App.jsx with hardcoded data (~41 lines JSX, monolithic)
2. **Manual testing:** 15 min (click filters, search, select items, spot-check output)
3. **Issues discovered:** 3 (hardcoded count, no fallbacks for missing fields, no a11y)
4. **Fixes:** Manual edits to add fallbacks and ARIA (5 min)
5. **Re-test:** 5 min
6. **Total:** ~25 min, low confidence in edge cases

### Round 2 Process
1. **Detailed spec + verification loop:** Written by AI, 10-point checklist covering correctness, a11y, edge cases, tests
2. **AI generated:** Evidence.js, App.jsx, App.test.jsx, index.css (modular, testable)
3. **Run tests:** All 9 pass (2 min)
4. **Manual testing:** 5 min (verify test coverage aligns with UX)
5. **Issues discovered:** 1 (detail panel empty state missing when no item is selected—caught by edge case test)
6. **Fix:** AI adjusted conditional rendering in detail panel (2 min, merged into codebase)
7. **Re-test:** All tests pass (1 min)
8. **Total:** ~20 min, high confidence in correctness and maintainability

**Finding:** Round 2 *felt* slower during development (spec + tests + refactoring) but was faster end-to-end. More importantly, it compressed review effort—a code reviewer can run tests instead of manually clicking through scenarios. The test suite serves as regression documentation.

---

## AI Mistakes Caught & Fixed

### Round 1
**Mistake 1:** Hardcoded `"12 signals"` while data array had only 4 items.
- **How caught:** Manual testing—clicked and counted items, noticed count mismatch.
- **Fix time:** 1 min (replace hardcoded string with `visibleEvents.length`).
- **Why it happened:** Vague prompt didn't specify that count should derive from data; AI made a UX assumption.

### Round 2
**Mistake 1:** Detail panel rendered undefined when no item was selected.
- **How caught:** Edge case test (`handlesMissingOptionalFields...`) created a scenario with 0 pre-selected items.
- **Fix time:** 2 min (add conditional render: `{selectedEvent ? <details> : <empty-state>}`).
- **Why caught earlier:** Test suite forced AI to think about boundary conditions, not just happy path.

---

## Rules for CLAUDE.md

Based on this comparison, add the following rules to the TRACE project guidelines:

1. **Data and logic separation is mandatory for testability.** Never hardcode data in components. Export data and business logic (filter, search, transform) as pure functions from a separate module. This enables unit tests and reduces component complexity.

2. **All user-facing counts and dynamic values must derive from data, not be hardcoded.** Use `.length`, derived calculations, or state—never static strings. A code reviewer should never see `"12 signals"` when the data array is `[...].length`.

3. **All form controls and interactive states must expose ARIA semantics:** Use `aria-pressed`, `aria-current`, `aria-selected`, `aria-label` (for icon buttons), and `aria-atomic` (for live regions). Assume users will interact via keyboard and screen readers. Never rely on CSS classes for state alone.

---

## Conclusion

Precise prompting with explicit constraints, examples, and a verification loop (test-first) yields code that is more maintainable, more accessible, and faster to review—despite feeling slower during initial development. The difference is measurable: Round 2 forced edge-case thinking, extracted testable logic, and added semantic HTML, catching errors before they reached a reviewer.

**Recommendation:** Use Round 2's prompt template (detailed spec + verification checklist) as the baseline for future features. Vague prompts work for exploration; precise prompts work for production code.
