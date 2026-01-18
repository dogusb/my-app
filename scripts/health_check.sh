#!/bin/bash
set -e

echo "=== Validating Application Health ==="

MAX_RETRIES=10
RETRY_INTERVAL=2
HEALTH_URL="http://localhost:3000/health"

for i in $(seq 1 $MAX_RETRIES); do
    echo "Health check attempt $i/$MAX_RETRIES..."
    
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL || echo "000")
    
    if [ "$RESPONSE" = "200" ]; then
        echo "✓ Health check PASSED"
        
        # Verify response contains expected fields
        HEALTH_DATA=$(curl -s $HEALTH_URL)
        if echo "$HEALTH_DATA" | grep -q "healthy"; then
            echo "✓ Application is healthy"
            exit 0
        fi
    fi
    
    echo "✗ Health check returned $RESPONSE, retrying in ${RETRY_INTERVAL}s..."
    sleep $RETRY_INTERVAL
done

echo "✗ Health check FAILED after $MAX_RETRIES attempts"
exit 1