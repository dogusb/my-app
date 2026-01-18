#!/bin/bash
set -e

echo "=== Starting Application Service ==="
cd /opt/my-app

# Stop existing PM2 process if running
pm2 stop my-app &>/dev/null || true
pm2 delete my-app &>/dev/null || true

# Start application with PM2
echo "Starting Node.js application..."
pm2 start src/server.js --name "my-app" --user nodeapp

# Wait for application to be ready
sleep 3

# Verify process is running
if pm2 status | grep -q "my-app"; then
    echo "Application started successfully"
    exit 0
else
    echo "Failed to start application"
    exit 1
fi