
export enum LeadStatus {
  HOT = 'HOT',
  WARM = 'WARM',
  COLD = 'COLD'
}

export enum DealStage {
  PROSPECTING = 'PROSPECTING',
  QUALIFICATION = 'QUALIFICATION',
  PROPOSAL = 'PROPOSAL',
  NEGOTIATION = 'NEGOTIATION',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST'
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  status: LeadStatus;
  value: number;
  lastContacted: string;
  notes: string;
}

export interface Deal {
  id: string;
  title: string;
  leadId: string;
  value: number;
  stage: DealStage;
  expectedCloseDate: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  relatedTo?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  jobTitle: string;
  company: string;
  companyDescription?: string;
  recentInteraction?: string;
  avatarUrl?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
