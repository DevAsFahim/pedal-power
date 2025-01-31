import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { MainRoutes } from './app/routes';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// api routes for bicycle
app.use('/api', MainRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Pedal Poser',
  });
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route is not found.',
  });
});

export default app;
