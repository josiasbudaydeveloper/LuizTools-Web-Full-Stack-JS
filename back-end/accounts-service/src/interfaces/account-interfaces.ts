import { AccountStatus } from "./account-status"

export interface IAccount {
  id?: number,
  name: string,
  email: string,
  password: string,
  status?: AccountStatus,
  domain?: string
}