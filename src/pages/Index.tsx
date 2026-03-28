import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Briefcase,
  Users,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCases, StoredHiringCase } from "@/lib/hiringCaseStore";
import { api } from "@/lib/api";
import { useSearch } from "@/lib/searchContext";

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

export default function Dashboard() {
  const [cases, setCases] = useState<StoredHiringCase[]>([]);
  const [totalCandidates, setTotalCandidates] = useState(0);

  useEffect(() => {
    setCases(getCases());
    api.listCandidates().then((list) => setTotalCandidates(list.length)).catch(() => {});
  }, []);

  const activeCases = cases.filter((c) => c.status !== "draft").length;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1200px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Hello there.</h1>
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
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium">Hiring Cases</h2>
        </div>
        {cases.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center space-y-3">
              <Briefcase className="h-10 w-10 text-muted-foreground/40 mx-auto" />
              <p className="text-sm text-muted-foreground">No hiring cases yet. Create your first one to get started.</p>
              <Button asChild variant="outline" className="rounded-xl">
                <Link to="/cases/new">
                  <Plus className="h-4 w-4" />
                  New Hiring Case
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {cases.map((c) => {
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
        )}
      </div>
    </div>
  );
}
