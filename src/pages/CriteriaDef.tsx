import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, Loader2, Plus, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { getCase, updateCase } from "@/lib/hiringCaseStore";

interface CriterionItem {
  name: string;
  weight: number;
  description?: string;
}

export default function CriteriaDef() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const storedCase = id ? getCase(id) : undefined;
  const rawCriteria = storedCase?.criteria;
  const [loading, setLoading] = useState(false);
  const [positionTitle, setPositionTitle] = useState(storedCase?.title || "");
  const [refinedReqs, setRefinedReqs] = useState(storedCase?.jobDescription || "");

  const parseCriteria = (raw: any): CriterionItem[] => {
    if (!raw) return [];
    if (raw.criteria_list && Array.isArray(raw.criteria_list)) {
      return raw.criteria_list.map((c: any, i: number) => ({
        name: c.label || c.name || c.criterion || `Criterion ${i + 1}`,
        weight: Math.min(10, Math.max(1, c.weight || 5)),
        description: c.description || c.rationale || "",
      }));
    }
    if (Array.isArray(raw)) {
      return raw.map((c: any, i: number) => ({
        name: c.label || c.name || c.criterion || `Criterion ${i + 1}`,
        weight: Math.min(10, Math.max(1, c.weight || 5)),
        description: c.description || c.rationale || "",
      }));
    }
    if (raw.criteria && Array.isArray(raw.criteria)) return parseCriteria(raw.criteria);
    return [];
  };

  const [criteria, setCriteria] = useState<CriterionItem[]>(() => parseCriteria(rawCriteria));

  const updateCriterion = (index: number, field: keyof CriterionItem, value: string | number) => {
    setCriteria((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  };

  const removeCriterion = (index: number) => {
    setCriteria((prev) => prev.filter((_, i) => i !== index));
  };

  const addCriterion = () => {
    setCriteria((prev) => [...prev, { name: "", weight: 5, description: "" }]);
  };

  const resetCriteria = () => {
    setCriteria(parseCriteria(rawCriteria));
    setPositionTitle(storedCase?.title || "");
    setRefinedReqs(storedCase?.jobDescription || "");
  };

  const handleApprove = async () => {
    if (criteria.length === 0) return;
    setLoading(true);
    try {
      const criteriaStr = criteria
        .filter((c) => c.name.trim())
        .map((c) => `${c.name} (Weight: ${c.weight}/10): ${c.description || ""}`)
        .join("\n");
      const fullCriteria = positionTitle ? `Position: ${positionTitle}\n${criteriaStr}` : criteriaStr;
      const result = await api.rankCandidates(fullCriteria);
      if (id) {
        updateCase(id, {
          status: "scored",
          candidateCount: result.candidate_scores.length,
          candidateResults: result.candidate_scores,
        });
      }
      navigate(`/cases/${id}/candidates`);
    } catch (e: any) {
      toast({ title: "Error ranking candidates", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!rawCriteria) {
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
      <div className="p-4 lg:p-5 border-b border-border/60">
        <h2 className="font-semibold text-sm">Step 2: Verification & Weight Tuning</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Review and adjust criteria before executing the search
        </p>
      </div>

      <div className="p-4 lg:p-6 space-y-5 flex-1 overflow-auto max-w-3xl mx-auto w-full">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5 space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Target Position Title
              </Label>
              <Input
                value={positionTitle}
                onChange={(e) => setPositionTitle(e.target.value)}
                placeholder="e.g. Senior Battery Engineer"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Refined Requirements (Optimized for Vector Search)
              </Label>
              <Textarea
                value={refinedReqs}
                onChange={(e) => setRefinedReqs(e.target.value)}
                className="min-h-[100px] rounded-xl resize-y"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5 space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Scoring Criteria & Weights (1–10)
            </Label>

            {criteria.map((c, i) => (
              <div key={i} className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg">
                <Input
                  value={c.name}
                  onChange={(e) => updateCriterion(i, "name", e.target.value)}
                  placeholder="Criterion name"
                  className="flex-1 border-0 bg-transparent font-semibold text-sm focus-visible:ring-0 px-0"
                />
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[c.weight]}
                  onValueChange={([val]) => updateCriterion(i, "weight", val)}
                  className="w-32"
                />
                <span className="font-bold text-primary min-w-[24px] text-center text-sm">{c.weight}</span>
                <button
                  onClick={() => removeCriterion(i)}
                  className="text-destructive hover:text-destructive/80 transition-colors p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}

            <Button variant="outline" className="w-full rounded-xl mt-2" onClick={addCriterion}>
              <Plus className="h-4 w-4" />
              Add Custom Requirement
            </Button>
          </CardContent>
        </Card>

        <div className="flex gap-3 pb-4">
          <Button
            className="flex-1 rounded-xl"
            onClick={handleApprove}
            disabled={criteria.length === 0 || loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
            {loading ? "Searching…" : "Execute Search & Rank"}
          </Button>
          <Button variant="secondary" className="rounded-xl" onClick={resetCriteria}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
