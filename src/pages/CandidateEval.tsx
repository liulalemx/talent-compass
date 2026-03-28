import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpDown, Filter, GitCompareArrows, Lightbulb, AlertTriangle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <div className="p-4 lg:p-6 border-b border-border space-y-3 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold">{hiringCase.title}</h1>
            <p className="text-sm text-muted-foreground">
              {hiringCase.department} · {hiringCase.candidateCount} candidates evaluated
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/cases/case-1/compare">
              <GitCompareArrows className="h-4 w-4" />
              Compare Top Candidates
            </Link>
          </Button>
        </div>
        <Tabs value={sourceFilter} onValueChange={setSourceFilter}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="internal">Internal</TabsTrigger>
            <TabsTrigger value="external">External</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 min-h-0">
        {/* Candidate List */}
        <div className="w-full lg:w-[380px] border-r border-border overflow-auto shrink-0">
          {filtered.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`w-full text-left p-4 border-b border-border transition-colors hover:bg-muted/50 ${
                c.id === selectedId ? "bg-muted" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm truncate pr-2">{c.name}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={c.source === "internal" ? "secondary" : "outline"} className="text-[11px]">
                    {c.source}
                  </Badge>
                  <span className="text-lg font-semibold text-primary">{c.overallScore}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {c.currentRole} · {c.company}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {c.yearsExperience} yrs · {c.location}
              </p>
            </button>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="flex-1 overflow-auto p-4 lg:p-6 space-y-6 hidden lg:block">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-semibold">{selected.name}</h2>
              <Badge variant={selected.source === "internal" ? "secondary" : "outline"}>
                {selected.source}
              </Badge>
              <span className="text-2xl font-bold text-primary ml-auto">{selected.overallScore}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {selected.currentRole} at {selected.company} · {selected.yearsExperience} years · {selected.location}
            </p>
          </div>

          {/* Summary */}
          <Card>
            <CardContent className="p-4">
              <p className="text-sm leading-relaxed">{selected.summary}</p>
            </CardContent>
          </Card>

          {/* Strengths & Risks */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-emerald-600" />
                  <h3 className="font-medium text-sm">Key Strengths</h3>
                </div>
                <ul className="space-y-1.5">
                  {selected.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 mt-0.5 text-emerald-500 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <h3 className="font-medium text-sm">Risks & Concerns</h3>
                </div>
                <ul className="space-y-1.5">
                  {selected.risks.map((r, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 mt-0.5 text-amber-500 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Score Breakdown */}
          <div>
            <h3 className="font-medium mb-3">Score Breakdown</h3>
            <div className="space-y-3">
              {selected.scores.map((sc) => {
                const crit = criteria.find((cr) => cr.id === sc.criterionId);
                if (!crit) return null;
                return (
                  <Card key={sc.criterionId}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{crit.name}</span>
                        <span className="text-sm font-semibold text-primary">{sc.score}/100</span>
                      </div>
                      <Progress value={sc.score} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">{sc.rationale}</p>
                      <span className="text-[11px] text-muted-foreground mt-1 block">
                        Weight: {crit.weight}%
                      </span>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Why Selected */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <h3 className="font-medium text-sm mb-2 text-primary">Why This Candidate?</h3>
              <p className="text-sm leading-relaxed">{selected.whySelected}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
