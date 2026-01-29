#!/bin/bash

set -e

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Running migrations..."
cd HRM_SOFT
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Build complete!"
