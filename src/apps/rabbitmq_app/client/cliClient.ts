import inquirer from 'inquirer';
import APIService from './apiService';

class CLIClient {
  private apiService: APIService;

  constructor(apiService: APIService) {
    this.apiService = apiService;
  }

  public async start(): Promise<void> {
    console.log('Welcome to the RabbitMQ CRUD CLI Client!\n');
    let exit = false;

    while (!exit) {
      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action:',
          choices: [
            'Publish a Message',
            'Consume Messages',
            'Shutdown Connection',
            'Exit',
          ],
        },
      ]);

      switch (action) {
        case 'Publish a Message':
          await this.publishMessage();
          break;
        case 'Consume Messages':
          await this.consumeMessages();
          break;
        case 'Shutdown Connection':
          await this.shutdownConnection();
          break;
        case 'Exit':
          exit = true;
          console.log('Goodbye!');
          break;
      }
    }
  }

  private async publishMessage(): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'exchange',
        message: 'Enter the exchange name:',
        validate: (input) => (input ? true : 'Exchange name cannot be empty.'),
      },
      {
        type: 'input',
        name: 'routingKey',
        message: 'Enter the routing key:',
        validate: (input) => (input ? true : 'Routing key cannot be empty.'),
      },
      {
        type: 'input',
        name: 'message',
        message: 'Enter the message:',
        validate: (input) => (input ? true : 'Message cannot be empty.'),
      },
    ]);

    try {
      await this.apiService.publishMessage(answers.exchange, answers.routingKey, answers.message);
      console.log(`\nMessage published to exchange '${answers.exchange}' with routing key '${answers.routingKey}'.\n`);
    } catch (error: any) {
      console.error(`\nError: ${error.message}\n`);
    }
  }

  private async consumeMessages(): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'exchange',
        message: 'Enter the exchange name:',
        validate: (input) => (input ? true : 'Exchange name cannot be empty.'),
      },
      {
        type: 'input',
        name: 'routingKey',
        message: 'Enter the routing key (or * for wildcard):',
        validate: (input) => (input ? true : 'Routing key cannot be empty.'),
      },
    ]);

    try {
      await this.apiService.consumeMessages(answers.exchange, answers.routingKey);
      console.log(`\nSubscribed to exchange '${answers.exchange}' with routing key '${answers.routingKey}'.\n`);
      console.log('Waiting for messages...\n');
      // Note: Actual message consumption is handled by the server and logged there.
    } catch (error: any) {
      console.error(`\nError: ${error.message}\n`);
    }
  }

  private async shutdownConnection(): Promise<void> {
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Are you sure you want to shutdown the RabbitMQ connection?',
        default: false,
      },
    ]);

    if (!confirm) {
      console.log('\nShutdown cancelled.\n');
      return;
    }

    try {
      await this.apiService.shutdownConnection();
      console.log('\nRabbitMQ connection closed successfully.\n');
    } catch (error: any) {
      console.error(`\nError: ${error.message}\n`);
    }
  }
}

export default CLIClient;
