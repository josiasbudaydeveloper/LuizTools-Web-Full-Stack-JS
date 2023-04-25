import contactModel from "./contact-model";
import { IContact } from "src/interfaces/contact-interfaces";

function findAll(accountId: number) {
  return contactModel.findAll({ where : { accountId }})
}

export default {
  findAll
}