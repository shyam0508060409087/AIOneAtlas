// ═══════════════════════════════════════════
// ONEATLAS — STATIC DATA & TYPES
// ═══════════════════════════════════════════

// ── TYPES ──────────────────────────────────

export type TemplateCategory =
  | "All"
  | "Analytics"
  | "Productivity"
  | "Finance"
  | "SaaS"
  | "HR"
  | "AI"
  | "E-com";

export type AppStatus = "live" | "building" | "draft";
export type Priority = "P0" | "P1" | "P2";
export type RoadmapStatus = "done" | "building" | "planned";
export type RoadmapPhase = "0" | "1" | "1.5" | "2" | "3+";

export interface Template {
  id: number;
  emoji: string;
  name: string;
  description: string;
  tags: TemplateCategory[];
  bgColor: string;
  borderColor: string;
  usersBuilt: string;
  featured?: boolean;
  featuredLabel?: string;
}

export interface UserApp {
  id: string;
  emoji: string;
  name: string;
  description: string;
  status: AppStatus;
  updatedAt: string;
  userCount: number | null;
  accentVariant: "teal" | "violet" | "amber" | "rose";
}

export interface RoadmapItem {
  id: number;
  phase: RoadmapPhase;
  name: string;
  priority: Priority;
  status: RoadmapStatus;
  kpi: string;
}

export interface PromptChip {
  emoji: string;
  label: string;
  prompt: string;
}

// ── TEMPLATES DATA ─────────────────────────

export const TEMPLATES: Template[] = [
  {
    id: 1,
    emoji: "📊",
    name: "Sales Dashboard",
    description: "Real-time KPIs, pipeline view, AI weekly summaries and trend analysis.",
    tags: ["Analytics", "AI"],
    bgColor: "rgba(99,91,255,0.08)",
    borderColor: "rgba(99,91,255,0.14)",
    usersBuilt: "2,140",
    featured: true,
    featuredLabel: "Staff Pick",
  },
  {
    id: 2,
    emoji: "🗂️",
    name: "Project Tracker",
    description: "Sprint boards, task management, velocity tracking and team assignments.",
    tags: ["Productivity"],
    bgColor: "rgba(0,212,177,0.06)",
    borderColor: "rgba(0,212,177,0.12)",
    usersBuilt: "1,820",
    featured: true,
    featuredLabel: "Most Popular",
  },
  {
    id: 3,
    emoji: "💳",
    name: "Invoice Manager",
    description: "Create, send and track invoices. Stripe-ready with dunning automation.",
    tags: ["Finance"],
    bgColor: "rgba(248,188,66,0.06)",
    borderColor: "rgba(248,188,66,0.12)",
    usersBuilt: "1,290",
    featured: true,
    featuredLabel: "New This Week",
  },
  {
    id: 4,
    emoji: "🏢",
    name: "Customer Portal",
    description: "Self-service hub with live data, support tickets and account management.",
    tags: ["SaaS"],
    bgColor: "rgba(0,212,255,0.06)",
    borderColor: "rgba(0,212,255,0.12)",
    usersBuilt: "980",
    featured: true,
    featuredLabel: "Enterprise",
  },
  {
    id: 5,
    emoji: "📋",
    name: "HR Onboarding",
    description: "Structured onboarding flows for new hires with checklists and doc signing.",
    tags: ["HR"],
    bgColor: "rgba(255,89,150,0.06)",
    borderColor: "rgba(255,89,150,0.12)",
    usersBuilt: "740",
  },
  {
    id: 6,
    emoji: "🤖",
    name: "AI Chat App",
    description: "Custom LLM-powered chat with memory, context, and streaming responses.",
    tags: ["AI"],
    bgColor: "rgba(99,91,255,0.08)",
    borderColor: "rgba(99,91,255,0.14)",
    usersBuilt: "690",
  },
  {
    id: 7,
    emoji: "📦",
    name: "Inventory Tracker",
    description: "Stock management with low-stock alerts and supplier portal.",
    tags: ["E-com"],
    bgColor: "rgba(0,212,177,0.06)",
    borderColor: "rgba(0,212,177,0.12)",
    usersBuilt: "620",
  },
  {
    id: 8,
    emoji: "🌐",
    name: "Multi-tenant SaaS",
    description: "Full org / workspace hierarchy with RBAC and per-org billing.",
    tags: ["SaaS"],
    bgColor: "rgba(0,212,255,0.06)",
    borderColor: "rgba(0,212,255,0.12)",
    usersBuilt: "510",
  },
  {
    id: 9,
    emoji: "📬",
    name: "Email Campaigns",
    description: "Broadcast emails, drip sequences and open-rate analytics.",
    tags: ["AI", "SaaS"],
    bgColor: "rgba(248,188,66,0.06)",
    borderColor: "rgba(248,188,66,0.12)",
    usersBuilt: "480",
  },
  {
    id: 10,
    emoji: "🔔",
    name: "Notification Center",
    description: "Multi-channel alerts (email, SMS, push) with rule-based triggers.",
    tags: ["AI", "SaaS"],
    bgColor: "rgba(99,91,255,0.08)",
    borderColor: "rgba(99,91,255,0.14)",
    usersBuilt: "390",
  },
  {
    id: 11,
    emoji: "📈",
    name: "Analytics Platform",
    description: "Event tracking, funnel analysis, and AI-powered cohort reports.",
    tags: ["Analytics", "AI"],
    bgColor: "rgba(0,212,177,0.06)",
    borderColor: "rgba(0,212,177,0.12)",
    usersBuilt: "360",
  },
  {
    id: 12,
    emoji: "🛒",
    name: "E-commerce Store",
    description: "Product catalog, cart, checkout and order management with Stripe.",
    tags: ["E-com", "Finance"],
    bgColor: "rgba(255,89,150,0.06)",
    borderColor: "rgba(255,89,150,0.12)",
    usersBuilt: "290",
  },
];

// ── USER APPS ──────────────────────────────

export const USER_APPS: UserApp[] = [
  {
    id: "app-1",
    emoji: "📊",
    name: "Sales Dashboard",
    description: "Real-time revenue metrics, pipeline view, AI weekly summaries.",
    status: "live",
    updatedAt: "2h ago",
    userCount: 240,
    accentVariant: "teal",
  },
  {
    id: "app-2",
    emoji: "🗂️",
    name: "Project Tracker",
    description: "Sprint boards, task management, velocity tracking.",
    status: "live",
    updatedAt: "1d ago",
    userCount: 18,
    accentVariant: "violet",
  },
  {
    id: "app-3",
    emoji: "🧠",
    name: "Knowledge Base",
    description: "AI-searchable docs with semantic retrieval and auto-tagging.",
    status: "building",
    updatedAt: "Today",
    userCount: null,
    accentVariant: "amber",
  },
];

// ── ROADMAP DATA ───────────────────────────

export const ROADMAP_ITEMS: RoadmapItem[] = [
  // Phase 0
  { id: 1,  phase: "0",   name: "Market + competitor deep research",                    priority: "P0", status: "done",     kpi: "Competitor matrix complete" },
  { id: 2,  phase: "0",   name: "Technical stack: Next.js + Neon + Cloudflare",          priority: "P0", status: "done",     kpi: "Architecture doc approved" },
  { id: 3,  phase: "0",   name: "Pricing model + unit economics",                         priority: "P0", status: "done",     kpi: "Margin model validated" },
  // Phase 1
  { id: 4,  phase: "1",   name: "Conversational app builder (intent → working app)",     priority: "P0", status: "building", kpi: "5s preview · 60s deploy" },
  { id: 5,  phase: "1",   name: "Standardized runtime (Cloudflare Workers + Neon)",       priority: "P0", status: "building", kpi: "100% uptime / 1k apps" },
  { id: 6,  phase: "1",   name: "Built-in auth (email/password + OAuth)",                 priority: "P0", status: "building", kpi: "100% auth success" },
  { id: 7,  phase: "1",   name: "PostgreSQL auto-provisioning + AI schema design",        priority: "P0", status: "building", kpi: "Schema in <10s" },
  { id: 8,  phase: "1",   name: "One-click deployment (Cloudflare Pages + Workers)",      priority: "P0", status: "building", kpi: "100% deploy success" },
  { id: 9,  phase: "1",   name: "Multi-provider AI gateway (Claude + GPT-4 + Gemini)",   priority: "P0", status: "building", kpi: "AI p90 <3s" },
  { id: 10, phase: "1",   name: "Basic CRUD app generation",                               priority: "P0", status: "building", kpi: "CRUD app in <2 min" },
  { id: 11, phase: "1",   name: "Custom domain support",                                   priority: "P1", status: "planned",  kpi: "Domain in <5 min" },
  { id: 12, phase: "1",   name: "Basic workspace + project management",                    priority: "P1", status: "planned",  kpi: "Manage 5+ apps" },
  // Phase 1.5
  { id: 13, phase: "1.5", name: "Template library (20+ starter templates)",               priority: "P1", status: "planned",  kpi: "20 templates at launch" },
  { id: 14, phase: "1.5", name: "Conversational editing (describe changes → apply)",      priority: "P0", status: "planned",  kpi: "95% edit success" },
  { id: 15, phase: "1.5", name: "Workspace-level AI memory + context",                    priority: "P1", status: "planned",  kpi: "Context in 80% of sessions" },
  { id: 16, phase: "1.5", name: "Undo / version history",                                  priority: "P1", status: "planned",  kpi: "2x more iterations" },
  { id: 17, phase: "1.5", name: "Visual data editor (spreadsheet-like DB view)",           priority: "P1", status: "planned",  kpi: "90% use in week 1" },
  // Phase 2
  { id: 18, phase: "2",   name: "Native workflow engine (triggers, conditions, actions)", priority: "P1", status: "planned",  kpi: "Workflows in 40% of apps" },
  { id: 19, phase: "2",   name: "Webhook + API endpoint generation",                       priority: "P1", status: "planned",  kpi: "APIs in 60% of apps" },
  { id: 20, phase: "2",   name: "Stripe / payment integration",                             priority: "P1", status: "planned",  kpi: "Payments in <5 min" },
  { id: 21, phase: "2",   name: "Email integration (Resend / SendGrid)",                   priority: "P1", status: "planned",  kpi: "Email in 100% of apps" },
  { id: 22, phase: "2",   name: "Multi-user collaboration (shared workspace)",             priority: "P1", status: "planned",  kpi: "Teams of 3+ = 30% of paid" },
  // Phase 3+
  { id: 23, phase: "3+",  name: "Multi-agent orchestration (parallel AI workers)",        priority: "P2", status: "planned",  kpi: "10-page apps in <5 min" },
  { id: 24, phase: "3+",  name: "AI self-healing runtime + error detection",               priority: "P2", status: "planned",  kpi: "50% error reduction" },
  { id: 25, phase: "3+",  name: "Plugin / extension marketplace",                          priority: "P2", status: "planned",  kpi: "50 plugins · $1M GMV Year 2" },
  { id: 26, phase: "3+",  name: "Enterprise SSO / SAML + SOC2 compliance",                priority: "P2", status: "planned",  kpi: "First enterprise deal" },
  { id: 27, phase: "3+",  name: "White-label / agency tier",                               priority: "P2", status: "planned",  kpi: "20 agency partners Year 1" },
];

// ── PROMPT CHIPS ───────────────────────────

export const PROMPT_CHIPS: PromptChip[] = [
  { emoji: "📊", label: "Sales Dashboard",  prompt: "Build me a sales analytics dashboard with real-time KPIs, AI weekly summaries, and team targets" },
  { emoji: "🗂️", label: "Project Tracker", prompt: "Build me a project tracker with sprint boards, task assignments, and velocity charts" },
  { emoji: "🏢", label: "Customer Portal", prompt: "Build me a customer portal with live data, support tickets and account management" },
  { emoji: "🧠", label: "Knowledge Base",  prompt: "Build me an AI knowledge base with semantic search, auto-tagging, and document summaries" },
  { emoji: "💳", label: "Billing Suite",   prompt: "Build me an invoice and billing manager with Stripe integration and dunning automation" },
];

// ── CATEGORIES ─────────────────────────────

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  "All", "Analytics", "Productivity", "Finance", "SaaS", "HR", "AI", "E-com"
];

// ── PHASE CONFIG ───────────────────────────

export const PHASE_CONFIG: Record<RoadmapPhase, { label: string; colorClass: string; icon: string }> = {
  "0":   { label: "Phase 0 — Research",          colorClass: "badge-sky",    icon: "✅" },
  "1":   { label: "Phase 1 — MVP (Building)",    colorClass: "badge-accent", icon: "🔨" },
  "1.5": { label: "Phase 1.5 — Post-MVP",        colorClass: "badge-teal",   icon: "🌱" },
  "2":   { label: "Phase 2 — Growth",            colorClass: "badge-amber",  icon: "⚡" },
  "3+":  { label: "Phase 3–5 — AI → Enterprise", colorClass: "badge-rose",   icon: "🚀" },
};
