import { Request, Response, NextFunction } from "express";
import { IAccount } from "../interfaces/account-interfaces";
import accountsRepository from "../models/accounts-repository";
import auth from "../auth";

async function getAccounts(req: Request, res: Response, next: NextFunction) {
  const accounts = await accountsRepository.findAll();

  return res.json(accounts.map((item) => {
    item.password = "";
    return item;
  }));
}

async function getAccount(req: Request, res: Response, next: NextFunction) {
  try {
		const id = parseInt(req.params.id);
		const account = await accountsRepository.findByPk(id);
		if (account == null) return res.sendStatus(404) // return the NOT FOUND status

    account.password = "";
		return res.json(account);
	} 
	catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

async function addAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const newAccount = req.body as IAccount;
    const result = await accountsRepository.add(newAccount);
    newAccount.id = result.id;
    newAccount.password = "";

  	return res.status(201).json(newAccount);
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

async function updateAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const accountParams = req.body as IAccount;
    const account = await accountsRepository.update(id, accountParams);
    if (account) {
      return res.json(account);
    }

    return res.sendStatus(404);
  }
  catch(error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

async function loginAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const loginParams = req.body as IAccount;
    const account = await accountsRepository.findByEmail(loginParams.email);
    if (account == null) return res.sendStatus(404);

    const isValid =  auth.comparePassword(loginParams.password, account.password);
    if (isValid) {
      const token = await auth.signToken(account.id);

      return res.json({
        auth: true,
        token
      });
    }
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
  });
}

export default {
  getAccounts,
  getAccount,
  addAccount,
  updateAccount,
  loginAccount,
  logoutAccount
}