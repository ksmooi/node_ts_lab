# Building a API Client Component over WebSocket

Designing an API client using the **`ws`** library with **TypeScript** and **Object-Oriented (OO)** principles allows us to encapsulate WebSocket connection logic into modular, reusable, and maintainable components. The client will handle WebSocket communication with the server, process incoming messages, and send data over the WebSocket connection.

In this guide, we'll build **WebSocket client components** using `ws` and TypeScript with an OO design. These components will abstract WebSocket communication, handle events, and provide a clean interface for sending and receiving messages.

### Table of Contents

1. Project Setup and Dependencies
2. Client Architecture Overview
3. Base WebSocket Client Class
4. UserWebSocketClient: Extending WebSocket Client for User Messaging
5. Error Handling and Connection Management
6. Example Usage and Integration
7. Conclusion

---

### 1. Project Setup and Dependencies

First, set up your project with **TypeScript** and the **`ws`** library, which will be used to handle WebSocket communication.

Run the following commands to initialize the project and install the necessary dependencies:

```bash
npm init -y
npm install ws
npm install typescript @types/ws --save-dev
```

Create a `tsconfig.json` for configuring TypeScript:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

### 2. Client Architecture Overview

We’ll design the client with the following structure:

```
src/
  ├── clients/
  │     ├── baseWebSocketClient.ts
  │     └── userWebSocketClient.ts
  └── app.ts
```

The **BaseWebSocketClient** will handle generic WebSocket functionality like connecting, sending, and receiving messages, and managing reconnections. The **UserWebSocketClient** will extend this base class to provide specific functionality for sending and receiving user-related messages.

---

### 3. Base WebSocket Client Class

The `BaseWebSocketClient` class encapsulates the basic functionality of opening a WebSocket connection, handling messages, and sending data to the server. It also handles events like `open`, `close`, and `error`.

#### Base WebSocket Client

```typescript
// src/clients/baseWebSocketClient.ts
import WebSocket from 'ws';

export class BaseWebSocketClient {
  private url: string;
  private ws: WebSocket | null = null;
  private reconnectInterval: number = 5000; // Retry every 5 seconds

  constructor(url: string) {
    this.url = url;
  }

  // Connect to the WebSocket server
  public connect(): void {
    this.ws = new WebSocket(this.url);

    // WebSocket open event
    this.ws.on('open', () => {
      console.log(`Connected to WebSocket server at ${this.url}`);
      this.onOpen();
    });

    // WebSocket message event
    this.ws.on('message', (message: WebSocket.Data) => {
      this.onMessage(message);
    });

    // WebSocket close event
    this.ws.on('close', (code, reason) => {
      console.log(`WebSocket connection closed: ${code} - ${reason}`);
      this.onClose();
      this.reconnect(); // Try to reconnect after close
    });

    // WebSocket error event
    this.ws.on('error', (error) => {
      console.error(`WebSocket error: ${error}`);
      this.onError(error);
    });
  }

  // Reconnect on close
  private reconnect(): void {
    setTimeout(() => {
      console.log(`Reconnecting to WebSocket server...`);
      this.connect();
    }, this.reconnectInterval);
  }

  // Send data to the WebSocket server
  public send(data: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    } else {
      console.error('WebSocket is not open. Cannot send message.');
    }
  }

  // Customizable event handlers
  protected onOpen(): void {
    console.log('WebSocket connection opened');
  }

  protected onMessage(message: WebSocket.Data): void {
    console.log(`Received message: ${message}`);
  }

  protected onClose(): void {
    console.log('WebSocket connection closed');
  }

  protected onError(error: Error): void {
    console.error('WebSocket encountered an error:', error);
  }
}
```

#### Explanation:
- **`connect()`**: Establishes a WebSocket connection to the specified `url` and sets up event listeners (`open`, `message`, `close`, `error`).
- **`send(data: string)`**: Sends data over the WebSocket connection if it's open.
- **Event handlers**: The methods `onOpen`, `onMessage`, `onClose`, and `onError` can be overridden in child classes for more specific functionality.
- **Reconnection logic**: If the WebSocket connection closes, the client will automatically try to reconnect after a set interval.

---

### 4. UserWebSocketClient: Extending WebSocket Client for User Messaging

The `UserWebSocketClient` will extend `BaseWebSocketClient` to handle user-specific messages such as sending and receiving messages related to user operations (e.g., login, user updates, etc.).

#### User WebSocket Client

```typescript
// src/clients/userWebSocketClient.ts
import { BaseWebSocketClient } from './baseWebSocketClient';

export class UserWebSocketClient extends BaseWebSocketClient {
  constructor(url: string) {
    super(url);
  }

  // Send a user message
  public sendUserMessage(userId: number, message: string): void {
    const payload = {
      type: 'user-message',
      userId,
      message,
    };
    this.send(JSON.stringify(payload));
  }

  // Override the message event handler to handle user-related messages
  protected onMessage(message: string): void {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type === 'user-message') {
      console.log(`User message received for userId ${parsedMessage.userId}: ${parsedMessage.message}`);
      this.handleUserMessage(parsedMessage);
    } else {
      console.log('Unknown message type:', parsedMessage);
    }
  }

  // Handle user-specific messages
  private handleUserMessage(parsedMessage: any): void {
    // Process user messages (e.g., display a message in a chat UI)
    console.log('Processing user message:', parsedMessage.message);
  }
}
```

#### Explanation:
- **`sendUserMessage()`**: Sends a user-specific message to the WebSocket server. The message is formatted as a JSON payload.
- **`onMessage()`**: Overrides the `onMessage()` method of the base class to handle messages related to user operations.
- **`handleUserMessage()`**: Processes incoming user messages and handles them accordingly (e.g., displaying the message in a chat UI).

---

### 5. Error Handling and Connection Management

Handling errors and managing the connection state is critical in real-time applications. In `BaseWebSocketClient`, error handling is centralized with the `onError()` method. Additionally, if the WebSocket connection closes unexpectedly, the `reconnect()` method ensures that the client attempts to reconnect automatically.

You can extend the `onError()` and `onClose()` methods in child classes like `UserWebSocketClient` for more specific behavior, such as retry strategies, logging, or alerting users when the connection drops.

---

### 6. Example Usage and Integration

Now that we have the `UserWebSocketClient`, let's create a simple example that demonstrates how to use it in an application.

```typescript
// src/app.ts
import { UserWebSocketClient } from './clients/userWebSocketClient';

async function startApp() {
  const wsUrl = 'ws://localhost:8080';  // Replace with your WebSocket server URL

  // Create an instance of the UserWebSocketClient
  const userClient = new UserWebSocketClient(wsUrl);

  // Connect to the WebSocket server
  userClient.connect();

  // Simulate sending a user message
  setTimeout(() => {
    userClient.sendUserMessage(1, 'Hello from user 1');
  }, 2000);

  // Simulate sending another user message
  setTimeout(() => {
    userClient.sendUserMessage(2, 'Hi, this is user 2');
  }, 4000);
}

startApp();
```

#### Explanation:
- **UserWebSocketClient** is used to establish a connection to the WebSocket server.
- After a successful connection, the client sends user-specific messages (`userClient.sendUserMessage(1, "Hello")`).
- The WebSocket messages are handled and logged by the client when they are received.

---

### 7. Conclusion

By designing **WebSocket client components** using **TypeScript** and **Object-Oriented** principles, we created reusable and modular WebSocket clients that can be extended for specific use cases. The `BaseWebSocketClient` encapsulates the core WebSocket communication logic, while the `UserWebSocketClient` builds on top of it to handle user-related WebSocket events.

#### Key Benefits of This Design:
1. **Reusability**: The `BaseWebSocketClient` can be extended to handle different types of WebSocket events for various features.
2. **Separation of Concerns**: The design keeps WebSocket logic separate from the rest of the application, making it easier to manage and test.
3. **Scalability**: New types of WebSocket messages can be easily handled by extending the base client class and overriding specific methods.

This approach provides a solid foundation for building robust, real-time applications with WebSocket communication in **Node.js** using **TypeScript**.

