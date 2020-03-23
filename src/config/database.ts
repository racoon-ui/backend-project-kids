import mongoose from 'mongoose';
import chalk from 'chalk';
import constants from './constants';

class Database {
  url: string;

  public static bootstrap(): Database {
    return new Database();
  }

  constructor() {
    this.url = constants.MONGO_URL || 'mongodb://localhost/test';
    this.setEventHandler();
  }

  setEventHandler() {
    const connection = mongoose.connection;
    const url = this.url;

    connection.on('connected', () => {
      console.log(
        chalk.yellow.bold(`
        Mongo Connection Established
        Mongo URL: ${url}
      `),
      );
    });

    connection.on('reconnected', () => {
      console.log(
        chalk.yellow.bold(`
        Mongo Connection Reestablished
        Mongo URL: ${url}
      `),
      );
    });

    connection.on('disconnected', () => {
      console.log(
        chalk.yellow.bold(`
        Mongo Connection Disconnected
        Mongo URL: ${url}
      `),
      );

      console.log(
        chalk.yellow.bold(`
        Trying to reconnect to Mongo ...
        Mongo URL: ${url}
      `),
      );

      setTimeout(() => {
        mongoose.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      }, 2000);
    });

    connection.on('close', () => {
      console.log(
        chalk.yellow.bold(`
        Mongo Connection Closed
        Mongo URL: ${url}
      `),
      );
    });

    connection.on('error', (error: Error) => {
      console.log(
        chalk.yellow.bold(`
        Mongo Connection ERROR: ${error}
      `),
      );
    });
  }

  run() {
    const url = this.url;

    async function connect() {
      mongoose.Promise = global.Promise;
      mongoose.set('debug', !(process.env.NODE_ENV !== 'production'));

      try {
        mongoose.set('useCreateIndex', true);
        await mongoose.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      } catch (err) {
        mongoose.createConnection(url);
      }

      mongoose.connection
        .once('open', () =>
          console.log(
            chalk.yellow.bold(`
            MongoDB is running
            Mongo URL: ${url}
          `),
          ),
        )
        .on('error', e => {
          throw e;
        });
    }

    connect();
  }
}

export default Database;
