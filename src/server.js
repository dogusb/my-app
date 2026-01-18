require('dotenv').config();
const app = require('./app');
const http = require('http');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`
╔════════════════════════════════════════╗
║     My App Server Started Successfully  ║
╠════════════════════════════════════════╣
║ Environment: ${(process.env.NODE_ENV || 'development').padEnd(27)} ║
║ Port:        ${String(PORT).padEnd(27)} ║
║ Host:        ${HOST.padEnd(27)} ║
║ URL:         http://${HOST}:${PORT}${' '.repeat(28 - String(PORT).length - HOST.length - 8)} ║
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});