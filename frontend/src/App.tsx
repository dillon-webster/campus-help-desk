import { useCallback, useEffect, useState } from "react";
import { ticketApi } from "./api/tickets";
import { TicketFilters } from "./components/TicketFilters";
import { TicketForm } from "./components/TicketForm";
import { TicketList } from "./components/TicketList";
import type {
  Ticket,
  TicketCreate,
  TicketPriority,
  TicketStatus,
} from "./types/ticket";

export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "">("");
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | "">("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadTickets = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const loadedTickets = await ticketApi.list({
        ...(statusFilter === "" ? {} : { status: statusFilter }),
        // STUDENT TASK: Include priorityFilter when it is not empty.
      });
      setTickets(loadedTickets);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    void loadTickets();
  }, [loadTickets]);

  async function createTicket(ticketCreate: TicketCreate): Promise<void> {
    const createdTicket = await ticketApi.create(ticketCreate);
    setTickets((current) => [createdTicket, ...current]);
  }

  return (
    <>
      <header className="site-header">
        <div>
          <p className="eyebrow">Application Delivery and Operations</p>
          <h1>Campus Help Desk</h1>
          <p>Phase 1: run and understand every service locally.</p>
        </div>
      </header>

      <main className="page-layout">
        <section aria-labelledby="tickets-heading">
          <div className="section-heading">
            <div>
              <h2 id="tickets-heading">Support tickets</h2>
              <p>Requests loaded from FastAPI and PostgreSQL.</p>
            </div>
            <button type="button" onClick={() => void loadTickets()}>
              Refresh
            </button>
          </div>

          <TicketFilters
            status={statusFilter}
            priority={priorityFilter}
            onStatusChange={setStatusFilter}
            onPriorityChange={setPriorityFilter}
          />

          {isLoading && <p role="status">Loading tickets…</p>}
          {errorMessage !== null && <p role="alert">{errorMessage}</p>}
          {!isLoading && errorMessage === null && <TicketList tickets={tickets} />}
        </section>

        <aside aria-label="Create a ticket">
          <TicketForm onCreate={createTicket} />
        </aside>
      </main>
    </>
  );
}
