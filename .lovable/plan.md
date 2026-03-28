

## Plan: Connect Frontend to Backend API

### Overview
Replace mock data flow with real API calls to `https://digital-excellence-talent-hub.onrender.com`. The user flow becomes: Enter JD → AI discovery chat → Review parsed criteria → Approve → Rank candidates.

### Architecture

```text
CaseCreate (JD input)
  → POST /api/chat-discovery (loop until READY)
  → POST /api/parse-jd (get criteria)
  → Navigate to CriteriaDef with criteria in state
CriteriaDef (review/adjust criteria)
  → Approve → POST /api/rank-candidates
  → Navigate to CandidateEval with results in state
CandidateEval (show ranked candidates)
```

### Changes

**1. Create `src/lib/api.ts`** — API client module
- Base URL constant: `https://digital-excellence-talent-hub.onrender.com`
- `parseJD(jobDescription: string)` → POST `/api/parse-jd`
- `chatDiscovery(jobDescription: string, history: any[])` → POST `/api/chat-discovery`
- `rankCandidates(criteria: string)` → POST `/api/rank-candidates`

**2. Rewrite `CaseCreate.tsx`** — Add discovery chat flow
- After user enters JD and clicks "Generate Criteria", call `/api/chat-discovery` in a loop
- Show AI follow-up questions inline (chat UI within the create page)
- User responds to questions; history accumulates
- When API returns `{"status": "READY"}`, call `/api/parse-jd` to get structured criteria
- Navigate to `/criteria` passing parsed criteria + JD via React Router state
- Remove department/seniority/urgency selects (backend extracts these from JD)

**3. Rewrite `CriteriaDef.tsx`** — Use real criteria from navigation state
- Read criteria from `location.state` instead of mock data
- Keep the weight adjustment sliders and chat UI for refinement
- On "Approve", call `/api/rank-candidates` with the verified criteria as a string
- Navigate to candidate eval with ranked results in state

**4. Rewrite `CandidateEval.tsx`** — Display API-returned candidates
- Read candidate results from `location.state`
- Map API response fields (`full_name`, `current_title`, `fit_score`, `tradeoff_reasoning`, `skills`, `years_experience`, `location`) to the UI
- Remove dependency on mock `candidates` and `criteria` arrays
- Simplify detail panel to show: fit score, skills, tradeoff reasoning, location, experience

**5. Update `CandidateCompare.tsx`** — Adapt to new data shape
- Read candidates from `location.state`
- Remove radar chart (no per-criterion scores from API)
- Show a simpler comparison table with fit_score, skills, and tradeoff reasoning side-by-side

**6. Keep mock data for Dashboard/HiringCases**
- Dashboard and HiringCases pages continue using mock data as a static showcase
- The real flow starts from "New Hiring Case" → CaseCreate

### Technical Details
- API calls use `fetch` directly (no Supabase needed)
- Loading and error states with toast notifications
- Navigation state typed with interfaces matching API response shapes
- Discovery chat uses a message array state, rendered as a chat thread

