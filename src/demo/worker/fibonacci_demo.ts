// npx tsc
// node dist/demo/worker/fibonacci_demo.js

import { Worker } from 'worker_threads';
import { join } from 'path';


export class FibonacciManager {
    // Method to create a worker and compute the Fibonacci number
    public calculateFibonacci(n: number): Promise<number> {
        return new Promise((resolve, reject) => {
            // Create a new worker thread to calculate Fibonacci
            const workerPath = join(__dirname, 'fibonacci_worker.js');  // Path to the worker file
            const worker = new Worker(workerPath, {
                workerData: { n }  // Pass the Fibonacci number index to the worker when creating it
            });

            // Listen for a message from the worker (the result or an error)
            worker.on('message', (message: { result?: number; error?: string }) => {
                if (message.error) {
                    reject(new Error(message.error));  // Reject if the worker sends an error message
                } else if (message.result !== undefined) {
                    resolve(message.result);  // Resolve with the Fibonacci result
                } else {
                    reject(new Error('Unexpected message from worker.'));
                }
            });

            // Handle worker errors (e.g., uncaught exceptions in the worker)
            worker.on('error', (error: Error) => {
                reject(new Error(`Worker error: ${error.message}`));
            });

            // Handle worker exit and check for non-zero exit codes
            worker.on('exit', (code: number) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        });
    }
}

async function runFibonacciDemo(): Promise<void> {
    const manager = new FibonacciManager();

    console.log("Starting Fibonacci calculation using worker threads...");

    try {
        const startTime = Date.now();

        // Calculate Fibonacci numbers for multiple values
        const fib10 = await manager.calculateFibonacci(10);  // Fib(10)
        const fib20 = await manager.calculateFibonacci(20);  // Fib(20)
        const fib30 = await manager.calculateFibonacci(30);  // Fib(30)
        
        const endTime = Date.now();
        
        console.log("Fibonacci(10):", fib10);  // Expected: 55
        console.log("Fibonacci(20):", fib20);  // Expected: 6765
        console.log("Fibonacci(30):", fib30);  // Expected: 832040
        console.log(`Time taken: ${(endTime - startTime) / 1000} seconds.`);
    } catch (error) {
        console.error("Error:", error);
    }
}

runFibonacciDemo();
