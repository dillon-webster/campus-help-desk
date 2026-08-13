# Backend Setup

## Prerequisites

- Python 3.14
- `uv`
- PostgreSQL running locally
- the `helpdesk` database and `helpdesk_app` role

## Install

```bash
cd backend
cp .env.example .env
uv sync
```

## Run

```bash
uv run uvicorn app.main:app --reload
```

Open:

- API: `http://localhost:8000`
- interactive documentation: `http://localhost:8000/docs`

## Quality checks

```bash
uv run ruff check .
uv run pyright
uv run pytest
```

## Seed sample data

```bash
uv run python -m app.seed
```
