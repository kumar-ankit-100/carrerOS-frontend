import type { Application, Resume, Recruiter, Activity } from "@/types";

export const applications: Application[] = [
  { id: "a1", company: "Stripe", role: "Senior Software Engineer", location: "San Francisco, CA", salary: "$210k–$260k", appliedDate: "2026-05-18", status: "interview", resumeVersion: "Backend v3", source: "Referral", tags: ["Backend", "Go"] },
  { id: "a2", company: "Linear", role: "Product Engineer", location: "Remote", salary: "$190k–$240k", appliedDate: "2026-05-17", status: "oa", resumeVersion: "Fullstack v2", source: "LinkedIn", tags: ["Fullstack", "TS"] },
  { id: "a3", company: "Vercel", role: "Platform Engineer", location: "Remote", salary: "$200k–$250k", appliedDate: "2026-05-15", status: "applied", resumeVersion: "Backend v3", source: "Company Site", tags: ["Infra"] },
  { id: "a4", company: "Notion", role: "Frontend Engineer", location: "New York, NY", salary: "$180k–$230k", appliedDate: "2026-05-14", status: "interview", resumeVersion: "Frontend v4", source: "LinkedIn", tags: ["React"] },
  { id: "a5", company: "Ramp", role: "Backend Engineer", location: "New York, NY", salary: "$200k–$260k", appliedDate: "2026-05-12", status: "rejected", resumeVersion: "Backend v2", source: "Indeed", tags: ["Backend"] },
  { id: "a6", company: "Anthropic", role: "Research Engineer", location: "San Francisco, CA", salary: "$280k–$360k", appliedDate: "2026-05-10", status: "interview", resumeVersion: "ML v1", source: "Referral", tags: ["ML", "Python"] },
  { id: "a7", company: "Figma", role: "Senior Product Engineer", location: "San Francisco, CA", salary: "$220k–$270k", appliedDate: "2026-05-08", status: "offer", resumeVersion: "Fullstack v2", source: "Referral", tags: ["Product"] },
  { id: "a8", company: "Plaid", role: "Backend Engineer", location: "Remote", salary: "$200k–$240k", appliedDate: "2026-05-06", status: "applied", resumeVersion: "Backend v3", source: "LinkedIn", tags: ["Fintech"] },
  { id: "a9", company: "Datadog", role: "Software Engineer II", location: "New York, NY", salary: "$190k–$230k", appliedDate: "2026-05-05", status: "oa", resumeVersion: "Backend v3", source: "Wellfound", tags: ["Infra"] },
  { id: "a10", company: "Airtable", role: "Senior Engineer", location: "San Francisco, CA", salary: "$210k–$260k", appliedDate: "2026-05-03", status: "rejected", resumeVersion: "Frontend v4", source: "LinkedIn", tags: ["Frontend"] },
  { id: "a11", company: "Mercury", role: "Full-Stack Engineer", location: "Remote", salary: "$185k–$235k", appliedDate: "2026-05-01", status: "applied", resumeVersion: "Fullstack v2", source: "Company Site", tags: ["Fintech"] },
  { id: "a12", company: "Retool", role: "Platform Engineer", location: "San Francisco, CA", salary: "$200k–$250k", appliedDate: "2026-04-28", status: "interview", resumeVersion: "Backend v3", source: "Referral", tags: ["Infra"] },
];

export const resumes: Resume[] = [
  { id: "r1", name: "Backend Engineer", version: "v3", lastUpdated: "2026-05-15", atsScore: 92, callbackRate: 38, applicationsSent: 42, interviews: 16, domain: "Backend", tags: ["Go", "Python", "Distributed"], primary: true },
  { id: "r2", name: "Fullstack Engineer", version: "v2", lastUpdated: "2026-05-10", atsScore: 88, callbackRate: 31, applicationsSent: 28, interviews: 9, domain: "Fullstack", tags: ["TS", "React", "Node"] },
  { id: "r3", name: "Frontend Engineer", version: "v4", lastUpdated: "2026-05-08", atsScore: 86, callbackRate: 24, applicationsSent: 18, interviews: 4, domain: "Frontend", tags: ["React", "Next.js"] },
  { id: "r4", name: "Backend Engineer", version: "v2", lastUpdated: "2026-04-20", atsScore: 79, callbackRate: 18, applicationsSent: 22, interviews: 4, domain: "Backend", tags: ["Java", "Spring"] },
  { id: "r5", name: "ML Engineer", version: "v1", lastUpdated: "2026-04-15", atsScore: 84, callbackRate: 27, applicationsSent: 11, interviews: 3, domain: "ML", tags: ["PyTorch", "Python"] },
];

export const recruiters: Recruiter[] = [
  { id: "rc1", name: "Sarah Chen", title: "Technical Recruiter", company: "Stripe", email: "sarah.c@stripe.com", lastContact: "2026-05-20", stage: "Screen" },
  { id: "rc2", name: "Michael Reyes", title: "Senior Recruiter", company: "Linear", email: "m.reyes@linear.app", lastContact: "2026-05-19", stage: "Replied" },
  { id: "rc3", name: "Priya Sharma", title: "Sourcer", company: "Anthropic", email: "priya@anthropic.com", lastContact: "2026-05-18", stage: "Referred" },
  { id: "rc4", name: "Daniel Wong", title: "Recruiting Lead", company: "Vercel", email: "dwong@vercel.com", lastContact: "2026-05-12", stage: "Outreach" },
  { id: "rc5", name: "Emma Johansson", title: "Talent Partner", company: "Notion", email: "emma@notion.so", lastContact: "2026-05-09", stage: "Screen" },
  { id: "rc6", name: "Raj Patel", title: "Technical Recruiter", company: "Ramp", email: "raj.p@ramp.com", lastContact: "2026-04-30", stage: "Closed" },
  { id: "rc7", name: "Jenna Liu", title: "Recruiter", company: "Figma", email: "jenna@figma.com", lastContact: "2026-05-21", stage: "Replied" },
  { id: "rc8", name: "Tom Becker", title: "Sr. Sourcer", company: "Datadog", email: "tom.b@datadog.com", lastContact: "2026-05-16", stage: "Outreach" },
];

export const activity: Activity[] = [
  { id: "ac1", type: "interview", company: "Stripe", description: "Scheduled onsite for May 28", timestamp: "2026-05-22" },
  { id: "ac2", type: "offer", company: "Figma", description: "Offer received: $245k base", timestamp: "2026-05-21" },
  { id: "ac3", type: "message", company: "Linear", description: "Recruiter reply from Michael Reyes", timestamp: "2026-05-19" },
  { id: "ac4", type: "application", company: "Plaid", description: "Application submitted via LinkedIn", timestamp: "2026-05-18" },
  { id: "ac5", type: "rejection", company: "Ramp", description: "Closed after technical screen", timestamp: "2026-05-17" },
  { id: "ac6", type: "interview", company: "Notion", description: "Technical screen passed", timestamp: "2026-05-16" },
];

export const funnel = [
  { stage: "Applied", count: 142 },
  { stage: "Screen", count: 48 },
  { stage: "Interview", count: 22 },
  { stage: "Final", count: 9 },
  { stage: "Offer", count: 4 },
];

export const applicationsOverTime = [
  { week: "W1", applications: 12, callbacks: 3 },
  { week: "W2", applications: 18, callbacks: 5 },
  { week: "W3", applications: 22, callbacks: 8 },
  { week: "W4", applications: 14, callbacks: 6 },
  { week: "W5", applications: 26, callbacks: 11 },
  { week: "W6", applications: 21, callbacks: 9 },
  { week: "W7", applications: 29, callbacks: 14 },
  { week: "W8", applications: 24, callbacks: 12 },
];

export const domainPerformance = [
  { domain: "Backend", rate: 38 },
  { domain: "Fullstack", rate: 31 },
  { domain: "ML", rate: 27 },
  { domain: "Frontend", rate: 24 },
  { domain: "Platform", rate: 22 },
  { domain: "Mobile", rate: 14 },
];

export const resumePerformance = [
  { week: "W1", v3: 22, v2: 14, v4: 11 },
  { week: "W2", v3: 28, v2: 16, v4: 12 },
  { week: "W3", v3: 34, v2: 18, v4: 13 },
  { week: "W4", v3: 38, v2: 19, v4: 14 },
  { week: "W5", v3: 41, v2: 21, v4: 14 },
  { week: "W6", v3: 44, v2: 23, v4: 15 },
];

export const companyConversion = [
  { company: "Stripe", applied: 4, interview: 3 },
  { company: "Linear", applied: 2, interview: 2 },
  { company: "Vercel", applied: 3, interview: 1 },
  { company: "Notion", applied: 5, interview: 2 },
  { company: "Figma", applied: 2, interview: 2 },
  { company: "Anthropic", applied: 3, interview: 2 },
];
