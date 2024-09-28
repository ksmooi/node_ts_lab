# Instruction to Build a Node.js Project with TypeScript

This guide will walk you through setting up a **Node.js project** using **TypeScript**. You will also use `ts-node` and `tsconfig-paths` for running TypeScript directly, along with tools like **Nodemon**, **PM2**, and **SQLite3**. This setup will also configure path aliases for cleaner imports.

### Steps Overview:
1. Project Initialization
2. Installing Dependencies
3. Setting Up Directory Structure
4. Configuring `tsconfig.json` and `package.json`
5. Writing Code (`Queue` data structure example)
6. Running the Project

---

### Step 1: Project Initialization

First, create your project directory and initialize a new **Node.js** project with `npm init`.

```bash
mkdir node_ts_lab
cd node_ts_lab

npm init -y
```

This creates a `package.json` file that will hold all your project’s metadata and dependencies.

---

### Step 2: Install Necessary Dependencies

We will install **TypeScript**, **tsconfig-paths**, **SQLite3**, **Nodemon**, and **PM2**.

#### Install TypeScript and Node.js Types:
```bash
npm install typescript @types/node --save-dev
```

- **TypeScript** is the language we will use.
- **@types/node** provides type definitions for Node.js.

#### Install `tsconfig-paths`:
```bash
npm install tsconfig-paths --save-dev
```

- **tsconfig-paths** enables path alias resolution in `tsconfig.json` when running TypeScript files with `ts-node`.

#### Installing Required Packages for the Project

```bash
npm install pm2 --save-dev

npm install nodemon commander sqlite3 --save-dev
npm install @types/nodemon @types/commander @types/sqlite3 --save-dev
```

- These commands install the necessary development dependencies:
  - **PM2**: A production process manager for Node.js applications, ensuring that your app stays alive and automatically restarts if it crashes.
  - **Nodemon**: A tool that helps in automatically restarting the Node.js application when file changes in the directory are detected.
  - **Commander**: A powerful CLI library used to build command-line applications and handle argument parsing.
  - **SQLite3**: A lightweight SQL database engine for managing data storage in your Node.js application.

---

### Step 3: Create Directory Structure

Now, create the directory structure for your project.

```bash
mkdir -p src/modules/dsa
mkdir -p src/dsa
```

- `src/modules/dsa/`: This will contain reusable modules such as a `Queue` data structure.
- `src/dsa/`: This will hold practice scripts that use the `Queue` module.

---

### Step 4: Configure `tsconfig.json` and `package.json`

#### 1. Edit `tsconfig.json`:
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

#### 2. Edit `package.json`:
We will add scripts to `package.json` for building, running, and using Nodemon.

```bash
vi package.json
```

Add the following under the `"scripts"` section:

```json
"scripts": {
  "build": "tsc",  // Compile the TypeScript project
  "start": "node dist/index.js",  // Start the project using Node
  "dev": "nodemon -r tsconfig-paths/register src/index.ts",  // Use Nodemon for development with path alias resolution
  "ts": "npx ts-node -r tsconfig-paths/register"  // Use ts-node with path alias resolution
}
```

- **`build`**: Runs the TypeScript compiler (`tsc`), outputting JavaScript files in the `dist/` folder.
- **`start`**: Starts the compiled app from `dist/index.js`.
- **`dev`**: Runs Nodemon, automatically restarting the app when changes are made, and uses path aliases with `tsconfig-paths`.
- **`ts`**: Provides a shortcut to run TypeScript files directly using `ts-node` and `tsconfig-paths`.

---

### Step 5: Writing Code

#### 1. Create a `Queue` Data Structure Module

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

#### 2. Create a Practice Script for the Queue

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

### Step 6: Running the Project

#### 1. Compile the Project

Before running the project, you can compile the TypeScript files into JavaScript:

```bash
npm run build
```

This will generate JavaScript files inside the `dist/` directory.

#### 2. Run the Practice Script

To run the `practice_queue.ts` script using **ts-node** and **tsconfig-paths** for path alias support, use the following command:

```bash
npx ts-node -r tsconfig-paths/register src/dsa/practice_queue.ts
```

Alternatively, you can create an alias in `package.json` (as described above) and run it using:

```bash
npm run ts src/dsa/practice_queue.ts
```

#### 3. Running in Development Mode with Nodemon

To run the app in development mode and automatically reload when changes are detected:

```bash
npm run dev
```

This will start the application using **Nodemon** with path alias support via **tsconfig-paths**.

---

### Conclusion

This guide walks you through setting up a **Node.js** project with **TypeScript**, including support for path aliases, automatic reload during development, and process management for production. You’ve also implemented a simple `Queue` data structure module and created a practice script to test it.

With this setup, you’re ready to start building more complex applications using Node.js and TypeScript!

