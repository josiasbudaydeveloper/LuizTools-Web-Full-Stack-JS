import baseAPI from "./base-api";
import baseURLs from "../configs/base-urls";

export default class AccountService {
  constructor() {
    this.api = baseAPI(baseURLs.API_ACCOUNTS);
  }

  async checkTokenValidation() {
    await this.api.get('/accounts/checktokenvalidation');
  }

  async singup(userModel) {
    const result = await this.api.post('/accounts', userModel);

    return result;
  }

  async login(email, password) {
    const result = await this.api.post('/accounts/login', { email, password });

    return result;
  }
}