import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { chatMessages, criteria as initialCriteria, type Criterion } from "@/data/mockData";

const typeColors = {
  "must-have": "bg-red-100 text-red-700 border-red-200",
  preferred: "bg-blue-100 text-blue-700 border-blue-200",
  behavioral: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const quickReplies = [
  "Increase weight for domain expertise",
  "Add a criterion for diversity leadership",
  "Make cultural fit a must-have",
];

export default function CriteriaDef() {
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState<Criterion[]>(initialCriteria);
  const [inputValue, setInputValue] = useState("");
  const totalWeight = criteria.reduce((s, c) => s + c.weight, 0);

  const updateWeight = (id: string, newWeight: number) => {
    setCriteria((prev) =>
      prev.map((c) => (c.id === id ? { ...c, weight: newWeight } : c))
    );
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)]">
      {/* Chat Panel */}
      <div className="flex-1 flex flex-col border-r border-border min-w-0">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold">AI Criteria Assistant</h2>
          <p className="text-sm text-muted-foreground">Refine your evaluation criteria through conversation</p>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
                dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
              />
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border space-y-3">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((qr) => (
              <button
                key={qr}
                className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted transition-colors text-foreground"
              >
                {qr}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Refine criteria…"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1"
            />
            <Button size="icon" variant="default">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Criteria Panel */}
      <div className="w-full lg:w-[440px] flex flex-col overflow-auto">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Evaluation Criteria</h2>
            <p className="text-sm text-muted-foreground">
              Total weight:{" "}
              <span className={totalWeight === 100 ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                {totalWeight}%
              </span>
            </p>
          </div>
          <Button onClick={() => navigate("/cases/case-1/candidates")} disabled={totalWeight !== 100}>
            <CheckCircle2 className="h-4 w-4" />
            Approve Criteria
          </Button>
        </div>

        <div className="p-4 space-y-4 flex-1 overflow-auto">
          {criteria.map((c) => (
            <Card key={c.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-sm">{c.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full border shrink-0 ${typeColors[c.type]}`}>
                    {c.type}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Slider
                    value={[c.weight]}
                    onValueChange={([v]) => updateWeight(c.id, v)}
                    max={50}
                    min={0}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-10 text-right">{c.weight}%</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
