import { workerData, parentPort } from 'worker_threads';

// A simple recursive function to compute the nth Fibonacci number
function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

try {
    // Validate that the input is a non-negative integer
    const { n } = workerData;
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
        throw new Error('Invalid input: n must be a non-negative integer');
    }

    // Check if n is too large for practical computation (e.g., to avoid performance issues)
    if (n > 40) {
        throw new Error('Input too large: Fibonacci calculations for n > 40 may cause performance issues');
    }

    // Calculate the Fibonacci number
    const result = fibonacci(n);

    // Send the result back to the main thread
    parentPort?.postMessage({ result });

} catch (error) {
    // Catch any errors and send them to the main thread
    if (error instanceof Error) {
        parentPort?.postMessage({ error: error.message });
    } else {
        parentPort?.postMessage({ error: 'Unknown error occurred in the worker thread' });
    }
}
