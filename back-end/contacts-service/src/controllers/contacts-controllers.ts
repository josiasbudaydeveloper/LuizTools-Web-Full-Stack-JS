import { Request, Response, NextFunction } from "express";
import contactsRepository from '../models/contacts-repository';
import commonsController from 'ms-commons/api/controllers/commons-controllers';
import { Token } from 'ms-commons/api/auth';
import { IContact } from "src/interfaces/contact-interfaces";

async function getContacts(req: Request, res: Response, next: NextFunction) {
  try {
    const token = commonsController.getToken(res) as Token;
    const contacts = await contactsRepository.findAll(token.accountId);
    
    return res.json(contacts);
  }
  catch(error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

async function getContact(req: Request, res: Response, next: NextFunction) {
  try {
    const token = commonsController.getToken(res) as Token;
    const id = parseInt(req.params.id);
    const contact = await contactsRepository.findById(id, token.accountId);
    if (!contact) return res.sendStatus(404);
    
    return res.json(contact);
  }
  catch(error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

async function addContact(req: Request, res: Response, next: NextFunction) {
  try {
    const token = commonsController.getToken(res) as Token;
    const contactParams = req.body as IContact;
    const contact = await contactsRepository.add(contactParams, token.accountId);

    return res.status(201).json(contact);
  }
  catch(error) {
    console.log(error);
    return res.sendStatus(400); 
  }
}

async function updateContact(req: Request, res: Response, next: NextFunction) {
  try {
    const contactId = parseInt(req.params.id);
    const token = commonsController.getToken(res) as Token;
    const contactParams = req.body as IContact;
    const contact = await contactsRepository.update(contactId, contactParams, token.accountId);
    if (!contact) return res.sendStatus(404);

    return res.json(contact);
  }
  catch(error) {
    console.log(error);
    return res.sendStatus(400); 
  }
}

async function deleteContact(req: Request, res: Response, next: NextFunction) {
  try {
    const contactId = parseInt(req.params.id);
    const token = commonsController.getToken(res) as Token;
    const contact = await contactsRepository.deleteById(contactId, token.accountId);
    if (!contact) return res.sendStatus(404);

    return res.sendStatus(204);
  }
  catch(error) {
    console.log(error);
    return res.sendStatus(400); 
  }
}

export default {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact
}