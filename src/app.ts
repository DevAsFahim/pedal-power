import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './app/bicycle/bicycle.routes';
import { OrderRouter } from './app/order/order.route';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// api routes for bicycle
app.use('/api/products', BicycleRoutes);
app.use('/api/orders', OrderRouter);

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
