import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Search, GitCompareArrows, MapPin, Briefcase, Clock } from "lucide-react";
import type { RankedCandidate } from "@/lib/api";
import { getCase } from "@/lib/hiringCaseStore";

export default function CandidateEval() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const storedCase = id ? getCase(id) : undefined;
  const candidates: RankedCandidate[] = storedCase?.candidateResults || [];
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [compareSet, setCompareSet] = useState<Set<number>>(new Set());

  const toggleCompare = (idx: number) => {
    setCompareSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleCompare = () => {
    const selected = Array.from(compareSet).map((i) => candidates[i]);
    navigate(`/cases/${id}/compare`, { state: { candidates: selected } });
  };

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
  const bestScore = Math.max(...candidates.map((c) => c.fit_score));

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Left panel */}
      <div className="w-80 lg:w-96 border-r border-border/60 flex flex-col">
        <div className="p-4 border-b border-border/60 space-y-3">
          <div>
            <h1 className="text-lg font-semibold">Talent Ranking</h1>
            <p className="text-xs text-muted-foreground">{candidates.length} candidates scored</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl flex-1" onClick={() => navigate("/cases/new")}>
              <Search className="h-3.5 w-3.5" />
              New Search
            </Button>
            <Button size="sm" className="rounded-xl flex-1" disabled={compareSet.size < 2} onClick={handleCompare}>
              <GitCompareArrows className="h-3.5 w-3.5" />
              Compare ({compareSet.size})
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {candidates.map((c, i) => (
            <div
              key={i}
              onClick={() => setSelectedIdx(i)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-border/40 transition-colors ${
                i === selectedIdx ? "bg-primary/5" : "hover:bg-muted/50"
              }`}
            >
              <Checkbox
                checked={compareSet.has(i)}
                onCheckedChange={() => toggleCompare(i)}
                onClick={(e) => e.stopPropagation()}
                className="shrink-0"
              />
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                  {c.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{c.full_name}</p>
                <p className="text-xs text-muted-foreground truncate">{c.current_title}</p>
              </div>
              <Badge
                className={`shrink-0 font-bold text-xs px-2 py-0.5 ${
                  c.fit_score === bestScore
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : c.fit_score >= 60
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                } hover:bg-current`}
              >
                {c.fit_score}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 overflow-auto p-6 lg:p-8">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {selected.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{selected.full_name}</h2>
              <p className="text-sm text-muted-foreground">{selected.current_title}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{selected.location || "Internal"}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{selected.years_experience} yrs experience</span>
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-100 font-bold text-lg px-4 py-1.5">
              {selected.fit_score}
            </Badge>
          </div>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Fit Score</span>
                <span className="font-bold text-primary">{selected.fit_score} / 100</span>
              </div>
              <Progress value={selected.fit_score} className="h-2.5" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-5 space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" /> Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {selected.skills?.map((skill, j) => (
                  <span key={j} className="text-xs bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-md font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-5 space-y-3">
              <h3 className="text-sm font-semibold">AI Trade-off Analysis</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{selected.tradeoff_reasoning}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
