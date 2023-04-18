import app from 'ms-commons/api/app';
import accountsRouter from './routes/accounts-routes';

export default app('/accounts', accountsRouter);