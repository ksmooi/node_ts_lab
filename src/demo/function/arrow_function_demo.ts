// npx ts-node -r tsconfig-paths/register src/demo/function/arrow_function_demo.ts

// 1. Basic Arrow Function

/**
 * Arrow function with no parameters, simply logs a greeting.
 */
const greet = () => console.log('Hello, Node.js with TypeScript!');
greet();  // Output: Hello, Node.js with TypeScript!

/**
 * Arrow function with a single parameter and implicit return.
 * Multiplies a number by itself (square).
 */
const square = (num: number) => num * num;
console.log("Square of 5:", square(5));  // Output: Square of 5: 25


// 2. Arrow Function with Multiple Parameters

/**
 * Arrow function that adds two numbers.
 * Since there's a single expression, it uses an implicit return (no need for `{}`).
 */
const add = (a: number, b: number) => a + b;
console.log("Sum of 2 and 3:", add(2, 3));  // Output: Sum of 2 and 3: 5


// 3. Arrow Functions in Array Methods (map, reduce)

/**
 * Use of arrow functions in array methods such as `map()` and `reduce()`.
 */
const numbers = [1, 2, 3, 4, 5];

// Doubles each number in the array using `map()`
const doubled = numbers.map(num => num * 2);
console.log("Doubled Numbers:", doubled);  // Output: Doubled Numbers: [2, 4, 6, 8, 10]

// Summing up the numbers in the array using `reduce()`
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("Sum of Numbers:", sum);  // Output: Sum of Numbers: 15


// 4. Using Arrow Functions with Promises

/**
 * Arrow functions in asynchronous code with Promises.
 * Simulates fetching data with a delayed promise.
 */
const fetchData = (): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Data received from async operation'), 2000);
    });
};

// Fetch data using the promise with arrow function callbacks
fetchData().then(data => console.log(data));  // Output after 2 seconds: Data received from async operation


// 5. Lexical `this` in Arrow Functions

/**
 * Demonstrates the `lexical this` behavior of arrow functions in object methods.
 */
class Counter {
    count = 0;

    // Arrow function to increment the count, using lexical `this`
    increment = () => {
        this.count++;
        console.log("Counter:", this.count);
    };
}

const counter = new Counter();
counter.increment();  // Output: Counter: 1
counter.increment();  // Output: Counter: 2

