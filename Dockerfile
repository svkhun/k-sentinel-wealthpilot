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

# Hugging Face Spaces expects port 7860
EXPOSE 7860

# Start FastAPI server on port 7860
CMD ["uvicorn", "src.app_v2:app", "--host", "0.0.0.0", "--port", "7860"]
