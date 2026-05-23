export type ApplicationStatus = "applied" | "oa" | "interview" | "rejected" | "offer";

export interface Application {
  id: string;
  company: string;
  role: string;
  location: string;
  salary?: string;
  appliedDate: string;
  status: ApplicationStatus;
  resumeVersion: string;
  source: "LinkedIn" | "Referral" | "Company Site" | "Indeed" | "Wellfound";
  tags: string[];
  logo?: string;
  notes?: string;
}

export interface Resume {
  id: string;
  name: string;
  version: string;
  lastUpdated: string;
  atsScore: number;
  callbackRate: number;
  applicationsSent: number;
  interviews: number;
  domain: string;
  tags: string[];
  primary?: boolean;
}

export interface Recruiter {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  lastContact: string;
  stage: "Outreach" | "Replied" | "Screen" | "Referred" | "Closed";
  notes?: string;
  avatar?: string;
}

export interface Activity {
  id: string;
  type: "application" | "interview" | "rejection" | "offer" | "message";
  company: string;
  description: string;
  timestamp: string;
}
