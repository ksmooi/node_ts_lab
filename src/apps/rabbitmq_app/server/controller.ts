import { Request, Response } from 'express';
import RabbitMQService from './rabbitmqService';
import logger from './logger';

class Controller {
  private rabbitMQService: RabbitMQService;

  constructor() {
    const rabbitMQUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
    this.rabbitMQService = new RabbitMQService(rabbitMQUrl);
    this.rabbitMQService.init().catch((error) => {
      logger.error(`Initialization Error: ${error.message}`);
    });
  }

  // Publish a message to an exchange
  public async publishMessage(req: Request, res: Response): Promise<void> {
    const { exchange, routingKey, message } = req.body;

    if (!exchange || !routingKey || !message) {
      res.status(400).json({ message: 'Exchange, routingKey, and message are required.' });
      return;
    }

    try {
      await this.rabbitMQService.publishMessage(exchange, routingKey, message);
      res.status(200).json({ message: 'Message published successfully.' });
    } catch (error: any) {
      logger.error(`Publish Error: ${error.message}`);
      res.status(500).json({ message: 'Failed to publish message.' });
    }
  }

  // Consume messages from an exchange with a routing key
  public async consumeMessages(req: Request, res: Response): Promise<void> {
    const { exchange, routingKey } = req.body;

    if (!exchange || !routingKey) {
      res.status(400).json({ message: 'Exchange and routingKey are required.' });
      return;
    }

    try {
      await this.rabbitMQService.consumeMessages(exchange, routingKey, (msg) => {
        const content = msg.content.toString();
        logger.info(`Received message: ${content} [Routing Key: ${msg.fields.routingKey}]`);
      });
      res.status(200).json({ message: `Subscribed to exchange '${exchange}' with routing key '${routingKey}'` });
    } catch (error: any) {
      logger.error(`Consume Error: ${error.message}`);
      res.status(500).json({ message: 'Failed to consume messages.' });
    }
  }

  // Gracefully shutdown RabbitMQ connection
  public async shutdown(req: Request, res: Response): Promise<void> {
    try {
      await this.rabbitMQService.close();
      res.status(200).json({ message: 'RabbitMQ connection closed successfully.' });
    } catch (error: any) {
      logger.error(`Shutdown Error: ${error.message}`);
      res.status(500).json({ message: 'Failed to close RabbitMQ connection.' });
    }
  }
}

export default Controller;
