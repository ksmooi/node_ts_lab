# In-Depth Guide to Cluster Mode and Load Balancing with PM2

PM2’s **Cluster Mode** is a key feature that allows you to run multiple instances of a Node.js application, leveraging the full potential of multi-core CPUs. By using cluster mode, you can distribute incoming traffic across different instances of your application, enhancing both performance and fault tolerance.

In this article, we’ll explore PM2’s cluster mode in depth, explaining how it works, its advantages, and how to implement it effectively. We’ll also provide detailed TypeScript examples to demonstrate its usage in real-world scenarios.


## What is Cluster Mode?

Cluster mode in PM2 allows you to run multiple instances of a Node.js application in parallel across the available CPU cores. Node.js is inherently single-threaded, meaning it can only use one core of the CPU. However, most modern servers have multiple cores. To fully utilize a multi-core CPU, PM2’s cluster mode spawns multiple Node.js instances (called **workers**) and balances the incoming traffic among them.

PM2 automatically creates an internal load balancer that routes requests to available workers, thereby distributing the load and improving application performance and availability.

---

## Key Benefits of Cluster Mode

- **Utilization of Multi-Core CPUs**: Cluster mode allows you to spread the load across multiple CPU cores, enhancing performance by running parallel processes.
  
- **Automatic Load Balancing**: PM2 provides internal load balancing, ensuring that each instance (worker) handles a fair share of the requests.

- **Zero-Downtime Reloads**: You can reload or restart the app in cluster mode without any downtime, ensuring continuous availability.

- **Fault Tolerance**: If one worker crashes, the others continue serving traffic. PM2 can also automatically restart failed workers.


## Setting Up PM2 Cluster Mode with TypeScript

### Step 1: Install PM2

If you don’t already have PM2 installed globally, do so with the following command:

```bash
npm install pm2 -g
```

### Step 2: Create a Basic TypeScript Node.js Application

Start by setting up a simple TypeScript-based Node.js app that serves HTTP requests.

1. **Initialize a Node.js project:**

    ```bash
    mkdir pm2-cluster-example
    cd pm2-cluster-example
    npm init -y
    ```

2. **Install TypeScript and necessary packages:**

    ```bash
    npm install typescript @types/node --save-dev
    ```

3. **Create a `tsconfig.json` file:**

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

4. **Create a simple HTTP server in TypeScript:**

    Create a file `src/server.ts` with the following content:

    ```typescript
    import http from 'http';

    const port = process.env.PORT || 3000;

    const requestListener = (req: http.IncomingMessage, res: http.ServerResponse): void => {
        res.writeHead(200);
        res.end(`Hello from worker ${process.pid}`);
    };

    const server = http.createServer(requestListener);

    server.listen(port, () => {
        console.log(`Server is running on port ${port} (Worker: ${process.pid})`);
    });
    ```

    This code sets up an HTTP server that responds with the worker's process ID, allowing us to observe how different worker processes handle requests in cluster mode.

5. **Compile the TypeScript code:**

    ```bash
    npx tsc
    ```


## Step 3: Running the App in PM2 Cluster Mode

With your TypeScript app set up, let’s run it in PM2’s cluster mode.

### Starting the Application in Cluster Mode

To run the compiled JavaScript code in cluster mode, use the following PM2 command:

```bash
pm2 start dist/server.js --name "cluster-app" -i max
```

- `-i max`: Tells PM2 to spawn as many instances as the available CPU cores.
- `--name "cluster-app"`: Assigns a name to the process for easier management.

PM2 will now spawn one worker for each CPU core. If you want to specify the exact number of instances, replace `max` with the desired number:

```bash
pm2 start dist/server.js --name "cluster-app" -i 4
```

### Viewing Running Instances

You can check the status of your running applications using:

```bash
pm2 list
```

This will show you the list of instances, their process IDs (PIDs), CPU/memory usage, and status.

### Example Output:

```bash
┌────┬─────────────┬─────────┬────────┬──────┬────────┬──────────┐
│ id │ name        │ mode    │ status │ cpu  │ memory │ worker   │
├────┼─────────────┼─────────┼────────┼──────┼────────┼──────────┤
│ 0  │ cluster-app │ cluster │ online │ 5.0% │ 30MB   │ pid=1234 │
│ 1  │ cluster-app │ cluster │ online │ 4.8% │ 32MB   │ pid=1235 │
│ 2  │ cluster-app │ cluster │ online │ 5.1% │ 33MB   │ pid=1236 │
│ 3  │ cluster-app │ cluster │ online │ 4.9% │ 31MB   │ pid=1237 │
└────┴─────────────┴─────────┴────────┴──────┴────────┴──────────┘
```

Each worker is running on its own process (with its own PID), and PM2 automatically balances the load across them.


## Step 4: Testing Load Balancing

To verify that PM2 is properly load balancing between the instances, you can make multiple requests to the server and observe the different process IDs handling the requests.

Here’s a simple test using `curl`:

```bash
for i in {1..10}; do curl http://localhost:3000; echo; done
```

You should see different worker process IDs (`process.pid`) responding to different requests, demonstrating how PM2 distributes incoming requests among the cluster workers.

---

## Advanced Cluster Mode Configuration

Let’s dive into some advanced configurations you can use with PM2’s cluster mode.

### Graceful Reloading of Clustered Applications

One of PM2’s strongest features is its ability to gracefully reload applications without downtime, even when running in cluster mode. This is especially useful during deployments where you want to reload workers without killing active connections.

To gracefully reload all instances of the app:

```bash
pm2 reload cluster-app
```

PM2 will reload the workers one by one, ensuring no active connections are dropped during the process.

### Auto-Restart on Crashes

In cluster mode, PM2 automatically restarts any worker that crashes. You can further configure this behavior:

```typescript
module.exports = {
  apps: [
    {
      name: 'cluster-app',
      script: './dist/server.js',
      instances: 'max',  // Use all available CPU cores
      exec_mode: 'cluster',
      max_restarts: 5,  // Set maximum restarts to avoid restart loops
      restart_delay: 5000,  // Delay between restarts in milliseconds
      exp_backoff_restart_delay: 100,  // Exponential backoff restart delay
    },
  ],
};
```

This ensures your application is resilient, automatically recovering from any crashes while limiting how often it restarts.

### CPU and Memory Usage Limits

PM2 allows you to limit the CPU and memory usage for each instance. If the limits are breached, PM2 will restart the worker.

```typescript
module.exports = {
  apps: [
    {
      name: 'cluster-app',
      script: './dist/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '200M',  // Restart worker if memory exceeds 200MB
      max_restarts: 10,  // Limit restarts to prevent crashes
    },
  ],
};
```

This can help prevent memory leaks from consuming all available resources.


## Monitoring and Profiling in Cluster Mode

PM2 provides built-in monitoring tools to help you keep an eye on the health of your clustered application.

### Real-Time Monitoring

Use the following command to view the real-time metrics of your application, such as CPU and memory usage:

```bash
pm2 monit
```

This opens a dashboard that shows the health of each instance, helping you identify potential performance issues in real-time.

### Profiling CPU Usage

You can also profile the CPU usage of a specific worker:

```bash
pm2 profile start cluster-app
# Let the profiling run for a while and then stop it
pm2 profile stop cluster-app
```

The CPU profile will be saved in the `.pm2/profiles/` directory, where you can analyze it to identify performance bottlenecks.


## Deploying Clustered Applications

You can automate the deployment of your clustered application using PM2’s deployment system. This is especially helpful when dealing with multiple environments, such as staging and production.

Here’s an example deployment configuration for a clustered application:

```typescript
module.exports = {
  apps: [
    {
      name: 'cluster-app',
      script: './dist/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production:

 {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      user: 'node',
      host: 'yourserver.com',
      ref: 'origin/main',
      repo: 'git@github.com:yourusername/your-repo.git',
      path: '/var/www/cluster-app',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
    },
  },
};
```

To deploy the application:

```bash
pm2 deploy production setup
pm2 deploy production
```

This deployment process pulls the latest code, installs dependencies, builds the app, and reloads the workers without downtime.


## Conclusion

PM2’s **Cluster Mode** and built-in **Load Balancer** are powerful tools that can significantly enhance the performance and scalability of your Node.js applications. By distributing requests across multiple instances and utilizing all CPU cores, PM2 ensures that your app can handle higher traffic loads efficiently. The combination of **fault tolerance**, **automatic restarts**, and **graceful reloads** makes it ideal for production environments.

With PM2, managing cluster-based applications in Node.js becomes straightforward and highly flexible, allowing developers to focus on building reliable applications rather than worrying about process management.

