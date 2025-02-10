import express from 'express';
import { OrderCollections } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-order',
  auth(USER_ROLE.customer),
  OrderCollections.createOrder,
);

router.get("/verify", auth(USER_ROLE.customer), OrderCollections.verifyPayment);

router.get('/', auth(USER_ROLE.admin), OrderCollections.getAllOrders);

router.get(
  '/revenue',
  auth(USER_ROLE.admin),
  OrderCollections.calculateRevenue,
);

export const OrderRouter = router;
