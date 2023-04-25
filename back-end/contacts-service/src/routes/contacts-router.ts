import { Router } from 'express';
import contactsControllers from '../controllers/contacts-controllers';
import commonsMiddlewares from 'ms-commons/api/middlewares/commons-middlewares';

const router = Router();

router.get('/', commonsMiddlewares.validateAuthentication, contactsControllers.getContacts);

export default router;