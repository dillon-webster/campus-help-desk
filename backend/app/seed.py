from sqlmodel import Session, select

from app.database import create_db_and_tables, engine
from app.models import Ticket, TicketPriority


def seed() -> None:
    create_db_and_tables()

    with Session(engine) as session:
        existing_ticket = session.exec(select(Ticket)).first()
        if existing_ticket is not None:
            print("Seed skipped: tickets already exist.")
            return

        session.add_all(
            [
                Ticket(
                    title="Projector will not display",
                    description="The classroom projector reports that no HDMI signal is available.",
                    priority=TicketPriority.HIGH,
                ),
                Ticket(
                    title="Password reset needed",
                    description="A student cannot sign in to the learning management system.",
                    priority=TicketPriority.MEDIUM,
                ),
            ]
        )
        session.commit()

    print("Sample tickets created.")


if __name__ == "__main__":
    seed()
