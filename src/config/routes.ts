import { Router } from 'express';
import UserRoutes from '@components/users/user.routes';
import StoreRoutes from '@components/stores/store.routes';
import ProductRoutes from '@components/products/product.routes';

class ApiRoutes {
  router: Router;

  public static bootstrap(): ApiRoutes {
    return new ApiRoutes();
  }

  constructor() {
    this.router = Router();
    this.run();
  }

  run() {
    this.router.use('/users', new UserRoutes().router);
    this.router.use('/stores', new StoreRoutes().router);
    this.router.use('/products', new ProductRoutes().router);
  }
}

export default ApiRoutes;
