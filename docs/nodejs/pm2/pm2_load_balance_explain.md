# Creating a Scalable Node.js Application with Load Balancing and Clustering Using TypeScript

Load balancing is a crucial technique for improving the performance, scalability, and availability of Node.js applications. In a typical setup, a load balancer distributes incoming requests across multiple instances of the application, ensuring that no single instance gets overwhelmed. You can achieve this in Node.js by creating worker processes or using advanced tools like PM2, which simplifies process management, clustering, and load balancing.

In this article, we will explore how to implement load balancing and clustering in a scalable Node.js application using **TypeScript**, leveraging both the `cluster` module and **PM2**. We'll also discuss various load balancing algorithms and provide code examples to illustrate the concepts.


## What is Load Balancing?

A **load balancer** distributes incoming traffic across multiple instances of an application to ensure even workload distribution. This prevents any single instance from becoming overloaded and helps improve the overall availability and fault tolerance of your system. Load balancers can be software-based or hardware-based and use various algorithms to determine how traffic should be distributed.

In Node.js applications, a load balancer can distribute incoming HTTP requests across multiple instances running on different servers or CPU cores. This setup is essential for applications that need to handle large volumes of traffic.


## Common Load Balancing Algorithms

Several load balancing algorithms can be used to distribute traffic:

- **Round-robin**: Cycles through available instances in sequence, sending each new request to the next instance.
- **Least connections**: Routes the request to the instance with the fewest active connections.
- **IP hash**: Routes requests from the same client to the same instance based on a hash of the client's IP address.

For the purpose of this article, we'll focus on a basic round-robin algorithm, which is easy to implement and provides a good starting point.


## Clustering in Node.js with TypeScript

Node.js is single-threaded, meaning it can only use one CPU core per process. Clustering allows you to spawn multiple instances of your application across different cores, effectively scaling your app horizontally. The **`cluster` module** in Node.js makes it easy to fork worker processes and distribute requests among them.

### Setting Up a Node.js Cluster in TypeScript

1. **Install TypeScript** and initialize a project:

   ```bash
   mkdir ts-cluster-app
   cd ts-cluster-app
   npm init -y
   npm install typescript @types/node --save-dev
   ```

2. **Create a `tsconfig.json` file**:

    ```json
    {
      "compilerOptions": {
        "target": "ES2021",             // Target ECMAScript version
        "lib": ["ES2021"],              // Use ES2021 library (removed DOM for Node.js projects)
        "outDir": "./dist",             // Output compiled files here
        "rootDir": "./src",             // Specify where the source files are located
        "baseUrl": "./src",             // Base directory for module resolution
        "module": "CommonJS",           // For Node.js compatibility
        "strict": true,                 // Enable strict type-checking options
        "esModuleInterop": true,        // Enable compatibility with CommonJS modules
        "skipLibCheck": true,           // Skip type checking of declaration files
        "moduleResolution": "node",     // Use Node module resolution
        "sourceMap": true,              // Generate source maps for debugging
        "paths": {
          "@modules/*": ["modules/*"],
          "@services/*": ["services/*"]
        }
      },
      "include": ["src/**/*.ts"],
      "exclude": ["node_modules"]
    }
    ```

3. **Create the Cluster Manager**:

   In this example, we'll create a simple HTTP server that responds with the worker's process ID. We will distribute the incoming requests among workers using the **`cluster`** module.

   Create a file `src/apps/cluster_server/clusterManager.ts`:

   ```typescript
   import cluster from 'cluster';
   import os from 'os';
   import http from 'http';

   const numCPUs = os.cpus().length;

   if (cluster.isPrimary) {
     console.log(`Master ${process.pid} is running`);

     // Fork workers for each CPU core
     for (let i = 0; i < numCPUs; i++) {
       cluster.fork();
     }

     cluster.on('exit', (worker, code, signal) => {
       console.log(`Worker ${worker.process.pid} died. Forking a new one.`);
       cluster.fork(); // Automatically restart the worker on failure
     });
   } else {
     // Workers share the same TCP connection in this server
     http.createServer((req, res) => {
       res.writeHead(200);
       res.end(`Hello from worker ${process.pid}\n`);
     }).listen(8000, () => {
       console.log(`Worker ${process.pid} started`);
     });
   }
   ```

   In this code:
   - **`cluster.isPrimary`** checks if the current process is the master process.
   - The master process forks one worker for each available CPU core using **`cluster.fork()`**.
   - Each worker process runs an HTTP server that listens on port 8000 and responds with its process ID.
   - If a worker crashes, the master process automatically restarts it.

4. **Compile and Run**:

   Compile the TypeScript code:

   ```bash
   npx tsc
   ```

   Run the compiled code using Node.js:

   ```bash
   node dist/apps/cluster_server/clusterManager.js
   ```

   This will create a cluster of worker processes, with each worker handling incoming requests in parallel.


## Implementing Load Balancing with Worker Processes

Using the `cluster` module, we can simulate load balancing by distributing requests across worker processes. However, managing the workers and traffic distribution manually can be cumbersome. A more robust solution involves using **PM2**, a process manager that provides built-in clustering, load balancing, and other powerful features.


## Load Balancing and Clustering with PM2

PM2 simplifies process management, load balancing, and clustering in Node.js applications. It can handle worker management automatically, allowing you to scale your app easily and without code changes. Additionally, PM2 ensures **zero-downtime** during deployments by performing rolling restarts.

### Setting Up PM2 with TypeScript

1. **Install PM2 globally**:

   ```bash
   npm install pm2 -g
   ```

2. **Create a Basic HTTP Server in TypeScript**:

   Create a file `src/apps/cluster_server/server.ts`:

   ```typescript
   import http from 'http';

   const port = process.env.PORT || 3000;

   const server = http.createServer((req, res) => {
     res.writeHead(200);
     res.end(`Hello from process ${process.pid}\n`);
   });

   server.listen(port, () => {
     console.log(`Server started by process ${process.pid} on port ${port}`);
   });
   ```

3. **Compile TypeScript**:

   Compile the TypeScript code to JavaScript:

   ```bash
   npx tsc
   ```

4. **Run the Application in Cluster Mode using PM2**:

    PM2 ensures **high availability** by automatically restarting any worker process that crashes. You can fine-tune this behavior using the `ecosystem.config.js` file, where you can define parameters like the number of allowed restarts, delays between restarts, and more.

    Example configuration for automatic restarts:

    ```typescript
    module.exports = {
        apps: [
            {
                name: 'pm2-cluster-app',
                script: './dist/apps/cluster_server/server.js',
                instances: 'max',                // Create one worker process for each available CPU core
                exec_mode: 'cluster',
                max_restarts: 5,                 // Allow up to 5 restarts
                restart_delay: 5000,             // 5-second delay between restarts
                exp_backoff_restart_delay: 100,  // Exponential backoff for restart delays
            },
        ],
    };
    ```

    Starting PM2 with the Ecosystem File:

    ```bash
    pm2 start src/apps/cluster_server/ecosystem.config.js
    ```

    PM2 will now automatically load balance incoming requests across the worker processes.
    This configuration ensures that the application is resilient to failures and provides an optimal recovery strategy in case of worker crashes.

5. **Monitor Application Status**:

   PM2 provides real-time monitoring for all running processes. You can check the status and resource usage of your app using:

   ```bash
   pm2 list
   ```

   To view detailed logs and metrics for a specific app, use:

   ```bash
   pm2 logs pm2-cluster-app
   ```

6. **Control the Application in Cluster Mode using PM2**:

      Reload the application using either the process name or the JavaScript file path:
      
      ```bash
      pm2 reload pm2-cluster-app  # Reload using the application name
      pm2 reload dist/apps/cluster_server/server.js  # Reload using the file path
      ```

      Stop the application using either the process name or the file path:
      
      ```bash
      pm2 stop pm2-cluster-app  # Stop using the application name
      pm2 stop dist/apps/cluster_server/server.js  # Stop using the file path
      ```

      Delete the application from the PM2 process list:
      
      ```bash
      pm2 delete pm2-cluster-app  # Delete using the application name
      pm2 delete dist/apps/cluster_server/server.js  # Delete using the file path
      ```


## Creating a Simple Load Balancer Client in TypeScript

1. **Create the HTTP Client**:

   Now, create a simple TypeScript client to send multiple HTTP requests to the load balancer.

   Create a file `src/apps/cluster_server/client.ts`:

   ```typescript
   import http from 'http';

   const loadBalancerUrl = 'http://localhost:8000';
   const totalRequests = 10;

   // Function to send an HTTP GET request
   function sendRequest(requestNumber: number) {
     return new Promise<void>((resolve, reject) => {
       const req = http.get(loadBalancerUrl, (res) => {
         let data = '';

         res.on('data', (chunk) => {
           data += chunk;
         });

         res.on('end', () => {
           console.log(`Response #${requestNumber}: ${data.trim()}`);
           resolve();
         });
       });

       req.on('error', (err) => {
         console.error(`Request #${requestNumber} failed:`, err.message);
         reject(err);
       });
     });
   }

   // Send multiple requests in sequence
   async function testLoadBalancer() {
     for (let i = 1; i <= totalRequests; i++) {
       try {
         await sendRequest(i);
       } catch (error) {
         console.error(`Error in request #${i}`);
       }
     }
     console.log('Load balancer test completed.');
   }

   // Start the test
   testLoadBalancer();
   ```

   This script sends `totalRequests` (in this case, 10) HTTP requests to the load balancer at `localhost:8000`. Each request’s response will include the process ID of the worker handling the request, which helps verify that the requests are distributed across different workers.

2. **Compile and Run the TypeScript Client**:

   To compile the TypeScript code into JavaScript and then run the client using Node.js:

   ```bash
   npx tsc
   node dist/apps/cluster_server/client.js
   ```

   This command compiles the TypeScript files into JavaScript and then executes the generated `client.js` file located in the `dist` directory.

3. **Run the Client in TypeScript Directly**:

   You can run the TypeScript code directly without compiling it first by using `ts-node`. `ts-node` is a TypeScript execution environment for Node.js that allows you to run TypeScript files on the fly.
   You can run the TypeScript client directly without compiling:

   ```bash
   npx ts-node src/apps/cluster_server/client.ts
   ```

   This will execute the `client.ts` file directly using `ts-node`, allowing you to test your load balancer without the need to compile the TypeScript code manually each time.


## Advanced Load Balancing with PM2

PM2 offers a variety of advanced features that enhance the scalability, performance, and reliability of your Node.js applications. Let's explore some of these features in detail, including graceful reloading, real-time monitoring, and crash handling.

### Graceful Reloading

PM2 allows you to perform **graceful reloads** of your applications without downtime. This ensures that ongoing requests are not interrupted while new workers are being spun up and old ones are replaced. It is particularly useful during deployments or configuration updates.

```bash
pm2 reload pm2-cluster-app
```

PM2 will restart each worker process one by one, ensuring the application remains online and operational during the reload process.

### Monitoring and Profiling

PM2 comes with built-in tools to monitor and profile your application's performance, helping you optimize resource usage and detect issues early.

#### Real-Time Monitoring

You can use PM2’s real-time monitoring feature to track CPU, memory, and other statistics for your running processes. This provides valuable insights into your application's health and performance.

```bash
pm2 monit
```

This command launches an interactive monitoring dashboard that displays live resource usage, making it easier to detect performance bottlenecks or spikes in resource consumption.

#### Memory Profiling with Heap Dumps

PM2 allows you to capture **heap dumps** to analyze your application's memory usage and detect potential memory leaks:

```bash
pm2 heapdump pm2-cluster-app
```

The generated heap dump file can be analyzed in tools like Chrome DevTools to gain insights into memory allocation patterns and optimize performance.

#### CPU Profiling

While PM2 doesn’t provide built-in CPU profiling, you can enable CPU profiling using Node.js’s `--inspect` flag in combination with external tools like Chrome DevTools.

1. Start the app with the `--inspect` flag:

   ```bash
   pm2 start dist/apps/cluster_server/server.js --node-args="--inspect" --name "pm2-cluster-app"
   ```

2. Connect to the app using Chrome DevTools:

   - Open `chrome://inspect` in Chrome.
   - Click on "Open dedicated DevTools for Node" to start CPU profiling.

This lets you profile the application's CPU usage and pinpoint performance bottlenecks.


## Conclusion

Load balancing and clustering are critical for building scalable and resilient Node.js applications. By distributing traffic across multiple worker processes, you can improve performance and fault tolerance. Using the **`cluster`** module and **PM2**, you can easily manage multiple instances of your application and optimize resource usage.

PM2 simplifies this process by offering a powerful suite of features like automatic clustering, process management, monitoring, and graceful reloads. Whether you're building a small app or a large-scale system, PM2 provides the tools you need to ensure optimal performance and availability.

By following the steps in this article and using **TypeScript** for type safety, you’ll be able to build scalable, production-ready applications with Node.js.

