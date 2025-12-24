
import { Lead, LeadStatus, Deal, DealStage, Task, Contact } from '../types';

export const mockLeads: Lead[] = [
  { id: 'l1', name: 'John Doe', email: 'john@techcorp.com', company: 'TechCorp', status: LeadStatus.HOT, value: 5000, lastContacted: '2023-10-25', notes: 'Very interested in our premium plan.' },
  { id: 'l2', name: 'Jane Smith', email: 'jane@designhub.io', company: 'DesignHub', status: LeadStatus.WARM, value: 2500, lastContacted: '2023-10-20', notes: 'Asking about bulk discounts.' },
  { id: 'l3', name: 'Bob Wilson', email: 'bob@builders.net', company: 'Wilson Builders', status: LeadStatus.COLD, value: 12000, lastContacted: '2023-09-15', notes: 'Call back in 3 months.' },
  { id: 'l4', name: 'Alice Brown', email: 'alice@crypto.com', company: 'CryptoPay', status: LeadStatus.HOT, value: 8500, lastContacted: '2023-10-26', notes: 'Need immediate implementation.' },
];

export const mockDeals: Deal[] = [
  { id: 'd1', title: 'TechCorp Enterprise', leadId: 'l1', value: 5000, stage: DealStage.NEGOTIATION, expectedCloseDate: '2023-11-15' },
  { id: 'd2', title: 'DesignHub Expansion', leadId: 'l2', value: 2500, stage: DealStage.PROPOSAL, expectedCloseDate: '2023-11-30' },
  { id: 'd3', title: 'CryptoPay Integration', leadId: 'l4', value: 8500, stage: DealStage.QUALIFICATION, expectedCloseDate: '2023-12-05' },
];

export const mockTasks: Task[] = [
  { id: 't1', title: 'Follow up with John Doe', dueDate: '2023-10-28', priority: 'High', completed: false, relatedTo: 'l1' },
  { id: 't2', title: 'Draft proposal for Jane', dueDate: '2023-10-29', priority: 'Medium', completed: false, relatedTo: 'l2' },
  { id: 't3', title: 'Check invoice status', dueDate: '2023-10-25', priority: 'Low', completed: true },
];

export const mockContacts: Contact[] = [
  { 
    id: 'c1', 
    name: 'John Doe', 
    email: 'john@techcorp.com', 
    phone: '+1 555-123-4567', 
    role: 'Executive',
    jobTitle: 'Chief Technology Officer', 
    company: 'TechCorp',
    companyDescription: 'Global leader in cloud infrastructure and cybersecurity solutions for mid-market firms.',
    recentInteraction: 'Discussed the Q4 scaling roadmap. John is concerned about latency in the APAC region.',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  { 
    id: 'c2', 
    name: 'Jane Smith', 
    email: 'jane@designhub.io', 
    phone: '+1 555-987-6543', 
    role: 'Creative',
    jobTitle: 'Creative Director', 
    company: 'DesignHub',
    companyDescription: 'Award-winning boutique agency specializing in sustainable brand identity and UI/UX design.',
    recentInteraction: 'Jane requested a demo of our asset management feature for their freelance network.',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
  },
  { 
    id: 'c3', 
    name: 'Sarah Connor', 
    email: 'sarah@resistance.net', 
    phone: '+1 555-000-1984', 
    role: 'Operations',
    jobTitle: 'Operations Manager', 
    company: 'Skynet Solutions',
    companyDescription: 'Edge computing startup focusing on automated threat detection and logistics.',
    recentInteraction: 'Sent follow-up regarding the service level agreement. Waiting for legal review.',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  { 
    id: 'c4', 
    name: 'Michael Scott', 
    email: 'michael@dundermifflin.com', 
    phone: '+1 555-111-2222', 
    role: 'Management',
    jobTitle: 'Regional Manager', 
    company: 'Dunder Mifflin',
    companyDescription: 'Premier regional paper supplier with a focus on personalized customer service.',
    recentInteraction: 'Michael called to discuss "unlimited" paper supplies. Seems to be shopping for a new CRM.',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
  },
];
