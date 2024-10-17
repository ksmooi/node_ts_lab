// npx ts-node src/apps/rabbitmq_app/client/client.ts

import APIService from './apiService';
import CLIClient from './cliClient';

/**
 * Entry point for the CLI Client.
 * Initializes the APIService and CLIClient, then starts the CLI interface.
 */
const main = async () => {
  // Define the base URL for the server API
  // Since SERVER_BASE_URL is removed from .env, we use the default value
  const baseURL = 'http://localhost:5005/api';

  // Initialize the APIService with the base URL
  const apiService = new APIService(baseURL);

  // Initialize the CLIClient with the APIService instance
  const cliClient = new CLIClient(apiService);

  // Start the CLI Client
  await cliClient.start();
};

// Invoke the main function to start the client
main();
