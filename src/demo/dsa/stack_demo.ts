// npx ts-node -r tsconfig-paths/register src/demo/dsa/stack_demo.ts

import { Stack } from 'modules/dsa/stack';

// === Initializing a Stack ===
function demoInitializingStack(stack: Stack<number>) {
    console.log("Initializing a stack of numbers...");
}

// === Accessing Stack Information ===
function demoAccessingStack(stack: Stack<number>) {
    console.log("\n--- Accessing the Stack ---");
    console.log("Is stack empty?", stack.isEmpty());  // Expected: true
    console.log("Stack size:", stack.size());  // Expected: 0
}

// === Pushing Elements onto the Stack ===
function demoPushingElements(stack: Stack<number>) {
    console.log("\n--- Pushing elements onto the stack ---");
    stack.push(10);
    stack.push(20);
    stack.push(30);
    console.log("Stack size after push:", stack.size());  // Expected: 3
    console.log("Top element after push (peek):", stack.peek());  // Expected: 30
}

// === Forward Iteration (Bottom to Top) ===
function demoForwardIteration(stack: Stack<number>) {
    console.log("\nForward iteration (bottom to top):");
    for (const value of stack) {
        console.log(value);  // Expected: 10, 20, 30
    }
}

// === Backward Iteration (Top to Bottom) ===
function demoBackwardIteration(stack: Stack<number>) {
    console.log("\nBackward iteration (top to bottom):");
    const reverseIter = stack.reverseIterator();
    for (let result = reverseIter.next(); !result.done; result = reverseIter.next()) {
        console.log(result.value);  // Expected: 30, 20, 10
    }
}

// === Peek at Top Element ===
function demoPeekAtTop(stack: Stack<number>) {
    console.log("\n--- Updating the stack by peeking at top element ---");
    if (!stack.isEmpty()) {
        console.log("Top element (peek):", stack.peek());  // Expected: 30
    }
}

// === Popping Elements from the Stack ===
function demoPoppingElements(stack: Stack<number>) {
    console.log("\n--- Iterating through the stack (by popping elements) ---");
    while (!stack.isEmpty()) {
        console.log("Popped element:", stack.pop());
        console.log("Stack size now:", stack.size());
    }
}

// === Push and Pop After Manipulation ===
function demoPushAndPop(stack: Stack<number>) {
    console.log("\n--- Pushing elements again and deleting the top element ---");
    stack.push(100);
    stack.push(200);
    console.log("Stack size before pop:", stack.size());  // Expected: 2
    console.log("Popped element:", stack.pop());  // Expected: 200
    console.log("Stack size after pop:", stack.size());  // Expected: 1
}

// === Clearing the Stack ===
function demoClearStack(stack: Stack<number>) {
    console.log("\n--- Clearing the stack ---");
    stack.clear();
    console.log("Stack size after clearing:", stack.size());  // Expected: 0
    console.log("Is stack empty after clearing?", stack.isEmpty());  // Expected: true
}

// === Push After Clearing ===
function demoPushAfterClear(stack: Stack<number>) {
    stack.push(1000);
    stack.push(2000);
    console.log("\nAfter clearing and pushing new elements...");
    console.log("Top element (peek):", stack.peek());  // Expected: 2000
    console.log("Stack size:", stack.size());  // Expected: 2
}

// === Run All Demos ===
function runAllStackDemos() {
    const stack = new Stack<number>();

    // Run individual demo sections
    demoInitializingStack(stack);
    demoAccessingStack(stack);
    demoPushingElements(stack);
    demoForwardIteration(stack);
    demoBackwardIteration(stack);
    demoPeekAtTop(stack);
    demoPoppingElements(stack);
    demoPushAndPop(stack);
    demoClearStack(stack);
    demoPushAfterClear(stack);
}

// Execute all demos
runAllStackDemos();
