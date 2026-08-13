# PostgreSQL Setup

These commands assume PostgreSQL is installed and the server is running.

## Create a development role

Open `psql` as a PostgreSQL administrator and run:

```sql
CREATE ROLE helpdesk_app
WITH LOGIN
PASSWORD 'development-only-password';

CREATE DATABASE helpdesk
OWNER helpdesk_app;
```

The password is intentionally only for local classroom development. Do not reuse it.

## Verify access

```bash
psql "postgresql://helpdesk_app:development-only-password@localhost:5432/helpdesk"
```

Then run:

```sql
SELECT current_database(), current_user;
```

Expected database: `helpdesk`  
Expected user: `helpdesk_app`

Exit with:

```text
\q
```

## Useful inspection commands

```text
\l                 list databases
\du                list roles
\dt                list tables
\d ticket          describe the ticket table
SELECT * FROM ticket;
```

## Reset the classroom database

```sql
DROP DATABASE helpdesk;
CREATE DATABASE helpdesk OWNER helpdesk_app;
```

Disconnect all applications before dropping the database.

## Common failures

### Connection refused

PostgreSQL is not running, is not listening on port 5432, or a firewall is blocking it.

### Password authentication failed

The username/password in `backend/.env` does not match the PostgreSQL role.

### Database does not exist

Create `helpdesk`, or correct the database name in `DATABASE_URL`.

### Role does not exist

Create the `helpdesk_app` login role, or correct the username in `DATABASE_URL`.
