import { Router } from 'express';
import { BicycleRoutes } from '../modules/bicycle/bicycle.routes';
import { OrderRouter } from '../modules/order/order.route';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRouter } from '../modules/Auth/auth.route';

const router = Router();

router.use('/products', BicycleRoutes);
router.use('/orders', OrderRouter);
router.use('/users', UserRoutes);
router.use('/auth', AuthRouter);

export const MainRoutes = router;
