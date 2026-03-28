import { Link } from "react-router-dom";
import {
  Plus,
  Briefcase,
  Users,
  Clock,
  ChevronRight,
  UserCheck,
  Target,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { hiringCases, candidates } from "@/data/mockData";

const statusConfig = {
  draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  criteria_defined: { label: "In Progress", className: "bg-accent text-accent-foreground" },
  scored: { label: "Scored", className: "bg-primary/10 text-primary" },
};

const urgencyConfig = {
  low: { label: "Low", className: "text-muted-foreground" },
  medium: { label: "Medium", className: "text-warning" },
  high: { label: "High", className: "text-destructive" },
};

const recentActivity = [
  { id: 1, action: "Candidate scored", detail: "Dr. Elena Vasquez — 92/100", time: "2 hours ago", icon: UserCheck, color: "bg-primary/10 text-primary" },
  { id: 2, action: "Criteria approved", detail: "Senior SW Engineering Manager", time: "Yesterday", icon: Target, color: "bg-accent text-accent-foreground" },
  { id: 3, action: "New case created", detail: "Head of People Analytics", time: "3 days ago", icon: Briefcase, color: "bg-muted text-muted-foreground" },
  { id: 4, action: "AI evaluation complete", detail: "8 candidates processed", time: "3 days ago", icon: Sparkles, color: "bg-primary/10 text-primary" },
];

export default function Dashboard() {
  const activeCases = hiringCases.filter((c) => c.status !== "draft").length;
  const totalCandidates = hiringCases.reduce((s, c) => s + c.candidateCount, 0);
  const topCandidates = candidates.slice(0, 3);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1200px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Good morning, Lisa.</h1>
          <p className="text-muted-foreground text-sm">
            You have <span className="font-medium text-foreground">{activeCases} active cases</span> and{" "}
            <span className="font-medium text-foreground">{totalCandidates} candidates</span> to review.
          </p>
        </div>
        <Button asChild className="rounded-xl">
          <Link to="/cases/new">
            <Plus className="h-4 w-4" />
            New Hiring Case
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-3">
        {[
          { label: "Active Cases", value: activeCases, icon: Briefcase },
          { label: "Total Candidates", value: totalCandidates, icon: Users },
          { label: "Avg. Time to Fill", value: "18d", icon: Clock },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent shrink-0">
                <stat.icon className="h-[18px] w-[18px] text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Hiring Cases */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium">Hiring Cases</h2>
          </div>
          <div className="space-y-2.5">
            {hiringCases.map((c) => {
              const st = statusConfig[c.status];
              const urg = urgencyConfig[c.urgency];
              return (
                <Link
                  key={c.id}
                  to={
                    c.status === "scored"
                      ? `/cases/${c.id}/candidates`
                      : c.status === "criteria_defined"
                      ? `/cases/${c.id}/criteria`
                      : `/cases/new`
                  }
                >
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent shrink-0">
                        <Briefcase className="h-[18px] w-[18px] text-accent-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">{c.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                          <span>{c.department}</span>
                          <span className="h-1 w-1 rounded-full bg-border" />
                          <span className={urg.className}>{urg.label} priority</span>
                          <span className="h-1 w-1 rounded-full bg-border" />
                          <span>{c.candidateCount} candidates</span>
                        </div>
                      </div>
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${st.className}`}>{st.label}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Top Candidates */}
          <div className="mt-4 space-y-3">
            <h2 className="text-base font-medium">Top Candidates</h2>
            <div className="space-y-2">
              {topCandidates.map((c) => (
                <Card key={c.id} className="border-0 shadow-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                        {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">{c.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{c.currentRole}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={c.source === "internal" ? "secondary" : "outline"} className="text-[10px]">{c.source}</Badge>
                      <span className="text-lg font-semibold text-primary">{c.overallScore}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-3">
          <h2 className="text-base font-medium">Recent Activity</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              {recentActivity.map((act, i) => (
                <div
                  key={act.id}
                  className={`flex items-start gap-3 p-4 ${i < recentActivity.length - 1 ? "border-b border-border/60" : ""}`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${act.color}`}>
                    <act.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{act.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{act.detail}</p>
                    <p className="text-[11px] text-muted-foreground/70 mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
