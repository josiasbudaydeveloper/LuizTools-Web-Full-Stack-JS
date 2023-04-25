import { Request, Response, NextFunction } from "express";
import contactsRepository from '../models/contacts-repository';
import commonsController from 'ms-commons/api/controllers/commons-controllers';
import { Token } from 'ms-commons/api/auth';

async function getContacts(req: Request, res: Response, next: NextFunction) {
  const token = commonsController.getToken(res) as Token;
  const contacts = await contactsRepository.findAll(token.accountId);
  
  res.json(contacts);
}

export default {
  getContacts
}