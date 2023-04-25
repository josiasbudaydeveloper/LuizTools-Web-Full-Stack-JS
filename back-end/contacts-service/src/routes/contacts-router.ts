import { Router } from 'express';
import contactsControllers from '../controllers/contacts-controllers';

const router = Router();

router.get('/contacts', contactsControllers.getContacts);

export default router;