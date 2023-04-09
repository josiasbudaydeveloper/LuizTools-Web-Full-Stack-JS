import server, { Response } from 'supertest';
import app from '../src/app';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';

beforeAll(async () => {
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
});

describe('Auth: /accounts/login', () => {
  test("POST /accounts/login - 200 OK ", async () => {
    const payload = {
      email: "test@test.com",
      password: "12345678"
    }

    const response: Response = await server(app)
      .post('/accounts/login')
      .send(payload);

    expect(response.status).toEqual(200);
    expect(response.body.auth).toBeTruthy();
    expect(response.body.token).toBeTruthy();
  });

  test("POST /accounts/login - 404 NOT FOUND", async () => {
    const payload = {
      email: "nonexistentuser@test.com",
      password: "12345678"
    }

    const response: Response = await server(app)
      .post('/accounts/login')
      .send(payload);

    expect(response.status).toEqual(404);
  });

  test("POST /accounts/login - 401 UNAUTHORIZED", async () => {
    const payload = {
      email: "test@test.com",
      password: "WrongPassowrd"
    }

    const response: Response = await server(app)
      .post('/accounts/login')
      .send(payload);

    expect(response.status).toEqual(401);
  });

  test("POST /accounts/login - 422 UNPROCESSABLE ENTITY", async () => {
    const payload = {
      email: "test@test.com",
      password: "1234567"
    }

    const response: Response = await server(app)
      .post('/accounts/login')
      .send(payload);

    expect(response.status).toEqual(422);
  });
});

describe('Auth: /accounts/logout', () => {
  test('POST /accounts/logout', async () => {
    const response: Response = await server(app)
      .post('/accounts/logout');

    expect(response.status).toEqual(200);
  })
});