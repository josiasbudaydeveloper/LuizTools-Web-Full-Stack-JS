import contactModel from "./contact-model";
import { IContact } from "src/interfaces/contact-interfaces";

function findAll(accountId: number) {
  return contactModel.findAll({ where : { accountId }})
}

function findById(id: number, accountId: number) {
  return contactModel.findOne({ where: { id, accountId } });
}

function add(contact: IContact, accountId: number) {
  contact.accountId = accountId;
  return contactModel.create(contact);
}

function deleteByEmail(email: string, accountId: number) {
  return contactModel.destroy({ where: { email, accountId } })
}

function deleteById(id: number, accountId: number) {
  return contactModel.destroy({ where: { id, accountId } });
}

async function update(id: number, contact: IContact, accountId: number) {
  const originalContact = await contactModel.findOne({ where: { id, accountId } });
  if (originalContact == null) return null;

  if (contact.name) originalContact.name = contact.name;
  if (contact.phone) originalContact.phone = contact.phone;
  if (contact.status) originalContact.status = contact.status;

  await originalContact.save();

  return originalContact;
}

export default {
  findAll,
  findById,
  add,
  update,
  deleteByEmail,
  deleteById
}