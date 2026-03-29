

## Plan: Replace "Avg. Time to Fill" with "Scored Cases"

### Change

**`src/pages/Index.tsx`** — In the stats grid (lines 62-67), replace the third stat object:

**Before:**
```js
{ label: "Avg. Time to Fill", value: "18d", icon: Clock }
```

**After:**
```js
{ label: "Scored Cases", value: cases.filter(c => c.status === "scored").length, icon: CheckCircle }
```

Also: add `CheckCircle` to the lucide-react import and remove `Clock`.

