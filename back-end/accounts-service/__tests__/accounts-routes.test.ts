import server, { Response } from 'supertest';
import app from '../src/app';
import { describe, expect, test, beforeAll, afterAll, jest } from '@jest/globals';
import accountsRepository from '../src/models/accounts-repository';
import database from "../../__commons__/src/data/db";

let idTestAccount1 : number;
let tokenTestAccount1 : string;

beforeAll(async () => {
  jest.setTimeout(15000);

  const payload = {
    "name": "Test Account 1",
    "email": "testAccount1@test.com",
    "password": "12345678"
  };
  
  const addResponse: Response = await server(app)
    .post('/accounts')
    .send(payload);

    idTestAccount1 = addResponse.body.id;

  const loginResponse: Response = await server(app)
    .post('/accounts/login')
    .send({
      email: "testAccount1@test.com",
      password: "12345678"
    });

    tokenTestAccount1 = loginResponse.body.token;
})

afterAll(async () => {
  await accountsRepository.deleteByEmail("testAccount1@test.com");
  await accountsRepository.deleteByEmail("testAccount2@test.com");
  await database.close();
})

describe('POST /accounts', () => {
  test('POST /accounts - 201 CREATED', async () => {
    const payload = {
      "name": "Test Account 2",
      "email": "testAccount2@test.com",
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

describe('PATCH /accounts', () => {
  test('PATCH /accounts/:id - 200 OK', async () => {
    const payload = {
        "password": "87654321"
      }
    
    const response: Response = await server(app)
      .patch(`/accounts/${idTestAccount1}`)
      .set("authorization", tokenTestAccount1)
      .send(payload);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(idTestAccount1);
  });

  test('PATCH /accounts/:id - 400 BAD REQUEST', async () => {
    const response: Response = await server(app)
      .patch('/accounts/abc')
      .set("authorization", tokenTestAccount1)
      .send()

    expect(response.status).toEqual(400);
  });

  test('PATCH /accounts/:id - 404 NOT FOUND', async () => {    
    const response: Response = await server(app)
      .patch('/accounts/-1')
      .set("authorization", tokenTestAccount1)
      .send()

    expect(response.status).toEqual(403);
  });
});

describe('GET /accounts', () => {
  test('GET /accounts - 200 OK', async () => {
    const response: Response = await server(app)
      .get('/accounts')
      .set("authorization", tokenTestAccount1);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('GET /account/:id - 200 OK', async () => {
    const response: Response = await server(app)
      .get(`/accounts/${idTestAccount1}`)
      .set("authorization", tokenTestAccount1);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(idTestAccount1);
  });

  test('GET /account/:id - 404 NOT FOUND', async () => {
    const response: Response = await server(app)
      .get('/accounts/2')
      .set("authorization", tokenTestAccount1);

    expect(response.status).toEqual(403);
  });

  test('GET /account/:id - 400 BAD REQUEST', async () => {
    const response: Response = await server(app)
      .get('/accounts/abc')
      .set("authorization", tokenTestAccount1);

    expect(response.status).toEqual(400);
  });
});