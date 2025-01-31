import express from 'express';
import { OrderCollections } from './order.controller';

const router = express.Router();

router.post('/', OrderCollections.orderABicycle);
router.get('/revenue', OrderCollections.calculateRevenue);

export const OrderRouter = router;
