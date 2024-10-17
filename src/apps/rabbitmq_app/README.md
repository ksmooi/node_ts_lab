# RabbitMQ Messaging Application with Node.js and TypeScript

Welcome to the **RabbitMQ Messaging Application**, a robust project designed to help you practice and master using **RabbitMQ** in a **Node.js** environment with **TypeScript**. This application leverages the **amqplib** library to interact with RabbitMQ for handling queues and topics (exchanges). Both the **server** and **client** are architected using **Object-Oriented (OO)** principles, ensuring modularity, scalability, and maintainability. Environment variables are securely managed using a `.env` file.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup](#setup)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Setup RabbitMQ Server](#4-setup-rabbitmq-server)
- [Running the Application](#running-the-application)
  - [1. Start the RabbitMQ Server](#1-start-the-rabbitmq-server)
  - [2. Start the Server](#2-start-the-server)
  - [3. Run the CLI Client](#3-run-the-cli-client)
- [Usage](#usage)
  - [CLI Client Commands](#cli-client-commands)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

---

## Features

- **Message Queuing:** Create and manage queues in RabbitMQ for reliable message delivery.
- **Publish/Subscribe Pattern:** Utilize topics (exchanges) for pub/sub messaging.
- **CLI Client:** Interactive Command-Line Interface to publish and consume messages.
- **RESTful API:** Server-side API built with Express and amqplib for robust message handling.
- **TypeScript:** Enhanced type safety and developer experience.
- **Environment Configuration:** Securely manage configuration using `.env` files.
- **Error Handling & Logging:** Comprehensive error reporting and logging using Winston.

---

## Prerequisites

Before setting up and running the RabbitMQ Messaging Application, ensure you have the following installed on your machine:

- **Node.js** (v14 or later)
- **npm** or **yarn**
- **TypeScript** (`npm install -g typescript`)
- **ts-node** (`npm install -g ts-node`)
- **RabbitMQ** (installed locally or accessible via a remote server)

### Installing RabbitMQ Locally

If you don't have RabbitMQ installed locally, you can install it using the following methods based on your operating system:

- **Ubuntu:**

  ```bash
  sudo apt update
  sudo apt install rabbitmq-server
  ```

  **Start RabbitMQ Service:**

  ```bash
  sudo systemctl start rabbitmq-server
  sudo systemctl enable rabbitmq-server
  ```

- **macOS (using Homebrew):**

  ```bash
  brew update
  brew install rabbitmq
  ```

  **Start RabbitMQ Server:**

  ```bash
  brew services start rabbitmq
  ```

- **Windows:**

  Download and install RabbitMQ from the [official website](https://www.rabbitmq.com/download.html). Follow the installation instructions to set up RabbitMQ and configure the server.

---

## Project Structure

```
src/apps/rabbitmq_app/
├── client
│   ├── apiService.ts
│   ├── cliClient.ts
│   └── client.ts
├── README.md
└── server
    ├── controller.ts
    ├── errorHandler.ts
    ├── logger.ts
    ├── rabbitmqService.ts
    ├── routes.ts
    └── server.ts

node_ts_lab/.env
```

- **server/**: Contains all server-side logic, including RabbitMQ interactions, API endpoints, error handling, and logging.
  - **rabbitmqService.ts**: Manages connections and operations with RabbitMQ using amqplib.
  - **controller.ts**: Handles incoming HTTP requests and interacts with the RabbitMQService.
  - **routes.ts**: Defines Express routes and maps them to controller methods.
  - **logger.ts**: Configures logging using Winston.
  - **errorHandler.ts**: Centralized error handling middleware for Express.
  - **server.ts**: Initializes and starts the Express server.

- **client/**: Contains all client-side logic, including API interactions and the CLI interface.
  - **apiService.ts**: Handles HTTP requests to the server using axios.
  - **cliClient.ts**: Manages the Command-Line Interface interactions using inquirer.
  - **client.ts**: Entry point for the CLI client.

- **README.md**: Documentation for the `rabbitmq_app` project.

- **.env**: Environment variables configuration file located at the root (`node_ts_lab/.env`).

---

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/rabbitmq_app.git
cd rabbitmq_app
```

### 2. Install Dependencies

Navigate to both the server and client directories to install their respective dependencies.

```bash
# Install server dependencies
cd src/apps/rabbitmq_app/server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory (`node_ts_lab/.env`) to store environment-specific configurations.

**`node_ts_lab/.env`**

```env
# RabbitMQ Configuration
RABBITMQ_URL=amqp://username:password@localhost:5672

# Server Configuration
RABBITMQ_APP_SERVER_PORT=5005
```

**Explanation:**

- **RABBITMQ_URL**: Connection URL for your RabbitMQ server. Replace `username` and `password` with your RabbitMQ credentials.
- **RABBITMQ_APP_SERVER_PORT**: Port number on which the server will run.

**Ensure `.env` is Ignored by Version Control**

Add `.env` to your `.gitignore` file to prevent exposing sensitive information.

**`.gitignore`:**

```gitignore
node_modules/
dist/
.env
```

### 4. Setup RabbitMQ Server

Ensure that you have a RabbitMQ server set up and accessible with the configurations specified in your `.env` file.

#### A. Enable Management Plugin (Optional but Recommended)

RabbitMQ comes with a management plugin that provides an easy-to-use web interface.

1. **Enable the Plugin:**

   ```bash
   rabbitmq-plugins enable rabbitmq_management
   ```

2. **Access the Management Interface:**

   Navigate to `http://localhost:15672/` in your browser.

3. **Default Credentials:**

   - **Username:** `guest`
   - **Password:** `guest`

   > **Note:** For security reasons, it's highly recommended to create a new user and disable the default guest user for production environments.

#### B. Create a New RabbitMQ User

If you prefer not to use the default `guest` user or need to connect from a different host, create a new user with appropriate permissions.

1. **Access RabbitMQ Shell:**

   ```bash
   sudo rabbitmqctl add_user your_new_username your_new_password
   ```

2. **Set Permissions for the New User:**

   ```bash
   sudo rabbitmqctl set_permissions -p / your_new_username ".*" ".*" ".*"
   ```

3. **Update `.env` File with New Credentials:**

   ```env
   RABBITMQ_URL=amqp://your_new_username:your_new_password@localhost:5672
   RABBITMQ_APP_SERVER_PORT=5005
   ```

---

## Running the Application

Follow these steps to run both the server and client components of the application.

### 1. Start the RabbitMQ Server

Ensure that the RabbitMQ server is running and properly configured.

- **Local Installation:**

  - **Ubuntu:**

    ```bash
    sudo systemctl start rabbitmq-server
    sudo systemctl status rabbitmq-server
    ```

  - **macOS (using Homebrew):**

    ```bash
    brew services start rabbitmq
    brew services list
    ```

  - **Windows:**

    Start the RabbitMQ service via the Services management console or your chosen installation method.

### 2. Start the Server

Navigate to the server directory and start the server using **ts-node**.

```bash
cd src/apps/rabbitmq_app/server
npx ts-node server.ts
```

**Expected Output:**

```
info: Connected to RabbitMQ {"service":"rabbitmq-app","timestamp":"2024-10-04 14:22:36"}
info: Server is running on port 5005 {"service":"rabbitmq-app","timestamp":"2024-10-04 14:22:36"}
```

**Troubleshooting:**

- **Authentication Errors:** Ensure that the credentials in your `.env` file match those set in RabbitMQ.
- **Port Conflicts:** If port `5005` is in use, change it in the `.env` file and restart the server.

### 3. Run the CLI Client

Open a new terminal window, navigate to the client directory, and start the CLI client.

```bash
cd src/apps/rabbitmq_app/client
npx ts-node client.ts
```

**Alternative: Using npm Scripts**

For convenience, you can add scripts to your `package.json` to run the server and client.

**Update `package.json`:**

```json
{
  "scripts": {
    "start:server": "ts-node src/apps/rabbitmq_app/server/server.ts",
    "start:client": "ts-node src/apps/rabbitmq_app/client/client.ts"
  },
  // ... other configurations
}
```

Run the server and client using:

```bash
# Start the server
npm run start:server

# Start the client
npm run start:client
```

---

## Usage

Upon running the CLI client, you'll be greeted with a menu to perform various actions related to RabbitMQ messaging, including publishing to exchanges/topics and consuming messages.

**Sample Interaction:**

```
Welcome to the RabbitMQ Messaging CLI Client!

? Select an action: Publish a Message
✔ Enter the exchange name: logs
✔ Enter the routing key: info
✔ Enter the message: This is an info log message.

Message published to exchange 'logs' with routing key 'info'.

? Select an action: Consume Messages
✔ Enter the exchange name: logs
✔ Enter the routing key (or * for wildcard): info

Subscribed to exchange 'logs' with routing key 'info'.
Waiting for messages...

? Select an action: Exit
Goodbye!
```

**Note:** Since consuming messages is handled on the server-side, you should see the consumed messages logged in the server terminal.

### CLI Client Commands

1. **Publish a Message**
   - **Description:** Allows you to publish a message to a specific exchange with a routing key.
   - **Inputs:**
     - **Exchange Name:** The name of the exchange to publish to.
     - **Routing Key:** The routing key for message distribution.
     - **Message:** The content of the message to publish.

2. **Consume Messages**
   - **Description:** Subscribe to an exchange and routing key to consume incoming messages.
   - **Inputs:**
     - **Exchange Name:** The name of the exchange to consume from.
     - **Routing Key:** The routing key to filter messages (use `*` for wildcard).

3. **Shutdown Connection**
   - **Description:** Closes the RabbitMQ connection gracefully.
   - **Inputs:**
     - **Confirmation:** Confirmation prompt to prevent accidental shutdowns.

4. **Exit**
   - **Description:** Exit the CLI client gracefully.

---

## API Endpoints

The server exposes the following RESTful API endpoints for managing RabbitMQ messaging, including publishing and consuming messages.

### Base URL

```
http://localhost:5005/api
```

### Endpoints

1. **Publish a Message**

   - **URL:** `/api/publish`
   - **Method:** `POST`
   - **Body:**
     ```json
     {
       "exchange": "logs",
       "routingKey": "info",
       "message": "This is an info log message."
     }
     ```
   - **Success Response:**
     - **Code:** `200 OK`
     - **Content:**
       ```json
       {
         "message": "Message published successfully."
       }
       ```

2. **Consume Messages**

   - **URL:** `/api/consume`
   - **Method:** `POST`
   - **Body:**
     ```json
     {
       "exchange": "logs",
       "routingKey": "info"
     }
     ```
   - **Success Response:**
     - **Code:** `200 OK`
     - **Content:**
       ```json
       {
         "message": "Subscribed to exchange 'logs' with routing key 'info'."
       }
       ```
   - **Note:** Consuming messages involves setting up a subscription that listens for incoming messages. The actual message consumption and logging occur on the server-side.

3. **Shutdown Connection**

   - **URL:** `/api/shutdown`
   - **Method:** `POST`
   - **Success Response:**
     - **Code:** `200 OK`
     - **Content:**
       ```json
       {
         "message": "RabbitMQ connection closed successfully."
       }
       ```

---

## Troubleshooting

### Common Issues and Solutions

1. **403 (ACCESS_REFUSED) Error**

   **Error Message:**

   ```
   error: Failed to connect to RabbitMQ: Handshake terminated by server: 403 (ACCESS_REFUSED) with message "ACCESS_REFUSED - Login was refused using authentication mechanism PLAIN. For details see the broker logfile."
   ```

   **Cause:**

   - **Incorrect Credentials:** The username or password provided in the `.env` file does not match any valid RabbitMQ user.
   - **User Permissions:** The user does not have sufficient permissions to access the virtual host.
   - **Virtual Host Issues:** The specified virtual host does not exist or the user does not have access to it.

   **Solutions:**

   - **Verify Credentials:**
     
     Ensure that the `RABBITMQ_URL` in your `.env` file contains the correct **username** and **password**.

     ```env
     RABBITMQ_URL=amqp://your_new_username:your_new_password@localhost:5672
     RABBITMQ_APP_SERVER_PORT=5005
     ```

   - **Check User Permissions:**
     
     - Log in to the RabbitMQ Management Interface (`http://localhost:15672/`).
     - Navigate to the **"Admin"** tab.
     - Select the user and ensure they have the necessary permissions for the virtual host (`/` by default).

   - **Verify Virtual Host:**
     
     - Ensure that the virtual host specified in the URL exists.
     - If not, create it via the Management Interface or adjust the `RABBITMQ_URL` to use an existing virtual host.

   - **Enable Necessary Authentication Mechanisms:**
     
     - RabbitMQ may have specific authentication mechanisms enabled. Ensure that **PLAIN** is allowed.

2. **Connection Refused**

   **Error Message:**

   ```
   error: Failed to connect to RabbitMQ: Handshake terminated by server: 403 (ACCESS_REFUSED) ...
   ```

   **Cause:**

   - **RabbitMQ Server Not Running:** The RabbitMQ server is not active or not listening on the specified port.
   - **Network Issues:** Firewall or network settings blocking the connection.

   **Solutions:**

   - **Start RabbitMQ Server:**

     ```bash
     # Ubuntu
     sudo systemctl start rabbitmq-server
     
     # macOS (using Homebrew)
     brew services start rabbitmq
     
     # Windows
     # Start via Services management console
     ```

   - **Verify Connection Details:**
     
     Ensure that `RABBITMQ_URL` points to the correct host and port.

   - **Check Firewall Settings:**
     
     Ensure that port `5672` (default) is open and not blocked by any firewall.

3. **Exchange or Queue Not Found**

   **Error Message:**

   ```
   [ERROR] Channel error: Error: NOT_FOUND - no exchange 'logs' in vhost '/'
   ```

   **Cause:**

   - Attempting to publish or consume from a non-existent exchange.

   **Solutions:**

   - **Ensure Exchange Exists:**
     
     The `RabbitMQService` class uses `assertExchange`, which should create the exchange if it doesn't exist. Ensure this is correctly implemented.

   - **Check Exchange Type:**
     
     Verify that the exchange type (e.g., `topic`, `direct`) matches between publishing and consuming.

4. **Graceful Shutdown Not Working**

   **Error Message:**

   ```
   info: Shutting down gracefully... {"service":"rabbitmq-app","timestamp":"2024-10-04 14:22:51"}
   info: HTTP server closed. {"service":"rabbitmq-app","timestamp":"2024-10-04 14:22:51"}
   ```

   **Cause:**

   - **Incomplete Shutdown:** The server may not be waiting for ongoing processes to finish before shutting down.

   **Solutions:**

   - **Ensure Proper Shutdown Sequence:**
     
     Make sure that the `shutdown` method in `RabbitMQService` is correctly closing channels and connections before exiting.

   - **Handle Promises Correctly:**
     
     Ensure that all asynchronous operations are awaited to complete before the process exits.

5. **TypeScript Compilation Errors**

   **Error Message:**

   ```
   TSError: ⨯ Unable to compile TypeScript:
   src/apps/rabbitmq_app/server/rabbitmqService.ts:10:5 - error TS2322: Type 'Connection' is not assignable to type 'any'.
   ```

   **Cause:**

   - **Type Mismatches:** Incorrect type annotations or missing type definitions.

   **Solutions:**

   - **Install Type Definitions:**

     Ensure that all necessary type definitions are installed. For `amqplib`, you might need to install its type definitions.

     ```bash
     npm install --save-dev @types/amqplib
     ```

   - **Review Type Annotations:**
     
     Double-check your TypeScript code for correct type usage.

   - **Run TypeScript Compiler:**

     Use `npx tsc` to manually compile TypeScript files and identify errors.

6. **Port Already in Use**

   **Error Message:**

   ```
   Error: listen EADDRINUSE: address already in use :::5005
   ```

   **Cause:**

   - Another process is using port `5005`.

   **Solutions:**

   - **Identify the Process Using the Port:**

     ```bash
     sudo lsof -i :5005
     ```

   - **Terminate the Process or Change the Server Port:**
     
     Terminate the process occupying the port or update the `RABBITMQ_APP_SERVER_PORT` in your `.env` file to an available port and restart the server.

7. **Environment Variables Not Loaded**

   **Error Message:**

   ```
   TypeError: Cannot read property 'RABBITMQ_URL' of undefined
   ```

   **Cause:**

   - Environment variables are not properly loaded.

   **Solutions:**

   - **Ensure `dotenv.config()` is Called:**
     
     Ensure that `dotenv.config()` is called at the very beginning of your entry files (`server.ts` and `client.ts`).

   - **Verify `.env` File Location and Syntax:**
     
     Ensure that the `.env` file is correctly named and placed in the appropriate directory (`node_ts_lab/.env`). Check that there are no syntax errors in the `.env` file.

---

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**

2. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add your message here"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeatureName
   ```

5. **Open a Pull Request**

Please ensure that your code adheres to the project's coding standards and includes appropriate tests.

---

## Acknowledgements

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [amqplib](https://github.com/squaremo/amqp.node) - RabbitMQ client for Node.js
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Axios](https://axios-http.com/) - Promise based HTTP client for the browser and Node.js
- [Inquirer](https://www.npmjs.com/package/inquirer) - A collection of common interactive command-line user interfaces
- [Winston](https://www.npmjs.com/package/winston) - A versatile logging library for Node.js

---

**Happy Coding! 🚀**

