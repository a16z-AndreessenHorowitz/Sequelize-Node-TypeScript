  import express, { Application, Request, Response } from 'express';
  import path from 'path';

  //env
  import dotenv from 'dotenv';
  dotenv.config();

  const app: Application = express();
  const port: number = Number(process.env.PORT);

  //body-parser
  import bodyParser from 'body-parser';
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  //database connect
  import sequelize from './config/database';
  sequelize

  //moment
  import moment from 'moment';
  app.locals.moment=moment

   //time cme
  app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
  //time cme
  
  //pug
  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views')); // thêm path.join
  app.set('view engine', 'pug')

  //Routes
  import { routeClient} from './routes/index.route';
  import { routeAdmin } from './routes/admin/index.route';
  routeClient(app)
  routeAdmin(app)

  app.listen(port,"0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${port}`);
  });