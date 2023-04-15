import server, { Response } from 'supertest';
import app from '../src/app';
import { describe, expect, test, afterAll, jest } from '@jest/globals';
import accountsRepository from '../src/models/accounts-repository';
import database from "../src/db"; 

jest.mock('../node_modules/jsonwebtoken', () => {
  return {
      verify: () => true
  }
})

afterAll(async () => {
  await accountsRepository.deleteByEmail("test@test.com");
  await database.close();
})

describe('Routes: POST /accounts', () => {
  test('POST /accounts - 201 CREATED', async () => {
    const payload = {
      "name": "Test",
      "email": "test@test.com",
      "password": "12345678"
    };
    
    const response: Response = await server(app)
      .post('/accounts')
      .send(payload)

    expect(response.status).toEqual(201);
    expect(response.body.id).toBeTruthy();
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
      .set("authorization", ".")
      .send(payload);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
  });

  test('PATCH /accounts/:id - 400 BAD REQUEST', async () => {
    const response: Response = await server(app)
      .patch('/accounts/abc')
      .set("authorization", ".")
      .send()

    expect(response.status).toEqual(400);
  });

  test('PATCH /accounts/:id - 404 NOT FOUND', async () => {    
    const response: Response = await server(app)
      .patch('/accounts/-1')
      .set("authorization", ".")
      .send()

    expect(response.status).toEqual(404);
  });
});

describe('Routes GET /accounts', () => {
  test('GET /accounts - 200 OK', async () => {
    const response: Response = await server(app)
      .get('/accounts')
      .set("authorization", ".");

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('GET /account/:id - 200 OK', async () => {
    const response: Response = await server(app)
      .get('/accounts/1')
      .set("authorization", ".");

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
  });

  test('GET /account/:id - 404 NOT FOUND', async () => {
    const response: Response = await server(app)
      .get('/accounts/2')
      .set("authorization", ".");

    expect(response.status).toEqual(404);
  });

  test('GET /account/:id - 400 BAD REQUEST', async () => {
    const response: Response = await server(app)
      .get('/accounts/abc')
      .set("authorization", ".");

    expect(response.status).toEqual(400);
  });
});