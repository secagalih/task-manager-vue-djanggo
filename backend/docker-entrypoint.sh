#!/bin/bash
set -e

# Create venv if it doesn't exist
if [ ! -d "/app/venv" ]; then
    echo "Creating virtual environment..."
    python -m venv /app/venv
fi

# Activate venv
source /app/venv/bin/activate

# Install/upgrade dependencies
echo "Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Run migrations
echo "Running migrations..."
python manage.py migrate --noinput

# Start server
echo "Starting Django server..."
exec "$@"
