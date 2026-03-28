import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Lightbulb, Loader2, Copy, Check } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface Props {
  recommendationType: "CRITICAL" | "STRATEGIC";
  caseTitle: string;
  jobDescription: string;
}

export default function ExternalSuggestionBanner({ recommendationType, caseTitle, jobDescription }: Props) {
  const { toast } = useToast();
  const [adText, setAdText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const isCritical = recommendationType === "CRITICAL";

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await api.generateAd(caseTitle, jobDescription);
      setAdText(result.ad_text);
    } catch (e: any) {
      toast({ title: "Error generating ad", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(adText);
    setCopied(true);
    toast({ title: "Copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className={`border-2 border-dashed ${isCritical ? "border-destructive/60 bg-destructive/5" : "border-primary/40 bg-primary/5"}`}>
      <CardContent className="p-5 space-y-4">
        <div className="flex gap-3 items-start">
          <div className="mt-0.5">
            {isCritical ? (
              <AlertTriangle className="h-6 w-6 text-destructive" />
            ) : (
              <Lightbulb className="h-6 w-6 text-primary" />
            )}
          </div>
          <div className="space-y-1">
            <h4 className={`font-semibold ${isCritical ? "text-destructive" : "text-primary"}`}>
              {isCritical ? "🚨 Critical Action Required" : "📢 Strategic Advisor"}
            </h4>
            <p className={`text-sm ${isCritical ? "text-destructive/80" : "text-primary/80"}`}>
              {isCritical
                ? "Internal search yielded no viable matches for this high-urgency role. Immediate external recruitment is required to prevent project delay."
                : "Internal talent density is low. Given the urgency level, we recommend an external search to find a higher quality match."}
            </p>
            {!adText && (
              <Button
                onClick={handleGenerate}
                disabled={loading}
                size="sm"
                className={`mt-2 rounded-xl ${isCritical ? "bg-destructive hover:bg-destructive/90" : ""}`}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {loading ? "Crafting Ad..." : "Generate External Job Advertisement"}
              </Button>
            )}
          </div>
        </div>

        {adText && (
          <div className="space-y-3">
            <label className={`text-xs font-semibold uppercase tracking-wide ${isCritical ? "text-destructive/70" : "text-primary/70"}`}>
              AI-Drafted External Ad
            </label>
            <Textarea
              value={adText}
              onChange={(e) => setAdText(e.target.value)}
              className="min-h-[250px] resize-y rounded-xl"
            />
            <Button variant="secondary" size="sm" className="rounded-xl" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy to Clipboard"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
