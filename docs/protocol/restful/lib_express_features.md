# Key Functions of Express in TypeScript: A Comprehensive Guide

Express is one of the most popular web frameworks for Node.js, known for its simplicity and flexibility. When combined with TypeScript, Express becomes an even more powerful tool due to TypeScript’s static typing and autocompletion features. This article introduces the key functions of Express in TypeScript and highlights how the addition of TypeScript improves development workflows.

## 1. **App Creation**
The first step in building an Express application is to create an instance of the application using the `express()` function. With TypeScript, this app instance can be typed as `Application`, providing better code autocompletion and type safety.

```typescript
import express, { Application } from 'express';

const app: Application = express(); // TypeScript infers the Application type
```

In this example, `app` is typed as `Application`, ensuring that any method calls or property accesses are properly checked during development.

## 2. **Routing**
Express’s routing system is one of its most essential features, enabling developers to handle different HTTP methods (GET, POST, PUT, DELETE) easily. When using TypeScript, the `Request` and `Response` objects are strongly typed, ensuring that the developer can access request data or send responses with greater confidence.

```typescript
import { Request, Response } from 'express';

app.get('/api/users', (req: Request, res: Response) => {
  res.send('User List');
});
```

In this example, `Request` and `Response` are imported from Express and explicitly typed in the route handler. This ensures that any request data (such as `req.body`, `req.params`, or `req.query`) and response methods (such as `res.send()` or `res.json()`) are type-checked.

## 3. **Middleware**
Express allows the use of middleware functions to process requests before they reach the intended route handler. Middleware can perform operations like authentication, logging, and request parsing. TypeScript ensures that the middleware functions are properly typed, making the code more predictable and robust.

```typescript
app.use((req: Request, res: Response, next: Function) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});
```

This middleware logs the HTTP method and the URL of each incoming request. The `next()` function passes control to the next middleware or route handler.

## 4. **Error Handling**
Custom error-handling middleware is crucial in Express applications. TypeScript allows you to properly type the error and handle different kinds of exceptions effectively.

```typescript
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
```

Here, `Error` is strongly typed, ensuring that the error object passed to this middleware conforms to TypeScript's expectations, leading to better debugging and handling.

## 5. **Typed Request and Response**
One of the most beneficial features of using Express with TypeScript is the strong typing of `Request` and `Response` objects. This reduces errors when accessing request data or sending responses and improves the development experience through autocompletion.

```typescript
app.post('/api/data', (req: Request, res: Response) => {
  const data: any = req.body;  // Type-check incoming data
  res.status(201).send(data);
});
```

In this example, the incoming request data is accessed via `req.body`, which is properly typed, reducing runtime errors when handling data.

## 6. **Server Setup**
Finally, Express allows you to easily start your web server using the `listen()` function. TypeScript ensures that any callback functions associated with the server setup are correctly typed.

```typescript
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

In this example, the server is started on port 3000, and TypeScript ensures that the callback function passed to `listen()` is properly typed.


## 7. **Protocols Supported by Express**

Express is primarily designed to work with HTTP and HTTPS, the fundamental protocols of the web. However, Express can also indirectly support other protocols through middleware or external libraries. This article explores the protocols supported by Express, with TypeScript examples demonstrating how to implement them.

### a) **HTTP (Hypertext Transfer Protocol)**

HTTP is the core protocol used by Express, making it possible to handle standard web requests such as GET, POST, PUT, and DELETE. TypeScript ensures that the routing methods (e.g., `app.get()`, `app.post()`) are typed correctly, improving the development experience.

```typescript
import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

In this basic HTTP server example, TypeScript helps type the request and response objects, making the code more predictable and error-free.

### b) **HTTPS (Hypertext Transfer Protocol Secure)**

Express also supports HTTPS, which encrypts communication between clients and servers using SSL/TLS. This requires you to set up SSL certificates. TypeScript helps ensure that the HTTPS configuration is typed correctly.

```typescript
import express, { Request, Response } from 'express';
import https from 'https';
import fs from 'fs';

const app = express();

// Load SSL certificate and private key
const options = {
  key: fs.readFileSync('path/to/your/private.key'),
  cert: fs.readFileSync('path/to/your/certificate.crt'),
};

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Secure World!');
});

// Create an HTTPS server
https.createServer(options, app).listen(3443, () => {
  console.log('Secure server running on https://localhost:3443');
});
```

In this example, Express serves over HTTPS by loading SSL certificates and keys. The server runs securely on port 3443, and TypeScript provides the necessary type safety for the HTTPS setup.

### c) **WebSocket (via Middleware)**

Although Express doesn’t natively support WebSocket, it can be integrated with WebSocket libraries like `ws` or `socket.io` to enable real-time communication. TypeScript ensures that both the Express routes and WebSocket handling are typed correctly.

```typescript
import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();
const server = app.listen(3000);

// WebSocket server setup
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send('Hello from server!');
  });
});

app.get('/', (req, res) => {
  res.send('WebSocket server is running!');
});
```

Here, a WebSocket server is set up to run alongside the Express server. TypeScript helps ensure that the WebSocket messages and Express routes are properly typed.

### d) **HTTP/2**

While Express does not natively support HTTP/2, it can be configured to work with Node.js’s built-in `http2` module. HTTP/2 improves performance by enabling multiplexing, header compression, and server push. TypeScript provides type safety throughout this configuration process.

```typescript
import express, { Request, Response } from 'express';
import http2 from 'http2';
import fs from 'fs';

const app = express();

const serverOptions = {
  key: fs.readFileSync('path/to/private.key'),
  cert: fs.readFileSync('path/to/certificate.crt'),
};

const server = http2.createSecureServer(serverOptions, app);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello HTTP/2 World!');
});

server.listen(8443, () => {
  console.log('HTTP/2 server running on https://localhost:8443');
});
```

This example demonstrates how to create an HTTP/2 server with Express. The server runs securely on port 8443, and TypeScript ensures that the request and response objects are correctly typed.

## Summary

Express is a robust and flexible web framework, and when combined with TypeScript, it offers several key advantages:

- **Typed Application** creation leads to better configuration.
- **Typed Route Handling** improves code predictability by enforcing types on request and response objects.
- **Middleware and Error Handling** benefit from strong typing, enhancing control flow and error management.
- **Typed Request and Response** objects reduce runtime errors through autocompletion and type safety.
- **Typed Server Setup** ensures accurate server configuration.

By incorporating TypeScript, developers can create more maintainable, bug-free web applications with improved type checking throughout the process.

In terms of protocols, Express natively supports:
1. **HTTP** – Typed for greater predictability.
2. **HTTPS** – Secure communication with SSL/TLS support.
3. **WebSocket** – Via third-party libraries like `ws` or `socket.io`.
4. **HTTP/2** – Supported through Node.js’s `http2` module for faster communication.

Express’s flexibility allows it to handle other protocols via middleware or external libraries. TypeScript enhances this by providing type safety, helping developers avoid errors and write cleaner, maintainable code.