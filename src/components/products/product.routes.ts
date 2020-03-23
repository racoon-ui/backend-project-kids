import { Router } from 'express';
import { authJwt } from '@services/auth';
import { ProductController } from './product.controller';

class ProductRoutes {
  router: Router;
  private productController: ProductController;

  constructor() {
    this.router = Router();
    this.productController = new ProductController();
    this.routes();
  }

  routes() {
    this.router.get('/', this.productController.index);
    this.router.get('/:id', this.productController.show);
    this.router.post('/', authJwt, this.productController.create);
    this.router.patch('/:id', authJwt, this.productController.update);
    this.router.delete('/:id', authJwt, this.productController.delete);
  }
}

export default ProductRoutes;
