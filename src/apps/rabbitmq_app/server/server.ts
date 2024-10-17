// npx ts-node src/apps/rabbitmq_app/server/server.ts

// create .env file
//   RABBITMQ_URL=amqp://192.168.1.150
//   RABBITMQ_APP_SERVER_PORT=5005

import express, { Application, Request, Response, NextFunction } from 'express';
import Routes from './routes';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './errorHandler';
import logger from './logger';

dotenv.config();

class Server {
  public app: Application;
  private PORT: number;

  constructor() {
    this.app = express();
    this.PORT = Number(process.env.RABBITMQ_APP_SERVER_PORT) || 5000;
    this.middleware();
    this.routes();
    this.errorHandling();
  }

  private middleware(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use('/api', Routes);

    // Health Check Route
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({ status: 'UP' });
    });
  }

  private errorHandling(): void {
    this.app.use(errorHandler);
  }

  public listen(): void {
    const server = this.app.listen(this.PORT, () => {
      logger.info(`Server is running on port ${this.PORT}`);
    });

    // Handle graceful shutdown
    const gracefulShutdown = () => {
      logger.info('Shutting down gracefully...');
      server.close(() => {
        logger.info('HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
  }
}

const server = new Server();
server.listen();
