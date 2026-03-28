

## Plan: Replace Mock Data with localStorage-Persisted Hiring Cases

### Overview
Since there's no backend endpoint for hiring cases, we'll use localStorage to persist cases created through the app flow. The dashboard and hiring cases pages will read from localStorage instead of mock data.

### Changes

**1. Create a `src/lib/hiringCaseStore.ts` utility**
- Define a `HiringCase` interface (title, department, status, urgency, candidateCount, createdAt, etc.)
- Functions: `getCases()`, `addCase(case)`, `updateCase(id, updates)`, `deleteCase(id)`
- All read/write from `localStorage` key `"hiring_cases"`
- Seed with empty array on first load (no mock data)

**2. Update `src/pages/CaseCreate.tsx`**
- After the criteria flow completes and user proceeds to candidate ranking, save the new case to localStorage via `addCase()` with status `"criteria_defined"` or `"scored"`

**3. Update `src/pages/Index.tsx` (Dashboard)**
- Replace `import { hiringCases, candidates } from "@/data/mockData"` with `getCases()` from the store
- Derive stats (active cases, total candidates) from stored cases
- Use `api.listCandidates()` for the total candidates count
- Show empty state when no cases exist

**4. Update `src/pages/HiringCases.tsx`**
- Replace mock data import with `getCases()`
- Add empty state UI when no cases exist yet

**5. Keep `mockData.ts`** — still used by CriteriaDef chat messages, departments, seniority levels

### Technical Details
- `useState` + `useEffect` to load from localStorage on mount
- Cases get an auto-generated ID and timestamp when created
- Status transitions: `draft` → `criteria_defined` → `scored` (set during the create flow)

