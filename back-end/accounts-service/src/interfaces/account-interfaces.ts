enum AccountStatus {
  CREATED = 100,
  ACTIVE = 200,
  SUSPENDED = 300,
  REMOVED = 400
}

export interface IAccount {
  id: number,
  name: string,
  email: string,
  password: string,
  status: AccountStatus,
  domain: string
}