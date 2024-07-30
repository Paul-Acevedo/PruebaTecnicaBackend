import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
//const sequelize = require('./database/sequelize');


import { ApiError, errorLog } from '../helpers';

import routerApi from '../api/index';

import { createServer } from 'http';
import { errorHandler } from '../helpers/errorHandler';

const morgan = require('morgan');



try {


  //For env File
  dotenv.config();

  const app: Application = express();

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  // Puerto de la app
  const port = process.env.PORT || 3000;

  routerApi(app);

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
