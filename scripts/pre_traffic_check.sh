#!/bin/bash
set -e

echo "=== Pre-Traffic Validation ==="

# This script runs BEFORE traffic is blocked
# Useful for checking current system state and preparing for deployment

echo "Current PM2 status:"
pm2 status || true

echo "Current disk space:"
df -h /opt

echo "Current memory usage:"
free -h

echo "=== Pre-traffic validation complete ==="
exit 0