import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GitCompareArrows, ChevronRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { RankedCandidate } from "@/lib/api";

export default function CandidateEval() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { candidates: RankedCandidate[]; criteria?: any[] } | null;
  const candidates = state?.candidates || [];
  const [selectedIdx, setSelectedIdx] = useState(0);

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

  const selected = candidates[selectedIdx];

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Top Bar */}
      <div className="p-4 lg:px-6 border-b border-border/60 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold">Ranked Candidates</h1>
            <p className="text-sm text-muted-foreground">{candidates.length} candidates evaluated by AI</p>
          </div>
          {candidates.length > 1 && (
            <Button variant="outline" className="rounded-xl" asChild>
              <Link to="/cases/case-1/compare" state={{ candidates }}>
                <GitCompareArrows className="h-4 w-4" />
                Compare Candidates
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 min-h-0">
        {/* List */}
        <div className="w-full lg:w-[360px] border-r border-border/60 overflow-auto shrink-0">
          {candidates.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelectedIdx(i)}
              className={`w-full text-left p-4 border-b border-border/40 transition-all duration-150 hover:bg-accent/50 ${
                i === selectedIdx ? "bg-accent/70" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-[11px] font-medium">
                    {c.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-medium text-sm truncate pr-2">{c.full_name}</span>
                    <span className="text-base font-semibold text-primary tabular-nums">{c.fit_score}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.current_title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-muted-foreground">
                      {c.years_experience} yrs · {typeof c.location === "string" ? c.location.split(",")[0] : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="flex-1 overflow-auto p-5 lg:p-6 space-y-5 hidden lg:block">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {selected.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">{selected.full_name}</h2>
                <p className="text-sm text-muted-foreground">
                  {selected.current_title} · {selected.years_experience} years · {selected.location}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-primary">{selected.fit_score}</span>
              <p className="text-xs text-muted-foreground">Fit Score</p>
            </div>
          </div>

          {/* Fit Score Bar */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">AI Fit Score</span>
                <span className="text-sm font-semibold text-primary tabular-nums">{selected.fit_score}/100</span>
              </div>
              <Progress value={selected.fit_score} className="h-2" />
            </CardContent>
          </Card>

          {/* Tradeoff Reasoning */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-warning/10">
                  <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                </div>
                <h3 className="font-medium text-sm">AI Analysis & Tradeoffs</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{selected.tradeoff_reasoning}</p>
            </CardContent>
          </Card>

          {/* Skills */}
          {selected.skills && selected.skills.length > 0 && (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-medium text-sm mb-3">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
