import express, { Application } from "express";
import helmet from 'helmet';
import accountsRouter from './routes/accounts-routes';
import morgan from "morgan";

const app : Application = express();
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use('/accounts', accountsRouter);

export default app;