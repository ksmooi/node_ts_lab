import amqp, { Connection, Channel, ConsumeMessage } from 'amqplib';
import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

class RabbitMQService {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  constructor(private url: string) {}

  // Initialize connection and channel
  public async init(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.url);
      this.channel = await this.connection.createChannel();
      logger.info('Connected to RabbitMQ');
    } catch (error: any) {
      logger.error(`Failed to connect to RabbitMQ: ${error.message}`);
      throw error;
    }
  }

  // Publish message to an exchange with a routing key
  public async publishMessage(exchange: string, routingKey: string, message: string): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not initialized');
    }
    try {
      await this.channel.assertExchange(exchange, 'topic', { durable: true });
      this.channel.publish(exchange, routingKey, Buffer.from(message));
      logger.info(`Message published to exchange '${exchange}' with routing key '${routingKey}'`);
    } catch (error: any) {
      logger.error(`Failed to publish message: ${error.message}`);
      throw error;
    }
  }

  // Consume messages from a specific queue
  public async consumeMessages(exchange: string, routingKey: string, onMessage: (msg: ConsumeMessage) => void): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not initialized');
    }
    try {
      await this.channel.assertExchange(exchange, 'topic', { durable: true });
      const q = await this.channel.assertQueue('', { exclusive: true });
      await this.channel.bindQueue(q.queue, exchange, routingKey);

      logger.info(`Waiting for messages in exchange '${exchange}' with routing key '${routingKey}'`);

      this.channel.consume(q.queue, (msg) => {
        if (msg !== null) {
          onMessage(msg);
          this.channel!.ack(msg);
        }
      });
    } catch (error: any) {
      logger.error(`Failed to consume messages: ${error.message}`);
      throw error;
    }
  }

  // Close connection and channel
  public async close(): Promise<void> {
    try {
      await this.channel?.close();
      await this.connection?.close();
      logger.info('RabbitMQ connection closed');
    } catch (error: any) {
      logger.error(`Error closing RabbitMQ connection: ${error.message}`);
    }
  }
}

export default RabbitMQService;
