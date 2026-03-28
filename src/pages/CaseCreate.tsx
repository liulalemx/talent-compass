import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, FileText, Send, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

interface ChatMsg {
  role: "user" | "ai";
  content: string;
}

export default function CaseCreate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [description, setDescription] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<"input" | "discovery" | "parsing">("input");

  const startDiscovery = async () => {
    if (!description.trim()) return;
    setPhase("discovery");
    setLoading(true);
    try {
      const res = await api.chatDiscovery(description, []);
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
      const res = await api.chatDiscovery(description, newHistory);
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
      const criteria = await api.parseJD(description);
      navigate("/cases/case-1/criteria", { state: { criteria, jobDescription: description } });
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
            <p className="text-muted-foreground">Describe the role and let AI generate evaluation criteria</p>
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
              <div className="pt-2">
                <Button size="lg" className="w-full rounded-xl shadow-sm" onClick={startDiscovery} disabled={!description.trim()}>
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

  // Discovery chat phase
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="p-4 lg:p-5 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">AI Discovery</h2>
            <p className="text-xs text-muted-foreground">
              {phase === "parsing" ? "Generating criteria from your description…" : "Refining your job requirements"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 lg:p-5 space-y-4">
        {chatMessages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
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
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2.5 justify-start">
            <Avatar className="h-7 w-7 shrink-0 mt-0.5">
              <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                <Bot className="h-3.5 w-3.5" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-card border border-border/60 rounded-2xl rounded-bl-md px-4 py-2.5 shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      {phase === "discovery" && (
        <div className="p-4 border-t border-border/60">
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
        </div>
      )}
    </div>
  );
}
