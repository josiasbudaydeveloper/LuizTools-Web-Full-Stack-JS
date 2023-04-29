import { ContactStatus } from "./contact-status"

export interface IContact {
  id?: number,
  accountId?: number,
  name: string,
  email: string,
  phone?: string,
  status?: ContactStatus
}