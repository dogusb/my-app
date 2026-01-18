#!/bin/bash
set -e

echo "=== Installing Dependencies Phase ==="
cd /opt/my-app

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install PM2 globally for process management
if ! npm list -g pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
fi

# Install application dependencies
echo "Installing application dependencies..."
npm ci --production

echo "=== Dependencies installed successfully ==="
exit 0