import type { Ticket } from "../types/ticket";

interface TicketListProps {
  tickets: Ticket[];
}

export function TicketList({ tickets }: TicketListProps) {
  if (tickets.length === 0) {
    return <p role="status">No tickets match the current filters.</p>;
  }

  return (
    <ul className="ticket-grid" aria-label="Support tickets">
      {tickets.map((ticket) => (
        <li className="ticket-card" key={ticket.id}>
          <article>
            <header className="ticket-card__header">
              <h3>{ticket.title}</h3>
              <span>{ticket.priority}</span>
            </header>
            <p>{ticket.description}</p>
            <footer className="ticket-card__footer">
              <span>Status: {ticket.status.replace("_", " ")}</span>
              <time dateTime={ticket.created_at}>
                {new Date(ticket.created_at).toLocaleString()}
              </time>
            </footer>
          </article>
        </li>
      ))}
    </ul>
  );
}
