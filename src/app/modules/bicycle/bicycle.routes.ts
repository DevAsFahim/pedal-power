import express from 'express';
import { BicycleControllers } from './bicycle.controller';
import { BicycleValidations } from './bicycle.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-bicycle',
  auth(USER_ROLE.admin),
  validateRequest(BicycleValidations.createBicycleValidationSchema),
  BicycleControllers.createBicycle,
);

router.get('/', BicycleControllers.getAllBicycles);
router.get('/:productId', BicycleControllers.getSingleBicycle);

router.put(
  '/:productId',
  auth(USER_ROLE.admin),
  BicycleControllers.updateSingleBicycle,
);
router.delete(
  '/:productId',
  auth(USER_ROLE.admin),
  BicycleControllers.deleteSingleBicycle,
);

export const BicycleRoutes = router;
