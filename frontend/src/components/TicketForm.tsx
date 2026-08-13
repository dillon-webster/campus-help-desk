import { useState } from "react";
import type { TicketCreate, TicketPriority } from "../types/ticket";

interface TicketFormProps {
  onCreate: (ticket: TicketCreate) => Promise<void>;
}

interface TicketFormState {
  title: string;
  description: string;
  priority: TicketPriority;
}

const INITIAL_STATE: TicketFormState = {
  title: "",
  description: "",
  priority: "medium",
};


export function TicketForm({ onCreate }: TicketFormProps) {
  
  const [formState, setFormState] = useState<TicketFormState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    // 1. Set the submitting state
    setIsSubmitting(true);
    // 2. Clear the previous error message
    setErrorMessage(null);
    // 3. Await onCreate(formState)
    try {
      await onCreate(formState);
    } catch (error) {
      setErrorMessage("Failed to create ticket.");
    } finally {
      setIsSubmitting(false);
    }
    
    // 4. Reset the form after success
    // 5. Display a useful message after failure
    // 6. Always clear the submitting state
    setFormState(INITIAL_STATE);
    
    
    //setErrorMessage("Ticket creation has not been implemented.");
  }
  return (
  <form className="ticket-form" onSubmit={(event) => void handleSubmit(event)}>
      <fieldset disabled={isSubmitting}>
        <legend>Create a support ticket</legend>

        <label htmlFor="title">Title</label>
        <input
          id="title" 
          minLength={3}
          maxLength={120}
          required
          value={formState.title}
          onChange={(event) => {
          setFormState((current) => ({...current, title: event.target.value }));
          }}
        />

        <label htmlFor="description">Descritption</label>
        <textarea
          id="description"
          minLength={1}
          maxLength={2000}
          required
          rows={5}
          value={formState.description}
          onChange={(event) => {
            setFormState((current) => ({ ...current, description: event.target.value }))
          }}
          />

        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={formState.priority}

          onChange={(event) => {
          setFormState((current) => ({...current, priority: event.target.value as TicketPriority,}));
          }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        <button type="submit">
          {isSubmitting ? "Creating..." : "Create ticket"}
        </button>
      </fieldset>

      {errorMessage != null && <p role="alert">{errorMessage}</p>}

      

    </form>

  )
}

