// Core types for the Public Radio Agents SaaS platform

export interface Station {
  id: string;
  name: string;
  callSign?: string;
  size: 'small' | 'medium' | 'large';
  licenseType: 'community' | 'university' | 'lpfm';
  marketSize: number;
  budget: number;
  challenges: Challenge[];
  context: string;
  location?: {
    city: string;
    state: string;
    zipCode: string;
  };
  staff?: {
    fullTime: number;
    partTime: number;
    volunteers: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Challenge {
  id: string;
  category: 'fundraising' | 'marketing' | 'programming' | 'underwriting' | 'operations';
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'in-progress' | 'resolved';
}

export interface Agent {
  id: 'development-director' | 'marketing-director' | 'underwriting-director' | 'program-director';
  name: string;
  persona: string;
  icon: string;
  color: string;
  expertise: string[];
  description: string;
  commands: AgentCommand[];
}

export interface AgentCommand {
  command: string;
  description: string;
  category: 'analysis' | 'planning' | 'creation' | 'research';
}

export interface ChatSession {
  id: string;
  stationId: string;
  title: string;
  activeAgent?: Agent['id'];
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  agentId?: Agent['id'];
  timestamp: Date;
  metadata?: {
    command?: string;
    deliverable?: string;
    templateUsed?: string;
    processingTime?: number;
    tokens?: number;
  };
  isStreaming?: boolean;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  icon: string;
  phases: WorkflowPhase[];
  estimatedDuration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'planning' | 'campaign' | 'analysis' | 'development';
}

export interface WorkflowPhase {
  id: string;
  name: string;
  description: string;
  agents: Agent['id'][];
  deliverables: string[];
  estimatedTime: string;
  dependencies?: string[]; // Previous phase IDs
}

export interface WorkflowSession {
  id: string;
  workflowId: string;
  stationId: string;
  currentPhase: number;
  phaseProgress: Record<string, WorkflowPhaseProgress>;
  status: 'not-started' | 'in-progress' | 'completed' | 'paused';
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowPhaseProgress {
  status: 'not-started' | 'in-progress' | 'completed';
  completedDeliverables: string[];
  notes?: string;
  completedAt?: Date;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: 'user' | 'admin';
  subscription?: Subscription;
  stations: Station[];
  createdAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: PlanFeature[];
  limits: PlanLimits;
}

export interface PlanFeature {
  name: string;
  description: string;
  included: boolean;
}

export interface PlanLimits {
  maxStations: number;
  maxChatSessions: number;
  maxWorkflows: number;
  maxTeamMembers: number;
  apiCallsPerMonth: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'campaign' | 'strategy' | 'proposal' | 'analysis' | 'report';
  agentId: Agent['id'];
  content: string;
  variables: TemplateVariable[];
  isCustom: boolean;
  stationId?: string; // If custom template
}

export interface TemplateVariable {
  name: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea';
  label: string;
  placeholder?: string;
  options?: string[]; // For select type
  required: boolean;
  defaultValue?: string;
}

export interface Deliverable {
  id: string;
  name: string;
  description: string;
  templateId: string;
  sessionId?: string;
  workflowSessionId?: string;
  content: string;
  format: 'markdown' | 'html' | 'pdf' | 'docx';
  status: 'draft' | 'completed' | 'exported';
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalyticsData {
  stationId: string;
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
  metrics: {
    totalSessions: number;
    totalMessages: number;
    agentUsage: Record<Agent['id'], number>;
    workflowsStarted: number;
    workflowsCompleted: number;
    documentsCreated: number;
    avgSessionDuration: number;
    mostUsedCommands: Array<{ command: string; count: number }>;
  };
  trends: {
    sessionsOverTime: Array<{ date: string; count: number }>;
    agentUsageOverTime: Array<{ date: string; agent: Agent['id']; count: number }>;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ChatResponse {
  message: ChatMessage;
  suggestions?: string[];
  context?: {
    agentSwitched?: boolean;
    newAgent?: Agent['id'];
    commandExecuted?: string;
    deliverableGenerated?: boolean;
  };
}

// UI State types
export interface UIState {
  sidebarOpen: boolean;
  currentView: 'chat' | 'workflows' | 'analytics' | 'settings';
  theme: 'light' | 'dark';
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

// Form types
export interface StationSetupData {
  basicInfo: {
    name: string;
    callSign?: string;
    location: {
      city: string;
      state: string;
      zipCode: string;
    };
  };
  stationDetails: {
    size: Station['size'];
    licenseType: Station['licenseType'];
    marketSize: number;
    budget: number;
  };
  staffing: {
    fullTime: number;
    partTime: number;
    volunteers: number;
  };
  challenges: Challenge[];
  context: string;
  goals: string[];
}

export interface ChatInputData {
  content: string;
  attachments?: File[];
  metadata?: Record<string, any>;
}