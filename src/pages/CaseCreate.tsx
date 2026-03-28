import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, FileText, Building2, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departments, seniorityLevels } from "@/data/mockData";

export default function CaseCreate() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [seniority, setSeniority] = useState("");
  const [urgency, setUrgency] = useState("");

  return (
    <div className="p-6 lg:p-8 flex justify-center">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create Hiring Case
          </h1>
          <p className="text-muted-foreground">
            Describe the role and let AI generate evaluation criteria
          </p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 lg:p-8 space-y-6">
            <div className="space-y-2.5">
              <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Job Description
              </Label>
              <Textarea
                id="description"
                placeholder="Paste or write the job description here…"
                className="min-h-[200px] resize-y rounded-xl border-border/60 focus-visible:ring-primary/30"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2.5">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  Department
                </Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2.5">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  Seniority Level
                </Label>
                <Select value={seniority} onValueChange={setSeniority}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select seniority" />
                  </SelectTrigger>
                  <SelectContent>
                    {seniorityLevels.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2.5">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Zap className="h-4 w-4 text-muted-foreground" />
                Hiring Urgency
              </Label>
              <div className="flex gap-2">
                {["low", "medium", "high"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setUrgency(level)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 border ${
                      urgency === level
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-card text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button
                size="lg"
                className="w-full rounded-xl shadow-sm"
                onClick={() => navigate("/cases/case-1/criteria")}
              >
                <Sparkles className="h-4 w-4" />
                Generate Criteria with AI
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
