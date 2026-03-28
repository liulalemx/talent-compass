import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const radarColors = ["hsl(217, 71%, 45%)", "hsl(142, 60%, 40%)", "hsl(38, 92%, 50%)", "hsl(0, 72%, 51%)"];

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
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
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

      {/* Radar Chart */}
      <Card>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
              <PolarGrid stroke="hsl(214, 20%, 90%)" />
              <PolarAngleAxis
                dataKey="criterion"
                tick={{ fill: "hsl(215, 14%, 50%)", fontSize: 12 }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              {topCandidates.map((c, i) => (
                <Radar
                  key={c.id}
                  name={c.name}
                  dataKey={c.name}
                  stroke={radarColors[i]}
                  fill={radarColors[i]}
                  fillOpacity={0.08}
                  strokeWidth={2}
                />
              ))}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] sticky left-0 bg-card z-10">Criterion</TableHead>
                {topCandidates.map((c) => (
                  <TableHead key={c.id} className="text-center min-w-[140px]">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{c.name.split(" ").slice(-1)[0]}</p>
                      <Badge variant={c.source === "internal" ? "secondary" : "outline"} className="text-[10px]">
                        {c.source}
                      </Badge>
                    </div>
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
                  <TableRow key={cr.id}>
                    <TableCell className="sticky left-0 bg-card z-10">
                      <div>
                        <p className="font-medium text-sm">{cr.name}</p>
                        <p className="text-[11px] text-muted-foreground">Weight: {cr.weight}%</p>
                      </div>
                    </TableCell>
                    {topCandidates.map((c, i) => {
                      const score = scores[i];
                      return (
                        <TableCell key={c.id} className="text-center">
                          <span className={`text-lg ${getScoreColor(score, best)}`}>
                            {score}
                          </span>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              <TableRow className="bg-muted/50">
                <TableCell className="sticky left-0 bg-muted/50 z-10 font-semibold">
                  Overall Score
                </TableCell>
                {topCandidates.map((c) => {
                  const best = Math.max(...topCandidates.map((tc) => tc.overallScore));
                  return (
                    <TableCell key={c.id} className="text-center">
                      <span className={`text-xl ${getScoreColor(c.overallScore, best)}`}>
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
