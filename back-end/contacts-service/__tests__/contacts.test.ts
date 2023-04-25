import server, { Response } from 'supertest';
import app from '../src/app';
import { describe, expect, test, beforeAll, afterAll, jest } from '@jest/globals';
import accountsApp from '../../accounts-service/src/app';
import accountsRepository from '../../accounts-service/src/models/accounts-repository';
import database from "../../__commons__/src/data/db";

let tokenTestAccount1 : string;

beforeAll(async () => {
  jest.setTimeout(15000);

  const payload = {
    "name": "Test Account 1",
    "email": "testAccount1@test.com",
    "password": "12345678"
  };
  
  const addResponse: Response = await server(accountsApp)
    .post('/accounts')
    .send(payload);

  const loginResponse: Response = await server(accountsApp)
    .post('/accounts/login')
    .send({
      email: "testAccount1@test.com",
      password: "12345678"
    });

    tokenTestAccount1 = loginResponse.body.token;
});

afterAll(async () => {
  await accountsRepository.deleteByEmail("test@test.com");
  await database.close();
});

describe('Routes: GET /contacts', () => {
  test('GET /contacts - 200 OK', async () => {
    const response: Response = await server(app)
      .get('/contacts')
      .set('authorization', tokenTestAccount1);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});