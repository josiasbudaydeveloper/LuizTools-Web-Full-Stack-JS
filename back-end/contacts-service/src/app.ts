import app from 'ms-commons/api/app';
import contactsRouter from './routes/contacts-router';

export default app('/contacts', contactsRouter);