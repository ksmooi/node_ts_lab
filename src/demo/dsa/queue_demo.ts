// npx ts-node -r tsconfig-paths/register src/demo/dsa/queue_demo.ts

import { Queue } from 'modules/dsa/queue';

// === Inserting Elements (Enqueue) ===
function demoEnqueue(numberQueue: Queue<number>) {
    console.log("Enqueue 10, 20, 30 into the queue...");
    numberQueue.enqueue(10);
    numberQueue.enqueue(20);
    numberQueue.enqueue(30);
}

// === Accessing Elements ===
function demoAccessingElements(numberQueue: Queue<number>) {
    console.log("\nAccessing elements:");
    console.log("Peek at the front element (without removing):", numberQueue.peek());  // Should print 10
    console.log("Queue size:", numberQueue.size());  // Should print 3
}

// === Forward Iteration ===
function demoForwardIteration(numberQueue: Queue<number>) {
    console.log("\nIterating from front to rear:");
    for (const item of numberQueue) {
        console.log(item);  // Expected: 10, 20, 30
    }
}

// === Reverse Iteration ===
function demoReverseIteration(numberQueue: Queue<number>) {
    console.log("\nIterating from rear to front:");
    const reverseIter = numberQueue.reverseIterator();
    for (let result = reverseIter.next(); !result.done; result = reverseIter.next()) {
        console.log(result.value);  // Expected: 30, 20, 10
    }
}

// === Deletion (Dequeue) ===
function demoDequeue(numberQueue: Queue<number>) {
    console.log("\nDequeueing elements...");
    const dequeuedItem1 = numberQueue.dequeue();
    console.log("Dequeued:", dequeuedItem1);  // Should print 10

    const dequeuedItem2 = numberQueue.dequeue();
    console.log("Dequeued:", dequeuedItem2);  // Should print 20

    console.log("Peek at the front element after dequeuing:", numberQueue.peek());  // Should print 30
    console.log("Queue size after dequeueing:", numberQueue.size());  // Should print 1
}

// === Checking if Queue Contains an Element ===
function demoContainsElements(numberQueue: Queue<number>) {
    console.log("\nChecking if the queue contains certain elements:");
    console.log("Contains 30?", numberQueue.contains(30));  // true
    console.log("Contains 50?", numberQueue.contains(50));  // false
}

// === Convert Queue to Array ===
function demoConvertToArray(numberQueue: Queue<number>) {
    console.log("\nConverting queue to array:");
    console.log("Queue as Array:", numberQueue.toArray());  // Should print [30]
}

// === Clearing the Queue ===
function demoClearQueue(numberQueue: Queue<number>) {
    console.log("\nClearing the queue...");
    numberQueue.clear();
    console.log("Is queue empty after clearing?", numberQueue.isEmpty());  // Should print true
    console.log("Queue size after clearing:", numberQueue.size());  // Should print 0
}

// === Try Dequeueing from Empty Queue (Error Handling) ===
function demoDequeueFromEmptyQueue(numberQueue: Queue<number>) {
    try {
        console.log("\nAttempting to dequeue from an empty queue...");
        numberQueue.dequeue();  // This should return undefined or throw an error
    } catch (error) {
        // Type check for error instance
        if (error instanceof Error) {
            console.error("Error:", error.message);
        } else {
            console.error("Unknown error occurred");
        }
    }
}

// === Run All Demos ===
function runAllQueueDemos() {
    const numberQueue = new Queue<number>();

    // Run individual demo sections
    demoEnqueue(numberQueue);
    demoAccessingElements(numberQueue);
    demoForwardIteration(numberQueue);
    demoReverseIteration(numberQueue);
    demoDequeue(numberQueue);
    demoContainsElements(numberQueue);
    demoConvertToArray(numberQueue);
    demoClearQueue(numberQueue);
    demoDequeueFromEmptyQueue(numberQueue);
}

// Execute all demos
runAllQueueDemos();
