// npx ts-node -r tsconfig-paths/register src/demo/dsa/linked_list_demo.ts

import { DoublyLinkedList } from 'modules/dsa/linked_list';

// Initialize the DoublyLinkedList
const list = new DoublyLinkedList<number>();

// === Inserting elements ===
console.log("Inserting elements...");

// Append elements to the end of the list
list.append(10);
list.append(20);
list.append(30);

// Prepend elements to the beginning of the list
list.prepend(5);
list.prepend(0);

console.log("List after insertion:");
for (const value of list) {
    console.log(value);  // Expected: 0, 5, 10, 20, 30
}

// === Accessing elements ===
console.log("\nAccessing elements...");
console.log("Size of the list:", list.size());  // Expected: 5
console.log("Is the list empty?", list.isEmpty());  // Expected: false
console.log("Finding value 10 in the list:", list.find(10)?.value);  // Expected: 10
console.log("Finding value 100 in the list:", list.find(100));  // Expected: null

// === Iterating through the list ===
console.log("\nIterating forward through the list:");
for (const value of list) {
    console.log(value);  // Expected: 0, 5, 10, 20, 30
}

console.log("\nIterating backward through the list:");
const reverseIter = list.reverseIterator();
for (let result = reverseIter.next(); result.done == false; result = reverseIter.next()) {
    console.log(result.value);  // Expected: 30, 20, 10, 5, 0
}

// === Manipulating the list (Updating/Deleting) ===
// Removing elements
console.log("\nRemoving elements...");

list.remove(0);  // Removing the head element (0)
console.log("List after removing 0:");
for (const value of list) {
    console.log(value);  // Expected: 5, 10, 20, 30
}

list.remove(30);  // Removing the tail element (30)
console.log("List after removing 30:");
for (const value of list) {
    console.log(value);  // Expected: 5, 10, 20
} // <-- Missing closing brace added here

list.remove(10);  // Removing a middle element (10)
console.log("List after removing 10:");
for (const value of list) {
    console.log(value);  // Expected: 5, 20
}

// === Advanced methods ===
// Clear the list
console.log("\nClearing the list...");
list.clear();
console.log("Is the list empty after clearing?", list.isEmpty());  // Expected: true

// Append more elements after clearing
list.append(100);
list.append(200);
console.log("List after appending new elements:");
for (const value of list) {
    console.log(value);  // Expected: 100, 200
}
