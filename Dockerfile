FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project code, data, models, and frontend
COPY . .

# Expose default port
EXPOSE 8000

ENV PORT=8000

# Start FastAPI server, respecting dynamic $PORT from Render, Cloud, or Local
CMD ["sh", "-c", "uvicorn src.app_v2:app --host 0.0.0.0 --port ${PORT:-8000}"]
