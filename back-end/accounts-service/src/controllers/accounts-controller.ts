import { Request, Response, NextFunction } from "express";
import { IAccount } from "../interfaces/account-interfaces";
import { parse } from "path";

const accounts: IAccount[] = [];

function getAccounts(req: Request, res: Response, next: NextFunction) {
  return res.json(accounts);
}

function getAccount(req: Request, res: Response, next: NextFunction) {
  try {
		const id = parseInt(req.params.id);

		const index = accounts.findIndex((account) => account.id == id);
		if (index == -1) return res.sendStatus(404) // return the NOT FOUND status

		return res.json(accounts[index]);
	} 
	catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

function addtAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const newAccount = req.body as IAccount;
    accounts.push(newAccount);

  	return res.status(201).json(newAccount);
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

function updateAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const accountId = parseInt(req.params.id);
    const accountParams = req.body as IAccount;
    const index = accounts.findIndex(item => item.id == accountId);
    if (index == -1) return res.sendStatus(404);

    const originalAccount = accounts[index];

    if (accountParams.name) originalAccount.name = accountParams.name;
    if (accountParams.password) originalAccount.password = accountParams.password;
    if (accountParams.domain) originalAccount.domain = accountParams.domain;

    accounts[index] = originalAccount;
    return res.json(accounts[index]);
  }
  catch(error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

function loginAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const loginParams = req.body as IAccount;
    const index = accounts.findIndex(item => item.email == loginParams.email);
    if (index == -1) return res.sendStatus(404);

    if (loginParams.password == accounts[index].password) return res.json({
      auth: true,
      token: {}
    })
    else {
      return res.sendStatus(401);
    }
  }
  catch(error) {
    console.log(error);
    return res.sendStatus(400);
  }

}

function logoutAccount(req: Request, res: Response, next: NextFunction) {
  return res.json({
    auth: false,
    token: null
  })
}

export default {
  getAccounts,
  getAccount,
	addtAccount,
  updateAccount,
  loginAccount,
  logoutAccount
}