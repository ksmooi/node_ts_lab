import { parentPort, workerData } from 'worker_threads';

// Function to calculate the sum of squares for a given range
function calculateSumOfSquares(start: number, end: number): number {
    if (start > end) {
        throw new Error(`Invalid range: start (${start}) is greater than end (${end})`);
    }
    let sum = 0;
    for (let i = start; i <= end; i++) {
        sum += i * i;
    }
    return sum;
}

try {
    // Validate workerData
    if (typeof workerData.start !== 'number' || typeof workerData.end !== 'number') {
        throw new Error('Invalid input: start and end must be numbers');
    }

    // Extract the range from workerData
    const { start, end } = workerData;

    // Calculate the sum of squares in the range
    const result = calculateSumOfSquares(start, end);

    // Send the result back to the main thread
    parentPort?.postMessage(result);

} catch (error) {
    // If an error occurs, send the error message back to the main thread
    if (error instanceof Error) {
        parentPort?.postMessage({ error: error.message });
    } else {
        parentPort?.postMessage({ error: 'Unknown error occurred' });
    }
}
