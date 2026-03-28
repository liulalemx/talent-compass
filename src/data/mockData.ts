export interface HiringCase {
  id: string;
  title: string;
  department: string;
  seniority: string;
  urgency: "low" | "medium" | "high";
  status: "draft" | "criteria_defined" | "scored";
  lastUpdated: string;
  candidateCount: number;
  description: string;
}

export interface Criterion {
  id: string;
  name: string;
  description: string;
  weight: number;
  type: "must-have" | "preferred" | "behavioral";
}

export interface CandidateScore {
  criterionId: string;
  score: number;
  rationale: string;
}

export interface Candidate {
  id: string;
  name: string;
  currentRole: string;
  company: string;
  source: "internal" | "external";
  yearsExperience: number;
  location: string;
  overallScore: number;
  rank: number;
  summary: string;
  strengths: string[];
  risks: string[];
  whySelected: string;
  scores: CandidateScore[];
}

export interface ChatMessage {
  id: string;
  role: "ai" | "user";
  content: string;
}

export const hiringCases: HiringCase[] = [
  {
    id: "case-1",
    title: "Senior Software Engineering Manager",
    department: "Autonomous Driving",
    seniority: "Senior Management",
    urgency: "high",
    status: "scored",
    lastUpdated: "2026-03-27",
    candidateCount: 8,
    description:
      "We are seeking a Senior Software Engineering Manager to lead the Autonomous Driving software platform team. The ideal candidate will oversee 40+ engineers across perception, planning, and simulation. They must have deep experience in automotive-grade software development, ASPICE/ISO 26262 processes, and agile transformation at scale.",
  },
  {
    id: "case-2",
    title: "Head of People Analytics",
    department: "Human Resources",
    seniority: "Director",
    urgency: "medium",
    status: "criteria_defined",
    lastUpdated: "2026-03-25",
    candidateCount: 5,
    description: "Leading the people analytics function across the organization.",
  },
  {
    id: "case-3",
    title: "Principal UX Designer",
    department: "Digital Products",
    seniority: "Principal",
    urgency: "low",
    status: "draft",
    lastUpdated: "2026-03-20",
    candidateCount: 0,
    description: "Designing next-generation in-vehicle digital experiences.",
  },
];

export const criteria: Criterion[] = [
  {
    id: "c1",
    name: "Technical Leadership",
    description: "Ability to guide architectural decisions and mentor senior engineers in complex automotive software systems.",
    weight: 25,
    type: "must-have",
  },
  {
    id: "c2",
    name: "Autonomous Driving Domain",
    description: "Deep understanding of perception, planning, localization, and simulation in autonomous driving stacks.",
    weight: 20,
    type: "must-have",
  },
  {
    id: "c3",
    name: "People Management at Scale",
    description: "Proven experience managing 30+ engineers across multiple teams and geographies.",
    weight: 20,
    type: "must-have",
  },
  {
    id: "c4",
    name: "Agile & Process Excellence",
    description: "Experience with agile transformation, ASPICE, and ISO 26262 compliance in automotive contexts.",
    weight: 15,
    type: "preferred",
  },
  {
    id: "c5",
    name: "Strategic Thinking",
    description: "Ability to align engineering roadmap with business goals and communicate effectively with C-level stakeholders.",
    weight: 10,
    type: "preferred",
  },
  {
    id: "c6",
    name: "Cultural Fit & Collaboration",
    description: "Collaborative mindset, ability to work across functions (product, design, hardware), and alignment with company values.",
    weight: 10,
    type: "behavioral",
  },
];

export const candidates: Candidate[] = [
  {
    id: "cand-1",
    name: "Dr. Elena Vasquez",
    currentRole: "VP of Engineering, Autonomous Systems",
    company: "Waymo",
    source: "external",
    yearsExperience: 18,
    location: "Munich, Germany",
    overallScore: 92,
    rank: 1,
    summary: "Exceptional leader with deep AD expertise. Led teams of 60+ at Waymo. PhD in Robotics from ETH Zurich.",
    strengths: ["World-class AD domain knowledge", "Proven at massive scale", "Strong publication record", "Executive presence"],
    risks: ["May expect higher compensation", "No direct automotive OEM experience", "Relocation needed from US"],
    whySelected: "Strongest technical depth combined with leadership at scale. Her Waymo experience directly maps to our AD challenges.",
    scores: [
      { criterionId: "c1", score: 95, rationale: "Led architecture for Waymo's 5th-gen driver. Exceptional technical vision." },
      { criterionId: "c2", score: 98, rationale: "8 years at Waymo across perception and planning. Published 12 papers in AD." },
      { criterionId: "c3", score: 90, rationale: "Managed 60+ engineers at Waymo. Cross-geo teams in US and Europe." },
      { criterionId: "c4", score: 82, rationale: "Strong agile experience but limited ASPICE/ISO 26262 automotive compliance." },
      { criterionId: "c5", score: 94, rationale: "Regularly presented to Alphabet C-suite. Excellent strategic communication." },
      { criterionId: "c6", score: 88, rationale: "Highly collaborative. May need cultural adjustment from tech to automotive." },
    ],
  },
  {
    id: "cand-2",
    name: "Marcus Weber",
    currentRole: "Senior Director, ADAS Platform",
    company: "BMW (Internal)",
    source: "internal",
    yearsExperience: 15,
    location: "Munich, Germany",
    overallScore: 88,
    rank: 2,
    summary: "Strong internal candidate with deep BMW knowledge. Led ADAS platform for 5 years. Excellent cultural fit.",
    strengths: ["Deep BMW institutional knowledge", "Strong ASPICE/ISO compliance", "Trusted by leadership", "Already in Munich"],
    risks: ["Less exposure to cutting-edge AD", "Smaller team management scope", "May be seen as 'safe' choice"],
    whySelected: "Best internal candidate. Deep process knowledge and cultural alignment. Lower risk but potentially lower ceiling.",
    scores: [
      { criterionId: "c1", score: 85, rationale: "Solid technical leader within BMW's ADAS. Less breadth than external candidates." },
      { criterionId: "c2", score: 80, rationale: "Strong ADAS background but limited L4/L5 autonomy experience." },
      { criterionId: "c3", score: 88, rationale: "Manages 35 engineers. Strong track record of team growth and retention." },
      { criterionId: "c4", score: 95, rationale: "Expert in ASPICE and ISO 26262. Led BMW's process transformation." },
      { criterionId: "c5", score: 86, rationale: "Good strategic thinker. Trusted by current VP. Needs more C-level exposure." },
      { criterionId: "c6", score: 96, rationale: "Exemplary cultural fit. Known as a bridge-builder across departments." },
    ],
  },
  {
    id: "cand-3",
    name: "Dr. Aisha Patel",
    currentRole: "Engineering Director, Perception",
    company: "Tesla",
    source: "external",
    yearsExperience: 14,
    location: "Berlin, Germany",
    overallScore: 86,
    rank: 3,
    summary: "Strong perception specialist from Tesla. PhD in Computer Vision. Already based in Berlin.",
    strengths: ["Deep perception expertise", "Tesla's fast-paced culture", "Already in Germany", "Strong ML background"],
    risks: ["Narrow focus on perception only", "Tesla's culture very different from BMW", "Limited people management scope"],
    whySelected: "Exceptional technical depth in perception. Could elevate our vision stack significantly.",
    scores: [
      { criterionId: "c1", score: 90, rationale: "Brilliant technical mind. Led Tesla's European perception team." },
      { criterionId: "c2", score: 88, rationale: "Deep perception expertise. Less breadth in planning/simulation." },
      { criterionId: "c3", score: 75, rationale: "Managed 20 engineers. Has growth potential but untested at 40+." },
      { criterionId: "c4", score: 78, rationale: "Familiar with agile but limited automotive compliance experience." },
      { criterionId: "c5", score: 84, rationale: "Good strategic thinking. Needs development in exec communication." },
      { criterionId: "c6", score: 85, rationale: "Collaborative but may need adjustment from Tesla's intensity." },
    ],
  },
  {
    id: "cand-4",
    name: "Thomas Richter",
    currentRole: "Head of Software Development",
    company: "Continental AG",
    source: "external",
    yearsExperience: 20,
    location: "Frankfurt, Germany",
    overallScore: 84,
    rank: 4,
    summary: "Seasoned automotive software leader. Deep Tier-1 experience. Strong process background.",
    strengths: ["20 years automotive software", "Excellent compliance knowledge", "Large team experience", "German industry network"],
    risks: ["Tier-1 mindset vs OEM innovation", "Less hands-on with modern AD", "May be too process-oriented"],
    whySelected: "Brings strong automotive foundation and proven ability to manage at scale in regulated environments.",
    scores: [
      { criterionId: "c1", score: 82, rationale: "Solid leader but more management than technical architecture focus." },
      { criterionId: "c2", score: 72, rationale: "ADAS experience but limited with L3+ autonomous driving systems." },
      { criterionId: "c3", score: 92, rationale: "Managed 50+ engineers at Continental. Excellent retention rates." },
      { criterionId: "c4", score: 94, rationale: "ASPICE and ISO expert. Led Continental's process certifications." },
      { criterionId: "c5", score: 80, rationale: "Good strategic alignment. Tends toward conservative decisions." },
      { criterionId: "c6", score: 82, rationale: "Professional and collaborative. May be slower to adapt to BMW culture." },
    ],
  },
  {
    id: "cand-5",
    name: "Sarah Kim",
    currentRole: "Senior Engineering Manager, Simulation",
    company: "BMW (Internal)",
    source: "internal",
    yearsExperience: 10,
    location: "Munich, Germany",
    overallScore: 79,
    rank: 5,
    summary: "Rising internal talent. Led simulation platform build-out. Strong technical and cultural fit.",
    strengths: ["Fast learner", "Built simulation from scratch", "Strong internal sponsor", "Excellent team culture"],
    risks: ["Only 10 years experience", "Never managed >15 people", "Limited external perspective"],
    whySelected: "High-potential internal candidate. Could be fast-tracked but may need more seasoning.",
    scores: [
      { criterionId: "c1", score: 84, rationale: "Impressive for her level. Built BMW's simulation platform." },
      { criterionId: "c2", score: 82, rationale: "Strong simulation knowledge. Needs broader AD systems exposure." },
      { criterionId: "c3", score: 65, rationale: "Manages 15 engineers. Untested at larger scale." },
      { criterionId: "c4", score: 80, rationale: "Good agile practitioner. Growing ASPICE knowledge." },
      { criterionId: "c5", score: 76, rationale: "Developing strategic skills. Needs more executive exposure." },
      { criterionId: "c6", score: 92, rationale: "Beloved by team. Strong BMW cultural ambassador." },
    ],
  },
  {
    id: "cand-6",
    name: "Dr. James Chen",
    currentRole: "CTO",
    company: "AutoDrive (Startup)",
    source: "external",
    yearsExperience: 16,
    location: "London, UK",
    overallScore: 81,
    rank: 6,
    summary: "Startup CTO with broad technical vision. Built AD stack from zero. Needs large-org validation.",
    strengths: ["Built entire AD stack", "Full-stack technical depth", "Entrepreneurial mindset", "Strong AI/ML background"],
    risks: ["No large-org management", "Startup culture mismatch", "Relocation from UK", "Unproven at scale"],
    whySelected: "Unique breadth of technical experience. Could bring innovation but carries execution risk at scale.",
    scores: [
      { criterionId: "c1", score: 92, rationale: "Built complete AD stack. Exceptional technical breadth and depth." },
      { criterionId: "c2", score: 90, rationale: "Hands-on with all AD components. Less depth than specialists." },
      { criterionId: "c3", score: 60, rationale: "Managed 12 engineers at startup. Untested at 40+." },
      { criterionId: "c4", score: 65, rationale: "Startup agile. No automotive compliance experience." },
      { criterionId: "c5", score: 82, rationale: "Strong vision. Fundraising experience shows exec communication." },
      { criterionId: "c6", score: 78, rationale: "Energetic and visionary. May struggle with BMW's structured culture." },
    ],
  },
  {
    id: "cand-7",
    name: "Anna Bergström",
    currentRole: "Director of Engineering, AD",
    company: "Volvo Cars",
    source: "external",
    yearsExperience: 17,
    location: "Gothenburg, Sweden",
    overallScore: 85,
    rank: 3,
    summary: "Strong automotive AD leader from Volvo. Excellent safety-first mindset. Proven at OEM scale.",
    strengths: ["OEM AD experience", "Safety-first philosophy", "Strong European network", "Proven at scale"],
    risks: ["Volvo's conservative approach", "Relocation from Sweden", "Different brand philosophy"],
    whySelected: "Closest cultural and operational fit from an external OEM. Strong safety and compliance record.",
    scores: [
      { criterionId: "c1", score: 86, rationale: "Solid technical leader. Led Volvo's AD software architecture." },
      { criterionId: "c2", score: 85, rationale: "Strong L2/L3 experience. Volvo's cautious L4 approach." },
      { criterionId: "c3", score: 88, rationale: "Manages 45 engineers at Volvo. Excellent team builder." },
      { criterionId: "c4", score: 90, rationale: "Excellent ASPICE and safety compliance. Led Volvo's certifications." },
      { criterionId: "c5", score: 82, rationale: "Good strategic alignment. Well-regarded by Volvo's exec team." },
      { criterionId: "c6", score: 84, rationale: "Professional and collaborative. Scandinavian leadership style aligns well." },
    ],
  },
  {
    id: "cand-8",
    name: "Raj Krishnamurthy",
    currentRole: "Principal Engineer, Planning",
    company: "BMW (Internal)",
    source: "internal",
    yearsExperience: 12,
    location: "Munich, Germany",
    overallScore: 76,
    rank: 8,
    summary: "Brilliant individual contributor considering management track. Deep planning expertise.",
    strengths: ["Exceptional planning algorithms", "Strong IC reputation", "BMW insider knowledge", "Patents holder"],
    risks: ["No management experience", "IC-to-manager transition risk", "May prefer IC track"],
    whySelected: "Included as high-potential IC-to-manager candidate. Needs significant management development.",
    scores: [
      { criterionId: "c1", score: 90, rationale: "Exceptional technical depth. 5 patents in motion planning." },
      { criterionId: "c2", score: 88, rationale: "Deep planning expertise. Less breadth in other AD areas." },
      { criterionId: "c3", score: 50, rationale: "No direct management experience. Mentors juniors informally." },
      { criterionId: "c4", score: 72, rationale: "Follows processes well but hasn't led process initiatives." },
      { criterionId: "c5", score: 68, rationale: "Technically strategic. Needs executive communication development." },
      { criterionId: "c6", score: 88, rationale: "Well-liked and respected. Strong team player." },
    ],
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    role: "ai",
    content: "I've analyzed the job description for **Senior Software Engineering Manager — Autonomous Driving**. I've identified 6 key evaluation criteria. Let me walk through them with you.",
  },
  {
    id: "msg-2",
    role: "ai",
    content: "The role requires leading 40+ engineers, so **People Management at Scale** should be weighted heavily. I've set it at 20%. Does that feel right, or should we adjust?",
  },
  {
    id: "msg-3",
    role: "user",
    content: "That looks good. But I think Technical Leadership should be the highest weighted criterion — maybe 25%.",
  },
  {
    id: "msg-4",
    role: "ai",
    content: "Great call. I've moved **Technical Leadership** to 25%. Given the autonomous driving focus, I'd recommend keeping **AD Domain Knowledge** at 20% as the second highest. The remaining criteria are distributed as: Agile & Process (15%), Strategic Thinking (10%), Cultural Fit (10%). Does this balance work?",
  },
  {
    id: "msg-5",
    role: "user",
    content: "Yes, that looks balanced. Let's go with this.",
  },
  {
    id: "msg-6",
    role: "ai",
    content: "Perfect! I've finalized 6 criteria with weights summing to 100%. You can review and fine-tune each criterion's weight using the sliders on the right panel. When you're satisfied, click **Approve Criteria** to proceed to candidate evaluation.",
  },
];

export const departments = [
  "Autonomous Driving",
  "Digital Products",
  "Powertrain Engineering",
  "Human Resources",
  "Finance & Controlling",
  "Manufacturing",
  "Sales & Marketing",
  "Research & Innovation",
];

export const seniorityLevels = [
  "Team Lead",
  "Senior Management",
  "Director",
  "Vice President",
  "Principal",
  "C-Level",
];
