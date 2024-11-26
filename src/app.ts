import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './app/bicycle/bicycle.routes';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// api routes for bicycle
app.use('/api/v1/products', BicycleRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Pedal Poser',
  });
});

export default app;
