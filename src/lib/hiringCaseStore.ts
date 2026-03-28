export interface StoredHiringCase {
  id: string;
  title: string;
  department: string;
  status: "draft" | "criteria_defined" | "scored";
  urgency: "low" | "medium" | "high";
  candidateCount: number;
  createdAt: string;
  jobDescription?: string;
  criteria?: any;
  candidateResults?: any[];
  suggestExternal?: boolean;
  recommendationType?: "CRITICAL" | "STRATEGIC" | null;
}

const STORAGE_KEY = "hiring_cases";

function readCases(): StoredHiringCase[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCases(cases: StoredHiringCase[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
}

export function getCases(): StoredHiringCase[] {
  return readCases();
}

export function getCase(id: string): StoredHiringCase | undefined {
  return readCases().find((c) => c.id === id);
}

export function addCase(c: Omit<StoredHiringCase, "id" | "createdAt">): StoredHiringCase {
  const cases = readCases();
  const newCase: StoredHiringCase = {
    ...c,
    id: `case-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  cases.unshift(newCase);
  writeCases(cases);
  return newCase;
}

export function updateCase(id: string, updates: Partial<StoredHiringCase>) {
  const cases = readCases();
  const idx = cases.findIndex((c) => c.id === id);
  if (idx !== -1) {
    cases[idx] = { ...cases[idx], ...updates };
    writeCases(cases);
  }
}

export function deleteCase(id: string) {
  writeCases(readCases().filter((c) => c.id !== id));
}
