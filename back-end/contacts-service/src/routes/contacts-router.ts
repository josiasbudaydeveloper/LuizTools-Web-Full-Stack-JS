import { Router } from 'express';
import contactsControllers from '../controllers/contacts-controllers';
import commonsMiddlewares from 'ms-commons/api/middlewares/commons-middlewares';
import contactsMiddlewares from '../middlewares/contacts-middlewares';

const router = Router();

router.get('/:id', 
  commonsMiddlewares.validateAuthentication, 
  commonsMiddlewares.validateIdFormat, 
  contactsControllers.getContact
);

router.get('/', 
  commonsMiddlewares.validateAuthentication, 
  contactsControllers.getContacts
);

router.post('/',
  commonsMiddlewares.validateAuthentication, 
  contactsMiddlewares.validateAddContactSchema, 
  contactsControllers.addContact
);

router.patch('/:id',
  commonsMiddlewares.validateAuthentication, 
  commonsMiddlewares.validateIdFormat, 
  contactsMiddlewares.validateUpdateContactSchema, 
  contactsControllers.updateContact
);

export default router;