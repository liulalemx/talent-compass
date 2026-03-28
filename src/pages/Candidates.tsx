import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { candidates } from "@/data/mockData";

export default function Candidates() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1200px]">
      <h1 className="text-2xl font-semibold tracking-tight">Candidates</h1>
      <div className="space-y-2.5">
        {candidates.map((c) => (
          <Card key={c.id} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                  {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium truncate">{c.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{c.currentRole}</p>
              </div>
              <Badge variant={c.source === "internal" ? "secondary" : "outline"} className="text-[10px]">{c.source}</Badge>
              <span className="text-xs text-muted-foreground">{c.yearsExperience} yrs</span>
              <div className="w-24">
                <Progress value={c.overallScore} className="h-1.5" />
              </div>
              <span className="text-lg font-semibold text-primary w-10 text-right">{c.overallScore}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
