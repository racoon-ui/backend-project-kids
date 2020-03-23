import { Router } from 'express';
import { authJwt } from '@services/auth';
import { StoreController } from './store.controller';

class StoreRoutes {
  router: Router;
  private storeController: StoreController;

  constructor() {
    this.router = Router();
    this.storeController = new StoreController();
    this.routes();
  }

  routes() {
    this.router.get('/', this.storeController.index);
    this.router.get('/:id', this.storeController.show);
    this.router.post('/', authJwt, this.storeController.create);
    this.router.patch('/:id', authJwt, this.storeController.update);
    this.router.delete('/:id', authJwt, this.storeController.delete);
  }
}

export default StoreRoutes;
