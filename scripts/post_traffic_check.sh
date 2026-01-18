#!/bin/bash
set -e

echo "=== Post-Traffic Validation ==="

# This script runs AFTER traffic has been restored
# Useful for smoke tests and monitoring with live traffic

SMOKE_TEST_URL="http://localhost:3000/api/users"

echo "Running smoke test..."
RESPONSE=$(curl -s -w "\n%{http_code}" $SMOKE_TEST_URL)
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)

if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ Smoke test PASSED"
    echo "✓ Application responding correctly under traffic"
    exit 0
else
    echo "✗ Smoke test FAILED with HTTP $HTTP_CODE"
    exit 1
fi