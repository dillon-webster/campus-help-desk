import { requestJson } from "./http";
import type { Ticket, TicketCreate, TicketFilters } from "../types/ticket";

function buildQueryString(filters: TicketFilters): string {
  const searchParams = new URLSearchParams();

  if (filters.status !== undefined) {
    searchParams.set("status", filters.status);
  }

  // STUDENT TASK: Add priority when it is defined.

  const query = searchParams.toString();
  return query.length === 0 ? "" : `?${query}`;
}

export const ticketApi = {
  list(filters: TicketFilters = {}): Promise<Ticket[]> {
    return requestJson<Ticket[]>(`/api/tickets${buildQueryString(filters)}`);
  },

  get(ticketId: number): Promise<Ticket> {
    return requestJson<Ticket>(`/api/tickets/${ticketId}`);
  },

  create(ticket: TicketCreate): Promise<Ticket> {
    return requestJson<Ticket>("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });
  },
};
