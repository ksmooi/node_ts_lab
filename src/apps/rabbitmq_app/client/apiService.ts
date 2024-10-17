import axios, { AxiosInstance } from 'axios';

class APIService {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Publish a message to an exchange
  public async publishMessage(exchange: string, routingKey: string, message: string): Promise<void> {
    try {
      await this.client.post('/publish', { exchange, routingKey, message });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error publishing message');
    }
  }

  // Consume messages from an exchange with a routing key
  public async consumeMessages(exchange: string, routingKey: string): Promise<void> {
    try {
      await this.client.post('/consume', { exchange, routingKey });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error consuming messages');
    }
  }

  // Shutdown RabbitMQ connection
  public async shutdownConnection(): Promise<void> {
    try {
      await this.client.post('/shutdown');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error shutting down connection');
    }
  }
}

export default APIService;
