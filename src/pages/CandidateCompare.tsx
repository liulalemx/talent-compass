import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { RankedCandidate } from "@/lib/api";

export default function CandidateCompare() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { candidates: RankedCandidate[] } | null;

  if (!candidates.length) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <Card className="border-0 shadow-sm max-w-md">
          <CardContent className="p-6 text-center space-y-3">
            <h2 className="font-semibold">No Candidates to Compare</h2>
            <p className="text-sm text-muted-foreground">Run candidate ranking first.</p>
            <Button onClick={() => navigate("/cases/new")} className="rounded-xl">Create Hiring Case</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const bestScore = Math.max(...candidates.map((c) => c.fit_score));

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1400px]">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="rounded-xl" asChild>
          <Link to="/cases/case-1/candidates" state={{ candidates }}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-semibold">Compare Candidates</h1>
          <p className="text-sm text-muted-foreground">Side-by-side comparison of {candidates.length} candidates</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className={`grid gap-3 grid-cols-${Math.min(candidates.length, 4)} lg:grid-cols-${Math.min(candidates.length, 4)}`}>
        {candidates.map((c, i) => (
          <Card key={i} className={`border-0 shadow-sm ${i === 0 ? "ring-2 ring-primary/20" : ""}`}>
            <CardContent className="p-4 text-center">
              <Avatar className="h-12 w-12 mx-auto mb-2">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                  {c.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-sm font-medium">{c.full_name}</h3>
              <p className="text-xs text-muted-foreground truncate">{c.current_title}</p>
              <p className="text-2xl font-bold text-primary mt-2">{c.fit_score}</p>
              {i === 0 && <p className="text-[11px] text-primary font-medium mt-0.5">Top Pick</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <Card className="border-0 shadow-sm">
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60">
                <TableHead className="w-[160px] sticky left-0 bg-card z-10 font-medium">Attribute</TableHead>
                {candidates.map((c, i) => (
                  <TableHead key={i} className="text-center min-w-[180px]">
                    <p className="font-medium text-foreground">{c.full_name}</p>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-border/40">
                <TableCell className="sticky left-0 bg-card z-10 font-medium text-sm">Fit Score</TableCell>
                {candidates.map((c, i) => (
                  <TableCell key={i} className="text-center">
                    <span className={`text-lg tabular-nums ${c.fit_score === bestScore ? "font-bold text-primary" : "text-muted-foreground"}`}>
                      {c.fit_score}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="border-border/40">
                <TableCell className="sticky left-0 bg-card z-10 font-medium text-sm">Experience</TableCell>
                {candidates.map((c, i) => (
                  <TableCell key={i} className="text-center text-sm">{c.years_experience} years</TableCell>
                ))}
              </TableRow>
              <TableRow className="border-border/40">
                <TableCell className="sticky left-0 bg-card z-10 font-medium text-sm">Location</TableCell>
                {candidates.map((c, i) => (
                  <TableCell key={i} className="text-center text-sm">{c.location}</TableCell>
                ))}
              </TableRow>
              <TableRow className="border-border/40">
                <TableCell className="sticky left-0 bg-card z-10 font-medium text-sm">Skills</TableCell>
                {candidates.map((c, i) => (
                  <TableCell key={i} className="text-center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {c.skills.map((s, j) => (
                        <Badge key={j} variant="secondary" className="text-[10px]">{s}</Badge>
                      ))}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="border-border/40">
                <TableCell className="sticky left-0 bg-card z-10 font-medium text-sm align-top">AI Analysis</TableCell>
                {candidates.map((c, i) => (
                  <TableCell key={i} className="text-sm text-muted-foreground leading-relaxed max-w-[250px]">
                    {c.tradeoff_reasoning}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
