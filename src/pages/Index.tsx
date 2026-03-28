import { Link } from "react-router-dom";
import {
  Plus,
  Briefcase,
  Users,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  CalendarDays,
  ChevronRight,
  BarChart3,
  Target,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
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

const pipelineData = [
  { stage: "Applied", count: 24, fill: "hsl(252, 56%, 57%)" },
  { stage: "Screening", count: 18, fill: "hsl(330, 65%, 55%)" },
  { stage: "Evaluated", count: 13, fill: "hsl(174, 60%, 45%)" },
  { stage: "Interview", count: 8, fill: "hsl(38, 92%, 50%)" },
  { stage: "Offer", count: 3, fill: "hsl(152, 60%, 42%)" },
];

const trendData = [
  { month: "Oct", cases: 2, hires: 1 },
  { month: "Nov", cases: 4, hires: 2 },
  { month: "Dec", cases: 3, hires: 1 },
  { month: "Jan", cases: 5, hires: 3 },
  { month: "Feb", cases: 4, hires: 2 },
  { month: "Mar", cases: 6, hires: 3 },
];

const recentActivity = [
  {
    id: 1,
    action: "Candidate scored",
    detail: "Dr. Elena Vasquez — 92/100",
    time: "2 hours ago",
    icon: UserCheck,
    color: "bg-primary/10 text-primary",
  },
  {
    id: 2,
    action: "Criteria approved",
    detail: "Senior SW Engineering Manager",
    time: "Yesterday",
    icon: Target,
    color: "bg-accent text-accent-foreground",
  },
  {
    id: 3,
    action: "New case created",
    detail: "Head of People Analytics",
    time: "3 days ago",
    icon: Briefcase,
    color: "bg-muted text-muted-foreground",
  },
  {
    id: 4,
    action: "AI evaluation complete",
    detail: "8 candidates processed",
    time: "3 days ago",
    icon: Sparkles,
    color: "bg-primary/10 text-primary",
  },
];

const topCandidates = candidates.slice(0, 4);

export default function Dashboard() {
  const activeCases = hiringCases.filter((c) => c.status !== "draft").length;
  const totalCandidates = hiringCases.reduce((s, c) => s + c.candidateCount, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Thursday, March 28</p>
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
            Good morning, Lisa.
          </h1>
          <p className="text-muted-foreground">
            You have <span className="font-medium text-foreground">{activeCases} active cases</span> and{" "}
            <span className="font-medium text-foreground">3 pending reviews</span>
          </p>
        </div>
        <Button asChild size="lg" className="rounded-xl shadow-sm">
          <Link to="/cases/new">
            <Plus className="h-4 w-4" />
            New Hiring Case
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Active Cases",
            value: activeCases,
            change: "+2",
            trend: "up",
            icon: Briefcase,
          },
          {
            label: "Total Candidates",
            value: totalCandidates,
            change: "+5",
            trend: "up",
            icon: Users,
          },
          {
            label: "Avg. Score",
            value: "83.4",
            change: "+1.2",
            trend: "up",
            icon: BarChart3,
          },
          {
            label: "Time to Fill",
            value: "18d",
            change: "-3d",
            trend: "down",
            icon: Clock,
          },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
                  <stat.icon className="h-[18px] w-[18px] text-accent-foreground" />
                </div>
                <span
                  className={`text-xs font-medium flex items-center gap-0.5 ${
                    stat.trend === "up" ? "text-success" : "text-success"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Pipeline Funnel */}
        <Card className="lg:col-span-3 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Hiring Pipeline</CardTitle>
              <Badge variant="secondary" className="text-xs font-normal">This quarter</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={pipelineData} barSize={36} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 6%, 92%)" vertical={false} />
                <XAxis
                  dataKey="stage"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(240, 5%, 46%)" }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(240, 5%, 46%)" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trend Chart */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Hiring Trend</CardTitle>
              <Badge variant="secondary" className="text-xs font-normal">6 months</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="gradCases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(252, 56%, 57%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(252, 56%, 57%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradHires" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(152, 60%, 42%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(152, 60%, 42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 6%, 92%)" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(240, 5%, 46%)" }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(240, 5%, 46%)" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    fontSize: "13px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cases"
                  stroke="hsl(252, 56%, 57%)"
                  fill="url(#gradCases)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="hires"
                  stroke="hsl(152, 60%, 42%)"
                  fill="url(#gradHires)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Hiring Cases */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium">Hiring Cases</h2>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              View all <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
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
                  <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent shrink-0">
                        <Briefcase className="h-[18px] w-[18px] text-accent-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                            {c.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{c.department}</span>
                          <span className="h-1 w-1 rounded-full bg-border" />
                          <span className={urg.className}>{urg.label} priority</span>
                          <span className="h-1 w-1 rounded-full bg-border" />
                          <span>{c.candidateCount} candidates</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${st.className}`}>
                          {st.label}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Top Candidates Preview */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium">Top Candidates</h2>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" asChild>
                <Link to="/cases/case-1/candidates">
                  View all <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {topCandidates.map((c) => (
                <Card key={c.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                          {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h3 className="text-sm font-medium truncate">{c.name}</h3>
                          <span className="text-lg font-semibold text-primary ml-2">{c.overallScore}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{c.currentRole}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant={c.source === "internal" ? "secondary" : "outline"}
                            className="text-[10px] px-1.5 py-0"
                          >
                            {c.source}
                          </Badge>
                          <span className="text-[11px] text-muted-foreground">{c.yearsExperience} yrs exp</span>
                        </div>
                        <Progress value={c.overallScore} className="h-1.5 mt-2.5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium">Recent Activity</h2>
          </div>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              {recentActivity.map((act, i) => (
                <div
                  key={act.id}
                  className={`flex items-start gap-3 p-4 ${
                    i < recentActivity.length - 1 ? "border-b border-border/60" : ""
                  }`}
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

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 space-y-2.5">
              <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
              <Button variant="outline" className="w-full justify-start rounded-lg h-9 text-[13px]" asChild>
                <Link to="/cases/new">
                  <Plus className="h-3.5 w-3.5 mr-2" />
                  Create new hiring case
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-lg h-9 text-[13px]" asChild>
                <Link to="/cases/case-1/candidates">
                  <Users className="h-3.5 w-3.5 mr-2" />
                  Review candidates
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-lg h-9 text-[13px]" asChild>
                <Link to="/cases/case-1/compare">
                  <BarChart3 className="h-3.5 w-3.5 mr-2" />
                  Compare top candidates
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
