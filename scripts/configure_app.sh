#!/bin/bash
set -e

echo "=== Configuration Phase ==="
cd /opt/my-app

# Create necessary directories
mkdir -p logs
mkdir -p data

# Copy environment configuration
if [ -f "config/${ENVIRONMENT}.env" ]; then
    echo "Loading ${ENVIRONMENT} environment configuration..."
    cp "config/${ENVIRONMENT}.env" .env
else
    echo "Using default .env configuration..."
    cat > .env << EOF
NODE_ENV=${ENVIRONMENT:-production}
PORT=3000
HOST=0.0.0.0
LOG_LEVEL=info
APP_VERSION=1.0.0
EOF
fi

# Set permissions
chown -R nodeapp:nodeapp /opt/my-app
chmod 755 /opt/my-app

echo "=== Configuration completed ==="
exit 0