import { Router, Response, Request, NextFunction } from 'express';
import acl from 'express-acl';
import HTTPStatus from 'http-status';

import UserRoutes from '@components/users/user.routes';
import StoreRoutes from '@components/stores/store.routes';
import ProductRoutes from '@components/products/product.routes';
import { isAuthenticated, IS_ANONYMOUS } from '@services/acl';
import { HTTP404Error } from '@utils/http-errors';
import { clientError, serverError } from '@utils/error-handler';

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
    acl.config({
      baseUrl: 'api',
      defaultRole: IS_ANONYMOUS,
      decodedObjectName: 'user',
      roleSearchPath: 'user.role',
      denyCallback: (res: any) => {
        return res.status(403).json({
          status: HTTPStatus.FORBIDDEN,
          success: false,
          message: 'You are not authorized to access this resource',
        });
      },
    });

    this.router.use([isAuthenticated, acl.authorize]);
    this.router.use('/users', new UserRoutes().router);
    this.router.use('/stores', new StoreRoutes().router);
    this.router.use('/products', new ProductRoutes().router);
    this.router.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new HTTP404Error());
    });
    this.router.use(clientError);
    this.router.use(serverError);
  }
}

export default ApiRoutes;
