from sqlmodel import Session, select

from app.models import (
    Ticket,
    TicketCreate,
    TicketPriority,
    TicketUpdate,
    TicketStatus,
)


def list_tickets(
    session: Session,
    *,
    status: TicketStatus | None = None,
    priority: TicketPriority | None = None,
) -> list[Ticket]:
    statement = select(Ticket).order_by(Ticket.created_at.desc())

    if status is not None:
        statement = statement.where(Ticket.status == status)

    # STUDENT TASK: Apply the priority filter when priority is not None.
    _ = priority

    return list(session.exec(statement).all())


def get_ticket(session: Session, ticket_id: int) -> Ticket | None:
    return session.get(Ticket, ticket_id)


def update_ticket(session: Session, ticket_id: int, ticket_update: TicketUpdate) -> Ticket | None:
    ticket = session.get(Ticket, ticket_id)
    if ticket is None:
        return ticket

    for key, value in ticket_update.model_dump(exclude_unset=True).items():
        setattr(ticket, key, value)

    session.commit()
    return ticket


def create_ticket(session: Session, ticket_create: TicketCreate) -> Ticket:
    ticket = Ticket.model_validate(ticket_create)
    session.add(ticket)
    session.commit()
    session.refresh(ticket)
    return ticket
