# PM2: A Comprehensive Guide for Node.js Applications

PM2 is a production-ready process manager designed for Node.js applications. It simplifies the management, monitoring, and scaling of applications, making it a critical tool for maintaining uptime and reliability in complex server environments. Built to handle various aspects of application lifecycle management, PM2 is one of the most widely used tools in the Node.js ecosystem. This article explores the features of PM2, focusing on its strengths and showcasing how to leverage it in a TypeScript-based Node.js project.


## Key Features of PM2

PM2 offers several powerful features:

1. **Process Management**: Easily manage multiple Node.js applications with a single command.
2. **Cluster Mode**: Scale applications across multiple CPU cores for improved performance.
3. **Log Management**: Automatically logs output for easy troubleshooting.
4. **Monitoring and Health Checks**: Real-time monitoring of application status, including CPU and memory usage.
5. **Zero-Downtime Restarts**: Seamlessly reload applications without downtime using "graceful reload."
6. **Startup Scripts**: Automatically start applications on system boot.
7. **Environment Configuration**: Manage different environments (development, production, etc.) with custom configuration files.
8. **Watch & Restart**: Automatically restart applications when files are changed during development.
9. **Deployment Tools**: PM2 offers built-in tools for continuous deployment and version management.


## Installing and Setting Up PM2 with TypeScript

Before we get into examples, let’s set up a TypeScript project with PM2.

### Step 1: Install PM2 Globally

To install PM2 globally, you can use the following command:

```bash
npm install pm2 -g
```

### Step 2: Create a TypeScript Node.js Project

If you don’t already have a TypeScript-based Node.js project, create one by following these steps:

```bash
mkdir pm2-example
cd pm2-example
npm init -y
npm install typescript @types/node --save-dev
```

Create a `tsconfig.json` file:

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

### Step 3: Create a Sample Application

Let’s create a simple TypeScript application that PM2 can manage.

Create a `src/app.ts` file:

```typescript
import http from 'http';

const port = process.env.PORT || 3000;

const requestListener = (req: http.IncomingMessage, res: http.ServerResponse): void => {
  res.writeHead(200);
  res.end('Hello, PM2 with TypeScript!');
};

const server = http.createServer(requestListener);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

Compile the TypeScript file:

```bash
npx tsc
```

Now, your compiled JavaScript will be in the `dist/` folder.

### Step 4: Running the Application with PM2

You can run the application using PM2 with the following command:

```bash
pm2 start dist/app.js --name "typescript-app"
```


## PM2 Features in Action

### 1. **Process Management**

Once the application is running, you can manage it with PM2’s CLI. Use the following command to see the status of your applications:

```bash
pm2 list
```

This command will display information such as application name, status, memory usage, and CPU usage.

To stop the application:

```bash
pm2 stop typescript-app
```

To restart the application:

```bash
pm2 restart typescript-app
```

### 2. **Cluster Mode**

PM2 supports running applications in cluster mode to fully utilize multi-core processors. This mode is particularly useful for CPU-bound applications.

To run the application in cluster mode across 4 instances:

```bash
pm2 start dist/app.js --name "typescript-app" -i 4
```

This command will create 4 instances of the application, each on a different CPU core.

### 3. **Log Management**

PM2 automatically manages logs for your applications. To view logs:

```bash
pm2 logs
```

If you only want to see logs for a specific application:

```bash
pm2 logs typescript-app
```

PM2 saves logs in the `~/.pm2/logs/` directory, where both standard output and error logs are stored separately.

### 4. **Watch & Restart**

During development, you may want PM2 to automatically restart your application when you change files. This can be achieved using the `--watch` flag:

```bash
pm2 start dist/app.js --name "typescript-app" --watch
```

PM2 will now monitor the `dist` directory for changes and restart the application whenever a file is updated.

### 5. **Environment Management**

You can easily pass environment variables to your application using PM2:

```bash
pm2 start dist/app.js --name "typescript-app" --env production
```

Alternatively, you can create an ecosystem file for more complex setups. Create an `ecosystem.config.js` file for defining multiple environments:

```typescript
module.exports = {
  apps: [
    {
      name: 'typescript-app',
      script: './dist/app.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
      },
    },
  ],
};
```

Then run:

```bash
pm2 start ecosystem.config.js --env production
```

### 6. **Zero-Downtime Restarts**

When updating an application, PM2 can reload it without dropping any connections. This ensures zero downtime during deployment:

```bash
pm2 reload typescript-app
```

### 7. **Startup Scripts**

To configure PM2 to start applications automatically on system boot, run the following command:

```bash
pm2 startup
```

PM2 will output a command that you need to run with `sudo` to enable this feature. After that, save the current list of processes so they restart on boot:

```bash
pm2 save
```

## Monitoring and Health Checks

PM2 provides built-in real-time monitoring for your applications. Use the following command to get detailed information on your application’s CPU and memory usage:

```bash
pm2 monit
```

This will open an interactive console where you can monitor all PM2-managed processes.

## Deployment with PM2

PM2 also comes with a deployment system that allows you to perform zero-downtime deployments with a single command. To use this feature, you will need to configure your `ecosystem.config.js` file with deployment settings:

```typescript
module.exports = {
  apps: [
    {
      name: 'typescript-app',
      script: './dist/app.js',
    },
  ],
  deploy: {
    production: {
      user: 'node',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:yourusername/yourrepo.git',
      path: '/var/www/yourapp',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
    },
  },
};
```

Deploy the application with the following command:

```bash
pm2 deploy production setup
pm2 deploy production
```

This will pull the latest changes from your Git repository, install dependencies, build the project, and reload PM2.

## Conclusion

PM2 is an incredibly powerful tool for managing Node.js applications, especially when combined with TypeScript. Whether you need simple process management, load balancing with cluster mode, or robust logging and monitoring, PM2 can streamline your workflow and improve the reliability of your applications.

By following this guide, you should now have a solid foundation for using PM2 with TypeScript, enabling you to handle production-level Node.js applications with ease.

