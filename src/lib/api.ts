const BASE_URL = "https://digital-excellence-talent-hub.onrender.com";

export interface ParsedCriteria {
  [key: string]: any;
}

export interface DiscoveryResponse {
  status: "CHAT" | "READY";
  message?: string;
}

export interface RankedCandidate {
  full_name: string;
  current_title: string;
  years_experience: string | number;
  location: string;
  skills: string[];
  fit_score: number;
  tradeoff_reasoning: string;
}

export interface RankResponse {
  status: string;
  candidate_scores: RankedCandidate[];
}

async function post<T>(path: string, body: Record<string, any>): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || `API error ${res.status}`);
  }
  return res.json();
}

export const api = {
  parseJD: (job_description: string) =>
    post<ParsedCriteria>("/api/parse-jd", { job_description }),

  chatDiscovery: (job_description: string, history: any[]) =>
    post<DiscoveryResponse>("/api/chat-discovery", { job_description, history }),

  rankCandidates: (criteria: string) =>
    post<RankResponse>("/api/rank-candidates", { criteria }),
};
