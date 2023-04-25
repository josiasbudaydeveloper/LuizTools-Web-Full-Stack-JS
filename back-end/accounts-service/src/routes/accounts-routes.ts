import { Router } from 'express';
import accountsController from '../controllers/accounts-controllers';
import accountsMiddlewares from '../middlewares/accounts-middlewares';

const router = Router();

router.get('/', 
  accountsMiddlewares.validateAuthentication, 
  accountsController.getAccounts
);

router.get('/:id', 
  accountsMiddlewares.validateAuthentication, 
  accountsMiddlewares.validateIdFormat, 
  accountsMiddlewares.validateAuthorization,
  accountsController.getAccount
);

router.post('/', 
  accountsMiddlewares.validateAddAccountSchema, 
  accountsController.addAccount
);

router.post('/login', 
  accountsMiddlewares.validateAccountLoginSchema, 
  accountsController.loginAccount
);

router.post('/logout', 
  accountsController.logoutAccount
);

router.patch('/:id', 
  accountsMiddlewares.validateAuthentication, 
  accountsMiddlewares.validateIdFormat, 
  accountsMiddlewares.validateAuthorization,
  accountsMiddlewares.validateUpdateAccountSchema, 
  accountsController.updateAccount
);

export default router;