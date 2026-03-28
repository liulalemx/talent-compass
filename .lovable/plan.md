

## Plan: Sync Frontend with Updated API

### Summary
The backend API has two key changes: (1) `rank-candidates` now accepts an `urgency` parameter and returns `suggest_external` / `recommendation_type` fields, and (2) a new `/api/generate-ad` endpoint exists. The frontend needs to be updated to support urgency input, handle external suggestion responses, and allow generating job ads.

### Changes

**1. Update `src/lib/api.ts`**
- Add `urgency` parameter to `rankCandidates(criteria, urgency)`
- Update `RankResponse` to include `suggest_external: boolean` and `recommendation_type: "CRITICAL" | "STRATEGIC" | null`
- Add new `generateAd(title, jd_context)` method returning `{ ad_text: string }`

**2. Update `src/pages/CriteriaDef.tsx` — Add urgency slider**
- Add an urgency slider (1–10, default 5) to the criteria tuning page
- Pass urgency value to `api.rankCandidates(fullCriteria, urgency)`
- Store `suggest_external` and `recommendation_type` in the case via `updateCase`

**3. Update `src/lib/hiringCaseStore.ts`**
- Add `suggestExternal?: boolean`, `recommendationType?: string` fields to `StoredHiringCase`

**4. Update `src/pages/CandidateEval.tsx` — External suggestion banner**
- Read `suggestExternal` and `recommendationType` from the stored case
- When `suggest_external` is true, show a prominent banner:
  - **CRITICAL**: Red/urgent banner — "No viable internal matches. Immediate external recruitment required."
  - **STRATEGIC**: Blue/advisory banner — "Internal talent density is low. Consider an external search."
- Banner includes a "Generate External Job Advertisement" button
- Clicking it calls `api.generateAd()` with the case title and job description
- Display the generated ad text in a textarea below the banner with a "Copy to Clipboard" button

### Technical Details
- Urgency slider reuses the existing `<Slider>` component already imported in CriteriaDef
- The generate-ad call uses the existing `post()` helper
- Copy-to-clipboard uses `navigator.clipboard.writeText()`
- The external suggestion banner renders above or below the candidate list depending on whether candidates exist

