const request = require('supertest');
const app = require('../src/app');

describe('Health Check Endpoints', () => {
  test('GET /health should return 200', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
    expect(response.body.timestamp).toBeDefined();
  });

  test('GET /ready should return 200', async () => {
    const response = await request(app).get('/ready');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ready');
  });
});

describe('User API Endpoints', () => {
  test('GET /api/users should return list of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /api/users/1 should return specific user', async () => {
    const response = await request(app).get('/api/users/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBeDefined();
  });

  test('GET /api/users/999 should return 404', async () => {
    const response = await request(app).get('/api/users/999');
    expect(response.status).toBe(404);
  });

  test('POST /api/users should create new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'David Lee', email: 'david@example.com' });
    
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('David Lee');
    expect(response.body.email).toBe('david@example.com');
  });

  test('POST /api/users with missing fields should return 400', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Test User' });
    
    expect(response.status).toBe(400);
  });
});