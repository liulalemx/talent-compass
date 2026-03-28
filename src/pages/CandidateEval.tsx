import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import type { RankedCandidate } from "@/lib/api";

export default function CandidateEval() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { candidates: RankedCandidate[] } | null;
  const candidates = state?.candidates || [];

  if (!candidates.length) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <Card className="border-0 shadow-sm max-w-md">
          <CardContent className="p-6 text-center space-y-3">
            <h2 className="font-semibold">No Candidates Found</h2>
            <p className="text-sm text-muted-foreground">Start by creating a hiring case and defining criteria.</p>
            <Button onClick={() => navigate("/cases/new")} className="rounded-xl">Create Hiring Case</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold">Final Talent Ranking</h1>
          <p className="text-sm text-muted-foreground">
            Intelligence scoring based on cross-referenced CV analysis and requirements.
          </p>
        </div>
        <Button variant="outline" className="rounded-xl" onClick={() => navigate("/cases/new")}>
          <Search className="h-4 w-4" />
          New Search
        </Button>
      </div>

      {/* Candidate Cards */}
      {candidates.map((c, i) => (
        <Card
          key={i}
          className="border-0 shadow-sm border-l-[6px] border-l-foreground/80 hover:shadow-md transition-all duration-200"
        >
          <CardContent className="p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-base">{c.full_name}</h3>
                <p className="text-sm text-muted-foreground">
                  {c.current_title} · {c.years_experience} yrs · {typeof c.location === "string" ? c.location : "N/A"}
                </p>
              </div>
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-100 font-bold text-sm px-3 py-1">
                {c.fit_score}
              </Badge>
            </div>

            {/* Skills */}
            {c.skills && c.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {c.skills.map((skill, j) => (
                  <span
                    key={j}
                    className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Tradeoff */}
            <p className="text-sm leading-relaxed text-muted-foreground">{c.tradeoff_reasoning}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
