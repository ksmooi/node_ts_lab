// npx ts-node -r tsconfig-paths/register src/demo/dsa/std_array_demo.ts

// === Initializing and Accessing an Array ===
const fruits: string[] = ["Apple", "Banana", "Cherry"];
console.log("Initial fruits array:", fruits);

// Accessing elements by index
console.log("\nAccessing elements:");
console.log("First fruit:", fruits[0]);  // Expected: Apple
console.log("Second fruit:", fruits[1]);  // Expected: Banana
console.log("Last fruit:", fruits[fruits.length - 1]);  // Expected: Cherry

// === Iterating Through the Array ===

// 1. Using a for loop
console.log("\nIterating with a for loop:");
for (let i = 0; i < fruits.length; ++i) {
    console.log(`Fruit at index ${i}:`, fruits[i]);
}

// 2. Using for...of loop
console.log("\nIterating with for...of loop:");
for (const fruit of fruits) {
    console.log(fruit);
}

// 3. Using forEach
console.log("\nIterating with forEach:");
fruits.forEach((fruit, index) => {
    console.log(`Fruit at index ${index}:`, fruit);
});

// === Manipulating the Array ===

// 1. Insertion at the end using push
console.log("\nInserting elements:");
fruits.push("Durian");
console.log("Fruits after push (adding Durian):", fruits);

// 2. Insertion at the beginning using unshift
fruits.unshift("Elderberry");
console.log("Fruits after unshift (adding Elderberry):", fruits);

// 3. Updating an element
console.log("\nUpdating an element:");
fruits[1] = "Blueberry";  // Replacing Banana with Blueberry
console.log("Fruits after updating:", fruits);

// 4. Deleting an element using splice
//    array.splice(startIndex, deleteCount, item1, item2, ...);
//    - startIndex: The index at which to start changing the array.
//    - deleteCount: The number of elements to remove starting from startIndex.
//    - item1, item2, ...: The items to add to the array (optional).
console.log("\nDeleting an element with splice:");
const removedFruits = fruits.splice(2, 1);  // Removes Cherry at index 2
console.log("Fruits after splice:", fruits);
console.log("Removed fruit:", removedFruits);  // Expected: Cherry

// 5. Deleting the last element using pop
const lastFruit = fruits.pop();
console.log("\nFruits after pop (removing last element):", fruits);
console.log("Popped fruit:", lastFruit);  // Expected: Durian

// 6. Deleting the first element using shift
const firstFruit = fruits.shift();
console.log("\nFruits after shift (removing first element):", fruits);
console.log("Shifted fruit:", firstFruit);  // Expected: Elderberry

// === Advanced Methods ===

// 1. Filtering the array
console.log("\nFiltering the array:");
const filteredFruits = fruits.filter(fruit => fruit.startsWith("B"));
console.log("Fruits that start with 'B':", filteredFruits);  // Expected: Blueberry

// 2. Mapping the array
console.log("\nMapping the array:");
const upperCaseFruits = fruits.map(fruit => fruit.toUpperCase());
console.log("Fruits in uppercase:", upperCaseFruits);  // Expected: BLUEBERRY

// 3. Reducing the array (concatenating all elements into a string)
console.log("\nReducing the array:");
const concatenatedFruits = fruits.reduce((acc, fruit) => acc + " " + fruit, "Fruits:");
console.log(concatenatedFruits);  // Expected: Fruits: Blueberry

// 4. Checking if an element exists using includes
console.log("\nChecking if an element exists:");
console.log("Does the array include 'Blueberry'?", fruits.includes("Blueberry"));  // Expected: true
console.log("Does the array include 'Cherry'?", fruits.includes("Cherry"));  // Expected: false

// 5. Sorting the array
console.log("\nSorting the array:");
fruits.push("Mango", "Apricot");
console.log("Fruits before sorting:", fruits);
fruits.sort();
console.log("Fruits after sorting:", fruits);  // Expected: Alphabetical order

// 6. Reversing the array
console.log("\nReversing the array:");
fruits.reverse();
console.log("Fruits after reversing:", fruits);  // Expected: Reverse of sorted order
