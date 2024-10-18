# Building a RESTful API Server and Client with Express and TypeScript

In modern web applications, designing an efficient and scalable communication system between the client and server is essential. This article demonstrates how to build a **RESTful API server** and a corresponding **client** using **Express** and **TypeScript**. The system covers the following functionality:
- **Request and response** flow between client and server.
- **Subscription** and **cancellation** mechanisms for event notifications.
- Real-time **notifications/events** from server to client using WebSockets.

We will design both the server and client, handling traditional API requests and WebSocket-based notifications for real-time communication.

## Server-Side: RESTful API with Subscription and Notification

The server is designed with Express to handle HTTP requests, as well as WebSocket connections for real-time event notifications. The server provides the following API endpoints:
1. `POST /subscribe`: Client subscribes to notifications.
2. `POST /cancel`: Client cancels the subscription.
3. `GET /data`: Client requests specific data from the server.
4. WebSocket connection for event notifications from the server to subscribed clients.

### 1.1 Server Implementation

**Project Structure:**
```
/server
├── src
│   ├── app.ts        // Main application
│   ├── routes.ts     // API routes
│   └── events.ts     // WebSocket event handling
├── package.json
└── tsconfig.json
```

### 1.2 `app.ts`: Main Application

The server is initialized using Express and listens for HTTP requests while also setting up a WebSocket server for real-time event notifications.

```typescript
import express, { Application, Request, Response } from 'express';
import { Server as WebSocketServer } from 'ws';
import routes from './routes';
import { handleNotifications } from './events';

const app: Application = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Register API routes
app.use('/api', routes);

// Start the HTTP server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// WebSocket server for notifications
const wss = new WebSocketServer({ server });
handleNotifications(wss); // Setup WebSocket for event notifications
```

This file configures the Express server and WebSocket server, handling client connections for HTTP requests and WebSocket events.

### 1.3 `routes.ts`: API Endpoints

The `routes.ts` file defines the API endpoints for subscription management, data retrieval, and cancellation.

```typescript
import express, { Request, Response } from 'express';

const router = express.Router();
let subscribers: string[] = [];  // List of subscribers

// Subscribe to notifications
router.post('/subscribe', (req: Request, res: Response) => {
  const { clientId } = req.body;
  if (subscribers.includes(clientId)) {
    return res.status(400).json({ message: 'Already subscribed' });
  }
  subscribers.push(clientId);
  res.status(200).json({ message: `Subscribed with clientId: ${clientId}` });
});

// Cancel subscription
router.post('/cancel', (req: Request, res: Response) => {
  const { clientId } = req.body;
  subscribers = subscribers.filter(subscriber => subscriber !== clientId);
  res.status(200).json({ message: `Cancelled subscription for clientId: ${clientId}` });
});

// Request data from the server
router.get('/data', (req: Request, res: Response) => {
  res.status(200).json({ data: 'Here is your data!' });
});

export default router;
```

This file handles basic subscription and cancellation logic, allowing clients to subscribe or unsubscribe from notifications and request data from the server.

### 1.4 `events.ts`: WebSocket Event Handling

WebSockets enable the server to notify clients in real time. The `events.ts` file manages WebSocket connections and broadcasts events to subscribed clients.

```typescript
import { Server as WebSocketServer } from 'ws';

interface Client {
  id: string;
  ws: WebSocket;
}

let clients: Client[] = [];

// Handle WebSocket notifications
export function handleNotifications(wss: WebSocketServer) {
  wss.on('connection', (ws: WebSocket) => {
    let clientId: string = '';

    // Listen for messages from the client
    ws.on('message', (message: string) => {
      const { action, id } = JSON.parse(message);
      clientId = id;

      if (action === 'subscribe') {
        clients.push({ id: clientId, ws });
        console.log(`Client ${clientId} subscribed`);
      }
    });

    // Handle client disconnection
    ws.on('close', () => {
      clients = clients.filter(client => client.id !== clientId);
      console.log(`Client ${clientId} disconnected`);
    });
  });
}

// Broadcast event to all subscribed clients
export function broadcastEvent(event: string) {
  clients.forEach(client => {
    client.ws.send(JSON.stringify({ event }));
  });
}
```

This file listens for WebSocket connections from clients, allowing them to subscribe to events. It also handles broadcasting real-time notifications to connected clients.

## Client-Side: API Client with Subscription Management

The client interacts with the REST API for subscription and cancellation, and also connects to the WebSocket server for receiving real-time event notifications.

### 2.1 Client Implementation

**Project Structure:**
```
/client
├── src
│   ├── app.ts        // API interaction with the server
│   └── websocket.ts  // WebSocket connection
├── package.json
└── tsconfig.json
```

### 2.2 `app.ts`: Client Application

The client uses Express as an interface to send HTTP requests to the server’s API and establishes a WebSocket connection for event notifications.

```typescript
import express, { Request, Response } from 'express';
import axios from 'axios';
import { connectWebSocket } from './websocket';

const app = express();
const PORT = 4000;
const SERVER_URL = 'http://localhost:3000/api';

let clientId = 'client1'; // Unique identifier for the client

// Subscribe to notifications
app.post('/subscribe', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${SERVER_URL}/subscribe`, { clientId });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Subscription failed' });
  }
});

// Cancel subscription
app.post('/cancel', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${SERVER_URL}/cancel`, { clientId });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Cancellation failed' });
  }
});

// Request data from the server
app.get('/data', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${SERVER_URL}/data`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get data' });
  }
});

// Start client server
app.listen(PORT, () => {
  console.log(`Client running on http://localhost:${PORT}`);
  connectWebSocket(clientId);  // Connect to WebSocket for event notifications
});
```

This file sets up HTTP routes to communicate with the server, allowing the client to subscribe to or cancel notifications and request data.

### 2.3 `websocket.ts`: WebSocket Connection

This file manages the WebSocket connection, enabling the client to receive notifications in real time.

```typescript
import WebSocket from 'ws';

export function connectWebSocket(clientId: string) {
  const ws = new WebSocket('ws://localhost:3000');

  // Open WebSocket connection and send subscription message
  ws.on('open', () => {
    console.log('WebSocket connection opened');
    ws.send(JSON.stringify({ action: 'subscribe', id: clientId }));
  });

  // Listen for messages from the server
  ws.on('message', (message: string) => {
    const { event } = JSON.parse(message);
    console.log(`Received event: ${event}`);
  });

  // Handle WebSocket close event
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
}
```

This module connects the client to the WebSocket server, allowing it to receive and log notifications sent by the server.

## Testing the API and Event Flow

To test the system, you can follow this workflow:
1. The client subscribes to the server’s notifications using `POST /subscribe`.
2. The client requests data from the server using `GET /data`.
3. The server broadcasts events to all subscribed clients through WebSocket.
4. The client can unsubscribe from notifications via `POST /cancel`.

### Example of Event Broadcasting

To simulate event broadcasting on the server, you can manually invoke the `broadcastEvent` function in `events.ts` to send notifications to subscribed clients.

```typescript
import { broadcastEvent } from './events';

// Simulate an event broadcast every 10 seconds
setInterval(() => {
  broadcastEvent('New event from server!');
}, 10000);
```

## Conclusion

This article demonstrates how to design a RESTful API server and client using **Express** and **TypeScript**, covering request/response patterns, subscription management, and real-time event notifications via WebSockets. The combination of REST and WebSocket provides a flexible, scalable system for real-time communication between client and server.

