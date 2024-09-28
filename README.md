# Introduction to the `node_ts_lab` Project

The `node_ts_lab` project is a learning and development environment built with **Node.js** and **TypeScript**. It is designed to help developers experiment with different Node.js features and modules, while leveraging TypeScript for type safety and enhanced tooling.

This project provides various practical examples, such as working with data structures, file systems, networking (HTTP and WebSocket), and more. It also includes support for Docker, which allows you to containerize your applications for development and production environments.


## Project Structure

Here's a detailed breakdown of the folder structure and its purpose:

```
node_ts_lab/
├── docs/                          # Documentation for the project
│   └── *.md                       # Markdown files for project documentation
├── docker/                        # Docker-related files for containerization
│   ├── compose.yml                # Docker Compose file
│   └── *.docker                   # Other Docker configurations (e.g., Dockerfile)
├── src/                           # Main source code directory
│   ├── modules/                   # Reusable, generic modules and utilities
│   │   └── dsa/                   # Data structures and algorithms (DSA) implementations
│   │       └── queue.ts           # Queue data structure implementation
│   ├── services/                  # Application-specific business logic and services
│   │   └── ...                    # Placeholder for service implementations
│   ├── dsa/                       # Demos and practice scripts for DSA modules
│   │   ├── queue_demo.ts          # Demo for testing the Queue data structure
│   │   └── map_demo.ts            # Demo for practicing the Map data structure
│   ├── fs/                        # File system operations
│   │   └── file_demo.ts           # Demo for file system operations (e.g., reading/writing files)
│   └── net/                       # Networking and communication demos
│       ├── http_client_demo.ts    # HTTP client demo for making requests
│       ├── http_server_demo.ts    # HTTP server demo
│       ├── ws_client_demo.ts      # WebSocket client demo
│       └── ws_server_demo.ts      # WebSocket server demo
├── package.json                   # Project metadata and dependencies
└── tsconfig.json                  # TypeScript configuration
```

### Directory Structure Breakdown

1. **`docs/`**
   - Contains Markdown (`*.md`) files documenting the project. 
   - You can add guides, technical documentation, or notes related to the project or individual modules.
   - Example: `docs/setup.md` for setup instructions or `docs/queue_usage.md` for detailed documentation of how to use the queue module.

2. **`docker/`**
   - This directory includes Docker configuration files that help you set up containerized environments for the project.
   - **`compose.yml`**: A Docker Compose file that defines multi-container Docker applications. For example, it could be used to set up containers for the Node.js app, databases like SQLite, and other services.
   - **`*.docker`**: Any other Docker-related configuration files (like `Dockerfile` for setting up the Node.js runtime).
   - Purpose: This ensures the project is easily portable and can run in isolated containers, helping in both development and deployment.

3. **`src/`**
   - The core source code of the project lives inside this directory. It is organized into subdirectories based on features or services.

4. **`src/modules/`**
   - This directory contains **reusable, self-contained modules** like data structures or utility functions. These modules are generic and not tied to any specific service or business logic.

   - **`dsa/`**:
     - **`queue.ts`**: This file implements a **Queue** data structure in TypeScript, which is commonly used in computer science (e.g., for task scheduling, breadth-first search algorithms, etc.).
     - **Modules** like `queue.ts` can be reused across different parts of the application or even in other projects.
     - Other data structures or utilities like **stack**, **linked list**, or **priority queue** could also be placed here as the project evolves.

5. **`src/services/`**
   - **Business logic and application-specific services** will be stored here. For example, this could include code that interacts with external APIs, performs file I/O operations, or handles user authentication.
   - These services often depend on the modules from `src/modules/`.
   - In this tree, there are no specific files under `services/`, but it's where features like `UserService`, `AuthService`, or `FileStorageService` might go.

6. **`src/dsa/`**
   - This directory is where you can place **practice and demo scripts** related to the **data structures and algorithms** (DSA) implemented in `src/modules/dsa/`.
   - **`queue_demo.ts`**: A practice script that demonstrates how to use the `Queue` module. This file might show various queue operations such as enqueueing, dequeueing, and iterating through the queue.
   - **`map_demo.ts`**: A demo that works with the **Map** data structure in TypeScript, showcasing methods for insertion, deletion, and iteration over key-value pairs.

7. **`src/fs/`**
   - This directory includes code related to **file system operations** (such as reading and writing files).
   - **`file_demo.ts`**: A demo that shows how to use Node.js’s `fs` module to interact with files and directories. This file might include examples of reading from and writing to files, listing directories, or handling file streams.

8. **`src/net/`**
   - This directory contains code related to **networking and communication**, specifically working with HTTP and WebSocket protocols.
   - **`http_client_demo.ts`**: A demo that demonstrates making HTTP requests (GET, POST, etc.) using libraries like `axios` or the built-in `http` module in Node.js.
   - **`http_server_demo.ts`**: A demo that sets up a simple HTTP server using Node.js’s built-in `http` module or frameworks like **Express**.
   - **`ws_client_demo.ts`**: A WebSocket client demo that connects to a WebSocket server and sends/receives messages in real time.
   - **`ws_server_demo.ts`**: A WebSocket server demo that listens for WebSocket connections, often used in chat applications or real-time data streaming.

9. **`package.json`**
   - The `package.json` file holds metadata about your Node.js project, including dependencies, scripts, and project configuration.
   - For example, it lists installed libraries like **TypeScript**, **Nodemon**, or any database or networking packages. It also includes **build** and **start** scripts for easy execution of your TypeScript project.

10. **`tsconfig.json`**
    - This file is the **TypeScript configuration file** that defines how TypeScript should compile the project. It includes compiler options, path aliases, and more.
    - For example, `baseUrl` and `paths` might be configured to simplify imports (e.g., using `modules/dsa/queue.ts` as `modules/dsa/queue`).


## Features of the Project

1. **Learning Environment**:
   - `node_ts_lab` is designed to provide a place to experiment with different features of **Node.js** and **TypeScript**.
   - You can practice creating **data structures**, interacting with **files**, making **HTTP requests**, and working with **WebSockets** in a well-organized setup.

2. **Modular Design**:
   - The `src/modules/` directory contains standalone modules like **data structures** (e.g., `queue.ts`), which can be used across multiple parts of the application.
   - By keeping reusable components modular, the project is easily maintainable and extendable.

3. **Networking and Communication**:
   - The `src/net/` directory focuses on networking features, such as creating **HTTP clients/servers** and **WebSocket clients/servers**. This is useful for learning how to handle requests, responses, and real-time data transmission.

4. **File System Operations**:
   - `src/fs/` demonstrates how to use Node.js to read and write files, making it a practical example for learning **file I/O** operations.

5. **TypeScript with Path Aliases**:
   - The `tsconfig.json` enables path aliases, allowing you to import modules in a clean way (e.g., `modules/dsa/queue` instead of `../../modules/dsa/queue`).

6. **Docker Support**:
   - With Docker configurations in the `docker/` folder, the project can easily be containerized, ensuring a consistent environment for development and deployment.

7. **Project Documentation**:
   - The `docs/` directory provides space for project documentation, including guides, setup instructions, and technical explanations.


## Conclusion

The **`node_ts_lab`** project is a structured, modular environment designed to practice and explore **Node.js** and **TypeScript** features. It includes examples for **data structures**, **networking**, **file system operations**, and more, allowing developers to get hands-on experience in a wide range of scenarios. The use of **TypeScript** ensures strong typing, while **Docker** support helps maintain consistency across development environments.

