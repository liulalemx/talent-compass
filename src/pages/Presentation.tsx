import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Maximize, Minimize, X } from "lucide-react";
import bmwLogo from "@/assets/bmw-logo.png";

const SLIDE_W = 1920;
const SLIDE_H = 1080;

/* ─── individual slides ─── */

function TitleSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-[hsl(213,100%,12%)] via-[hsl(213,80%,20%)] to-[hsl(213,100%,30%)] text-white px-[200px]">
      <img src={bmwLogo} alt="BMW" className="w-[160px] h-[160px] object-contain mb-[60px] rounded-full" />
      <h1 className="text-[96px] font-bold tracking-tight leading-none text-center">Talent Scout Desk</h1>
      <p className="text-[36px] text-white/70 mt-[24px] font-light">AI-Powered HR Decision Platform</p>
      <div className="mt-[80px] flex items-center gap-[16px] text-[24px] text-white/50">
        <span>BMW Group</span>
        <span className="w-[6px] h-[6px] rounded-full bg-white/30" />
        <span>Internal Hiring Intelligence</span>
      </div>
    </div>
  );
}

function ProblemSlide() {
  const problems = [
    { emoji: "⏱", title: "Slow Hiring Cycles", desc: "Manual screening of internal candidates takes weeks, delaying critical hires." },
    { emoji: "🔍", title: "Missed Internal Talent", desc: "Qualified employees are overlooked because their skills aren't visible to recruiters." },
    { emoji: "📊", title: "Subjective Evaluations", desc: "Criteria and scoring vary between hiring managers, leading to inconsistent decisions." },
    { emoji: "💸", title: "Unnecessary External Spend", desc: "External recruitment is triggered before fully exploring the internal talent pool." },
  ];
  return (
    <div className="flex flex-col h-full bg-[hsl(240,10%,5%)] text-white px-[140px] py-[100px]">
      <p className="text-[22px] font-semibold tracking-[0.2em] uppercase text-[hsl(213,100%,65%)] mb-[16px]">The Challenge</p>
      <h2 className="text-[72px] font-bold leading-[1.1] mb-[80px]">Why Traditional Hiring<br />Falls Short</h2>
      <div className="grid grid-cols-2 gap-[40px] flex-1">
        {problems.map((p) => (
          <div key={p.title} className="bg-white/5 border border-white/10 rounded-[20px] p-[40px] flex gap-[24px]">
            <span className="text-[48px] shrink-0">{p.emoji}</span>
            <div>
              <h3 className="text-[28px] font-semibold mb-[8px]">{p.title}</h3>
              <p className="text-[22px] text-white/60 leading-[1.5]">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionSlide() {
  return (
    <div className="flex flex-col h-full bg-white text-[hsl(240,10%,10%)] px-[140px] py-[100px]">
      <p className="text-[22px] font-semibold tracking-[0.2em] uppercase text-[hsl(213,100%,45%)] mb-[16px]">Our Solution</p>
      <h2 className="text-[72px] font-bold leading-[1.1] mb-[60px]">AI-Assisted Talent<br />Discovery</h2>
      <div className="flex-1 flex gap-[60px] items-center">
        <div className="flex-1 space-y-[40px]">
          {[
            { step: "01", title: "Describe the Role", desc: "Enter a job description or chat with our AI to refine requirements through guided discovery." },
            { step: "02", title: "Define & Weight Criteria", desc: "AI generates evaluation criteria. HR tunes weights and urgency before executing the search." },
            { step: "03", title: "Rank & Compare", desc: "Candidates are scored against weighted criteria with AI-powered trade-off analysis." },
          ].map((s) => (
            <div key={s.step} className="flex gap-[24px] items-start">
              <span className="text-[48px] font-bold text-[hsl(213,100%,45%)] leading-none">{s.step}</span>
              <div>
                <h3 className="text-[28px] font-semibold mb-[6px]">{s.title}</h3>
                <p className="text-[22px] text-[hsl(240,5%,46%)] leading-[1.5]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[600px] h-[600px] rounded-[32px] bg-gradient-to-br from-[hsl(213,80%,96%)] to-[hsl(213,60%,88%)] flex items-center justify-center">
          <img src={bmwLogo} alt="BMW" className="w-[200px] h-[200px] object-contain opacity-30" />
        </div>
      </div>
    </div>
  );
}

function FeaturesSlide() {
  const features = [
    { icon: "🤖", title: "AI Discovery Chat", desc: "Interactive conversation to refine job requirements" },
    { icon: "⚖️", title: "Weighted Criteria", desc: "Customizable scoring dimensions with adjustable weights" },
    { icon: "📈", title: "Fit Score Ranking", desc: "Candidates ranked by AI with transparent reasoning" },
    { icon: "🔄", title: "Side-by-Side Compare", desc: "Compare top candidates across all criteria" },
    { icon: "🚨", title: "External Alerts", desc: "Urgency-aware flags when internal talent is insufficient" },
    { icon: "🌗", title: "Dark / Light Mode", desc: "Polished UI with full theme support" },
  ];
  return (
    <div className="flex flex-col h-full bg-[hsl(213,100%,12%)] text-white px-[140px] py-[100px]">
      <p className="text-[22px] font-semibold tracking-[0.2em] uppercase text-[hsl(213,100%,65%)] mb-[16px]">Key Features</p>
      <h2 className="text-[72px] font-bold leading-[1.1] mb-[80px]">What Makes It Powerful</h2>
      <div className="grid grid-cols-3 gap-[32px] flex-1">
        {features.map((f) => (
          <div key={f.title} className="bg-white/5 border border-white/10 rounded-[20px] p-[36px]">
            <span className="text-[48px] block mb-[16px]">{f.icon}</span>
            <h3 className="text-[26px] font-semibold mb-[8px]">{f.title}</h3>
            <p className="text-[20px] text-white/60 leading-[1.5]">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArchitectureSlide() {
  const layers = [
    { label: "Frontend", tech: "React · TypeScript · Tailwind · shadcn/ui", color: "hsl(213,100%,45%)" },
    { label: "State", tech: "React Query · LocalStorage Persistence", color: "hsl(213,80%,55%)" },
    { label: "AI Backend", tech: "REST API · LLM-powered Scoring & Discovery", color: "hsl(213,60%,65%)" },
    { label: "Data", tech: "Vector Search · Candidate Database", color: "hsl(213,40%,75%)" },
  ];
  return (
    <div className="flex flex-col h-full bg-white text-[hsl(240,10%,10%)] px-[140px] py-[100px]">
      <p className="text-[22px] font-semibold tracking-[0.2em] uppercase text-[hsl(213,100%,45%)] mb-[16px]">Architecture</p>
      <h2 className="text-[72px] font-bold leading-[1.1] mb-[80px]">Technical Stack</h2>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[1200px] space-y-[24px]">
          {layers.map((l) => (
            <div
              key={l.label}
              className="rounded-[16px] p-[40px] flex items-center justify-between"
              style={{ backgroundColor: l.color, color: "white" }}
            >
              <span className="text-[32px] font-bold">{l.label}</span>
              <span className="text-[24px] font-light opacity-90">{l.tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DemoSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-[hsl(213,100%,12%)] via-[hsl(213,80%,20%)] to-[hsl(213,100%,30%)] text-white">
      <p className="text-[22px] font-semibold tracking-[0.2em] uppercase text-[hsl(213,100%,65%)] mb-[24px]">Live Demo</p>
      <h2 className="text-[96px] font-bold mb-[40px]">Let's See It in Action</h2>
      <p className="text-[32px] text-white/60 max-w-[800px] text-center leading-[1.5]">
        Walk through creating a hiring case, reviewing AI-generated criteria, and comparing ranked candidates.
      </p>
    </div>
  );
}

function ClosingSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-[hsl(240,10%,5%)] text-white">
      <img src={bmwLogo} alt="BMW" className="w-[120px] h-[120px] object-contain mb-[48px] rounded-full" />
      <h2 className="text-[80px] font-bold mb-[24px]">Thank You</h2>
      <p className="text-[32px] text-white/50 mb-[80px]">Questions & Discussion</p>
      <div className="flex gap-[40px] text-[22px] text-white/40">
        <span>Talent Scout Desk</span>
        <span className="w-[6px] h-[6px] rounded-full bg-white/20 self-center" />
        <span>BMW Group</span>
      </div>
    </div>
  );
}

/* ─── slide deck ─── */

const slides = [TitleSlide, ProblemSlide, SolutionSlide, FeaturesSlide, ArchitectureSlide, DemoSlide, ClosingSlide];

export default function Presentation() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [showControls, setShowControls] = useState(true);

  const next = useCallback(() => setIdx((i) => Math.min(i + 1, slides.length - 1)), []);
  const prev = useCallback(() => setIdx((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "Escape" && isFullscreen) document.exitFullscreen?.();
      if (e.key === "f" || e.key === "F5") { e.preventDefault(); document.documentElement.requestFullscreen?.(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, isFullscreen]);

  useEffect(() => {
    const onFS = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFS);
    return () => document.removeEventListener("fullscreenchange", onFS);
  }, []);

  useEffect(() => {
    const resize = () => {
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      setScale(Math.min(cw / SLIDE_W, ch / SLIDE_H));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Auto-hide controls in fullscreen
  useEffect(() => {
    if (!isFullscreen) { setShowControls(true); return; }
    let timer: ReturnType<typeof setTimeout>;
    const show = () => { setShowControls(true); clearTimeout(timer); timer = setTimeout(() => setShowControls(false), 2500); };
    show();
    window.addEventListener("mousemove", show);
    return () => { window.removeEventListener("mousemove", show); clearTimeout(timer); };
  }, [isFullscreen]);

  const SlideComponent = slides[idx];

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden select-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Slide */}
      <div
        style={{
          width: SLIDE_W,
          height: SLIDE_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          position: "absolute",
          left: "50%",
          top: "50%",
          marginLeft: -SLIDE_W / 2,
          marginTop: -SLIDE_H / 2,
        }}
        className="rounded-sm overflow-hidden"
      >
        <SlideComponent />
      </div>

      {/* Controls */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 transition-opacity duration-300 z-50"
        style={{ opacity: showControls ? 1 : 0 }}
      >
        <button onClick={() => navigate("/")} className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
          <button onClick={prev} disabled={idx === 0} className="p-1.5 rounded-full hover:bg-white/10 text-white disabled:opacity-30 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-white/70 text-sm min-w-[60px] text-center font-medium">
            {idx + 1} / {slides.length}
          </span>
          <button onClick={next} disabled={idx === slides.length - 1} className="p-1.5 rounded-full hover:bg-white/10 text-white disabled:opacity-30 transition-colors">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={() => isFullscreen ? document.exitFullscreen?.() : document.documentElement.requestFullscreen?.()}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
