import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

interface CriterionItem {
  name: string;
  weight: number;
  description?: string;
  type?: string;
}

const typeColors: Record<string, string> = {
  "must-have": "bg-destructive/10 text-destructive",
  preferred: "bg-primary/10 text-primary",
  behavioral: "bg-success/10 text-success",
};

export default function CriteriaDef() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const state = location.state as { criteria: any; jobDescription: string } | null;
  const [loading, setLoading] = useState(false);

  // Parse criteria from API response into a usable array
  const parseCriteria = (raw: any): CriterionItem[] => {
    if (!raw) return [];
    // If the API returns an array directly
    if (Array.isArray(raw)) {
      return raw.map((c: any, i: number) => ({
        name: c.name || c.criterion || `Criterion ${i + 1}`,
        weight: c.weight || Math.round(100 / raw.length),
        description: c.description || c.rationale || "",
        type: c.type || "preferred",
      }));
    }
    // If the API returns an object with criteria key
    if (raw.criteria && Array.isArray(raw.criteria)) {
      return parseCriteria(raw.criteria);
    }
    // If it's an object with named keys
    const entries = Object.entries(raw).filter(([k]) => k !== "urgency_score" && k !== "status");
    if (entries.length > 0) {
      return entries.map(([key, val]: [string, any]) => ({
        name: typeof val === "object" ? val.name || key : key,
        weight: typeof val === "object" ? val.weight || Math.round(100 / entries.length) : Math.round(100 / entries.length),
        description: typeof val === "object" ? val.description || "" : String(val),
        type: typeof val === "object" ? val.type || "preferred" : "preferred",
      }));
    }
    return [];
  };

  const [criteria, setCriteria] = useState<CriterionItem[]>(() => parseCriteria(state?.criteria));
  const totalWeight = criteria.reduce((s, c) => s + c.weight, 0);

  const updateWeight = (index: number, newWeight: number) => {
    setCriteria((prev) =>
      prev.map((c, i) => (i === index ? { ...c, weight: newWeight } : c))
    );
  };

  const handleApprove = async () => {
    if (totalWeight !== 100) return;
    setLoading(true);
    try {
      const criteriaStr = criteria.map((c) => `${c.name} (${c.weight}%): ${c.description}`).join("\n");
      const result = await api.rankCandidates(criteriaStr);
      navigate("/cases/case-1/candidates", { state: { candidates: result.candidate_scores, criteria } });
    } catch (e: any) {
      toast({ title: "Error ranking candidates", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!state?.criteria) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <Card className="border-0 shadow-sm max-w-md">
          <CardContent className="p-6 text-center space-y-3">
            <h2 className="font-semibold">No Criteria Found</h2>
            <p className="text-sm text-muted-foreground">Please create a hiring case first to generate criteria.</p>
            <Button onClick={() => navigate("/cases/new")} className="rounded-xl">Create Hiring Case</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="p-4 lg:p-5 border-b border-border/60 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-sm">Evaluation Criteria</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Total weight:{" "}
            <span className={totalWeight === 100 ? "text-success font-semibold" : "text-destructive font-semibold"}>
              {totalWeight}%
            </span>
            {totalWeight === 100 && " ✓"}
          </p>
        </div>
        <Button onClick={handleApprove} disabled={totalWeight !== 100 || loading} className="rounded-xl">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          {loading ? "Ranking…" : "Approve & Rank"}
        </Button>
      </div>

      <div className="p-4 lg:p-6 space-y-3 flex-1 overflow-auto max-w-3xl mx-auto w-full">
        {criteria.map((c, i) => (
          <Card key={i} className="border-0 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-medium text-sm">{c.name}</h3>
                  {c.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{c.description}</p>
                  )}
                </div>
                {c.type && (
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${typeColors[c.type] || "bg-muted text-muted-foreground"}`}>
                    {c.type}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Slider
                  value={[c.weight]}
                  onValueChange={([v]) => updateWeight(i, v)}
                  max={50}
                  min={0}
                  step={5}
                  className="flex-1"
                />
                <span className="text-sm font-semibold w-10 text-right tabular-nums">{c.weight}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
