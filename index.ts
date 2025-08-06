  import express, { Application, Request, Response } from 'express';
  import dotenv from 'dotenv';

  dotenv.config();

  const app: Application = express();
  const port = process.env.PORT;

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express and TypeScript!');
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });