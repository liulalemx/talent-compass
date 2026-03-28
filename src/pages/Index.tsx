import { Link } from "react-router-dom";
import { Plus, Briefcase, Users, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { hiringCases } from "@/data/mockData";

const statusConfig = {
  draft: { label: "Draft", variant: "secondary" as const },
  criteria_defined: { label: "Criteria Defined", variant: "outline" as const },
  scored: { label: "Scored", variant: "default" as const },
};

const urgencyColor = {
  low: "text-muted-foreground",
  medium: "text-amber-600",
  high: "text-red-600",
};

export default function Dashboard() {
  const activeCases = hiringCases.filter((c) => c.status !== "draft").length;
  const totalCandidates = hiringCases.reduce((s, c) => s + c.candidateCount, 0);

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your hiring pipeline
          </p>
        </div>
        <Button asChild>
          <Link to="/cases/new">
            <Plus className="h-4 w-4" />
            Create New Hiring Case
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Cases</p>
              <p className="text-2xl font-semibold">{activeCases}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Candidates</p>
              <p className="text-2xl font-semibold">{totalCandidates}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Recently Evaluated</p>
              <p className="text-2xl font-semibold">1</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hiring Cases */}
      <div>
        <h2 className="text-lg font-medium mb-4">Hiring Cases</h2>
        <div className="grid gap-4">
          {hiringCases.map((c) => {
            const st = statusConfig[c.status];
            return (
              <Link
                key={c.id}
                to={c.status === "scored" ? `/cases/${c.id}/candidates` : c.status === "criteria_defined" ? `/cases/${c.id}/criteria` : `/cases/new`}
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium truncate">{c.title}</h3>
                        <Badge variant={st.variant}>{st.label}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{c.department}</span>
                        <span>·</span>
                        <span>{c.seniority}</span>
                        <span>·</span>
                        <span className={urgencyColor[c.urgency]}>
                          {c.urgency.charAt(0).toUpperCase() + c.urgency.slice(1)} urgency
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground shrink-0">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        {c.candidateCount} candidates
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {c.lastUpdated}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
