  import express, { Application, Request, Response } from 'express';
  import dotenv from 'dotenv';
  import path from 'path';


  dotenv.config();

  const app: Application = express();
  const port = process.env.PORT;

  //pug
  app.set('views', path.join(__dirname, 'views')); // thêm path.join
  app.set('view engine', 'pug')

  app.get('/tours', (req: Request, res: Response) => {
    res.render("client/pages/tours/index")
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });