import type { TicketPriority, TicketStatus } from "../types/ticket";

interface TicketFiltersProps {
  status: TicketStatus | "";
  priority: TicketPriority | "";
  onStatusChange: (status: TicketStatus | "") => void;
  onPriorityChange: (priority: TicketPriority | "") => void;
}

export function TicketFilters({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
}: TicketFiltersProps) {
  return (
    <form className="filters" aria-label="Ticket filters">
      <label htmlFor="status-filter">Status</label>
      <select
        id="status-filter"
        value={status}
        onChange={(event) => {
          onStatusChange(event.target.value as TicketStatus | "");
        }}
      >
        <option value="">All statuses</option>
        <option value="open">Open</option>
        <option value="in_progress">In progress</option>
        <option value="closed">Closed</option>
      </select>

      <label htmlFor="priority-filter">Priority</label>
      <select
        id="priority-filter"
        value={priority}
        onChange={(event) => {
          onPriorityChange(event.target.value as TicketPriority | "");
        }}
      >
        <option value="">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </form>
  );
}
