# Phase 1 Checkpoints

## Checkpoint 1 — Environment

- [|] PostgreSQL is running.
- [|] `helpdesk_app` can connect to `helpdesk`.
- [|] Backend dependencies install successfully.
- [|] Frontend dependencies install successfully.
- [|] `.env` files are ignored by Git.

## Checkpoint 2 — Backend

- [|] `GET /health` returns a success response.
- [|] `/docs` loads.
- [|] `GET /api/tickets` returns JSON.
- [|] `POST /api/tickets` inserts a row.
- [|] `GET /api/tickets/{ticket_id}` returns a ticket or 404.
- [] Status filtering works.

## Checkpoint 3 — Frontend

- [|] Fix CORS error.
- [ ] Loading state is visible while waiting.
- [ ] API errors produce a useful message.
- [ ] Empty results produce an empty state.
- [ ] Ticket data is rendered with semantic HTML.
- [ ] Creation form is controlled and strictly typed.
- [ ] Successful creation updates the list.

## Checkpoint 4 — Vertical feature

- [ ] Priority filter is represented in the URL request.
- [ ] FastAPI validates the priority value.
- [ ] The database query filters at the database layer.
- [ ] React displays matching records.
- [ ] Clearing the filter returns all records.

## Checkpoint 5 — Handoff

- [ ] A partner can set up the project from a fresh clone.
- [ ] Setup instructions mention prerequisites.
- [ ] Setup instructions explain every process.
- [ ] No secrets or local environment files are committed.
- [ ] The student can verbally trace one complete request.
