// npx ts-node -r tsconfig-paths/register src/demo/dsa/std_array_splice_demo.ts

// array.splice(startIndex, deleteCount, item1, item2, ...);
// - startIndex       : The index at which to start changing the array.
// - deleteCount      : The number of elements to remove starting from startIndex.
// - item1, item2, ...: The items to add to the array (optional).

// Key Points:
// - Accessing: You can directly access elements using the index after calling splice().
// - Removing : Use splice(startIndex, deleteCount) to remove elements.
// - Inserting: Use splice(startIndex, 0, item1, item2, ...) to insert elements without removing anything.
// - Replacing: Use splice(startIndex, deleteCount, item1, item2, ...) to remove and replace elements simultaneously.

// === Example 1: Removing elements ===
function demoRemoveElements() {
    const colors = ["Red", "Green", "Blue", "Yellow", "Purple"];
    console.log("Initial colors array:", colors);

    // Remove two elements starting from index 1 (removes "Green" and "Blue")
    const removedColors = colors.splice(1, 2);
    console.log("Colors array after removing elements:", colors);  // Expected: ["Red", "Yellow", "Purple"]
    console.log("Removed colors:", removedColors);  // Expected: ["Green", "Blue"]
}

// === Example 2: Inserting elements ===
function demoInsertElements() {
    const animals = ["Dog", "Cat", "Bird"];
    console.log("\nInitial animals array:", animals);

    // Insert two new animals at index 1 without removing any elements
    animals.splice(1, 0, "Rabbit", "Horse");
    console.log("Animals array after inserting elements:", animals);  // Expected: ["Dog", "Rabbit", "Horse", "Cat", "Bird"]
}

// === Example 3: Replacing elements ===
function demoReplaceElements() {
    const cities = ["London", "Paris", "New York", "Tokyo"];
    console.log("\nInitial cities array:", cities);

    // Replace two cities starting from index 2 with "Berlin" and "Sydney"
    const replacedCities = cities.splice(2, 2, "Berlin", "Sydney");
    console.log("Cities array after replacing elements:", cities);  // Expected: ["London", "Paris", "Berlin", "Sydney"]
    console.log("Replaced cities:", replacedCities);  // Expected: ["New York", "Tokyo"]
}

// === Example 4: Removing all elements after a specific index ===
function demoRemoveAllAfterIndex() {
    const numbers = [10, 20, 30, 40, 50];
    console.log("\nInitial numbers array:", numbers);

    // Remove all elements starting from index 3 (removes "40" and "50")
    const removedNumbers = numbers.splice(3);
    console.log("Numbers array after removing elements:", numbers);  // Expected: [10, 20, 30]
    console.log("Removed numbers:", removedNumbers);  // Expected: [40, 50]
}

// === Example 5: Removing a single element ===
function demoRemoveOneElement() {
    const fruits = ["Apple", "Banana", "Cherry", "Date", "Fig"];
    console.log("\nInitial fruits array:", fruits);

    // Remove one element at index 1 (removes "Banana")
    const removedOneFruit = fruits.splice(1, 1);
    console.log("Fruits array after removing one element:", fruits);  // Expected: ["Apple", "Cherry", "Date", "Fig"]
    console.log("Removed fruit:", removedOneFruit);  // Expected: ["Banana"]
}

// === Example 6: Inserting and deleting at the same time ===
function demoInsertAndDelete() {
    const names = ["Alice", "Bob", "Charlie", "David"];
    console.log("\nInitial names array:", names);

    // Remove one element at index 2 (removes "Charlie") and insert "Eve" and "Frank"
    const modifiedNames = names.splice(2, 1, "Eve", "Frank");
    console.log("Names array after splice (remove and insert):", names);  // Expected: ["Alice", "Bob", "Eve", "Frank", "David"]
    console.log("Removed name:", modifiedNames);  // Expected: ["Charlie"]
}

// === Example 7: Deleting multiple elements with a large delete count ===
function demoLargeDeleteCount() {
    const letters = ["A", "B", "C", "D", "E", "F"];
    console.log("\nInitial letters array:", letters);

    // Attempt to remove 10 elements starting from index 3 (even though only 3 elements remain)
    const largeDelete = letters.splice(3, 10);
    console.log("Letters array after large delete:", letters);  // Expected: ["A", "B", "C"]
    console.log("Removed letters:", largeDelete);  // Expected: ["D", "E", "F"]
}

// === Example 8: Removing elements from the end using a negative index ===
function demoRemoveUsingNegativeIndex() {
    const scores = [100, 200, 300, 400, 500];
    console.log("\nInitial scores array:", scores);

    // Remove one element starting from the second-to-last position (index -2, removes "400")
    const removedScore = scores.splice(-2, 1);
    console.log("Scores array after removing from the end:", scores);  // Expected: [100, 200, 300, 500]
    console.log("Removed score:", removedScore);  // Expected: [400]
}

// === Run all demos ===
function runStdArraySpliceDemos() {
    console.log("\n=== Example 1: Removing elements ===");
    demoRemoveElements();

    console.log("\n=== Example 2: Inserting elements ===");
    demoInsertElements();

    console.log("\n=== Example 3: Replacing elements ===");
    demoReplaceElements();

    console.log("\n=== Example 4: Removing all elements after a specific index ===");
    demoRemoveAllAfterIndex();

    console.log("\n=== Example 5: Removing a single element ===");
    demoRemoveOneElement();

    console.log("\n=== Example 6: Inserting and deleting at the same time ===");
    demoInsertAndDelete();

    console.log("\n=== Example 7: Deleting multiple elements with a large delete count ===");
    demoLargeDeleteCount();

    console.log("\n=== Example 8: Removing elements from the end using a negative index ===");
    demoRemoveUsingNegativeIndex();
}

// Execute all demos
runStdArraySpliceDemos();
