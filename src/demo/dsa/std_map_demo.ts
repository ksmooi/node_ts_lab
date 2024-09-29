// npx ts-node -r tsconfig-paths/register src/demo/dsa/std_map_demo.ts

// === Insertion and Initialization of a Map ===
function demoMapInsertionAndInitialization() {
    const map = new Map<number, string>();

    console.log("Inserting key-value pairs into the map...");
    map.set(1, "Apple");
    map.set(2, "Banana");
    map.set(3, "Cherry");

    console.log("Map size after insertion:", map.size);  // Expected: 3
}

// === Accessing Elements ===
function demoMapAccessingElements() {
    const map = new Map<number, string>([
        [1, "Apple"],
        [2, "Banana"],
        [3, "Cherry"]
    ]);

    console.log("\nAccessing elements:");
    console.log("Value for key 1:", map.get(1));  // Expected: Apple
    console.log("Value for key 2:", map.get(2));  // Expected: Banana
    console.log("Does the map have key 3?", map.has(3));  // Expected: true
    console.log("Does the map have key 5?", map.has(5));  // Expected: false
}

// === Iterating Through the Map ===
function demoMapIteration() {
    const map = new Map<number, string>([
        [1, "Apple"],
        [2, "Banana"],
        [3, "Cherry"]
    ]);

    // 1. Iterating over keys
    console.log("\nIterating over keys:");
    for (const key of map.keys()) {
        console.log(key);  // Expected: 1, 2, 3
    }

    // 2. Iterating over values
    console.log("\nIterating over values:");
    for (const value of map.values()) {
        console.log(value);  // Expected: Apple, Banana, Cherry
    }

    // 3. Iterating over key-value pairs
    console.log("\nIterating over key-value pairs:");
    for (const [key, value] of map) {
        console.log(`Key: ${key}, Value: ${value}`);  // Expected: Key: 1, Value: Apple, etc.
    }
}

// === Updating Elements ===
function demoMapUpdatingElements() {
    const map = new Map<number, string>([
        [1, "Apple"],
        [2, "Banana"],
        [3, "Cherry"]
    ]);

    console.log("\nUpdating elements in the map...");
    map.set(2, "Blueberry");  // Update value for key 2
    console.log("Updated value for key 2:", map.get(2));  // Expected: Blueberry
}

// === Deleting Elements ===
function demoMapDeletingElements() {
    const map = new Map<number, string>([
        [1, "Apple"],
        [2, "Banana"],
        [3, "Cherry"]
    ]);

    console.log("\nDeleting an element...");
    map.delete(3);  // Remove the key-value pair with key 3
    console.log("Does the map have key 3 after deletion?", map.has(3));  // Expected: false
    console.log("Map size after deletion:", map.size);  // Expected: 2
}

// === Advanced Methods ===
function demoMapAdvancedMethods() {
    const map = new Map<number, string>([
        [4, "Durian"],
        [5, "Elderberry"]
    ]);

    // 1. Checking the size of the map
    console.log("\nMap size:", map.size);  // Expected: 2

    // 2. Clearing the map
    console.log("\nClearing the map...");
    map.clear();
    console.log("Is the map empty after clearing?", map.size === 0);  // Expected: true

    // Re-inserting elements
    map.set(4, "Durian");
    map.set(5, "Elderberry");

    // 3. Using `forEach` to iterate over the map
    console.log("\nUsing forEach to iterate:");
    map.forEach((value, key) => {
        console.log(`Key: ${key}, Value: ${value}`);
    });
}

// === WeakMap Usage Example ===
function demoWeakMapUsage() {
    // WeakMap can only accept objects as keys
    const weakMap = new WeakMap<object, string>();

    const obj1 = {};
    const obj2 = {};
    weakMap.set(obj1, "Object 1");
    weakMap.set(obj2, "Object 2");

    console.log("\nAccessing WeakMap values:");
    console.log("WeakMap value for obj1:", weakMap.get(obj1));  // Expected: Object 1
    console.log("WeakMap value for obj2:", weakMap.get(obj2));  // Expected: Object 2
}

// === Run all demos ===
function runStdMapDemos() {
    console.log("\n=== Map Insertion and Initialization ===");
    demoMapInsertionAndInitialization();

    console.log("\n=== Accessing Map Elements ===");
    demoMapAccessingElements();

    console.log("\n=== Map Iteration ===");
    demoMapIteration();

    console.log("\n=== Updating Map Elements ===");
    demoMapUpdatingElements();

    console.log("\n=== Deleting Map Elements ===");
    demoMapDeletingElements();

    console.log("\n=== Advanced Map Methods ===");
    demoMapAdvancedMethods();

    console.log("\n=== WeakMap Usage Example ===");
    demoWeakMapUsage();
}

// Execute all demos
runStdMapDemos();
