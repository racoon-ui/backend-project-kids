import express from 'express';
import path from 'path';
import Database from './config/database';
import middleware from '@config/middleware';
import ApiRoutes from '@config/routes';

class App {
  readonly app: express.Application;

  public static bootstrap(): App {
    return new App();
  }

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.database();
    this.post();
  }

  private middleware() {
    middleware(this.app);
  }

  private routes() {
    this.app.use('/api', ApiRoutes.bootstrap().router);
  }

  private database() {
    Database.bootstrap().run();
  }

  private post() {
    this.app.get('/robots.txt', (_, res) => {
      res.sendFile(path.join(__dirname, './static', 'robots.txt'));
    });
  }

  public start() {
    this.app.listen(process.env.PORT || 3000, () => {
      console.log('Express server listening at', this.app.get('port'));
    });
  }
}

export default App;
