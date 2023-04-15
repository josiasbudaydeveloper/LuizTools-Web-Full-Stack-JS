import { IAccount } from "../interfaces/account-interfaces";
import accountModel from "./account-model";
import auth from "../auth";

async function findAll() {
  return accountModel.findAll();
}

async function findByPk(id: number) {
  return accountModel.findByPk(id);
}

async function addAccount(account: IAccount) {
  account.password = auth.hashPassword(account.password);
  return accountModel.create(account);
}

async function updateAccount(id: number, account: IAccount) {
  const originalAccount = await accountModel.findByPk(id);

  if (originalAccount != null) {
    if (account.name) originalAccount.name = account.name;
    if (account.password) originalAccount.password = auth.hashPassword(account.password);
    if (account.domain) originalAccount.domain = account.domain;

    await originalAccount.save();

    originalAccount.password = "";

    return originalAccount;
  }

  return null;
}

function findByEmail(email: string) {
  return accountModel.findOne({ where: { email } });
}

function deleteByEmail(email: string) {
  return accountModel.destroy({ where: { email } });
}

export default {
  findAll,
  findByPk,
  addAccount,
  updateAccount,
  findByEmail,
  deleteByEmail
}