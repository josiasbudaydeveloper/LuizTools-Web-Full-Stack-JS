import server, { Response } from 'supertest';
import { describe, expect, test, beforeAll, afterAll, jest } from '@jest/globals';
import app from '../src/app';
import contactsRepository from '../src/models/contacts-repository';
import accountsApp from '../../accounts-service/src/app';
import accountsRepository from '../../accounts-service/src/models/accounts-repository';
import database from "../../__commons__/src/data/db";
import { IContact } from '../src/interfaces/contact-interfaces';

let tokenTestAccount : string;
let idTestAccount : number;
let idTestContact : number;

beforeAll(async () => {

  const accountPayload = {
    name: "Test Account",
    email: "testAccount@test.com",
    password: "12345678"
  };
  
  const addResponse: Response = await server(accountsApp)
    .post('/accounts')
    .send(accountPayload);

  idTestAccount = addResponse.body.id;

  const loginResponse: Response = await server(accountsApp)
    .post('/accounts/login')
    .send({
      email: "testAccount@test.com",
      password: "12345678"
    });

  tokenTestAccount = loginResponse.body.token;

  const contactPayload : IContact = {
    name: 'Test Contact',
    email: 'testcontact@test.com',
    phone: '00000000000'
  }

  const testContact = await contactsRepository.add(contactPayload , idTestAccount) as IContact;
  idTestContact = testContact.id!;
});

afterAll(async () => {
  await accountsRepository.deleteByEmail("testAccount@test.com");
  await contactsRepository.deleteByEmail('testcontact@test.com', idTestAccount);
  await contactsRepository.deleteByEmail('testcontact2@test.com', idTestAccount);
  await database.close();
});

describe('GET /contacts', () => {

  test('GET /contacts - 200 OK', async () => {
    const response: Response = await server(app)
      .get('/contacts')
      .set('authorization', tokenTestAccount);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('GET /contacts - 401 OK', async () => {
    const response: Response = await server(app)
      .get('/contacts');

    expect(response.status).toEqual(401);
  });

  test('GET /contacts/:id - 200 OK', async () => {
    const response: Response = await server(app)
      .get(`/contacts/${idTestContact}`)
      .set('authorization', tokenTestAccount);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(idTestContact);
  });

  test('GET /contacts/:id - 401 UNAUTHORIZED', async () => {
    const response: Response = await server(app)
      .get(`/contacts/${idTestContact}`);

    expect(response.status).toEqual(401);
  });


  test('GET /contacts/:id - 400 BAD REQUEST', async () => {
    const response: Response = await server(app)
      .get(`/contacts/abc`)
      .set('authorization', tokenTestAccount);

    expect(response.status).toEqual(400);
  });

  test('GET /contacts/:id - 404 NOT FOUND', async () => {
    const response: Response = await server(app)
      .get(`/contacts/-1`)
      .set('authorization', tokenTestAccount);

    expect(response.status).toEqual(404);
  });
});

describe('POST /contacts', () => {
  test('POST /contacts - 201 CREATE', async () => {
    const contactPayload : IContact = {
      name: 'Test Contact 2',
      email: 'testcontact2@test.com',
      phone: '00000000000'
    }
  
    const response : Response = await server(app)
      .post('/contacts')
      .set('authorization', tokenTestAccount)
      .send(contactPayload);

    expect(response.status).toEqual(201);
    expect(response.body.id).toBeTruthy();
  });

  test('POST /contacts - 401 UNAUTHORIZED', async () => {
    const contactPayload : IContact = {
      name: 'Test Contact 2',
      email: 'testcontact2@test.com',
      phone: '00000000000'
    }
  
    const response : Response = await server(app)
      .post('/contacts')
      .send(contactPayload);

    expect(response.status).toEqual(401);
  });

  test('POST /contacts - 422 UNPROCESSABLE ENTITY', async () => {
    const contactPayload = {
      name: 'Test Contact 2',
      email: 'testcontact2@test.com',
      phone: 'wrong data format'
    }
  
    const response : Response = await server(app)
      .post('/contacts')
      .set('authorization', tokenTestAccount)
      .send(contactPayload);

    expect(response.status).toEqual(422);
  });
});

describe('PATCH /contacts', () => {
  test('PATCH /accounts/:id - 200 OK', async () => {
    const contactPayload = {
      name: 'New Name'
    }
  
    const response : Response = await server(app)
      .patch(`/contacts/${idTestContact}`)
      .set('authorization', tokenTestAccount)
      .send(contactPayload);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual(contactPayload.name);
  });

  test('PATCH /accounts/:id - 401 - UNAUTHORIZED', async () => {
    const contactPayload = {
      name: 'New Name'
    }
  
    const response : Response = await server(app)
      .patch(`/contacts/${idTestContact}`)
      .send(contactPayload);

    expect(response.status).toEqual(401);
  });

  test('PATCH /accounts/:id - 422 - UNPROCESSABLE ENTITY', async () => {
    const contactPayload = {
      city: 'Pariquera-Açu'
    }
  
    const response : Response = await server(app)
      .patch(`/contacts/${idTestContact}`)
      .set('authorization', tokenTestAccount)
      .send(contactPayload);

    expect(response.status).toEqual(422);
  });

  test('PATCH /accounts/:id - 404 - NOT FOUND', async () => {
    const contactPayload = {
      name: 'New Name'
    }
  
    const response : Response = await server(app)
      .patch(`/contacts/-1`)
      .set('authorization', tokenTestAccount)
      .send(contactPayload);

    expect(response.status).toEqual(404);
  });

  test('PATCH /accounts/:id - 400 - BAD REQUEST', async () => {
    const contactPayload = {
      name: 'New Name'
    }
  
    const response : Response = await server(app)
      .patch(`/contacts/abc`)
      .set('authorization', tokenTestAccount)
      .send(contactPayload);

    expect(response.status).toEqual(400);
  });
});