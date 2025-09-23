# Use official Python image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system deps
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
 && rm -rf /var/lib/apt/lists/*

# Copy Python dependencies first (better cache)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the project
COPY . .

# Add non-root user
RUN adduser --disabled-password --gecos '' django
USER django

# Expose port
EXPOSE 8000

# Start server
CMD sh -c "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn blog_platform_backend.wsgi:application --bind 0.0.0.0:8000"
