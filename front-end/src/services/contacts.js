import baseAPI from './base-api';
import baseURL from '../configs/base-urls';

export default class contactsService {
  constructor() {
    this.api = baseAPI(baseURL.API_CONTACTS);
  }

  async getAll() {
    const result = await this.api.get('/contacts');

    return result.data;
  }

  async getOne(contactId) {
    const result = await this.api.get(`/contacts/${contactId}`);

    return result.data;
  }

  async add(contactModel) {
    const result = await this.api.post('/contacts', contactModel);

    return result;
  }

  async update(contactId, contactModel) {
    const result = await this.api.patch(`/contacts/${contactId}`, contactModel);

    return result;
  }

  async delete(contactId) {
    const result = await this.api.delete(`/contacts/${contactId}`);

    return result;
  }
}