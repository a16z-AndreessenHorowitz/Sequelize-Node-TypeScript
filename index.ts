  import express, { Application, Request, Response } from 'express';
  import path from 'path';

  //env
  import dotenv from 'dotenv';
  dotenv.config();

  const app: Application = express();
  const port = process.env.PORT;

  //body-parser
  import bodyParser from 'body-parser';
  app.use(bodyParser.json())

  //database connect
  import sequelize from './config/database';
  sequelize

  //moment
  import moment from 'moment';
  app.locals.moment=moment
  //pug
  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views')); // thêm path.join
  app.set('view engine', 'pug')

  //Routes
  import { routeClient } from './routes/index.route';
  routeClient(app)

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });