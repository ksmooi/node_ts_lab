# Using Worker Threads with TypeScript in Depth

**Node.js** is known for its single-threaded, non-blocking architecture, making it efficient for I/O-bound tasks but not ideal for CPU-intensive operations. To address this limitation, **Worker Threads** were introduced, allowing Node.js to execute JavaScript code in parallel, thereby handling CPU-bound tasks more efficiently. 

In this article, we will explore how to use **Worker Threads** in Node.js with **TypeScript**, focusing on components like **`parentPort`**, **`MessageChannel`**, and **`workerData`** for frequent communication between the **main thread** and **worker thread**.

---

## Key Components

### 1. **`Worker`**
The **`Worker`** class is used to spawn a new worker thread. It allows you to run JavaScript code in a separate thread without blocking the event loop of the main thread. You can pass initial data to the worker using **`workerData`** and send/receive messages during execution.

### 2. **`parentPort`**
**`parentPort`** is available within a worker thread and allows communication between the **main thread** and **worker thread**. It’s used to send messages from the worker to the main thread and vice versa.

### 3. **`MessageChannel`**
**`MessageChannel`** creates two connected `MessagePort` objects that allow for two-way communication between the **main thread** and the **worker thread**. These ports are typically used for frequent or complex communication patterns.

### 4. **`workerData`**
**`workerData`** is a mechanism to pass initial data from the **main thread** to the **worker thread** when the worker is initialized. This data can be accessed directly inside the worker to parameterize the worker’s task.

---

## Project Setup

Before we start, ensure you have TypeScript and Node.js types installed:

```bash
npm install --save-dev typescript @types/node
```

Then, set up your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["es2020"],
    "outDir": "./dist",
    "esModuleInterop": true
  },
  "include": ["src/**/*.ts"]
}
```

---

## Example Implementation

### 1. Main Thread (`main.ts`)

In the main thread, we create a worker, send it initial data using `workerData`, and set up a `MessageChannel` for continuous communication. The main thread sends frequent messages to the worker and listens for responses from both `parentPort` and `MessageChannel`.

```ts
import { Worker, MessageChannel } from 'worker_threads';
import path from 'path';

// Create a new worker and pass initial data using workerData
// "worker.ts" will be compiled to "worker.js" before running
const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
  workerData: { initialMessage: 'Hello from Main Thread' }
});

// Create a MessageChannel for frequent communication
const { port1, port2 } = new MessageChannel();

// Listen for responses from the worker via parentPort
worker.on('message', (msg) => {
  console.log('Message from worker via parentPort:', msg);
});

// Send port2 to the worker for communication using MessageChannel
worker.postMessage({ port: port2 }, [port2]);

// Send frequent messages to the worker via port1
setInterval(() => {
  console.log('Main thread sending message via port1...');
  port1.postMessage('Main thread: Perform some task');
}, 2000);

// Listen for responses from the worker via port1
port1.on('message', (msg) => {
  console.log('Message from worker via port2:', msg);
});
```

### 2. Worker Thread (`worker.ts`)

In the worker thread, we receive messages from both `parentPort` and `MessageChannel`. The worker processes the received messages and sends responses back to the main thread.

```ts
import { parentPort, workerData, MessagePort } from 'worker_threads';

// Function to simulate a task
function performTask(message: string) {
  console.log('Worker received:', message);
  return `Result of task: ${Math.random() * 100}`;
}

// Use workerData for initial communication
console.log('Worker started with initial message:', workerData.initialMessage);

// Send an initial message to the main thread via parentPort
parentPort?.postMessage('Hello from Worker via parentPort');

// Listen for the MessagePort (port2) from the main thread
parentPort?.on('message', (data) => {
  if (data.port instanceof MessagePort) {
    const port2 = data.port;

    // Listen for messages from the main thread on port2
    port2.on('message', (msg) => {
      console.log('Worker received via port2:', msg);
      
      // Perform the task and send a response back to the main thread
      const result = performTask(msg);
      port2.postMessage(result);
    });
  }
});
```

---

## Communication Flow

### `parentPort`
- The **main thread** uses `parentPort` to send messages to the worker thread, and the worker thread can respond back using `parentPort`. 
- This is a **bidirectional** communication channel:
  - Main thread **→** Worker thread (via `parentPort`)
  - Worker thread **→** Main thread (via `parentPort`)

### `MessageChannel`
- **`port1`** is typically used by the **main thread** to send messages to the worker thread.
- **`port2`** is typically used by the **worker thread** to send messages back to the main thread.
- This channel is also **bidirectional**, meaning that either port can send messages in both directions if needed:
  - Main thread **→** Worker thread (via `port1`)
  - Worker thread **→** Main thread (via `port2`)

### Key Concept: Symmetric Communication
- **`port1`** and **`port2`** are **two ends of the same communication channel**. 
  - If the **main thread** sends messages on **`port1`**, those messages will be received by **`port2`** in the worker.
  - Conversely, if the **worker thread** sends messages on **`port2`**, those will be received by **`port1`** in the main thread.
  
  Therefore, you **listen on `port1`** in the main thread because the worker sends messages from `port2`.

---

### Running the Example

After writing the code in `main.ts` and `worker.ts`, compile it using TypeScript:

```bash
npx tsc
```

Then, run the **main thread**:

```bash
node dist/main.js
```

### Example Output

The communication between the main thread and the worker thread should produce an output similar to the following:

```
Worker started with initial message: Hello from Main Thread
Message from worker via parentPort: Hello from Worker via parentPort
Main thread sending message via port1...
Worker received via port2: Main thread: Perform some task
Worker received: Main thread: Perform some task
Message from worker via port2: Result of task: 52.37488794689367
Main thread sending message via port1...
Worker received via port2: Main thread: Perform some task
Worker received: Main thread: Perform some task
Message from worker via port2: Result of task: 83.67454685967843
```

---

### Conclusion

By using **Worker Threads**, **`parentPort`**, **`MessageChannel`**, and **`workerData`** in Node.js, we can efficiently offload CPU-bound tasks to separate threads, allowing for parallel processing without blocking the main event loop. The combination of these components enables both **one-time communication** and **frequent, bidirectional messaging** between the **main thread** and **worker threads**.

This structure is especially useful for real-time applications, heavy data processing, or any scenario where parallel execution can improve performance. The use of **TypeScript** ensures type safety and cleaner communication handling between threads.

