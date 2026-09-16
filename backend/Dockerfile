FROM python:3.14-slim

WORKDIR /app

# Copy dependency files over
COPY pyproject.toml uv.lock ./

# Install dependecies
RUN pip install --no-cache-dir uv && uv sync --frozen --no-dev

# Copy source over
COPY app ./app

EXPOSE 8000

CMD ["uv", "run", "--frozen", "--no-dev", "uvicorn", "app.main:app", "--port", "8000", "--host", "0.0.0.0"]
