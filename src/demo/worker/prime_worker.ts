import { parentPort, workerData } from 'worker_threads';

// Function to check if a number is prime
function isPrime(n: number): boolean {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

try {
    // Validate the input data
    if (typeof workerData.start !== 'number' || typeof workerData.end !== 'number') {
        throw new Error('Invalid input: start and end must be numbers');
    }

    const { start, end } = workerData;

    // Ensure valid range: start should not be greater than end
    if (start > end) {
        throw new Error(`Invalid range: start (${start}) is greater than end (${end})`);
    }

    // Array to store found prime numbers
    const primes: number[] = [];

    // Find prime numbers in the given range
    for (let i = start; i <= end; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }

    // Send the result (primes) back to the main thread via parentPort
    parentPort?.postMessage(primes);
} catch (error) {
    // Send error message back to the main thread
    if (error instanceof Error) {
        parentPort?.postMessage({ error: error.message });
    } else {
        // Fallback for unknown error types
        parentPort?.postMessage({ error: 'An unknown error occurred in the worker thread' });
    }
}
