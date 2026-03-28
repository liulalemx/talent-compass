import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { candidates, criteria } from "@/data/mockData";

const topCandidates = candidates.filter((c) => c.rank <= 4).sort((a, b) => a.rank - b.rank);

const radarColors = [
  "hsl(252, 56%, 57%)",
  "hsl(152, 60%, 42%)",
  "hsl(330, 65%, 55%)",
  "hsl(38, 92%, 50%)",
];

const radarData = criteria.map((cr) => {
  const entry: Record<string, string | number> = { criterion: cr.name };
  topCandidates.forEach((c) => {
    const sc = c.scores.find((s) => s.criterionId === cr.id);
    entry[c.name] = sc?.score ?? 0;
  });
  return entry;
});

function getScoreColor(score: number, best: number) {
  if (score === best) return "font-bold text-primary";
  if (score >= best - 5) return "font-medium";
  return "text-muted-foreground";
}

export default function CandidateCompare() {
  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1400px]">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="rounded-xl" asChild>
          <Link to="/cases/case-1/candidates">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-semibold">Compare Top Candidates</h1>
          <p className="text-sm text-muted-foreground">
            Side-by-side comparison of the top {topCandidates.length} candidates
          </p>
        </div>
      </div>

      {/* Candidate Summary Cards */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {topCandidates.map((c, i) => (
          <Card key={c.id} className={`border-0 shadow-sm ${i === 0 ? "ring-2 ring-primary/20" : ""}`}>
            <CardContent className="p-4 text-center">
              <Avatar className="h-12 w-12 mx-auto mb-2">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                  {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-sm font-medium">{c.name.split(" ").slice(-1)[0]}</h3>
              <p className="text-xs text-muted-foreground truncate">{c.company}</p>
              <Badge
                variant={c.source === "internal" ? "secondary" : "outline"}
                className="text-[10px] mt-1.5"
              >
                {c.source}
              </Badge>
              <p className="text-2xl font-bold text-primary mt-2">{c.overallScore}</p>
              {i === 0 && <p className="text-[11px] text-primary font-medium mt-0.5">Top Pick</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Radar Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Skills Comparison</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="72%">
              <PolarGrid stroke="hsl(240, 6%, 90%)" />
              <PolarAngleAxis
                dataKey="criterion"
                tick={{ fill: "hsl(240, 5%, 46%)", fontSize: 11 }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              {topCandidates.map((c, i) => (
                <Radar
                  key={c.id}
                  name={c.name}
                  dataKey={c.name}
                  stroke={radarColors[i]}
                  fill={radarColors[i]}
                  fillOpacity={0.06}
                  strokeWidth={2}
                />
              ))}
              <Legend wrapperStyle={{ fontSize: "12px" }} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card className="border-0 shadow-sm">
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60">
                <TableHead className="w-[200px] sticky left-0 bg-card z-10 font-medium">
                  Criterion
                </TableHead>
                {topCandidates.map((c) => (
                  <TableHead key={c.id} className="text-center min-w-[130px]">
                    <p className="font-medium text-foreground">{c.name.split(" ").slice(-1)[0]}</p>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {criteria.map((cr) => {
                const scores = topCandidates.map(
                  (c) => c.scores.find((s) => s.criterionId === cr.id)?.score ?? 0
                );
                const best = Math.max(...scores);
                return (
                  <TableRow key={cr.id} className="border-border/40">
                    <TableCell className="sticky left-0 bg-card z-10">
                      <p className="font-medium text-sm">{cr.name}</p>
                      <p className="text-[11px] text-muted-foreground">{cr.weight}% weight</p>
                    </TableCell>
                    {topCandidates.map((c, i) => {
                      const score = scores[i];
                      return (
                        <TableCell key={c.id} className="text-center">
                          <span className={`text-lg tabular-nums ${getScoreColor(score, best)}`}>
                            {score}
                          </span>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              <TableRow className="bg-accent/30 border-border/40">
                <TableCell className="sticky left-0 bg-accent/30 z-10 font-semibold text-sm">
                  Overall Score
                </TableCell>
                {topCandidates.map((c) => {
                  const best = Math.max(...topCandidates.map((tc) => tc.overallScore));
                  return (
                    <TableCell key={c.id} className="text-center">
                      <span className={`text-xl tabular-nums ${getScoreColor(c.overallScore, best)}`}>
                        {c.overallScore}
                      </span>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
