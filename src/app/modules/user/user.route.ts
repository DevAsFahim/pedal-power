import { Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = Router();

router.post(
  '/create-user',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);
router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  UserControllers.getMe,
);
router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUser);
router.get('/:email', UserControllers.getSingleUser);

router.delete('/:email', auth(USER_ROLE.admin), UserControllers.blockUser);

export const UserRoutes = router;
