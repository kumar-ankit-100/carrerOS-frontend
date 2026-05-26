// Shared API contracts mirroring the backend.

export interface PublicUser {
  id: string;
  email: string;
  fullName: string;
  roleFocus?: string | null;
  avatarUrl?: string | null;
  onboardedAt?: string | null;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  emailDigests: boolean;
  browserNotifications: boolean;
  compactDensity: boolean;
  autoCapture: boolean;
}

export interface AuthResult {
  user: PublicUser;
  accessToken: string;
  refreshToken: string;
}

// ──── Applications ────
export type ApiApplicationStatus =
  | "APPLIED"
  | "OA"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED";

export type ApiApplicationSource =
  | "LINKEDIN"
  | "REFERRAL"
  | "COMPANY_SITE"
  | "INDEED"
  | "WELLFOUND";

export interface ApiApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  salaryMin?: number | null;
  salaryMax?: number | null;
  currency?: string;
  status: ApiApplicationStatus;
  source: ApiApplicationSource;
  appliedDate: string;
  resumeId?: string | null;
  resumeName?: string | null;
  resumeVersion?: string | null;
  tags: string[];
  notes?: string | null;
  logoUrl?: string | null;
  recruiterId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationBoard {
  applied: ApiApplication[];
  oa: ApiApplication[];
  interview: ApiApplication[];
  offer: ApiApplication[];
  rejected: ApiApplication[];
}

// ──── Resumes ────
export interface ApiResume {
  id: string;
  name: string;
  version: string;
  domain: string;
  tags: string[];
  fileUrl?: string | null;
  atsScore: number;
  isPrimary: boolean;
  lastUpdated: string;
  callbackRate: number;
  applicationsSent: number;
  interviews: number;
}

// ──── Recruiters ────
export type ApiRecruiterStage =
  | "OUTREACH"
  | "REPLIED"
  | "SCREEN"
  | "REFERRED"
  | "CLOSED";

export interface ApiRecruiter {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone?: string | null;
  stage: ApiRecruiterStage;
  source?: string | null;
  notes?: string | null;
  avatarUrl?: string | null;
  lastContactAt: string;
}

export interface PipelineCounts {
  outreach: number;
  replied: number;
  screen: number;
  referred: number;
  closed: number;
}

export interface ApiConversation {
  id: string;
  recruiterId: string;
  direction: "INBOUND" | "OUTBOUND";
  channel: string;
  body: string;
  sentAt: string;
}

// ──── Follow-ups ────
export type ApiPriority = "LOW" | "MEDIUM" | "HIGH";

export interface ApiFollowUp {
  id: string;
  recruiterId?: string | null;
  recruiterName?: string | null;
  applicationId?: string | null;
  company: string;
  action: string;
  channel: string;
  priority: ApiPriority;
  dueAt: string;
  completedAt?: string | null;
  overdue?: boolean;
}

export interface FollowUpSummary {
  pending: number;
  overdue: number;
  today: number;
  completedLast7d: number;
}

export interface FollowUpSuggestion {
  id: string;
  company: string;
  action: string;
  reason: string;
}

// ──── Insights ────
export type ApiImpact = "LOW" | "MEDIUM" | "HIGH";
export interface ApiInsight {
  id: string;
  label: string;
  title: string;
  body: string;
  confidence: number;
  impact: ApiImpact;
  generatedAt: string;
  dismissedAt?: string | null;
  appliedAt?: string | null;
}

// ──── Analytics ────
export interface OverviewResponse {
  applications: { value: number; delta: number };
  callbackRate: { value: number; delta: number };
  interviewConversion: { value: number; delta: number };
  avgResponseDays: { value: number; delta: number };
}

export interface FunnelStage {
  stage: string;
  count: number;
}

export interface VelocityPoint {
  week: string;
  applications: number;
  callbacks: number;
}

export interface DomainPoint {
  domain: string;
  rate: number;
}

export interface CompanyConversion {
  company: string;
  applied: number;
  interview: number;
}

export interface ResumePerformanceSeries {
  versions: string[];
  series: Array<Record<string, number | string>>;
}

// ──── Activity ────
export interface ApiActivity {
  id: string;
  type: "APPLICATION" | "INTERVIEW" | "REJECTION" | "OFFER" | "MESSAGE";
  company: string;
  description: string;
  occurredAt: string;
}

// ──── Integrations ────
export interface ApiIntegration {
  id?: string;
  provider: "linkedin" | "gmail" | "google_calendar" | "slack";
  status: "connected" | "disconnected";
  connectedAt?: string | null;
}

// ──── Notifications ────
export interface ApiNotification {
  id: string;
  title: string;
  body?: string;
  createdAt: string;
  readAt?: string | null;
}

// ──── Onboarding ────
export interface OnboardingStatus {
  step: number;
  completed: {
    extension: boolean;
    resume: boolean;
    application: boolean;
    gmail: boolean;
  };
  finishedAt?: string | null;
}

// ──── Helpers ────
export const STATUS_TO_API: Record<string, ApiApplicationStatus> = {
  applied: "APPLIED",
  oa: "OA",
  interview: "INTERVIEW",
  offer: "OFFER",
  rejected: "REJECTED",
};

export const STATUS_FROM_API: Record<ApiApplicationStatus, string> = {
  APPLIED: "applied",
  OA: "oa",
  INTERVIEW: "interview",
  OFFER: "offer",
  REJECTED: "rejected",
};
