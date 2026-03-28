import { useState } from "react";
import { Link } from "react-router-dom";
import { GitCompareArrows, Lightbulb, AlertTriangle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { candidates, criteria, hiringCases } from "@/data/mockData";

export default function CandidateEval() {
  const [selectedId, setSelectedId] = useState(candidates[0].id);
  const [sourceFilter, setSourceFilter] = useState("all");
  const hiringCase = hiringCases[0];

  const filtered = candidates
    .filter((c) => sourceFilter === "all" || c.source === sourceFilter)
    .sort((a, b) => b.overallScore - a.overallScore);

  const selected = candidates.find((c) => c.id === selectedId) ?? candidates[0];

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Top Bar */}
      <div className="p-4 lg:px-6 border-b border-border/60 space-y-3 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold">{hiringCase.title}</h1>
            <p className="text-sm text-muted-foreground">
              {hiringCase.department} · {hiringCase.candidateCount} candidates evaluated
            </p>
          </div>
          <Button variant="outline" className="rounded-xl" asChild>
            <Link to="/cases/case-1/compare">
              <GitCompareArrows className="h-4 w-4" />
              Compare Top Candidates
            </Link>
          </Button>
        </div>
        <Tabs value={sourceFilter} onValueChange={setSourceFilter}>
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">All ({candidates.length})</TabsTrigger>
            <TabsTrigger value="internal">Internal ({candidates.filter(c => c.source === "internal").length})</TabsTrigger>
            <TabsTrigger value="external">External ({candidates.filter(c => c.source === "external").length})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 min-h-0">
        {/* Candidate List */}
        <div className="w-full lg:w-[360px] border-r border-border/60 overflow-auto shrink-0">
          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`w-full text-left p-4 border-b border-border/40 transition-all duration-150 hover:bg-accent/50 ${
                c.id === selectedId ? "bg-accent/70" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-[11px] font-medium">
                    {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-medium text-sm truncate pr-2">{c.name}</span>
                    <span className="text-base font-semibold text-primary tabular-nums">{c.overallScore}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {c.currentRole}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={c.source === "internal" ? "secondary" : "outline"}
                      className="text-[10px] px-1.5 py-0"
                    >
                      {c.source}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">{c.yearsExperience} yrs · {c.location.split(",")[0]}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="flex-1 overflow-auto p-5 lg:p-6 space-y-5 hidden lg:block">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {selected.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">{selected.name}</h2>
                  <Badge variant={selected.source === "internal" ? "secondary" : "outline"}>
                    {selected.source}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selected.currentRole} at {selected.company} · {selected.yearsExperience} years · {selected.location}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-primary">{selected.overallScore}</span>
              <p className="text-xs text-muted-foreground">Overall Score</p>
            </div>
          </div>

          {/* Summary */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-sm leading-relaxed">{selected.summary}</p>
            </CardContent>
          </Card>

          {/* Strengths & Risks */}
          <div className="grid sm:grid-cols-2 gap-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-success/10">
                    <Lightbulb className="h-3.5 w-3.5 text-success" />
                  </div>
                  <h3 className="font-medium text-sm">Key Strengths</h3>
                </div>
                <ul className="space-y-1.5">
                  {selected.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 mt-0.5 text-success shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-warning/10">
                    <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                  </div>
                  <h3 className="font-medium text-sm">Risks & Concerns</h3>
                </div>
                <ul className="space-y-1.5">
                  {selected.risks.map((r, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 mt-0.5 text-warning shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Score Breakdown */}
          <div>
            <h3 className="font-medium text-sm mb-3">Score Breakdown</h3>
            <div className="space-y-2.5">
              {selected.scores.map((sc) => {
                const crit = criteria.find((cr) => cr.id === sc.criterionId);
                if (!crit) return null;
                return (
                  <Card key={sc.criterionId} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{crit.name}</span>
                          <span className="text-[11px] text-muted-foreground">({crit.weight}%)</span>
                        </div>
                        <span className="text-sm font-semibold text-primary tabular-nums">{sc.score}</span>
                      </div>
                      <Progress value={sc.score} className="h-1.5 mb-2" />
                      <p className="text-xs text-muted-foreground leading-relaxed">{sc.rationale}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Why Selected */}
          <Card className="border-0 shadow-sm bg-accent/50">
            <CardContent className="p-4">
              <h3 className="font-medium text-sm mb-1.5 text-accent-foreground flex items-center gap-1.5">
                <Lightbulb className="h-3.5 w-3.5" />
                Why This Candidate?
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{selected.whySelected}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
