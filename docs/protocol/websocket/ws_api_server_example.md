# Building a API Server Component over WebSocket

Designing an API server using **`uWebSockets.js` (uWS)** with **TypeScript** in an Object-Oriented (OO) manner requires a clean architecture that separates concerns like routing, controllers, and services. With `uWebSockets.js`, we get a high-performance WebSocket and HTTP server, which allows us to build real-time applications while keeping our server efficient and scalable.

In this article, we'll design a server that includes both **HTTP RESTful API** and **WebSocket** communication using `uWS` and TypeScript, following the OO design principles.

### Table of Contents

1. Project Setup and Dependencies
2. Application Architecture
3. Base HTTP and WebSocket Server Class
4. UserController: Managing User Routes
5. WebSocketController: Handling WebSocket Connections
6. Service Layer for Business Logic
7. Running the Server
8. Conclusion

---

### 1. Project Setup and Dependencies

Start by creating a new project and installing **`uWebSockets.js`** and **TypeScript**:

```bash
npm init -y
npm install uWebSockets.js
npm install typescript @types/node --save-dev
```

Next, initialize **TypeScript** with the following `tsconfig.json`:

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

### 2. Application Architecture

Here’s the architecture of the server:

```
src/
  ├── controllers/
  │     ├── userController.ts
  │     └── websocketController.ts
  ├── services/
  │     └── userService.ts
  ├── app.ts
  └── server.ts
```

### 3. Base HTTP and WebSocket Server Class

We'll first create a base class that initializes both HTTP and WebSocket routes. This class will manage HTTP requests for API routes and WebSocket connections using `uWS`.

#### Base Server Class

```typescript
// src/app.ts
import uWS from 'uWebSockets.js';

export class App {
  private app: uWS.TemplatedApp;

  constructor() {
    this.app = uWS.App();
  }

  // HTTP GET Route
  public get(route: string, handler: uWS.HttpHandler): void {
    this.app.get(route, handler);
  }

  // HTTP POST Route
  public post(route: string, handler: uWS.HttpHandler): void {
    this.app.post(route, handler);
  }

  // WebSocket Route
  public ws(route: string, options: uWS.WebSocketBehavior): void {
    this.app.ws(route, options);
  }

  // Listen on a port
  public listen(port: number, callback: (listenSocket: any) => void): void {
    this.app.listen(port, (token) => {
      if (token) {
        console.log(`Server is listening on port ${port}`);
        callback(token);
      } else {
        console.log('Failed to listen to port');
      }
    });
  }
}
```

#### Explanation:
- The `App` class encapsulates the core `uWS` app. It provides methods to handle HTTP routes (`get`, `post`) and WebSocket routes (`ws`).
- The `listen` method binds the server to a port and starts listening for requests.

---

### 4. UserController: Managing User Routes

Next, let's create the `UserController`, which will handle basic HTTP requests for the `/users` route (for CRUD operations).

#### User Controller

```typescript
// src/controllers/userController.ts
import { App } from '../app';
import { UserService } from '../services/userService';

export class UserController {
  private userService: UserService;

  constructor(app: App) {
    this.userService = new UserService();

    // Define routes
    app.get('/users', this.getAllUsers.bind(this));
    app.post('/users', this.createUser.bind(this));
  }

  // Handle GET /users
  private getAllUsers(res: uWS.HttpResponse, req: uWS.HttpRequest): void {
    const users = this.userService.getAllUsers();
    res.end(JSON.stringify(users));
  }

  // Handle POST /users
  private createUser(res: uWS.HttpResponse, req: uWS.HttpRequest): void {
    let buffer: Array<any> = [];

    // Collect data chunks
    res.onData((chunk, isLast) => {
      buffer.push(Buffer.from(chunk));
      if (isLast) {
        const data = JSON.parse(Buffer.concat(buffer).toString());
        const newUser = this.userService.createUser(data.name, data.email);
        res.end(JSON.stringify(newUser));
      }
    });

    // Handle potential aborted requests
    res.onAborted(() => {
      console.log('Request aborted by client');
    });
  }
}
```

#### Explanation:
- `UserController` defines HTTP routes for `/users` (`GET` and `POST`).
- **getAllUsers**: Fetches all users via the `UserService` and sends a JSON response.
- **createUser**: Collects incoming data, creates a new user, and sends the newly created user back as a response.

---

### 5. WebSocketController: Handling WebSocket Connections

Now, let's create a `WebSocketController` to handle WebSocket communication for real-time updates.

#### WebSocket Controller

```typescript
// src/controllers/websocketController.ts
import { App } from '../app';

export class WebSocketController {
  constructor(app: App) {
    // Define WebSocket route
    app.ws('/*', {
      open: (ws) => {
        console.log('A new WebSocket connection has been opened.');
      },
      message: (ws, message, isBinary) => {
        const text = Buffer.from(message).toString();
        console.log(`Received message: ${text}`);

        // Echo the message back
        ws.send(`Echo: ${text}`, isBinary);
      },
      close: (ws, code, message) => {
        console.log('WebSocket connection closed.');
      }
    });
  }
}
```

#### Explanation:
- The `WebSocketController` handles WebSocket connections and defines methods to manage different events like `open`, `message`, and `close`.
- **message**: Echoes the received message back to the client.
- This controller can be extended to handle more complex interactions like broadcasting messages to other connected clients.

---

### 6. Service Layer for Business Logic

The service layer handles the business logic of the application. In this case, `UserService` will manage user data in memory.

#### User Service

```typescript
// src/services/userService.ts
import { User } from '../models/userModel';

export class UserService {
  private users: User[] = [];
  private idCounter = 1;

  // Get all users
  public getAllUsers(): User[] {
    return this.users;
  }

  // Create a new user
  public createUser(name: string, email: string): User {
    const newUser = new User(this.idCounter++, name, email);
    this.users.push(newUser);
    return newUser;
  }
}
```

#### Explanation:
- `UserService` manages an array of users and supports operations like fetching all users and creating new users.
- This simple service acts as a data source for the controller, and it can be extended to include update and delete operations.

#### User Model

```typescript
// src/models/userModel.ts
export class User {
  constructor(public id: number, public name: string, public email: string) {}
}
```

---

### 7. Running the Server

Finally, we can create the main entry point for the server and start listening on a specific port.

#### Server Initialization

```typescript
// src/server.ts
import { App } from './app';
import { UserController } from './controllers/userController';
import { WebSocketController } from './controllers/websocketController';

// Create an instance of the App
const app = new App();

// Initialize controllers
new UserController(app);
new WebSocketController(app);

// Start the server
app.listen(9001, (listenSocket) => {
  console.log('Server is running on http://localhost:9001');
});
```

#### Explanation:
- We instantiate the `App` class and pass it to both the `UserController` and `WebSocketController` for route and WebSocket management.
- The server listens on port `9001` and outputs a message when successfully started.

---

### 8. Conclusion

In this guide, we designed an **Object-Oriented** API server using **`uWebSockets.js`** and **TypeScript**. The architecture cleanly separates HTTP routes and WebSocket handling into different controllers, with a dedicated service layer for managing business logic.

#### Key Takeaways:
- **OO Design**: The server components (HTTP, WebSocket, controllers, and services) were designed using Object-Oriented principles to ensure scalability and maintainability.
- **High-Performance**: By leveraging `uWebSockets.js`, the server can handle a large number of WebSocket and HTTP connections efficiently.
- **Modularity**: The modular structure allows easy extension, so you can add more controllers or services as needed for new features.

This setup provides a solid foundation for building high-performance real-time applications like multiplayer games, collaborative tools, or live chat systems.


