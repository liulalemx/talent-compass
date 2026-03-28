import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, FileText, Send, Bot, Loader2, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { addCase } from "@/lib/hiringCaseStore";

interface ChatMsg {
  role: "user" | "ai";
  content: string;
}

export default function CaseCreate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<"input" | "discovery" | "parsing">("input");

  const buildJD = () => {
    const parts: string[] = [];
    if (jobTitle.trim()) parts.push(`Job Title: ${jobTitle.trim()}`);
    if (location.trim()) parts.push(`Location: ${location.trim()}`);
    if (description.trim()) parts.push(description.trim());
    return parts.join("\n");
  };

  const startDiscovery = async () => {
    const jd = buildJD();
    if (!jd.trim()) return;
    setPhase("discovery");
    setLoading(true);
    try {
      const res = await api.chatDiscovery(jd, []);
      if (res.status === "READY") {
        await parseAndNavigate();
      } else {
        setChatMessages([{ role: "ai", content: res.message || "Let me ask a few questions about this role." }]);
        setHistory([{ role: "assistant", content: res.message }]);
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
      setPhase("input");
    } finally {
      setLoading(false);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || loading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    const newMessages: ChatMsg[] = [...chatMessages, { role: "user", content: userMsg }];
    setChatMessages(newMessages);
    const newHistory = [...history, { role: "user", content: userMsg }];
    setHistory(newHistory);
    setLoading(true);

    try {
      const res = await api.chatDiscovery(buildJD(), newHistory);
      if (res.status === "READY") {
        setChatMessages((prev) => [...prev, { role: "ai", content: "Great, I have enough information. Generating criteria now..." }]);
        await parseAndNavigate();
      } else {
        setChatMessages((prev) => [...prev, { role: "ai", content: res.message || "" }]);
        setHistory([...newHistory, { role: "assistant", content: res.message }]);
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const parseAndNavigate = async () => {
    setPhase("parsing");
    try {
      const jd = buildJD();
      const criteria = await api.parseJD(jd);
      const finalJD = criteria.detailed_jd || jd;
      const finalTitle = criteria.job_title || jobTitle || "Untitled Case";
      const savedCase = addCase({
        title: finalTitle,
        department: "General",
        status: "criteria_defined",
        urgency: "medium",
        candidateCount: 0,
        jobDescription: finalJD,
        criteria,
      });
      navigate(`/cases/${savedCase.id}/criteria`);
    } catch (e: any) {
      toast({ title: "Error parsing JD", description: e.message, variant: "destructive" });
      setPhase("discovery");
    }
  };

  if (phase === "input") {
    return (
      <div className="p-6 lg:p-8 flex justify-center">
        <div className="w-full max-w-2xl space-y-8">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">Create Hiring Case</h1>
            <p className="text-muted-foreground">Define the role, requirements, and let AI find the best internal match.</p>
          </div>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 lg:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Job Title
                  </Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g. Senior Battery Engineer"
                    className="rounded-xl border-border/60 focus-visible:ring-primary/30"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Location / Plant
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g. Munich, Germany"
                    className="rounded-xl border-border/60 focus-visible:ring-primary/30"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Detailed Requirements / Scenario
                </Label>
                <Textarea
                  id="description"
                  placeholder="Paste or write the full job description, project context, or crisis scenario here…"
                  className="min-h-[180px] resize-y rounded-xl border-border/60 focus-visible:ring-primary/30"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <Button
                  size="lg"
                  className="w-full rounded-xl shadow-sm"
                  onClick={startDiscovery}
                  disabled={!buildJD().trim()}
                >
                  <Sparkles className="h-4 w-4" />
                  Generate Intelligence Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Discovery chat phase
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="p-4 lg:p-5 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">🔍 Role Discovery Chat</h2>
            <p className="text-xs text-muted-foreground">
              {phase === "parsing" ? "Generating criteria from your description…" : "I'm reviewing your request. Let's make sure the search parameters are sharp."}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 lg:p-5 space-y-4">
        {chatMessages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "ai" && (
              <Avatar className="h-8 w-8 shrink-0 mt-0.5">
                <AvatarFallback className="bg-card border border-border/60 text-primary text-[10px]">
                  <Bot className="h-3.5 w-3.5" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-card border border-border/60 text-foreground rounded-tl-sm shadow-sm"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <Avatar className="h-8 w-8 shrink-0 mt-0.5">
                <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-medium">
                  U
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-2.5 justify-start">
            <Avatar className="h-8 w-8 shrink-0 mt-0.5">
              <AvatarFallback className="bg-card border border-border/60 text-primary text-[10px]">
                <Bot className="h-3.5 w-3.5" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-card border border-border/60 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm">
              <p className="text-sm italic text-muted-foreground">Agent is analyzing your input...</p>
            </div>
          </div>
        )}
      </div>

      {phase === "discovery" && (
        <div className="p-4 border-t border-border/60 space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Answer the question…"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
              className="flex-1 rounded-xl"
              disabled={loading}
            />
            <Button size="icon" className="rounded-xl shrink-0" onClick={sendChatMessage} disabled={loading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            className="w-full rounded-xl"
            onClick={parseAndNavigate}
            disabled={loading}
          >
            <SkipForward className="h-4 w-4" />
            Skip to Final Tuning
          </Button>
        </div>
      )}
    </div>
  );
}
