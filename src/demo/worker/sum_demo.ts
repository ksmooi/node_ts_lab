// npx tsc
// node dist/demo/worker/sum_demo.js

import { Worker } from 'worker_threads';
import { resolve } from 'path';
import * as os from 'os';

// SumWorkerManager class manages an individual worker thread
export class SumWorkerManager {
    private worker: Worker;
    private workerData: { start: number; end: number };

    constructor(start: number, end: number) {
        // Set the worker data (range of numbers to calculate sum of squares)
        this.workerData = { start, end };

        // Create a new worker thread using the compiled worker file
        this.worker = new Worker(resolve(__dirname, 'sum_worker.js'), {
            workerData: this.workerData
        });
    }

    // Run the worker and return a promise for the result
    run(): Promise<number> {
        return new Promise((resolve, reject) => {
            // Listen for messages (results or errors) from the worker thread
            this.worker.on('message', (message) => {
                // Check if the message contains an error
                if (message.error) {
                    reject(new Error(message.error));  // Reject with error from worker
                } else {
                    resolve(message);  // Resolve with result from worker
                }
            });

            // Handle worker errors (e.g., uncaught exceptions in the worker)
            this.worker.on('error', (error) => {
                reject(new Error(`Worker error: ${error.message}`));
            });

            // Handle worker exit code
            this.worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        });
    }
}

// SumCalculator class manages the worker threads for calculating sums
class SumCalculator {
    private start: number;
    private end: number;
    private numWorkers: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
        // Use the number of CPU cores as the number of workers
        this.numWorkers = os.cpus().length;
    }

    // Method to divide work between workers and collect results
    public async calculateSumOfSquares(): Promise<number> {
        const rangePerWorker = Math.floor((this.end - this.start + 1) / this.numWorkers);
        const workerPromises = [];

        // Create workers for each range and store their promises
        for (let i = 0; i < this.numWorkers; i++) {
            const workerStart = this.start + i * rangePerWorker;
            const workerEnd = i === this.numWorkers - 1 ? this.end : workerStart + rangePerWorker - 1;
            const worker = new SumWorkerManager(workerStart, workerEnd);
            workerPromises.push(worker.run());
        }

        // Wait for all workers to complete and sum their results
        const results = await Promise.all(workerPromises);
        const totalSum = results.reduce((sum, current) => sum + current, 0);

        return totalSum;
    }
}

// Execute the sum calculation with proper error handling and detailed logs
async function main(): Promise<void> {
    const calculator = new SumCalculator(1, 100000); // Create an instance of SumCalculator
    const startTime = Date.now(); // Capture the start time

    console.log('Starting sum of squares calculation...');

    try {
        // Perform the sum of squares calculation
        const totalSum = await calculator.calculateSumOfSquares();

        const endTime = Date.now(); // Capture the end time
        const duration = (endTime - startTime) / 1000; // Calculate the duration

        // Display results
        console.log(`Calculation complete.`);
        console.log(`Total sum of squares: ${totalSum}`);
        console.log(`Time taken: ${duration} seconds.`);
    } catch (error) {
        // If an error occurs, log it
        console.error('An error occurred during the calculation:', error);
    }
}

// Execute the main function
main().catch(err => console.error(err));
