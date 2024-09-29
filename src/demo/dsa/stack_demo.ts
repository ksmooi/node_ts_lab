// npx ts-node -r tsconfig-paths/register src/demo/dsa/stack_demo.ts

import { Stack } from 'modules/dsa/stack';

// === Initializing a stack ===
console.log("Initializing a stack of numbers...");
const stack = new Stack<number>();

// === Accessing ===
console.log("\n--- Accessing the Stack ---");
console.log("Is stack empty?", stack.isEmpty());  // Expected: true
console.log("Stack size:", stack.size());  // Expected: 0

// === Manipulating (Insert) ===
console.log("\n--- Pushing elements onto the stack ---");
stack.push(10);
stack.push(20);
stack.push(30);
console.log("Stack size after push:", stack.size());  // Expected: 3
console.log("Top element after push (peek):", stack.peek());  // Expected: 30

// === Forward Iteration (from bottom to top) ===
console.log("\nForward iteration (bottom to top):");
for (const value of stack) {
    console.log(value);  // Expected: 10, 20, 30
}

// === Backward Iteration (from top to bottom) ===
console.log("\nBackward iteration (top to bottom):");
const reverseIter = stack.reverseIterator();
for (let result = reverseIter.next(); result.done == false; result = reverseIter.next()) {
    console.log(result.value);  // Expected: 30, 20, 10
}

// === Manipulating (Update/Peek) ===
console.log("\n--- Updating the stack by peeking at top element ---");
if (!stack.isEmpty()) {
    console.log("Top element (peek):", stack.peek());  // Expected: 30
}

// === Iterating (Note: Stacks are LIFO, Last In, First Out) ===
console.log("\n--- Iterating through the stack (by popping elements) ---");
while (!stack.isEmpty()) {
    console.log("Popped element:", stack.pop());
    console.log("Stack size now:", stack.size());
}

// === Manipulating (Delete) ===
console.log("\n--- Pushing elements again and deleting the top element ---");
stack.push(100);
stack.push(200);
console.log("Stack size before pop:", stack.size());  // Expected: 2
console.log("Popped element:", stack.pop());  // Expected: 200
console.log("Stack size after pop:", stack.size());  // Expected: 1

// === Advanced Methods ===
console.log("\n--- Clearing the stack ---");
stack.clear();
console.log("Stack size after clearing:", stack.size());  // Expected: 0
console.log("Is stack empty after clearing?", stack.isEmpty());  // Expected: true

// === Pushing and accessing elements after clearing ===
stack.push(1000);
stack.push(2000);
console.log("\nAfter clearing and pushing new elements...");
console.log("Top element (peek):", stack.peek());  // Expected: 2000
console.log("Stack size:", stack.size());  // Expected: 2
