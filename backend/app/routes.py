from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session

from app.database import get_session
from app.models import (
    Ticket,
    TicketCreate,
    TicketPriority,
    TicketPublic,
    TicketUpdate,
    TicketStatus,
)
from app.repositories import (
    create_ticket,
    get_ticket,
    list_tickets,
    update_ticket as db_update_ticket,
)

router = APIRouter(prefix="/api/tickets", tags=["tickets"])
SessionDependency = Annotated[Session, Depends(get_session)]


@router.get("", response_model=list[TicketPublic])
def read_tickets(
    session: SessionDependency,
    ticket_status: Annotated[TicketStatus | None, Query(alias="status")] = None,
    priority: TicketPriority | None = None,
) -> list[TicketPublic]:
    return list_tickets(session, status=ticket_status, priority=priority)


@router.get("/{ticket_id}", response_model=TicketPublic)
def read_ticket(ticket_id: int, session: SessionDependency) -> TicketPublic:
    """Returns the target ticket. Gives a 404 with detail 'Ticket not found' if the ticket doesn't exist."""
    ticket = session.get(Ticket, ticket_id)

    if not ticket:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ticket not found")

    return ticket


@router.post("", response_model=TicketPublic, status_code=status.HTTP_201_CREATED)
def add_ticket(ticket_create: TicketCreate, session: SessionDependency) -> TicketPublic:

    return create_ticket(session, ticket_create)


@router.patch("/{ticket_id}", response_model=TicketPublic)
def update_ticket(
    ticket_id: int, ticket_update: TicketUpdate, session: SessionDependency
) -> TicketPublic:
    ticket = db_update_ticket(session, ticket_id, ticket_update)

    if ticket is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ticket not found")

    return ticket
