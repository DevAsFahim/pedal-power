import express from 'express';
import { BicycleControllers } from './bicycle.controller';
import { BicycleValidations } from './bicycle.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-bicycle',
  validateRequest(BicycleValidations.createBicycleValidationSchema),
  BicycleControllers.createBicycle,
);

router.get('/', BicycleControllers.getAllBicycles);
router.get('/:productId', BicycleControllers.getSingleBicycle);

router.put('/:productId', BicycleControllers.updateSingleBicycle);
router.delete('/:productId', BicycleControllers.deleteSingleBicycle);

export const BicycleRoutes = router;
