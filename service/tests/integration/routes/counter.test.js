/**
 * Counter API Service Test Suite
 * 
 * Test cases can be run with:
 *   npm test
 */
const request = require('supertest');
const app = require('../../../src/app');
const status = require('../../../src/utils/status');
const counterService = require('../../../src/services/counter');

describe('Counter API Routes', () => {
  // Reset counters before each test
  beforeEach(() => {
    counterService.resetCounters();
  });

  describe('GET /', () => {
    it('should return information about the service', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(status.HTTP_200_OK);
      expect(res.body.message).toBe('Hit Counter Service');
      expect(res.body.version).toBe('1.0.0');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(status.HTTP_200_OK);
      expect(res.body.status).toBe('OK');
    });
  });

  describe('POST /counters/:name', () => {
    it('should create a counter', async () => {
      const name = 'foo';
      const res = await request(app).post(`/counters/${name}`);
      expect(res.statusCode).toBe(status.HTTP_201_CREATED);
      expect(res.body.name).toBe(name);
      expect(res.body.counter).toBe(0);
      expect(res.headers.location).toBeDefined();
    });

    it('should not create a duplicate counter', async () => {
      const name = 'foo';
      // Create first counter
      await request(app).post(`/counters/${name}`);
      // Try to create duplicate
      const res = await request(app).post(`/counters/${name}`);
      expect(res.statusCode).toBe(status.HTTP_409_CONFLICT);
    });
  });

  describe('GET /counters', () => {
    it('should list counters', async () => {
      // Initially should be empty
      let res = await request(app).get('/counters');
      expect(res.statusCode).toBe(status.HTTP_200_OK);
      expect(res.body.length).toBe(0);
      
      // Create a counter and check that it appears in the list
      await request(app).post('/counters/foo');
      res = await request(app).get('/counters');
      expect(res.statusCode).toBe(status.HTTP_200_OK);
      expect(res.body.length).toBe(1);
    });
  });

  describe('GET /counters/:name', () => {
    it('should read a counter', async () => {
      const name = 'foo';
      // Create the counter
      await request(app).post(`/counters/${name}`);
      // Read it
      const res = await request(app).get(`/counters/${name}`);
      expect(res.statusCode).toBe(status.HTTP_200_OK);
      expect(res.body.name).toBe(name);
      expect(res.body.counter).toBe(0);
    });

    it('should return 404 for a non-existent counter', async () => {
      const res = await request(app).get('/counters/nonexistent');
      expect(res.statusCode).toBe(status.HTTP_404_NOT_FOUND);
    });
  });

  describe('PUT /counters/:name', () => {
    it('should update a counter', async () => {
      const name = 'foo';
      // Create the counter
      await request(app).post(`/counters/${name}`);
      // Read it to verify initial value
      let res = await request(app).get(`/counters/${name}`);
      expect(res.body.counter).toBe(0);
      
      // Update it
      res = await request(app).put(`/counters/${name}`);
      expect(res.statusCode).toBe(status.HTTP_200_OK);
      expect(res.body.name).toBe(name);
      expect(res.body.counter).toBe(1);
    });

    it('should return 404 for updating a non-existent counter', async () => {
      const res = await request(app).put('/counters/nonexistent');
      expect(res.statusCode).toBe(status.HTTP_404_NOT_FOUND);
    });
  });

  describe('DELETE /counters/:name', () => {
    it('should delete a counter', async () => {
      const name = 'foo';
      // Create the counter
      await request(app).post(`/counters/${name}`);
      
      // Delete it
      let res = await request(app).delete(`/counters/${name}`);
      expect(res.statusCode).toBe(status.HTTP_204_NO_CONTENT);
      
      // Verify it's gone
      res = await request(app).get(`/counters/${name}`);
      expect(res.statusCode).toBe(status.HTTP_404_NOT_FOUND);
    });

    it('should return 204 even if counter does not exist', async () => {
      // Delete non-existent counter
      const res = await request(app).delete('/counters/nonexistent');
      expect(res.statusCode).toBe(status.HTTP_204_NO_CONTENT);
    });
  });
});