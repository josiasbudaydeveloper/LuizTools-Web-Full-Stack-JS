import server, { Response } from 'supertest';
import app from '../src/app';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';

describe('Routes: POST /accounts', () => {
  test('POST /accounts - 201 CREATED', async () => {
    const payload = {
        "id": 1,
        "name": "Test",
        "email": "test@test.com",
        "password": "12345678",
        "status": 100,
        "domain": "test.com"
      }
    
    const response: Response = await server(app)
      .post('/accounts')
      .send(payload)

    expect(response.status).toEqual(201);
    expect(response.body.id).toEqual(1);
  });

  test('POST /accounts - 422 UNPROCESSABLE ENTITY', async () => {
    const payload = {
        "city": "New York"
      }
    
    const response: Response = await server(app)
      .post('/accounts')
      .send(payload)

    expect(response.status).toEqual(422);
  });
});

describe('Routes: PATCH /accounts', () => {
  test('PATCH /accounts/:id - 200 OK', async () => {
    const payload = {
        "password": "87654321"
      }
    
    const response: Response = await server(app)
      .patch('/accounts/1')
      .send(payload)

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
  });

  test('PATCH /accounts/:id - 400 BAD REQUEST', async () => {
    const response: Response = await server(app)
      .patch('/accounts/abc')
      .send()

    expect(response.status).toEqual(400);
  });

  test('PATCH /accounts/:id - 404 NOT FOUND', async () => {    
    const response: Response = await server(app)
      .patch('/accounts/-1')
      .send()

    expect(response.status).toEqual(404);
  });
});

describe('Routes GET /accounts', () => {
  test('GET /accounts - 200 OK', async () => {
    const response: Response = await server(app)
      .get('/accounts');

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('GET /account/:id - 200 OK', async () => {
    const response: Response = await server(app)
      .get('/accounts/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
  });

  test('GET /account/:id - 404 NOT FOUND', async () => {
    const response: Response = await server(app)
      .get('/accounts/2');

    expect(response.status).toEqual(404);
  });

  test('GET /account/:id - 400 BAD REQUEST', async () => {
    const response: Response = await server(app)
      .get('/accounts/abc');

    expect(response.status).toEqual(400);
  });
});