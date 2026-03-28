

## Plan: Align Frontend with Template Implementation

### Overview
Adapt the existing React pages to match the template's multi-step flow, form structure, and visual patterns while keeping the existing API integration and component library.

### Changes

**1. Rewrite `CaseCreate.tsx`** — Match template's Step 1 + Chat flow
- Add separate "Job Title" and "Location / Plant" input fields above the description textarea
- Combine all three fields into the `job_description` string sent to the API
- Add "Skip to Final Tuning" button in the chat phase that calls `parseAndNavigate()` directly
- Keep the existing discovery chat UI but add the template's typing indicator text ("Agent is analyzing your input...")
- Update header text to "RapidResolve AI" subtitle style

**2. Rewrite `CriteriaDef.tsx`** — Match template's Step 2 verification UI
- Add editable "Target Position Title" input field (pre-filled from state)
- Add editable "Refined Requirements" textarea (pre-filled from job description)
- Replace slider-based weight system with number inputs (1-10 scale instead of percentage)
- Each criterion row: editable name input + weight number input + delete button
- Add "+ Add Custom Requirement" button to append new criteria
- Add "Reset" secondary button alongside "Execute Search & Rank"
- Convert criteria to string for API using the 1-10 weights

**3. Rewrite `CandidateEval.tsx`** — Match template's talent card style
- Replace the split-panel list/detail layout with stacked candidate cards
- Each card: left blue/dark border accent, candidate name + title header, score pill (green badge), skills as tags, tradeoff reasoning paragraph
- Add "New Search" button that navigates back to `/cases/new`
- Remove the compare button (simplify to single-page results)
- Header: "Final Talent Ranking" with subtitle

**4. Remove `CandidateCompare.tsx` route** (optional — or keep but simplify)
- The template doesn't have a compare view; we can keep the route but remove the link from CandidateEval

**5. Update `src/App.tsx`** — No route changes needed, just keep existing routes

### Technical Details
- API client (`src/lib/api.ts`) remains unchanged
- Criteria weight system changes from percentage (0-100 total) to 1-10 per criterion scale
- The `rankCandidates` call still sends a string; we format it as `"CriterionName (weight/10): description"`
- Navigation state interfaces stay the same
- All existing shadcn components reused (Card, Input, Button, Badge)

