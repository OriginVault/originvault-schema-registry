# Environment Configuration

This document describes the environment variables used by the OriginVault Schema Registry API server.

## Server Configuration

```bash
# Server port (default: 3001)
PORT=3001

# Environment mode
NODE_ENV=development  # or 'production'
```

## CORS Configuration

```bash
# Frontend URL for CORS (default: http://localhost:3000)
FRONTEND_URL=http://localhost:3000
```

## File Upload Limits

```bash
# Maximum file size in bytes (default: 5MB)
MAX_FILE_SIZE=5242880

# Maximum request body size in bytes (default: 10MB)
MAX_REQUEST_SIZE=10485760
```

## QuickType Configuration

```bash
# Timeout for code generation in milliseconds (default: 30 seconds)
QUICKTYPE_TIMEOUT=30000
```

## Logging

```bash
# Log level (default: info)
LOG_LEVEL=info  # error, warn, info, debug
```

## Example .env File

Create a `.env` file in the root directory with:

```bash
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
MAX_REQUEST_SIZE=10485760
QUICKTYPE_TIMEOUT=30000
LOG_LEVEL=info
```

## Docker Configuration

For containerized deployments:

```bash
# Docker port mapping
DOCKER_PORT=3001

# Container environment
CONTAINER_ENV=production
```

## Security Notes

- Keep `.env` files out of version control
- Use different configurations for development/staging/production
- Consider using container orchestration secrets for production
- Validate environment variables on startup 