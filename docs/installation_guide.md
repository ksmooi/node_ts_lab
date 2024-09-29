# Instruction to Build a Node.js Project with TypeScript

This guide will walk you through setting up a **Node.js project** using **TypeScript**. You will also use `ts-node` and `tsconfig-paths` for running TypeScript directly, along with tools like **Nodemon**, **PM2**, and **SQLite3**. This setup will also configure path aliases for cleaner imports.

###  Steps Overview:
1. Project Initialization
2. Installing Dependencies
3. Setting Up Directory Structure
4. Configuring `tsconfig.json` and `package.json`
5. Writing Code (`Queue` data structure example)
6. Running the Project


##  Step 1: Project Initialization

First, create your project directory and initialize a new **Node.js** project with `npm init`.

```bash
mkdir node_ts_lab
cd node_ts_lab

npm init -y
```

This creates a `package.json` file that will hold all your project’s metadata and dependencies.


##  Step 2: Install Necessary Dependencies

We will install **TypeScript**, **tsconfig-paths**, **SQLite3**, **Nodemon**, and **PM2**.

###  Install TypeScript and Node.js Types:
```bash
npm install typescript @types/node --save-dev
```

- **TypeScript** is the language we will use.
- **@types/node** provides type definitions for Node.js.

###  Install `tsconfig-paths`:
```bash
npm install tsconfig-paths --save-dev
```

- **tsconfig-paths** enables path alias resolution in `tsconfig.json` when running TypeScript files with `ts-node`.


###  Installing Required Packages for the Project

To set up your Node.js application with TypeScript and support for various libraries like databases, messaging queues, WebSockets, cloud storage, and more, follow the steps below to install the necessary dependencies and TypeScript definitions.

1. **Install Key Libraries**:
   This command installs the main packages required for your project. These include popular libraries for databases, messaging, cloud providers, WebSockets, and utilities.
   
   ```bash
   npm install nodemon pm2 commander sqlite3 pg mysql2 mongodb ioredis dgraph-js qdrant-client amqplib express axios ws socket.io socket.io-client @grpc/grpc-js @grpc/proto-loader @aws-sdk/client-s3 @aws-sdk/client-sns @aws-sdk/client-sqs @azure/identity @azure/storage-blob @google-cloud/storage dotenv class-validator typeorm
   ```

   - **Database libraries**: `sqlite3`, `pg` (PostgreSQL), `mysql2`, `mongodb`, `ioredis` (Redis), `dgraph-js`, `qdrant-client` (vector database).
   - **Messaging libraries**: `amqplib` (RabbitMQ), `@aws-sdk/client-sns`, `@aws-sdk/client-sqs`.
   - **Cloud services**:
     - AWS: `@aws-sdk/client-s3` (S3 storage), `@aws-sdk/client-sns` (SNS), `@aws-sdk/client-sqs` (SQS).
     - Azure: `@azure/identity`, `@azure/storage-blob`.
     - Google Cloud: `@google-cloud/storage`.
   - **WebSockets**: `ws`, `socket.io`, `socket.io-client`.
   - **gRPC**: `@grpc/grpc-js`, `@grpc/proto-loader`.
   - **Express**: For building the server.
   - **Axios**: For making HTTP requests.
   - **Environment management**: `dotenv`.
   - **Validation**: `class-validator`.
   - **ORM**: `typeorm` for database integration.

2. **Install Development TypeScript Definitions**:
   Install the necessary TypeScript type definitions for development to enable strong typing for the above libraries.
   
   ```bash
   npm install --save-dev @types/node @types/nodemon @types/commander @types/sqlite3 @types/express @types/ws @types/socket.io @types/socket.io-client @types/pg @types/mongodb
   ```

   - **@types/node**: Type definitions for Node.js.
   - **@types/nodemon**: Types for `nodemon`, used during development for automatic restarts.
   - **@types/commander**: CLI helper types for `commander`.
   - **@types/sqlite3**: Types for SQLite3.
   - **@types/express**: Types for the Express framework.
   - **@types/ws**: Types for the `ws` WebSocket library.
   - **@types/socket.io** and **@types/socket.io-client**: Types for the Socket.IO server and client.
   - **@types/pg**: PostgreSQL client types.
   - **@types/mongodb**: MongoDB driver types.

3. **Verify Installations**:
   Once the dependencies are installed, you can verify them by running:

   ```bash
   npm list --depth=0
   ```

   This command will show all the installed packages without listing their sub-dependencies. Make sure all required packages are listed.



Here’s the completed section with explanations for each directory:


## Step 3: Create Directory Structure

Now, create the directory structure for your project to organize your code properly.

```bash
mkdir -p src/modules
mkdir -p src/services
mkdir -p src/demo
```

- **`src/modules`**: This directory will contain the core business logic of your application, usually broken into different modules or features. Each module can represent a specific feature or part of the application, such as user authentication, product management, or API integrations. For example, you can have subdirectories like `src/modules/auth` for authentication and `src/modules/user` for user-related logic.

- **`src/services`**: The `services` directory will hold services that contain reusable logic, typically related to external integrations or general utilities. These services are often shared across different modules. For example, you can have services for interacting with databases, messaging queues, or third-party APIs, like `src/services/database.ts` or `src/services/mailer.ts`.

- **`src/demo`**: This directory will store example or demo code that helps you test different features or concepts within your project. It's a sandbox where you can try out new ideas, implement proof-of-concept code, or keep scripts that demonstrate how specific parts of your app work. For instance, you can have files like `src/demo/socket-demo.ts` or `src/demo/redis-demo.ts` for testing different technologies.


##  Step 4: Configure `tsconfig.json` and `package.json`

###  4.1 Edit `tsconfig.json`:
The `tsconfig.json` file configures how TypeScript compiles your project. It will also define path aliases for simpler imports.

```bash
vi tsconfig.json
```

Add the following configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "baseUrl": "./src",   // Set the base URL for path aliases
    "paths": {
      "modules/*": ["modules/*"]  // Create alias for the "modules" directory
    }
  },
  "include": ["src/**/*.ts"],  // Include all TypeScript files in src/
  "exclude": ["node_modules"]  // Exclude node_modules
}
```

This `tsconfig.json` does the following:
- **`baseUrl`**: Sets the base directory to `./src` so that all imports are relative to it.
- **`paths`**: Defines `modules/*` as an alias for `src/modules/*`, allowing you to import from `modules/` instead of using long relative paths.

###  4.2 Edit `package.json`:
We will add scripts to `package.json` for building, running, and using Nodemon.

```bash
vi package.json
```

Add the following under the `"scripts"` section:

```json
"scripts": {
  "ts": "npx ts-node -r tsconfig-paths/register",  // Use ts-node with path alias resolution
  "build": "tsc",  // Compile the TypeScript project
  "start": "node dist/index.js",  // Start the project using Node
  "dev": "nodemon -r tsconfig-paths/register src/index.ts"  // Use Nodemon for development with path alias resolution
}
```

- **`ts`**: Provides a shortcut to run TypeScript files directly using `ts-node` and `tsconfig-paths`.
- **`build`**: Runs the TypeScript compiler (`tsc`), outputting JavaScript files in the `dist/` folder.
- **`start`**: Starts the compiled app from `dist/index.js`.
- **`dev`**: Runs Nodemon, automatically restarting the app when changes are made, and uses path aliases with `tsconfig-paths`.


##  Step 5: Writing Code

###  5.1 Create a `Queue` Data Structure Module

Create the `Queue` class inside `queue.ts`.

```bash
vi src/modules/dsa/queue.ts
```

Here is a simple `Queue` implementation:

```typescript
// src/modules/dsa/queue.ts

export class Queue<T> {
    private storage: T[] = [];

    enqueue(item: T): void {
        this.storage.push(item);
    }

    dequeue(): T | undefined {
        return this.storage.shift();
    }

    peek(): T | undefined {
        return this.storage[0];
    }

    size(): number {
        return this.storage.length;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    [Symbol.iterator](): Iterator<T> {
        let index = 0;
        const storage = this.storage;

        return {
            next(): IteratorResult<T> {
                if (index < storage.length) {
                    return { value: storage[index++], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
}
```

###  5.2 Create a Practice Script for the Queue

Create a practice script to use the `Queue` class:

```bash
vi src/dsa/practice_queue.ts
```

Here’s how you can import and use the `Queue` class in `practice_queue.ts`:

```typescript
// src/dsa/practice_queue.ts

import { Queue } from 'modules/dsa/queue';  // Import the Queue class

const numberQueue = new Queue<number>();

numberQueue.enqueue(10);
numberQueue.enqueue(20);
numberQueue.enqueue(30);

console.log('Initial Queue:', [...numberQueue]);  // Use the iterator to print the queue

const firstItem = numberQueue.dequeue();
console.log('Dequeued item:', firstItem);  // Should print 10

const peekItem = numberQueue.peek();
console.log('Peek item:', peekItem);  // Should print 20

console.log('Queue size:', numberQueue.size());  // Should print 2
```

---

##  Step 6: Running the Project

###  6.1 Compile the Project

Before running the project, you can compile the TypeScript files into JavaScript:

```bash
npm run build
```

This will generate JavaScript files inside the `dist/` directory.

###  6.2 Run the Practice Script

To run the `practice_queue.ts` script using **ts-node** and **tsconfig-paths** for path alias support, use the following command:

```bash
npx ts-node -r tsconfig-paths/register src/demo/dsa/queue_demo.ts
```

Alternatively, you can create an alias in `package.json` (as described above) and run it using:

```bash
npm run ts src/demo/dsa/queue_demo.ts
```

###  6.3 Running in Development Mode with Nodemon

To run the app in development mode and automatically reload when changes are detected:

```bash
npm run dev
```

This will start the application using **Nodemon** with path alias support via **tsconfig-paths**.



##  Conclusion

This guide walks you through setting up a **Node.js** project with **TypeScript**, including support for path aliases, automatic reload during development, and process management for production. You’ve also implemented a simple `Queue` data structure module and created a practice script to test it.

With this setup, you’re ready to start building more complex applications using Node.js and TypeScript!

