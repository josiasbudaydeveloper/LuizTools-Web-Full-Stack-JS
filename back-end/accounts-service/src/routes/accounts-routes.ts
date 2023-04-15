import { Router } from 'express';
import accountsController from '../controllers/accounts-controller';
import { 
  validateIdFormat, 
  validateAddAccountSchema, 
  validateUpdateAccountSchema, 
  validateAccountLoginSchema,
  validateAuthToken
} from '../middlewares/accounts-middlewares';

const router = Router();

router.get('/', validateAuthToken, accountsController.getAccounts);

router.get('/:id', validateAuthToken, validateIdFormat, accountsController.getAccount);

router.post('/', validateAddAccountSchema, accountsController.addAccount);

router.patch('/:id', validateAuthToken, validateIdFormat, validateUpdateAccountSchema, accountsController.updateAccount);

router.post('/login', validateAccountLoginSchema, accountsController.loginAccount);

router.post('/logout', accountsController.logoutAccount);

export default router;