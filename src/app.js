const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

// Health check endpoint - lightweight, fast response
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ready check endpoint - validates dependencies
app.get('/ready', (req, res) => {
  try {
    // In production, add checks for database connectivity, external services, etc.
    res.status(200).json({
      status: 'ready',
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || '1.0.0'
    });
  } catch (error) {
    res.status(503).json({
      status: 'not ready',
      error: error.message
    });
  }
});

// API endpoints
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' }
  ];
  res.status(200).json(users);
});

app.get('/api/users/:id', (req, res) => {
  const users = {
    1: { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    2: { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    3: { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' }
  };

  const user = users[req.params.id];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.status(200).json(user);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ 
      error: 'Missing required fields: name, email' 
    });
  }

  const newUser = {
    id: Math.floor(Math.random() * 10000),
    name,
    email,
    createdAt: new Date().toISOString()
  };

  res.status(201).json(newUser);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

module.exports = app;