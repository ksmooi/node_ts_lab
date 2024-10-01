// npx ts-node -r tsconfig-paths/register src/demo/function/function_arguments_demo.ts

// 1. Example of `arguments` with TypeScript utility types

/**
 * A function that logs the types of the arguments passed in.
 * TypeScript's `Parameters` utility type is used to ensure type safety.
 */
function exampleFunction(arg1: string, arg2: number): void {
    console.log(`arg1: ${arg1}, arg2: ${arg2}`);
}

// Extract the parameter types using the `Parameters` utility type
type ArgumentTypes = Parameters<typeof exampleFunction>;

/**
 * A function that logs the types of the arguments using TypeScript's utility types.
 * The `args` are expected to match the types from `exampleFunction`.
 */
function logArgumentTypes(...args: ArgumentTypes): void {
    args.forEach((arg, index) => {
        console.log(`Argument ${index + 1} type:`, typeof arg);
    });
}

console.log("\nExample 1: Using `Parameters` utility type with rest parameters:");
logArgumentTypes('Hello', 42);  // Output: string, number
// logArgumentTypes('Test', '42');  // This would cause a TypeScript error due to type mismatch


// 2. Simulating `arguments` behavior using rest parameters (modern approach)

/**
 * A modern function that captures all arguments using rest parameters.
 * This is the TypeScript-recommended way over using `arguments`.
 */
function sumAll2(...numbers: number[]): number {
    return numbers.reduce((acc, num) => acc + num, 0);
}

console.log("\nExample 2: Using rest parameters:");
console.log("Sum of 1, 2, 3:", sumAll2(1, 2, 3)); // Output: 6
console.log("Sum of 5, 10, 15:", sumAll2(5, 10, 15)); // Output: 30


// 3. Arrow function without `arguments` object but using rest parameters

/**
 * An arrow function that logs all arguments passed to it using rest parameters.
 * Arrow functions do not have access to `arguments`, so rest parameters are required.
 */
const logArgs = (...args: any[]): void => {
    console.log("Logging arguments from arrow function:");
    args.forEach(arg => console.log(arg));
};

console.log("\nExample 3: Using rest parameters in an arrow function:");
logArgs("Apple", 42, false);  // Output: Apple, 42, false

