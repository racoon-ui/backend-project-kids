import { Router } from 'express';
import { validation as UserValidation, UserController } from './user.controller';
import { validation as AuthValidation, AuthController } from './auth.controller';
import { authLocal } from '@services/auth';

class UserRoutes {
  router: Router;
  private userController: UserController;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.authController = new AuthController();
    this.routes();
  }

  routes() {
    this.router.get('/', this.userController.index);
    this.router.post('/register', this.userController.create);
    this.router.post('/login', authLocal, this.authController.login);
  }
}

export default UserRoutes;
