// npx tsc
// node dist/demo/worker/prime_demo.js

import { Worker } from 'worker_threads';
import { join } from 'path';
import * as os from 'os';

// Function to create a worker and return a promise that resolves when the worker sends a message or rejects on error
function runWorker(start: number, end: number): Promise<number[]> {
    return new Promise((resolve, reject) => {
        const workerData = { start, end };  // Set the worker data
        const workerPath = join(__dirname, '/prime_worker.js');  // Path to the worker file

        // Create a new worker thread (use .js path after compilation)
        const worker = new Worker(workerPath, {
            workerData: workerData
        });

        // Listen for messages from the worker (results or errors)
        worker.on('message', (message) => {
            if (message.error) {
                reject(new Error(message.error));  // Handle error message
            } else {
                resolve(message);  // Handle the successful result
            }
        });        

        // Listen for any errors that might occur in the worker thread
        worker.on('error', reject);

        // If the worker stops with an exit code other than 0, reject the promise
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

async function main(): Promise<void> {
    const startTime = Date.now();

    // Define the range to calculate prime numbers
    const start = 2;
    const end = 100000;

    // Get the number of CPU cores available
    const numWorkers = os.cpus().length;

    // Calculate the range each worker will handle
    const rangePerWorker = Math.floor((end - start + 1) / numWorkers);

    // Create an array of promises to run workers for each range
    const workerPromises = [];
    for (let i = 0; i < numWorkers; i++) {
        const workerStart = start + i * rangePerWorker;
        const workerEnd = i === numWorkers - 1 ? end : workerStart + rangePerWorker - 1;
        workerPromises.push(runWorker(workerStart, workerEnd));
    }

    // Wait for all workers to complete and gather their results
    const results = await Promise.all(workerPromises);

    // Flatten the array of prime numbers and sort them
    const primes = results.flat().sort((a, b) => a - b);

    const endTime = Date.now();

    // Display the results
    console.log(`Found ${primes.length} prime numbers.`);
    console.log(`First few primes: ${primes.slice(0, 10).join(', ')}`);
    console.log(`Last few primes: ${primes.slice(-10).join(', ')}`);
    console.log(`Time taken: ${(endTime - startTime) / 1000} seconds.`);
}

// Execute the main function
main().catch(err => console.error(err));
