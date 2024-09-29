# Installing and Running Node.js with Docker: A Step-by-Step Guide

Docker is a powerful tool for containerizing applications, enabling consistent development, testing, and production environments. In this guide, we will walk through how to set up a Node.js project using TypeScript and containerize it with Docker. This tutorial is designed for developers who want to streamline their workflow and ensure their applications run consistently across different environments.


## Step 1: Project Initialization

Start by creating a new project directory and initializing a Node.js project. The `npm init` command will generate a `package.json` file, which stores your project’s metadata and dependencies.

```bash
mkdir node_ts_lab
cd node_ts_lab
npm init -y
```

This command initializes the project and accepts the default options, creating a basic `package.json`.


## Step 2: Install Node.js v20.17.0

Before proceeding with the dependency installation, you must install **Node.js v20.17.0** to ensure compatibility with modern libraries and packages.

1. **Download and Install Node.js v20.17.0**:
   - You can download Node.js v20.17.0 from the official [Node.js download page](https://nodejs.org/en/download/).
   
   - Alternatively, if you are using **nvm** (Node Version Manager), you can install Node.js v20.17.0 using the following command:
     ```bash
     nvm install 20.17.0
     nvm use 20.17.0
     ```

2. **Verify the Node.js Installation**:
   ```bash
   node -v
   ```
   This should return `v20.17.0`.


## Step 3: Install Necessary Dependencies

Next, you’ll need to install **TypeScript** and essential development tools.

**Install TypeScript and Node.js Type Definitions**:
```bash
npm install typescript @types/node --save-dev
```
- **TypeScript**: A strongly-typed language that builds on JavaScript.
- **@types/node**: Provides type definitions for Node.js APIs.

**Install `tsconfig-paths`**:
```bash
npm install tsconfig-paths --save-dev
```
- **tsconfig-paths** enables path alias resolution in your TypeScript files, making it easier to work with module paths.


## Step 4: Install TypeScript Libraries (Optional)

To expand your Node.js environment, you can install a variety of popular libraries. These packages enable interaction with databases, messaging systems, cloud services, and more.

### Install Key Libraries:
```bash
npm install nodemon pm2 commander sqlite3 pg mysql2 mongodb ioredis dgraph-js qdrant-client amqplib express axios ws socket.io socket.io-client @grpc/grpc-js @grpc/proto-loader @aws-sdk/client-s3  @aws-sdk/client-sns @aws-sdk/client-sqs @azure/identity @azure/storage-blob @google-cloud/storage dotenv class-validator typeorm
```

### Install Development TypeScript Definitions:
```bash
npm install --save-dev @types/node @types/nodemon @types/commander @types/sqlite3 @types/express @types/ws @types/socket.io @types/socket.io-client @types/pg @types/mongodb
```

Here’s an introduction to all the libraries mentioned in **Step 3: Install TypeScript Libraries (Optional)**, which are essential for expanding a Node.js environment with TypeScript. These libraries enable interaction with databases, cloud services, messaging systems, and more.

### Runtime and Development Tools

- **nodemon**: Automatically restarts your Node.js application when file changes in the directory are detected. It's a crucial tool during development as it eliminates the need to manually restart the server after each change.
  
- **pm2**: A production process manager for Node.js applications. It keeps your app running, restarts it in case of failure, and provides additional features like process monitoring and log management.

- **commander**: A CLI (Command-Line Interface) library for building command-line tools and applications. It helps define options, flags, and commands easily.

### Databases

- **sqlite3**: A lightweight, serverless database engine embedded into applications. It is perfect for small or mobile projects due to its minimal footprint and ease of use.

- **pg**: The PostgreSQL client for Node.js, allowing you to connect and interact with a PostgreSQL database, one of the most popular open-source relational databases.

- **mysql2**: A modern and fast client for MySQL and MariaDB databases. It is fully compatible with MySQL and supports prepared statements, transactions, and more.

- **mongodb**: The official MongoDB Node.js driver. MongoDB is a NoSQL database known for its flexibility, scalability, and ease of working with JSON-like documents.

### Messaging and Datastore Clients

- **ioredis**: A powerful Redis client that supports advanced features like clustering, sentinel, and streams. Redis is an in-memory key-value store often used for caching, message brokering, and real-time analytics.

- **dgraph-js**: The official client for Dgraph, a highly-scalable, distributed graph database. This library helps you perform queries and mutations in a Dgraph cluster.

- **qdrant-client**: A client for Qdrant, an open-source vector database designed for fast search and storage of high-dimensional vectors. It’s commonly used in machine learning applications like similarity search.

### WebSockets and Real-Time Communication

- **ws**: A simple and widely-used WebSocket library for Node.js. It allows you to build WebSocket servers and clients for real-time communication between the server and browser or other devices.

- **Socket.IO**: A popular library that provides an abstraction on top of WebSockets, adding features like automatic reconnection, rooms, namespaces, and broadcast support, making it easier to implement real-time bidirectional event-based communication.

### gRPC Libraries

- **@grpc/grpc-js**: The core gRPC library for Node.js, allowing you to build and consume gRPC services. gRPC is a high-performance RPC (Remote Procedure Call) framework developed by Google.

- **@grpc/proto-loader**: A library for loading `.proto` files, which are used to define gRPC service methods and message types. This tool integrates with `@grpc/grpc-js` to generate TypeScript or JavaScript bindings for your services.

### Cloud and Storage SDKs

- **@aws-sdk/client-s3**: The official AWS SDK for interacting with Amazon S3 (Simple Storage Service), which is used for storing and retrieving any amount of data.

- **@google-cloud/storage**: A client library for interacting with Google Cloud Storage, which offers scalable and durable object storage in the cloud.

- **@azure/storage-blob**: A client library for working with Azure Blob Storage, a service for storing large amounts of unstructured data such as images, videos, and documents.

### Networking and HTTP Requests

- **axios**: A promise-based HTTP client for the browser and Node.js. It’s widely used for making API requests, handling responses, and managing errors in an elegant and easy-to-use way.

### Environment Management

- **dotenv**: A library that loads environment variables from a `.env` file into `process.env`. This is essential for separating configuration and sensitive information like API keys and database credentials from the source code.

### Validation and ORM Tools

- **class-validator**: A powerful library that allows you to define and enforce validation rules on class properties using TypeScript decorators. It’s commonly used in applications that require strict validation of input data.

- **typeorm**: A TypeScript-based ORM (Object-Relational Mapping) library that supports TypeScript and JavaScript applications using data in SQL databases like PostgreSQL, MySQL, SQLite, and more. It simplifies database interactions by allowing you to work with entities and repositories instead of raw SQL queries.


## Step 5: Create Directory Structure

To keep your project organized, create the following directory structure:

```bash
mkdir -p src/demo
mkdir -p src/modules
mkdir -p src/services
```

- **`src/modules`**: This will contain reusable modules such as data structures or utility functions.
- **`src/demo`**: A place for demo scripts to test your modules.
- **`src/services`**: Service-related code like database interactions, HTTP handlers, etc.


## Step 6: Configure `tsconfig.json` and `package.json`

### 6.1: TypeScript Configuration (`tsconfig.json`)

The `tsconfig.json` file tells the TypeScript compiler how to build your project. Add the following configuration:

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "lib": ["ES2021", "DOM"],
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "baseUrl": "./src",
    "paths": {
      "@modules/*": ["modules/*"],
      "@services/*": ["services/*"]
    }
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### `compilerOptions`

This section defines the compiler's behavior and how TypeScript should generate the output JavaScript.

- **`target`**: Specifies the version of ECMAScript (JavaScript) to which the TypeScript code should be compiled. In this case, it's set to `"ES2021"`, meaning that TypeScript will generate JavaScript that is compatible with ECMAScript 2021 features, such as logical assignment operators and weak references.

- **`lib`**: Defines the standard library files to include in the project. `"ES2021"` includes ECMAScript 2021 features, and `"DOM"` adds the DOM API definitions, which are useful for browser-based projects. This enables type checking for browser features like `document` and `window`.

- **`module`**: Specifies the module system that TypeScript will output. `"commonjs"` is the most widely used module system for Node.js applications. It allows you to use `require()` and `module.exports` to manage dependencies.

- **`outDir`**: Defines the output directory for compiled JavaScript files. TypeScript will place the compiled `.js` files into the `./dist` directory. Keeping the compiled code separate from the source code helps maintain a clean project structure.

- **`strict`**: This enables strict type checking in TypeScript, turning on all strict type-checking options like `noImplicitAny`, `strictNullChecks`, `strictBindCallApply`, etc. It ensures that the code adheres to TypeScript's strict typing rules, which improves type safety and reduces bugs.

- **`esModuleInterop`**: This allows better interoperability between CommonJS and ES6 modules. It enables TypeScript to correctly handle `import` statements when working with CommonJS modules, making `import` statements behave similarly to `require`.

- **`baseUrl`**: Sets the base directory for resolving non-relative module imports. By setting `baseUrl` to `"./src"`, any module imported from the `src` directory can be referenced without relative paths. This makes the code more readable and maintainable.

- **`paths`**: Defines path aliases that map specific module import paths to physical directories in the project. This improves the readability of imports by replacing long relative paths with shorter, logical aliases. For example:
  - `@modules/*` maps to `src/modules/*`
  - `@services/*` maps to `src/services/*`

  This way, instead of writing `import Service from '../../services/myService'`, you can use `import Service from '@services/myService'`.

#### `include`

This field defines which files the TypeScript compiler should include when compiling the project. Here, it is set to include all `.ts` files in the `src/` directory (and its subdirectories), ensuring that all TypeScript source files are compiled.

```json
"include": ["src/**/*.ts"]
```

- `"src/**/*.ts"`: This pattern ensures that TypeScript compiles all `.ts` files under the `src` folder and its subfolders, regardless of how deep the structure is.

#### `exclude`

This field defines which files or directories should be ignored during the compilation process. In this case, the `node_modules` directory is excluded to avoid trying to compile third-party libraries, which are already compiled into JavaScript.

```json
"exclude": ["node_modules"]
```

- **`node_modules`**: Excluding this directory prevents TypeScript from compiling external dependencies, which saves time and prevents unnecessary errors.

### 6.2: Scripts in `package.json`

Next, add scripts to `package.json` for development and production workflows:

```json
"scripts": {
    "ts": "npx ts-node -r tsconfig-paths/register",  // Use ts-node with path alias resolution
    "build": "tsc src/index.ts",    // Compile TypeScript to JavaScript
    "start": "ts-node -r tsconfig-paths/register src/dsa/demo/queue_demo.ts",   // Run the compiled application
    "dev": "ts-node -r tsconfig-paths/register src/cli.ts", // Nodemon for auto-reloading in dev mode
    "test": "echo \"Error: no test specified\" && exit 1"   // Run TypeScript files directly with ts-node
}
```

You can run each target using the following commands:

- **Build**: `npm run build`
- **Start**: `npm run start`
- **Dev**: `npm run dev`
- **Test**: `npm run test`
- **Run TS**: `npm run ts <ts-file>`

## Step 7: Create the Dockerfile

To containerize the project, create a **nodejs.docker** file within the `node_ts_lab/docker/` directory. This Dockerfile uses a multi-stage build process to ensure the final image is slim and production-ready.

```dockerfile
# node_ts_lab/docker/nodejs.docker

# Stage 1: Build the application
FROM node:20.17.0 AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:20.17.0-slim

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --production

# Expose the application port
EXPOSE 3000

# Start the Node.js application
CMD ["node", "dist/index.js"]
```

- **Stage 1**: This builds the application in a full Node.js environment. It installs the dependencies and runs the build process.
- **Stage 2**: It runs the compiled application using the smaller `node:20.17.0-slim` runtime, making the final image lightweight and efficient.


## Step 8: Docker Compose Setup

For easier management and orchestration of your application, use **Docker Compose**. Update the **compose.yml** file in the `node_ts_lab/docker/` directory as follows:

```yaml
# node_ts_lab/docker/compose.yml

version: '3.8'

services:
  app:
    build:
      context: ..                       # Context is one level above
      dockerfile: docker/nodejs.docker  # Path to Dockerfile inside the project
    ports:
      - "3000:3000"
    volumes:
      - ./src:/usr/src/app/src     # Only mount the source directory for development
      - ./dist:/usr/src/app/dist   # Ensure the compiled code is mapped correctly
      - /usr/src/app/node_modules  # Avoid overriding the node_modules in the container
    environment:
      NODE_ENV: development  # Set default environment variable for development
    command: npm run dev     # Useful for running development with hot-reload
```

- **context**: The build context is set to the project root (`..`), and the **Dockerfile** is referenced from `docker/nodejs.docker`.
- **ports**: Exposes port `3000`, mapping it between the container and host.
- **volumes**: Mounts the project root (`..`) into `/usr/src/app` inside the container, allowing live updates during development.


## Step 9: Build and Run the Docker Container

Follow these steps to build and run the Docker container for your Node.js project.

1. **Build the Docker Image**:
   ```bash
   docker compose -f docker/compose.yml build
   ```

2. **Run the Docker Container**:
   ```bash
   docker compose -f docker/compose.yml up
   ```

This setup will run your application and make it accessible at `http://localhost:3000`.


## Step 10: Useful Commands for Docker Container (Optional)

Below are useful commands to manage Docker containers and Docker Compose with your `node_ts_lab` project. These commands will help you build, run, and manage your containers efficiently.

### Docker Commands

These commands are used to build and run Docker images using the **Dockerfile** (`nodejs.docker`) without Docker Compose:

1. **Build the Docker Image**:
   ```bash
   docker build -f docker/nodejs.docker -t node_ts_lab .
   ```

   This command builds the Docker image using the custom **nodejs.docker** file and tags it as `node_ts_lab`.

2. **Run the Docker Container**:
   ```bash
   docker run -p 3000:3000 --name node_ts_lab_container node_ts_lab
   ```

   This runs the container, exposing port `3000` to the host, and names the container `node_ts_lab_container`.

3. **Stop the Docker Container**:
   ```bash
   docker stop node_ts_lab_container
   ```

   Stops the running container.

4. **Remove the Docker Container**:
   ```bash
   docker rm node_ts_lab_container
   ```

   Removes the container once it's stopped.

5. **View Running Containers**:
   ```bash
   docker ps
   ```

   Lists all currently running Docker containers.

6. **View All Containers (including stopped ones)**:
   ```bash
   docker ps -a
   ```

### Docker Compose Commands

These commands are used to manage containers through **Docker Compose** (`compose.yml`), which simplifies running multi-container setups:

1. **Build the Docker Image with Docker Compose**:
   ```bash
   docker compose -f docker/compose.yml build
   ```

   Builds the Docker image using the **compose.yml** configuration, referring to `nodejs.docker`.

2. **Run the Docker Compose Application**:
   ```bash
   docker compose -f docker/compose.yml up
   ```

   Starts the application in a container and maps the host's port `3000` to the container’s port `3000`.

3. **Run Docker Compose in Detached Mode**:
   ```bash
   docker compose -f docker/compose.yml up -d
   ```

   Starts the application in the background (detached mode).

4. **Stop the Docker Compose Containers**:
   ```bash
   docker compose -f docker/compose.yml down
   ```

   Stops and removes the containers, networks, and volumes created by `docker compose up`.

5. **View Docker Compose Logs**:
   ```bash
   docker compose -f docker/compose.yml logs
   ```

   Displays the logs from all running services in the Docker Compose setup.

6. **Rebuild and Restart Docker Compose Services**:
   ```bash
   docker compose -f docker/compose.yml up --build
   ```

   Rebuilds the images and starts the services again.


### Docker Compose Commands with `Run`

This command allows you to run any specific task inside a service defined in your `docker-compose.yml` file without affecting the running services.

General Format:
```bash
docker compose -f <compose-file-path> run [options] <service-name> <command>
```

Here are some common examples of using docker compose -f docker/compose.yml run:

1. **Run a Shell Inside the Service Container**:

    This is useful if you want to manually interact with the container environment.

    ```bash
    docker compose -f docker/compose.yml run app /bin/bash
    ```

    This will start a new instance of the `app` service defined in `docker/compose.yml` and open an interactive bash shell inside the container.

2. **Run a Node.js Script**:

    If you want to run a specific Node.js script or command (e.g., a script that performs a specific task like data seeding or initialization):

    ```bash
    docker compose -f docker/compose.yml run app node src/scripts/seedData.js
    ```

    This runs the `seedData.js` script inside the `app` service container.

3. **Run Tests**:

    You can use this command to run tests defined in your project:

    ```bash
    docker compose -f docker/compose.yml run app npm test
    ```

    This will execute the `npm test` command inside the `app` service container.

4. **Run Database Migrations**:

    If you're using a database migration tool (like TypeORM, Sequelize, etc.), you can run migrations inside the service container like this:

    ```bash
    docker compose -f docker/compose.yml run app npm run migration:run
    ```

    This runs the migration script defined in your `package.json` file, executing migrations within the container.

5. **Run a Service in a Specific Environment**:

    If you need to run your app in a specific environment (like `production` or `development`):

    ```bash
    docker compose -f docker/compose.yml run -e NODE_ENV=production app npm start
    ```

    This command sets the `NODE_ENV` to `production` and runs the `npm start` command inside the `app` service container.

6. **Run a Command Without Creating New Volumes**:

    If you want to avoid creating new anonymous volumes (to prevent stale data from old containers from being carried over), you can use the `--rm` option:

    ```bash
    docker compose -f docker/compose.yml run --rm app npm run build
    ```

    This will build your application and remove the container once the task is completed.


## Step 11: Optimize with `.dockerignore` (Optional)

To reduce the size of your Docker image, create a `.dockerignore` file to exclude unnecessary files:

```
node_modules
dist
*.log
```

This ensures that only necessary files are copied into the Docker image, reducing its size and improving performance.


## Conclusion

By following this guide, you have successfully set up a **Node.js** project using **TypeScript** and containerized it with **Docker**. This approach ensures a consistent and scalable environment across development and production. Docker Compose simplifies container management, and multi-stage builds keep your images optimized. With additional tools like **Nodemon** for development and **PM2** for production, your application is well-prepared for both local testing and deployment in production environments.

