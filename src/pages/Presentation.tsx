import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Maximize, Minimize, X } from "lucide-react";
import bmwLogo from "@/assets/bmw-logo.png";

const SLIDE_W = 1920;
const SLIDE_H = 1080;

/* ─── Slide 1: Problem ─── */
function ProblemSlide() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[hsl(213,100%,12%)] via-[hsl(213,80%,20%)] to-[hsl(213,100%,30%)] text-white px-[140px] py-[100px]">
      <div className="flex items-center gap-[20px] mb-[60px]">
        <img src={bmwLogo} alt="BMW" className="w-[80px] h-[80px] object-contain rounded-full" />
        <span className="text-[28px] font-semibold opacity-70">Talent Scout Desk</span>
      </div>
      <p className="text-[22px] font-semibold tracking-[0.2em] uppercase text-[hsl(213,100%,65%)] mb-[16px]">The Problem</p>
      <h2 className="text-[72px] font-bold leading-[1.1] mb-[60px]">Hiring Is Broken</h2>
      <div className="grid grid-cols-3 gap-[32px] flex-1">
        {[
          { emoji: "⏱", title: "Slow Cycles", desc: "Manual screening takes weeks — critical roles stay empty while qualified employees sit undiscovered." },
          { emoji: "🔍", title: "Missed Talent", desc: "Skills and experience buried in HR systems are invisible to hiring managers making decisions." },
          { emoji: "📊", title: "Subjective Decisions", desc: "No consistent criteria across managers — evaluations vary wildly, leading to poor or biased hires." },
        ].map((p) => (
          <div key={p.title} className="bg-white/5 border border-white/10 rounded-[20px] p-[40px]">
            <span className="text-[48px] block mb-[16px]">{p.emoji}</span>
            <h3 className="text-[28px] font-semibold mb-[8px]">{p.title}</h3>
            <p className="text-[20px] text-white/60 leading-[1.5]">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Slide 2: Input ─── */
function InputSlide() {
  const inputs = [
    { label: "Job Description", detail: "Free-text role description or structured requirements — the starting point for AI-driven discovery." },
    { label: "Weighted Criteria", detail: "Evaluation dimensions (technical skills, leadership, cultural fit) with adjustable importance weights." },
    { label: "Urgency Level", detail: "Time-sensitivity flag that triggers external-search suggestions when internal talent is insufficient." },
    { label: "Candidate Profiles", detail: "Internal employee data: skills, experience, certifications, past performance, and career trajectory.\nExternal Candidate data: skills, experience, certifications, past performance, and career trajectory." },
  ];
  return (
    <div className="flex flex-col h-full bg-white text-[hsl(240,10%,10%)] px-[140px] py-[100px]">
      <p className="text-[22px] font-semibold tracking-[0.2em] uppercase text-[hsl(213,100%,45%)] mb-[16px]">Inputs</p>
      <h2 className="text-[72px] font-bold leading-[1.1] mb-[70px]">What the System<br />Takes In</h2>
      <div className="flex-1 grid grid-cols-2 gap-[36px]">
        {inputs.map((inp, i) => (
          <div key={inp.label} className="flex gap-[24px] items-start bg-[hsl(213,60%,96%)] rounded-[20px] p-[40px]">
            <span className="text-[56px] font-bold text-[hsl(213,100%,45%)] leading-none shrink-0">0{i + 1}</span>
            <div>
              <h3 className="text-[28px] font-semibold mb-[8px]">{inp.label}</h3>
              <p className="text-[22px] text-[hsl(240,5%,46%)] leading-[1.5] whitespace-pre-line">{inp.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Slide 3: AI / Agents ─── */
function AIAgentsSlide() {
  const steps = [
    { icon: "💬", title: "AI Discovery Chat", desc: "Conversational agent refines vague job descriptions into structured, actionable requirements." },
    { icon: "⚙️", title: "Criteria Generation", desc: "LLM analyzes the role and auto-generates weighted evaluation criteria tailored to the position." },
    { icon: "🧠", title: "Candidate Scoring", desc: "Each candidate is scored against every criterion using AI reasoning — with transparent explanations." },
    { icon: "📈", title: "Ranking & Comparison", desc: "Aggregated fit scores produce a ranked shortlist. Side-by-side comparison highlights trade-offs." },
  ];
  return (
    <div className="flex flex-col h-full bg-[hsl(240,10%,5%)] text-white px-[140px] py-[100px]">
      <p className="text-[22px] font-semibold tracking-[0.2em] uppercase text-[hsl(213,100%,65%)] mb-[16px]">AI & Agents</p>
      <h2 className="text-[72px] font-bold leading-[1.1] mb-[70px]">How the System<br />Thinks</h2>
      <div className="flex-1 flex items-center">
        <div className="flex gap-[24px] w-full">
          {steps.map((s, i) => (
            <div key={s.title} className="flex-1 relative">
              <div className="bg-white/5 border border-white/10 rounded-[20px] p-[36px] h-full flex flex-col">
                <span className="text-[48px] mb-[16px]">{s.icon}</span>
                <h3 className="text-[26px] font-semibold mb-[8px]">{s.title}</h3>
                <p className="text-[20px] text-white/60 leading-[1.5]">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="absolute top-1/2 -right-[16px] text-[28px] text-white/30">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Slide: Agent Pipeline ─── */
function AgentPipelineSlide() {
  const agents = [
    {
      icon: "💬",
      title: "Chat Discovery Agent",
      desc: "Extracts detailed information from the user through conversation and generates a concise summary of the job/position description.",
    },
    {
      icon: "⚙️",
      title: "Criteria Agent",
      desc: "Takes the summary and generates a structured list of evaluation criteria with importance weights.",
    },
    {
      icon: "🧠",
      title: "CV Agent",
      desc: "Evaluates each candidate against the weighted criteria to produce a score from 0–100 for ranking.",
      details: [
        "To avoid expensive heavy-weight model calls for every candidate, we added an optimisation layer:",
        "The summary is embedded via Gemini and used for vector similarity search against pre-embedded candidate profiles.",
        "Only the top 15 most similar candidates are passed to the full evaluation pipeline.",
      ],
    },
    {
      icon: "📝",
      title: "Job Posting Agent",
      desc: "When internal talent falls short, this agent generates a ready-to-publish job posting based on the full chat context.",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[hsl(240,10%,5%)] text-white px-[140px] py-[80px]">
      <p className="text-[22px] font-semibold tracking-[0.2em] uppercase text-[hsl(213,100%,65%)] mb-[16px]">Architecture</p>
      <h2 className="text-[60px] font-bold leading-[1.1] mb-[50px]">4-Agent Pipeline</h2>
      <div className="flex-1 grid grid-cols-2 gap-[28px]">
        {agents.map((a, i) => (
          <div key={a.title} className="bg-white/5 border border-white/10 rounded-[20px] p-[36px] flex flex-col">
            <div className="flex items-center gap-[16px] mb-[12px]">
              <span className="text-[40px]">{a.icon}</span>
              <span className="text-[14px] font-bold uppercase tracking-[0.15em] px-[12px] py-[4px] rounded-full bg-[hsl(213,100%,45%)] text-white shrink-0">Agent {i + 1}</span>
            </div>
            <h3 className="text-[26px] font-semibold mb-[8px]">{a.title}</h3>
            <p className="text-[19px] text-white/60 leading-[1.5]">{a.desc}</p>
            {a.details && (
              <ul className="mt-[12px] space-y-[6px]">
                {a.details.map((d, j) => (
                  <li key={j} className="text-[17px] text-white/50 leading-[1.5] flex gap-[8px]">
                    <span className="text-[hsl(213,100%,65%)] shrink-0">›</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Slide 4: Business Value ─── */
function BusinessValueSlide() {
  const values = [
    { metric: "⚡", label: "Faster Hiring", desc: "AI pre-screening drastically cuts time-to-shortlist — no more weeks of manual resume review." },
    { metric: "⚖️", label: "Objective Criteria", desc: "Every candidate scored on the same weighted dimensions — consistent, transparent, and fair." },
    { metric: "💰", label: "Lower External Spend", desc: "Surface qualified internal candidates before resorting to costly external recruitment channels." },
    { metric: "🔭", label: "Talent Visibility", desc: "Skills across the entire organization become searchable and actionable for the first time." },
  ];
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[hsl(213,100%,12%)] via-[hsl(213,80%,20%)] to-[hsl(213,100%,30%)] text-white px-[140px] py-[100px]">
      <p className="text-[22px] font-semibold tracking-[0.2em] uppercase text-[hsl(213,100%,65%)] mb-[16px]">Business Value</p>
      <h2 className="text-[72px] font-bold leading-[1.1] mb-[70px]">Why This Makes<br />Decisions Better</h2>
      <div className="flex-1 grid grid-cols-4 gap-[32px]">
        {values.map((v) => (
          <div key={v.label} className="bg-white/5 border border-white/10 rounded-[20px] p-[40px] flex flex-col items-center text-center">
            <span className="text-[72px] font-bold text-[hsl(213,100%,65%)] leading-none mb-[16px]">{v.metric}</span>
            <h3 className="text-[26px] font-semibold mb-[8px]">{v.label}</h3>
            <p className="text-[20px] text-white/60 leading-[1.5]">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Slide 3: Example Inputs ─── */
function ExampleInputsSlide() {
  const examples = [
    {
      level: "Minimal",
      color: "hsl(213,100%,45%)",
      title: "VP — Digital Car Space",
      text: "Develop and execute the 5-to-10-year roadmap for the business unit, 10+ years experience, experience navigating international markets.",
    },
    {
      level: "Detailed",
      color: "hsl(160,70%,40%)",
      title: "Senior AI Innovation Engineer – Open Innovation",
      text: "5+ yrs Software Engineering / Data Science · Python (FastAPI), TypeScript/React · LLM orchestration & fine-tuning · AWS/Azure, Docker, K8s · Master's / PhD in CS or AI · Fluent English, German preferred.",
    },
    {
      level: "Expert",
      color: "hsl(280,60%,50%)",
      title: "Global VP, Solid-State Battery Scaling & AI Quality Systems",
      text: "PhD Materials Science / Electrochemistry · 15+ yrs automotive/high-tech mfg · Lab→GWh scale-up · AI/ML pipelines in factory settings · €500M+ CapEx leadership · English + German mandatory, Mandarin desired.",
    },
  ];
  return (
    <div className="flex flex-col h-full bg-white text-[hsl(240,10%,10%)] px-[140px] py-[100px]">
      <p className="text-[22px] font-semibold tracking-[0.2em] uppercase text-[hsl(213,100%,45%)] mb-[16px]">Real Examples</p>
      <h2 className="text-[72px] font-bold leading-[1.1] mb-[60px]">Inputs at Every<br />Level of Detail</h2>
      <div className="flex-1 flex flex-col gap-[28px]">
        {examples.map((ex) => (
          <div key={ex.title} className="flex gap-[28px] items-start bg-[hsl(213,60%,96%)] rounded-[20px] p-[36px] flex-1">
            <span
              className="text-[16px] font-bold uppercase tracking-[0.15em] px-[16px] py-[6px] rounded-full shrink-0"
              style={{ background: ex.color, color: "white" }}
            >
              {ex.level}
            </span>
            <div className="min-w-0">
              <h3 className="text-[28px] font-semibold mb-[6px]">{ex.title}</h3>
              <p className="text-[22px] text-[hsl(240,5%,46%)] leading-[1.5]">{ex.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Slide deck ─── */

const slides = [ProblemSlide, InputSlide, ExampleInputsSlide, AIAgentsSlide, AgentPipelineSlide, BusinessValueSlide];

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
