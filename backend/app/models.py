from datetime import UTC, datetime
from enum import StrEnum

from sqlmodel import Field, SQLModel


class TicketStatus(StrEnum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    CLOSED = "closed"


class TicketPriority(StrEnum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class TicketBase(SQLModel):
    title: str = Field(min_length=3, max_length=120)
    description: str = Field(min_length=10, max_length=2000)
    priority: TicketPriority = TicketPriority.MEDIUM


class Ticket(TicketBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    status: TicketStatus = TicketStatus.OPEN
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))


class TicketCreate(TicketBase):
    pass


class TicketUpdate(SQLModel):
    title: str | None = Field(min_length=3, max_length=120)
    description: str | None = Field(default=None, min_length=10, max_length=2000)
    priority: TicketPriority | None = None
    status: TicketStatus | None = None


class TicketPublic(TicketBase):
    id: int
    status: TicketStatus
    created_at: datetime
