import express from 'express';
import { BicycleControllers } from './bicycle.controller';

const router = express.Router();

router.post('/create-bicycle', BicycleControllers.createBicycle);

router.get('/', BicycleControllers.getAllBicycles);
router.get('/:bicycleId', BicycleControllers.getSingleBicycle);

router.put('/:bicycleId', BicycleControllers.updateSingleBicycle);

export const BicycleRoutes = router;
