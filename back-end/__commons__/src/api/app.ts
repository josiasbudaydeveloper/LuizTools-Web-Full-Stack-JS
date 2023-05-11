import express, { Application, Router } from "express";
import helmet from 'helmet';
import morgan from "morgan";
import cors from 'cors';

const app : Application = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

export default function(routerUrl: string, router: Router) : Application {
  app.use(routerUrl, router);

  return app;
};