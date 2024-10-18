## WebSocket API Server and Client Project (TypeScript)

In this example, I will show how to design a **WebSocket API** using **uWebSockets.js** (for the server) and **ws** (for the client) in Node.js with TypeScript, following Object-Oriented (OO) principles. 

### Server-Side (ws_api_server.ts)

```typescript
import uWS from 'uWebSockets.js';  // Import uWebSockets.js library

// WebSocketServer class to manage WebSocket server logic
class WebSocketServer {
    private port: number;    // The port on which the server will run
    private wsApp: uWS.TemplatedApp; // uWS server instance

    constructor(port: number) {
        this.port = port;
        this.wsApp = uWS.App(); // Create a new uWS server instance
    }

    // Method to start the WebSocket server
    public start(): void {
        this.wsApp.ws('/*', {
            // Event handler for new WebSocket connections
            open: (ws) => {
                console.log('Client connected');
                ws.send('Welcome to the WebSocket server!');
            },

            // Event handler for incoming messages
            message: (ws, message) => {
                const receivedMessage = Buffer.from(message).toString();
                console.log('Received message:', receivedMessage);

                // Echo the received message back to the client
                ws.send(`Echo: ${receivedMessage}`);
            },

            // Event handler for connection closure
            close: (ws, code, message) => {
                console.log('Client disconnected');
            }
        });

        // Listen on the specified port
        this.wsApp.listen(this.port, (token) => {
            if (token) {
                console.log(`WebSocket server is running on ws://localhost:${this.port}`);
            } else {
                console.log(`Failed to start WebSocket server on port ${this.port}`);
            }
        });
    }
}

// Create and start a WebSocket server on port 9001
const server = new WebSocketServer(9001);
server.start();
```

### Explanation:

1. **uWebSockets.js**: We're using the uWS library, which is extremely fast and scalable for WebSocket handling.
2. **WebSocketServer Class**: 
   - Manages WebSocket server logic and connection handling.
   - The `start` method listens for client connections, handles incoming messages, and closes the connection.
3. **Events**:
   - `open`: Triggered when a client connects, and the server sends a welcome message.
   - `message`: Handles incoming messages and echoes them back to the client.
   - `close`: Handles connection closures.

---

### Client-Side (ws_api_client.ts)

```typescript
import WebSocket from 'ws';  // Import ws library for WebSocket client

// WebSocketClient class to manage client-side WebSocket logic
class WebSocketClient {
    private ws: WebSocket | null = null;  // WebSocket instance

    // Method to connect to the WebSocket server
    public connect(url: string): void {
        this.ws = new WebSocket(url);

        // Event handler for when the connection is opened
        this.ws.on('open', () => {
            console.log('Connected to WebSocket server');
            this.ws?.send('Hello, WebSocket server!');  // Send initial message to server
        });

        // Event handler for when a message is received
        this.ws.on('message', (message: string) => {
            console.log('Received from server:', message);
        });

        // Event handler for when the connection is closed
        this.ws.on('close', () => {
            console.log('Disconnected from WebSocket server');
        });

        // Event handler for when an error occurs
        this.ws.on('error', (error: Error) => {
            console.error('WebSocket error:', error.message);
        });
    }

    // Method to send a message to the WebSocket server
    public sendMessage(message: string): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(message);  // Send message to the server if the connection is open
        } else {
            console.log('Cannot send message, WebSocket is not open');
        }
    }

    // Method to close the WebSocket connection
    public close(): void {
        this.ws?.close();
    }
}

// Create a WebSocket client and connect to the server
const client = new WebSocketClient();
client.connect('ws://localhost:9001');  // Connect to WebSocket server on localhost:9001

// Send a test message after 2 seconds
setTimeout(() => {
    client.sendMessage('Test message from client');
}, 2000);

// Close the connection after 5 seconds
setTimeout(() => {
    client.close();
}, 5000);
```

### Explanation:

1. **ws**: The `ws` library is used for WebSocket clients.
2. **WebSocketClient Class**:
   - Manages client connection and communication with the server.
   - The `connect` method establishes the connection and sets up event handlers for the WebSocket lifecycle (`open`, `message`, `close`, `error`).
3. **Methods**:
   - `sendMessage`: Sends messages to the server if the WebSocket connection is open.
   - `close`: Closes the WebSocket connection.
4. **Lifecycle**:
   - Connects to the WebSocket server on `ws://localhost:9001`.
   - Sends a message to the server and handles responses.
   - Automatically closes the connection after a delay.

---

### Running the WebSocket Server and Client

1. **Install the dependencies**:
   - Install `uWebSockets.js` for the server:
     ```bash
     npm install uNetworking/uWebSockets.js#v20.48.0
     ```
   - Install `ws` for the client:
     ```bash
     npm install ws
     ```

2. **Run the server**:
   ```bash
   npx ts-node src/apps/api_websocket/ws_api_server.ts
   ```

3. **Run the client**:
   ```bash
   npx ts-node src/apps/api_websocket/ws_api_client.ts
   ```

---

### Summary

- **WebSocket Server**:
  - Built using **uWebSockets.js**, it handles client connections, incoming messages, and disconnections.
  - The server listens for connections on `ws://localhost:9001`.
  - It echoes back any message received from the client.

- **WebSocket Client**:
  - Built using the **ws** library, it connects to the WebSocket server and communicates by sending and receiving messages.
  - Sends an initial message on connection, sends a test message after a 2-second delay, and closes the connection after 5 seconds.

This WebSocket setup using **Object-Oriented** design principles allows you to manage WebSocket communication in a clean and scalable way.

