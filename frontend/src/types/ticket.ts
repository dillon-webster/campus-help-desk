export const TICKET_STATUSES = ["open", "in_progress", "closed"] as const;
export type TicketStatus = (typeof TICKET_STATUSES)[number];

export const TICKET_PRIORITIES = ["low", "medium", "high"] as const;
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  created_at: string;
}

export interface TicketCreate {
  title: string;
  description: string;
  priority: TicketPriority;
}

export interface TicketFilters {
  status?: TicketStatus;
  priority?: TicketPriority;
}
