# Student Project Brief: Campus Help Desk

## Scenario

Your team maintains a small help-desk application for a technical college. Students and instructors can submit support tickets, view existing tickets, and filter them.

This phase focuses on running and understanding the system locally. Later phases will package, test, deploy, and operate the same application.

## Existing functionality

The starter application includes:

- a PostgreSQL `ticket` table;
- a FastAPI health endpoint;
- API endpoints to list and create tickets;
- a React page that lists tickets;
- typed frontend API functions;
- loading, empty, and error states.

## Required work

### Backend

1. Implement `GET /api/tickets/{ticket_id}`.
1. Return `404 Not Found` when a ticket does not exist.

### Frontend

1. Fix CORS error.
1. Build a controlled form for creating tickets.
1. Display validation and network errors.
1. Refresh the ticket list after successful creation.
1. Add a status filter.
1. Preserve strict TypeScript typing and semantic HTML.

### Vertical feature

Add priority filtering across the frontend and backend.

## Constraints

- Run PostgreSQL, FastAPI, and Vite as separate local processes.
- Do not use Docker or Docker Compose.
- Do not commit `.env` files.
- Do not use `any` in TypeScript.
- Do not place direct `fetch` calls inside presentational components.
- Do not hard-code the API URL outside the environment configuration.
- Do not bypass validation with type assertions.

## Definition of done

- A new developer can follow your README and run the system.
- The API documentation accurately describes the endpoints.
- The UI handles loading, empty, success, and failure states.
- The priority filter works without reloading the browser.
- All linting and tests pass.
- Your Git history contains small, descriptive commits.
