import { Router } from 'express';
import accountsController from '../controllers/accounts-controller';
import { 
  validateId, 
  validateAddAccount, 
  validateUpdateAccount, 
  validateAccountLogin 
} from '../middlewares/accounts-middlewares';

const router = Router();

router.get('/', accountsController.getAccounts);

router.get('/:id', validateId, accountsController.getAccount);

router.post('/', validateAddAccount, accountsController.addtAccount);

router.patch('/:id', validateId, validateUpdateAccount, accountsController.updateAccount);

router.post('/login', validateAccountLogin, accountsController.loginAccount);

router.post('/logout', accountsController.logoutAccount);

export default router;