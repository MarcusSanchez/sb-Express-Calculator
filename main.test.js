const request = require('supertest');
const { app, server } = require('./main');

afterAll(() => {
  server.close();
});

describe('GET /mean', () => {

  it('should calculate the mean of numbers', async () => {
    const response = await request(app)
      .get('/mean')
      .query({ nums: '1,2,3,4,5' });

    expect(response.status).toBe(200);
    expect(response.body.response.operation).toBe('mean');
    expect(response.body.response.value).toBe(3);
  });

  it('should handle missing nums parameter', async () => {
    const response = await request(app)
      .get('/mean');

    expect(response.status).toBe(400);
    expect(response.text).toBe('nums are required');
  });

  it('should handle invalid nums parameter', async () => {
    const response = await request(app)
      .get('/mean')
      .query({ nums: '1,a,3' });

    expect(response.status).toBe(400);
    expect(response.text).toBe('a is not a number');
  });
});

describe('GET /median', () => {

  it('should calculate the median of numbers', async () => {
    const response = await request(app)
      .get('/median')
      .query({ nums: '1,2,3,4,5' });

    expect(response.status).toBe(200);
    expect(response.body.response.operation).toBe('median');
    expect(response.body.response.value).toBe(3);
  });

  it('should handle missing nums parameter', async () => {
    const response = await request(app)
      .get('/median');

    expect(response.status).toBe(400);
    expect(response.text).toBe('nums are required');
  });

  it('should handle invalid nums parameter', async () => {
    const response = await request(app)
      .get('/median')
      .query({ nums: '1,a,3' });

    expect(response.status).toBe(400);
    expect(response.text).toBe('a is not a number');
  });
});

describe('GET /mode', () => {

  it('should calculate the mode of numbers', async () => {
    const response = await request(app)
      .get('/mode')
      .query({ nums: '1,2,2,3,4' });

    expect(response.status).toBe(200);
    expect(response.body.response.operation).toBe('mode');
    expect(response.body.response.value).toBe('2');
  });

  it('should handle missing nums parameter', async () => {
    const response = await request(app)
      .get('/mode');

    expect(response.status).toBe(400);
    expect(response.text).toBe('nums are required');
  });

  it('should handle invalid nums parameter', async () => {
    const response = await request(app)
      .get('/mode')
      .query({ nums: '1,a,3' });

    expect(response.status).toBe(400);
    expect(response.text).toBe('a is not a number');
  });
});