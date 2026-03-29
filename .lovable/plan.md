

## Plan: Fix Presentation Layout & Restructure Slides

### Issue
The `/presentation` route is inside `<AppLayout>`, which wraps it with the sidebar and header. The presentation needs to render standalone.

### Slide Restructure
Replace the current 7 slides with 4 slides matching the required format (20 seconds each):

1. **Problem** — What Talent Scout Desk is and why it matters (slow internal hiring, missed talent, subjective evaluations)
2. **Input** — Real meaningful inputs the system takes (job description, weighted criteria, urgency level, candidate profiles/skills data)
3. **AI/Agents** — System logic: AI discovery chat → criteria generation → LLM-powered scoring → ranked fit scores with reasoning
4. **Business Value** — Why this makes decisions better (faster hiring cycles, data-driven objectivity, reduced external spend, internal talent visibility)

### Technical Changes

1. **`src/App.tsx`** — Move the `/presentation` route outside `<AppLayout>` so it renders without sidebar/header:
   ```tsx
   <BrowserRouter>
     <SearchProvider>
       <Routes>
         <Route path="/presentation" element={<Presentation />} />
         <Route path="*" element={
           <AppLayout>
             <Routes>...</Routes>
           </AppLayout>
         } />
       </Routes>
     </SearchProvider>
   </BrowserRouter>
   ```

2. **`src/pages/Presentation.tsx`** — Replace all 7 slide components with 4 new ones matching the required structure. Keep the existing navigation/fullscreen infrastructure.

