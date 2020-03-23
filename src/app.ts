import express from 'express';
import Database from './config/database';
import middleware from '@config/middleware';
import ApiRoutes from '@config/routes';

class App {
  private app: express.Application;

  public static bootstrap(): App {
    return new App();
  }

  constructor() {
    this.app = express();
    this.config();
    this.middleware();
    this.routes();
    this.database();
  }

  config() {
    this.app.set('host', '0.0.0.0');
    this.app.set('port', 3000);
  }

  middleware() {
    middleware(this.app);
  }

  routes() {
    this.app.use('/api', ApiRoutes.bootstrap().router);
  }

  database() {
    Database.bootstrap().run();
  }

  start() {
    this.app.listen(this.app.get('port'), this.app.get('host'), () => {
      console.log('Express server listening at', this.app.get('port'));
    });
  }
}

export default App;
