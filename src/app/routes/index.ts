import { Router } from "express";
import { BicycleRoutes } from "../modules/bicycle/bicycle.routes";
import { OrderRouter } from "../modules/order/order.route";

const router = Router();

router.use('/products', BicycleRoutes)
router.use('/orders', OrderRouter)


export const MainRoutes = router