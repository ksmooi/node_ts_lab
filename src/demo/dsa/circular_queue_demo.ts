// npx ts-node -r tsconfig-paths/register src/demo/dsa/circular_queue_demo.ts

import { CircularQueue } from 'modules/dsa/circular_queue';

// Create a CircularQueue with a fixed size of 5
const circularQueue = new CircularQueue<number>(5);

// === Insertion (Enqueue) ===
console.log("Enqueueing 10, 20, 30 into the CircularQueue...");
circularQueue.enqueue(10);
circularQueue.enqueue(20);
circularQueue.enqueue(30);

// === Accessing Elements ===
console.log("\nAccessing elements:");
console.log("Peek at the front element (without removing):", circularQueue.peek());  // Expected: 10
console.log("Queue size:", circularQueue.length());  // Expected: 3
console.log("Is the queue empty?", circularQueue.isEmpty());  // Expected: false

// === Inserting more items ===
console.log("\nEnqueueing 40 and 50 to fill the queue...");
circularQueue.enqueue(40);
circularQueue.enqueue(50);

console.log("Queue size after enqueuing more elements:", circularQueue.length());  // Expected: 5

// === Handling a full queue (Error Handling) ===
try {
    console.log("Attempting to enqueue 60 into a full queue...");
    circularQueue.enqueue(60);  // This should throw an error
} catch (error) {
    console.error("Error:", (error as Error).message);  // Expected error: "Queue is full"
}

// === Iterating Forward (from front to rear) ===
console.log("\nIterating from front to rear:");
for (const item of circularQueue) {
    console.log(item);  // Expected: 10, 20, 30, 40, 50
}

// === Reverse Iteration (from rear to front) ===
console.log("\nIterating from rear to front:");
const reverseIterator = circularQueue.reverseIterator();
for (let result = reverseIterator.next(); result.done == false; result = reverseIterator.next()) {
    console.log(result.value);  // Expected: 50, 40, 30, 20, 10
}

// === Deletion (Dequeue) ===
console.log("\nDequeueing elements...");
const dequeuedItem1 = circularQueue.dequeue();
console.log("Dequeued:", dequeuedItem1);  // Expected: 10

const dequeuedItem2 = circularQueue.dequeue();
console.log("Dequeued:", dequeuedItem2);  // Expected: 20

console.log("Peek at the front element after dequeuing:", circularQueue.peek());  // Expected: 30
console.log("Queue size after dequeueing:", circularQueue.length());  // Expected: 3

// === Enqueue After Dequeue ===
console.log("\nEnqueueing 60 after dequeueing...");
circularQueue.enqueue(60);

console.log("Queue after enqueueing 60 (Front to Rear):");
for (const item of circularQueue) {
    console.log(item);  // Expected: 30, 40, 50, 60
}

// === Iterating Again After Dequeue and Enqueue ===
console.log("\nIterating from front to rear after enqueueing 60:");
for (const item of circularQueue) {
    console.log(item);  // Expected: 30, 40, 50, 60
}

// === Clearing the Queue ===
console.log("\nClearing the queue...");
circularQueue.dequeue();  // Remove 30
circularQueue.dequeue();  // Remove 40
circularQueue.dequeue();  // Remove 50
circularQueue.dequeue();  // Remove 60

console.log("Is queue empty after clearing?", circularQueue.isEmpty());  // Expected: true
console.log("Queue size after clearing:", circularQueue.length());  // Expected: 0

// === Dequeue From an Empty Queue (Error Handling) ===
try {
    console.log("Attempting to dequeue from an empty queue...");
    circularQueue.dequeue();  // This should throw an error
} catch (error) {
    console.error("Error:", (error as Error).message);  // Expected error: "Queue is empty"
}
