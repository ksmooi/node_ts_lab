# Key Components of Worker Threads with TypeScript

**Node.js** is known for its single-threaded, non-blocking event loop, which makes it highly efficient for I/O-bound tasks. However, when it comes to **CPU-intensive operations** (e.g., processing large datasets, image manipulation, or encryption), the event loop can become blocked, reducing the responsiveness of your application. To address this, Node.js introduced **Worker Threads** in version 10.5.0 (stabilized in v12.0.0), allowing true parallelism for CPU-bound tasks.

In this article, we will explore the **key components** of Worker Threads, how they operate, and how to use them in a **TypeScript** project for optimal performance and type safety.

---

### Key Components of Worker Threads

The Worker Threads API in Node.js comprises several key components that help you manage worker threads, enable communication between threads, and facilitate the execution of parallel tasks. Let’s dive into these components.

#### 1. **`Worker` Class**

The `Worker` class is used in the **main thread** to create and manage worker threads. A worker thread runs a separate instance of JavaScript or TypeScript code, and by offloading tasks to worker threads, you can free the main event loop to handle other asynchronous operations.

##### Key Methods and Events:

- **`postMessage()`**: Sends a message from the main thread to the worker.
- **`on('message', callback)`**: Listens for messages from the worker.
- **`terminate()`**: Terminates the worker thread.
- **`on('error', callback)`**: Listens for errors that occur in the worker thread.
- **`on('exit', callback)`**: Triggered when the worker thread exits. This can be used for cleanup or logging purposes.

##### Example (Main Thread):

```ts
import { Worker } from 'worker_threads';
import path from 'path';

// Function to run the worker and handle communication
const runWorker = (num: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    // "worker.ts" will be compiled to "worker.js" before running
    const worker = new Worker(path.resolve(__dirname, 'worker.js'));

    // Send number to worker
    worker.postMessage(num);

    // Listen for results from worker
    worker.on('message', (result: number) => resolve(result));

    // Handle worker errors
    worker.on('error', reject);

    // Handle worker exit
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker exited with code ${code}`));
      }
    });
  });
};

runWorker(104729).then((result) => {
  console.log(`Is 104729 prime? ${result}`);
});
```

#### 2. **`parentPort`**

`parentPort` is a communication object available inside the worker thread. It allows the worker to send messages to and receive messages from the parent thread.

##### Key Methods:
- **`postMessage()`**: Sends data from the worker to the parent thread.
- **`on('message', callback)`**: Listens for incoming messages from the parent thread.

##### Example (Worker Thread):

```ts
import { parentPort } from 'worker_threads';

// Function to check if a number is prime
const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Listen for incoming messages from the parent thread
parentPort?.on('message', (num: number) => {
  const result = isPrime(num);

  // Send the result back to the parent thread
  parentPort?.postMessage(result);
});
```

In this example:
- The **main thread** sends a number to the worker thread via `postMessage()`.
- The **worker thread** performs the CPU-intensive operation (prime number check) and sends the result back using `parentPort.postMessage()`.

#### 3. **`MessageChannel`**

`MessageChannel` creates two linked `MessagePort` objects that allow for direct communication between threads or between the main thread and worker threads. This can be useful for more complex multi-threaded applications that require bidirectional communication between workers or communication between multiple threads.

##### Example:

```ts
import { MessageChannel } from 'worker_threads';

// Create a new message channel
const { port1, port2 } = new MessageChannel();

port1.on('message', (message) => {
  console.log('Received message from port2:', message);
});

port2.postMessage('Hello from port2');
```

Here, **`port1`** and **`port2`** are two connected ports that can send and receive messages from each other. This allows for lightweight message-passing between threads.

#### 4. **`isMainThread`**

`isMainThread` is a boolean that indicates whether the current script is running in the main thread or a worker thread. It’s useful when writing code that can be executed in both contexts, allowing you to conditionally perform actions based on the execution environment.

##### Example:

```ts
import { isMainThread, Worker } from 'worker_threads';
import path from 'path';

if (isMainThread) {
  // Code for the main thread
  const worker = new Worker(path.resolve(__dirname, 'worker.js'));
} else {
  // Code for the worker thread
  console.log('Running inside the worker thread');
}
```

#### 5. **`workerData`**

`workerData` is a property that allows you to pass initial data to the worker thread when it is spawned. This is particularly useful for parameterizing worker threads with specific input data when they are created.

##### Example (Main Thread):

```ts
import { Worker } from 'worker_threads';
import path from 'path';

// Pass data to the worker on initialization
const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
  workerData: { number: 104729 },
});
```

##### Example (Worker Thread):

```ts
import { workerData, parentPort } from 'worker_threads';

// Access the data passed from the main thread
const { number } = workerData;

const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Send the result back to the main thread
parentPort?.postMessage(isPrime(number));
```

In this scenario, **`workerData`** is passed when the worker is initialized, allowing you to parameterize the worker with any relevant input data.

#### 6. **`SharedArrayBuffer` and `Atomics`**

For high-performance applications where multiple threads need to share memory, Node.js supports **`SharedArrayBuffer`**. With `SharedArrayBuffer`, threads can share memory directly, which is more efficient than sending messages. **`Atomics`** provides atomic operations to prevent race conditions while manipulating shared memory.

##### Example:

```ts
const sharedBuffer = new SharedArrayBuffer(1024);
const int32Array = new Int32Array(sharedBuffer);

// Perform atomic operations on shared memory
Atomics.store(int32Array, 0, 123);
console.log(Atomics.load(int32Array, 0)); // Output: 123
```

#### 7. **`BroadcastChannel`**

`BroadcastChannel` allows multiple workers or the main thread to communicate via a shared channel. Unlike `MessageChannel`, `BroadcastChannel` is used for broadcasting messages to multiple listeners.

##### Example:

```ts
import { BroadcastChannel } from 'worker_threads';

const channel = new BroadcastChannel('my-channel');

// Listen for broadcast messages
channel.onmessage = (event) => {
  console.log('Message received:', event.data);
};

// Send a broadcast message
channel.postMessage('Hello, world!');
```

With `BroadcastChannel`, all workers or threads listening on the same channel will receive the message broadcasted to that channel.

---

### Summary of Key Components

| Component           | Description                                                                                  | Used In              |
|---------------------|----------------------------------------------------------------------------------------------|----------------------|
| **`Worker`**         | Class to spawn new worker threads from the main thread.                                       | Main thread          |
| **`parentPort`**     | Object to communicate between the worker and parent threads.                                  | Worker thread        |
| **`MessageChannel`** | Creates two `MessagePort` objects for communication between threads.                          | Both                 |
| **`isMainThread`**   | Boolean indicating whether the code is running in the main or worker thread.                  | Both                 |
| **`workerData`**     | Passes initial data from the main thread to the worker thread.                                | Worker thread        |
| **`SharedArrayBuffer`** | Shared memory buffer for communication between threads.                                     | Both                 |
| **`Atomics`**        | Provides atomic operations for manipulating shared memory (`SharedArrayBuffer`).              | Both                 |
| **`BroadcastChannel`** | Allows for broadcasting messages to multiple workers or the main thread.                    | Both                 |

---

### Real-World Use Case: Prime Number Checker Using Worker Threads

To demonstrate the practical application of Worker Threads, we will create a **prime number checker** that offloads the computation to a worker thread. This example illustrates how the `Worker` class, `parentPort`, and `workerData` can be used together.

#### Main Thread (`main.ts`):

```ts
import { Worker } from 'worker_threads';
import path from 'path';

// implement with arrow function
const runWorker = (number: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
      workerData: { number },
    });

    worker.on('message', (isPrime: boolean) => resolve(isPrime));
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker exited with code ${code}`));
      }
    });
  });
};

// implement without arrow function
function runWorker(number: number): Promise<boolean> {
  return new Promise(function (resolve, reject) {
    const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
      workerData: { number },
    });

    worker.on('message', function handleMessage(isPrime: boolean) {
      resolve(isPrime);
    });

    worker.on('error', function handleError(error) {
      reject(error);
    });

    worker.on('exit', function handleExit(code: number) {
      if (code !== 0) {
        reject(new Error(`Worker exited with code ${code}`));
      }
    });
  });
}

runWorker(104729).then((isPrime) => {
  console.log(`Is 104729 prime? ${isPrime}`);
}).catch((err) => console.error('Worker error:', err));
```

#### Worker Thread (`worker.ts`):

```ts
import { parentPort, workerData } from 'worker_threads';

const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const { number } = workerData;
parentPort?.postMessage(isPrime(number));
```

In this example:
- The **main thread** creates a worker thread and sends a number to it via `workerData`.
- The **worker thread** computes whether the number is prime and sends the result back to the main thread via `parentPort`.

---

### Conclusion

Node.js Worker Threads offer a powerful mechanism for parallelizing CPU-bound tasks, enabling applications to handle complex computations without blocking the event loop. By leveraging the key components such as **`Worker`**, **`parentPort`**, **`workerData`**, and **`SharedArrayBuffer`**, you can efficiently distribute tasks across multiple threads while maintaining type safety with **TypeScript**.

This approach is especially beneficial for tasks like data processing, image manipulation, or large-scale computations that would otherwise degrade performance if run on the main thread. With the added benefit of TypeScript, developers can ensure safe and predictable communication between threads, making the development of parallel applications more robust and scalable.

