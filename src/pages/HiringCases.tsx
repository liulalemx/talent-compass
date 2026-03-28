import { Link } from "react-router-dom";
import { Briefcase, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { hiringCases } from "@/data/mockData";

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

export default function HiringCases() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1200px]">
      <h1 className="text-2xl font-semibold tracking-tight">Hiring Cases</h1>
      <div className="flex flex-col gap-3">
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
    </div>
  );
}
