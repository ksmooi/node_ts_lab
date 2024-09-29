// npx ts-node -r tsconfig-paths/register src/demo/dsa/std_set_demo.ts

// === Insertion and Initialization of a Set ===
function demoSetInsertionAndInitialization() {
    const set = new Set<number>();

    console.log("Inserting elements into the Set...");
    set.add(1);
    set.add(2);
    set.add(3);
    set.add(2);  // Duplicate, won't be added again
    console.log("Set after insertion:", [...set]);  // Expected: [1, 2, 3]
}

// === Accessing Elements ===
function demoSetAccessingElements() {
    const set = new Set<number>([1, 2, 3]);

    console.log("\nAccessing elements:");
    console.log("Does the set contain 1?", set.has(1));  // Expected: true
    console.log("Does the set contain 4?", set.has(4));  // Expected: false
    console.log("Set size:", set.size);  // Expected: 3
}

// === Iterating Through the Set ===
function demoSetIteration() {
    const set = new Set<number>([1, 2, 3]);

    // 1. Iterating over values
    console.log("\nIterating over the Set values:");
    for (const value of set) {
        console.log(value);  // Expected: 1, 2, 3
    }

    // 2. Iterating using forEach
    console.log("\nIterating using forEach:");
    set.forEach((value) => {
        console.log(value);  // Expected: 1, 2, 3
    });
}

// === Manipulating the Set (Adding, Deleting) ===
function demoSetManipulation() {
    const set = new Set<number>([1, 2, 3]);

    // Adding more elements
    console.log("\nAdding more elements...");
    set.add(4);
    set.add(5);
    console.log("Set after adding more elements:", [...set]);  // Expected: [1, 2, 3, 4, 5]

    // Deleting an element
    console.log("\nDeleting element 2 from the Set...");
    set.delete(2);
    console.log("Set after deleting 2:", [...set]);  // Expected: [1, 3, 4, 5]
}

// === Advanced Methods ===
function demoSetAdvancedMethods() {
    const set = new Set<number>([1, 3, 4, 5]);

    // 1. Checking the size of the Set
    console.log("\nSet size:", set.size);  // Expected: 4

    // 2. Clearing the Set
    console.log("\nClearing the Set...");
    set.clear();
    console.log("Is the Set empty after clearing?", set.size === 0);  // Expected: true
}

// === Set Operations (Union, Intersection, Difference) ===
function demoSetOperations() {
    // Re-initializing the Set for set operations
    const setA = new Set<number>([1, 2, 3, 4]);
    const setB = new Set<number>([3, 4, 5, 6]);

    // 1. Union (A ∪ B) - Combine two sets
    const unionSet = new Set([...setA, ...setB]);
    console.log("\nUnion of Set A and Set B:", [...unionSet]);  // Expected: [1, 2, 3, 4, 5, 6]

    // 2. Intersection (A ∩ B) - Elements common to both sets
    const intersectionSet = new Set([...setA].filter(item => setB.has(item)));
    console.log("Intersection of Set A and Set B:", [...intersectionSet]);  // Expected: [3, 4]

    // 3. Difference (A - B) - Elements in Set A but not in Set B
    const differenceSet = new Set([...setA].filter(item => !setB.has(item)));
    console.log("Difference of Set A and Set B (A - B):", [...differenceSet]);  // Expected: [1, 2]
}

// === Run all demos ===
function runStdSetDemos() {
    console.log("=== Set Insertion and Initialization ===");
    demoSetInsertionAndInitialization();

    console.log("\n=== Accessing Set Elements ===");
    demoSetAccessingElements();

    console.log("\n=== Iterating Through the Set ===");
    demoSetIteration();

    console.log("\n=== Set Manipulation ===");
    demoSetManipulation();

    console.log("\n=== Advanced Set Methods ===");
    demoSetAdvancedMethods();

    console.log("\n=== Set Operations (Union, Intersection, Difference) ===");
    demoSetOperations();
}

// Execute all demos
runStdSetDemos();
