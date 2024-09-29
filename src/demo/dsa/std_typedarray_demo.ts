// npx ts-node -r tsconfig-paths/register src/demo/dsa/std_typedarray_demo.ts

// A demo of using TypedArray in TypeScript

// === Initializing and Accessing a TypedArray (Int16Array) ===
const typedArray: Int16Array = new Int16Array([10, 20, 30, 40, 50]);
console.log("Initial typed array:", typedArray);

// Accessing elements by index
console.log("\nAccessing elements:");
console.log("First element:", typedArray[0]);  // Expected: 10
console.log("Last element:", typedArray[typedArray.length - 1]);  // Expected: 50

// === Iterating Through the TypedArray ===

// 1. Using a for loop
console.log("\nIterating with a for loop:");
for (let i = 0; i < typedArray.length; ++i) {
    console.log(`Element at index ${i}:`, typedArray[i]);
}

// 2. Using for...of loop
console.log("\nIterating with for...of loop:");
for (const value of typedArray) {
    console.log(value);
}

// 3. Using forEach
console.log("\nIterating with forEach:");
typedArray.forEach((value, index) => {
    console.log(`Element at index ${index}:`, value);
});

// === Manipulating the TypedArray ===

// 1. Updating an element
console.log("\nUpdating an element:");
typedArray[1] = 25;  // Change the second element (index 1)
console.log("TypedArray after update:", typedArray);

// 2. Copying a portion of the TypedArray
console.log("\nCopying a portion of the TypedArray (subarray):");
const subArray = typedArray.subarray(1, 3);  // Creates a new view from index 1 to 3 (not including index 3)
console.log("Subarray (from index 1 to 3):", subArray);

// 3. Slicing a TypedArray (Creates a new TypedArray)
console.log("\nSlicing the TypedArray:");
const slicedArray = typedArray.slice(1, 4);  // Similar to subarray but creates a new copy
console.log("Sliced array (from index 1 to 4):", slicedArray);

// === Advanced Methods ===

// 1. Filling the TypedArray
console.log("\nFilling the TypedArray with a new value:");
typedArray.fill(100, 1, 4);  // Fills the array from index 1 to 4 with the value 100
console.log("TypedArray after filling:", typedArray);

// 2. Setting values from another TypedArray
console.log("\nSetting values from another TypedArray:");
const newArray = new Int16Array([200, 300]);
typedArray.set(newArray, 3);  // Set the values of newArray starting at index 3 of the typedArray
console.log("TypedArray after setting new values:", typedArray);

// 3. Mapping the TypedArray (Manually, since TypedArray doesn't support map directly)
console.log("\nMapping the TypedArray (multiplying by 2):");
const mappedArray = new Int16Array(typedArray.length);
for (let i = 0; i < typedArray.length; i++) {
    mappedArray[i] = typedArray[i] * 2;  // Doubling each element
}
console.log("Mapped array (each element multiplied by 2):", mappedArray);

// 4. Sorting the TypedArray
console.log("\nSorting the TypedArray:");
const sortedArray = new Int16Array([...typedArray].sort((a, b) => a - b));  // Sort requires converting to a normal array
console.log("Sorted TypedArray:", sortedArray);

// 5. Reversing the TypedArray
console.log("\nReversing the TypedArray:");
const reversedArray = new Int16Array([...typedArray].reverse());
console.log("Reversed TypedArray:", reversedArray);
