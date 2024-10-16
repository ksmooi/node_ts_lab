# Understanding `ecosystem.config.js` in Depth

`ecosystem.config.js` is an integral part of managing Node.js applications using PM2. It provides a configuration-based approach to define how multiple applications should be managed, monitored, and deployed in a structured manner. Whether you are running a single app or orchestrating multiple Node.js services, `ecosystem.config.js` simplifies this process.

In this article, we will explore the structure of `ecosystem.config.js`, discuss its configuration options in depth, and provide TypeScript examples to showcase its versatility.

## What is `ecosystem.config.js`?

`ecosystem.config.js` is a configuration file used by PM2 to define applications, environments, and deployment strategies. Instead of manually starting applications with individual PM2 commands, you can specify all your app settings within this file, allowing you to start, stop, and manage multiple apps simultaneously. This config file supports running apps in cluster mode, environment-specific settings, error handling, log management, and more.


## Structure of `ecosystem.config.js`

The `ecosystem.config.js` file consists of two main sections:

1. **Apps**: Defines the list of applications and their respective settings.
2. **Deploy**: Specifies deployment strategies and environments.

Here's a basic structure of `ecosystem.config.js`:

```typescript
module.exports = {
  apps: [
    {
      name: 'app1',
      script: './dist/app1.js',
      instances: 2,  // Cluster mode with 2 instances
      exec_mode: 'cluster',  // Run in cluster mode
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8000,
      },
    },
  ],
  deploy: {
    production: {
      user: 'node',
      host: 'yourserver.com',
      ref: 'origin/main',
      repo: 'git@github.com:yourusername/repository.git',
      path: '/var/www/app',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
```


## Section 1: `apps` — Managing Node.js Applications

The `apps` section defines one or more Node.js applications that PM2 will manage. You can configure options such as the number of instances, environment variables, logging, watch mode, and more.

### Common Options in the `apps` Section:

- **name**: The name of the application (helps to identify the app in the PM2 dashboard).
- **script**: The entry point of the application (this is usually the compiled `.js` file).
- **instances**: The number of instances to run in cluster mode. If you set this to `max`, PM2 will spawn as many instances as CPU cores.
- **exec_mode**: Defines how the application runs. Options include:
  - `fork`: Runs the app as a single process.
  - `cluster`: Runs the app in cluster mode, enabling multi-core usage.
- **env**: Defines environment variables for the default (typically development) environment.
- **env_production**: Defines environment variables for the production environment.
- **watch**: Enable watch mode to restart the app on file changes.

### Example: Running Multiple Apps with Different Settings

```typescript
module.exports = {
  apps: [
    {
      name: 'app1',
      script: './dist/app1.js',
      instances: 2,  // Run 2 instances
      exec_mode: 'cluster',
      watch: true,  // Enable file watching
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8000,
      },
    },
    {
      name: 'app2',
      script: './dist/app2.js',
      instances: 1,  // Run a single instance
      exec_mode: 'fork',  // Use fork mode (single process)
      watch: false,  // Disable file watching for production
      env: {
        NODE_ENV: 'development',
        PORT: 4000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 9000,
      },
    },
  ],
};
```

## Key Options in Detail:

- **`instances`**: 
   - In **cluster mode**, you can scale horizontally by running multiple instances of your app. PM2 will automatically balance the load across these instances.
   - Setting `instances: max` will launch as many instances as the available CPU cores.
   
   Example:
   ```typescript
   instances: "max", // Use all available CPU cores
   ```

- **`exec_mode`**:
   - Set to `fork` when you want a single instance running in isolation.
   - Set to `cluster` for horizontal scaling across multiple CPU cores.

- **`watch`**: 
   - Automatically restarts the app if any files change. Useful during development.

   Example:
   ```typescript
   watch: ['./src'],  // Watch only the src directory for changes
   ```

- **`env` and `env_production`**:
   - You can specify different environment variables for development and production environments.

   Example:
   ```typescript
   env_production: {
     NODE_ENV: 'production',
     API_KEY: 'your_production_api_key'
   }
   ```

### Error Handling and Restart Policies

You can also define how PM2 should handle errors and restarts in your application.

```typescript
module.exports = {
  apps: [
    {
      name: 'app1',
      script: './dist/app1.js',
      instances: 1,
      max_restarts: 10,  // Maximum number of automatic restarts
      restart_delay: 5000,  // Delay between restarts (in milliseconds)
      exp_backoff_restart_delay: 100,  // Exponential backoff restart delay
    },
  ],
};
```

These options ensure your app doesn’t enter into an infinite restart loop, and you can also control how long to wait between each restart.


## Section 2: `deploy` — Automated Deployment

The `deploy` section defines how to automate deployments for your application. It specifies the steps needed to set up or update an application across servers.

### Example of a Deployment Configuration:

```typescript
module.exports = {
  deploy: {
    production: {
      user: 'node',
      host: 'yourserver.com',
      ref: 'origin/main',
      repo: 'git@github.com:yourusername/repository.git',
      path: '/var/www/app',
      'pre-deploy-local': 'echo "This is a local execution step"',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'apt-get install git',
    },
  },
};
```

### Key Options in the `deploy` Section:

- **user**: The username for SSH connections to the server.
- **host**: The target server(s) where the deployment should occur.
- **ref**: The Git branch that should be pulled (e.g., `origin/main`).
- **repo**: The Git repository from which the app will be pulled.
- **path**: The directory on the server where the app will be deployed.
- **pre-deploy-local**: Commands that run **locally** before deployment (e.g., building assets).
- **post-deploy**: Commands that run **remotely** after the code is pulled on the server, typically to install dependencies, build the app, and reload PM2.
- **pre-setup**: Commands that run before the setup begins (e.g., installing necessary software).

### Multi-Environment Deployment

You can define multiple environments, such as production, staging, and development, with their specific configurations.

```typescript
module.exports = {
  deploy: {
    production: {
      user: 'node',
      host: 'prod-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:yourusername/prod-repo.git',
      path: '/var/www/production-app',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    },
    staging: {
      user: 'node',
      host: 'staging-server.com',
      ref: 'origin/develop',
      repo: 'git@github.com:yourusername/staging-repo.git',
      path: '/var/www/staging-app',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env staging',
    },
  },
};
```

With this configuration, you can easily deploy to different environments by running:

```bash
pm2 deploy production
pm2 deploy staging
```


## Using TypeScript with `ecosystem.config.js`

While `ecosystem.config.js` is typically written in JavaScript, you can use TypeScript for better type safety and readability. You just need to ensure you have `ts-node` installed.

### TypeScript Example:

1. Install `ts-node` as a dependency:

```bash
npm install ts-node --save-dev
```

2. Create a TypeScript ecosystem file, e.g., `ecosystem.config.ts`:

```typescript
export const apps = [
  {
    name: 'typescript-app',
    script: './dist/app.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 8000,
    },
  },
];

export const deploy = {
  production: {
    user: 'node',
    host: 'yourserver.com',
    ref: 'origin/main',
    repo: 'git@github.com:yourusername/repository.git',
    path: '/var/www/typescript-app',
    'post-deploy': 'npm install && pm2 reload ecosystem.config.ts --env production',
  },
};

export default { apps, deploy };
```

3. Run PM2 using the TypeScript config file:

```bash
pm2 start ecosystem.config.ts --interpreter ts-node
```


## Conclusion

`ecosystem.config.js` is a powerful tool for managing Node.js applications using PM2. It enables you to configure apps, set environment variables, manage deployments, and handle errors easily, making it ideal for production-ready environments. By leveraging TypeScript in your ecosystem config, you also gain the benefits of type safety and better developer tooling.

By understanding the structure and options available in `ecosystem.config.js`, you can optimize your application's behavior, streamline deployment, and make your production environments more resilient.

