# Communication Between Main Thread and Worker Threads in TypeScript

In Node.js, worker threads provide a way to execute CPU-intensive tasks in parallel, leveraging multiple cores without blocking the main event loop. A critical aspect of using worker threads is the ability to pass data between the **main thread** and the **worker thread**, allowing both sides to exchange messages, pass data, and handle errors effectively.

In this article, we will cover how communication works between the main thread and worker threads in TypeScript, how to handle errors gracefully, and how to manage different scenarios like rejecting promises in the worker thread. 

## Overview of Worker Threads

Worker threads are a feature introduced in Node.js to allow you to run JavaScript in parallel on different threads. This is useful for offloading computationally expensive tasks such as calculating prime numbers, processing large datasets, or handling other CPU-bound tasks.

Node.js uses a **non-blocking, single-threaded event loop** to handle most tasks asynchronously, but for operations requiring significant computation, worker threads are useful for avoiding event loop blockage.

## Worker Communication in Node.js

Worker threads communicate with the main thread using message passing. The **`parentPort`** object (from the `worker_threads` module) allows the worker to send messages back to the main thread, while the **`Worker`** class in the main thread allows sending and receiving messages to/from the worker.

The primary functions for communication are:
- **`workerData`**: Used to send initial data from the main thread to the worker thread at the time of creation.
- **`parentPort.postMessage()`**: Sends data back from the worker thread to the main thread.

## Importing Required Modules

You need to import the `worker_threads` module to manage and communicate between the main thread and worker threads:

```typescript
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
```

- **`Worker`**: Used to create worker threads.
- **`isMainThread`**: A boolean that determines if the current thread is the main thread or a worker.
- **`parentPort`**: Provides a communication channel between the main thread and worker thread.
- **`workerData`**: Used to pass initial data to the worker when it starts.

## Creating Worker and Passing Data

Let’s start by seeing how the main thread can create a worker thread, pass data to it, and handle results or errors.

### Main Thread Example

In the main thread, we spawn a worker, send some data (via `workerData`), and listen for results or errors using events.

```typescript
import { Worker } from 'worker_threads';
import * as path from 'path';

// Function to create a worker and handle results or errors
function runWorker(workerData: { start: number; end: number }): Promise<number[]> {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.resolve(__dirname, 'worker_script.js'), { workerData });

        // Listen for messages (successful results) from the worker
        worker.on('message', (message) => {
            if (message.error) {
                reject(new Error(message.error));
            } else {
                resolve(message.result);
            }
        });

        // Handle errors thrown from the worker thread
        worker.on('error', reject);

        // Reject the promise if the worker exits with a non-zero code
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker exited with code ${code}`));
            }
        });
    });
}

// Example usage of the worker
async function main() {
    try {
        const result = await runWorker({ start: 1, end: 100 });
        console.log("Worker result:", result);
    } catch (error) {
        console.error("Worker error:", error);
    }
}

main();
```

### Explanation:

1. **`runWorker()`**: This function spawns a worker and handles communication. It passes the range (`start`, `end`) to the worker via `workerData` and listens for messages or errors.
   
2. **Handling Results**: If the worker thread sends a result, the promise is resolved. If the worker sends an error, the promise is rejected.

3. **Error Handling**: The `'error'` event captures exceptions thrown by the worker thread. The `'exit'` event checks if the worker exits with a non-zero code, indicating failure.

### Worker Thread Example

The worker thread receives data from the main thread, performs a task, and sends the result or an error back.

```typescript
import { parentPort, workerData } from 'worker_threads';

// Function to calculate sum of squares for a given range
function calculateSumOfSquares(start: number, end: number): number[] {
    if (start > end) {
        // If the range is invalid, return null to indicate an error
        return null;
    }

    const squares: number[] = [];
    for (let i = start; i <= end; i++) {
        squares.push(i * i);
    }
    return squares;
}

// Extract the range from workerData
const { start, end } = workerData;

// Perform the task and return result or error
const result = calculateSumOfSquares(start, end);

if (result === null) {
    // Send an error message back to the main thread
    parentPort?.postMessage({ error: `Invalid range: start (${start}) is greater than end (${end})` });
} else {
    // Send the result back to the main thread
    parentPort?.postMessage({ result });
}
```

## Error Handling in Worker Threads

When working with worker threads, you might encounter errors. It is essential to manage these errors properly, both in the main thread and the worker thread.

### 1. Rejecting and Returning Errors Manually

The worker thread can detect an error condition (such as invalid input) and send a custom error message back to the main thread via `parentPort.postMessage()`.

**Worker Example:**

```typescript
if (start > end) {
    parentPort?.postMessage({ error: `Invalid range: start (${start}) is greater than end (${end})` });
} else {
    parentPort?.postMessage({ result });
}
```

- In this example, if the `start` is greater than `end`, the worker thread sends an error message `{ error: "message" }` to the main thread.
- The main thread handles this error in the message listener and rejects the promise.

### 2. Throwing Errors from Worker Threads

A more automatic way to reject is to **throw an error** directly in the worker thread. This will cause the worker to emit an `'error'` event that the main thread can listen to.

**Worker Example (Throwing Errors):**

```typescript
if (start > end) {
    throw new Error(`Invalid range: start (${start}) is greater than end (${end})`);
}
```

- This method throws an error, and the main thread listens for this error using the `'error'` event.

## Handling Worker Errors in the Main Thread

In the main thread, you can handle worker errors in two ways:

1. **Via the `'message'` event** if the worker explicitly sends an error message.
2. **Via the `'error'` event** if the worker throws an error or encounters an unexpected issue.

Here’s how both methods work:

### Handling Custom Error Messages:

```typescript
worker.on('message', (message) => {
    if (message.error) {
        reject(new Error(message.error));  // Handle custom error
    } else {
        resolve(message.result);  // Handle success
    }
});
```

### Handling Thrown Errors:

```typescript
worker.on('error', reject);  // Automatically rejects the promise if an error is thrown in the worker
```

## Example: Combining Both Methods

Here’s a full example that handles both custom error messages and thrown errors in worker threads.

### Main Thread:

```typescript
function runWorker(workerData: { start: number; end: number }): Promise<number[]> {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.resolve(__dirname, 'worker_script.js'), { workerData });

        worker.on('message', (message) => {
            if (message.error) {
                reject(new Error(message.error));  // Handle custom error
            } else {
                resolve(message.result);  // Handle success
            }
        });

        worker.on('error', reject);  // Handle thrown errors
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker exited with code ${code}`));
            }
        });
    });
}
```

### Worker Thread:

```typescript
if (start > end) {
    throw new Error(`Invalid range: start (${start}) is greater than end (${end})`);
}

// Or, send custom error messages
if (someCondition) {
    parentPort?.postMessage({ error: 'Custom error message' });
}
```

## Conclusion

Communication between the main thread and worker threads in TypeScript involves passing messages using `workerData` and `parentPort`. This allows for efficient task delegation and result retrieval. Proper error handling is critical, and you can either:
- **Send custom error messages** via `parentPort.postMessage()`.
- **Throw errors** in the worker, which the main thread can capture via the `'error'` event.

By understanding these communication patterns, you can offload computationally intensive tasks to worker threads while ensuring robust error handling and graceful communication.

