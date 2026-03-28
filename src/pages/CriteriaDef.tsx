import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, CheckCircle2, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { chatMessages, criteria as initialCriteria, type Criterion } from "@/data/mockData";

const typeColors: Record<string, string> = {
  "must-have": "bg-destructive/10 text-destructive",
  preferred: "bg-primary/10 text-primary",
  behavioral: "bg-success/10 text-success",
};

const quickReplies = [
  "Increase domain expertise weight",
  "Add diversity leadership criterion",
  "Make cultural fit must-have",
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
      <div className="flex-1 flex flex-col border-r border-border/60 min-w-0">
        <div className="p-4 lg:p-5 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">AI Criteria Assistant</h2>
              <p className="text-xs text-muted-foreground">Refine evaluation criteria through conversation</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 lg:p-5 space-y-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "ai" && (
                <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                  <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                    <Bot className="h-3.5 w-3.5" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border border-border/60 text-foreground rounded-bl-md shadow-sm"
                }`}
                dangerouslySetInnerHTML={{
                  __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border/60 space-y-3">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((qr) => (
              <button
                key={qr}
                className="text-xs px-3 py-1.5 rounded-full border border-border/60 bg-card hover:bg-accent hover:text-accent-foreground transition-all duration-150 text-muted-foreground"
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
              className="flex-1 rounded-xl"
            />
            <Button size="icon" className="rounded-xl shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Criteria Panel */}
      <div className="w-full lg:w-[440px] flex flex-col overflow-auto bg-background">
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
          <Button
            onClick={() => navigate("/cases/case-1/candidates")}
            disabled={totalWeight !== 100}
            className="rounded-xl"
          >
            <CheckCircle2 className="h-4 w-4" />
            Approve
          </Button>
        </div>

        <div className="p-4 space-y-3 flex-1 overflow-auto">
          {criteria.map((c) => (
            <Card key={c.id} className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm">{c.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${typeColors[c.type]}`}>
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
                  <span className="text-sm font-semibold w-10 text-right tabular-nums">{c.weight}%</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
