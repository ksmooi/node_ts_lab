// npx ts-node -r tsconfig-paths/register src/demo/function/function_rest_params_demo.ts

// === Basic Example: Rest Parameters ===
/**
 * A function that accepts an arbitrary number of arguments using rest parameters.
 * 
 * @param numbers - A rest parameter that collects all number arguments.
 * @returns The sum of all passed numbers.
 */
function sumAll3(...numbers: number[]): number {
    // `numbers` is an array of all passed arguments.
    return numbers.reduce((total, num) => total + num, 0);  // Sum all numbers
}

// Example usage:
console.log("Sum of 1, 2, 3:", sumAll3(1, 2, 3));                // Output: 6
console.log("Sum of 10, 20, 30, 40:", sumAll3(10, 20, 30, 40));  // Output: 100
console.log("Sum of nothing:", sumAll3(0));                      // Output: 0


// === Example 2: Combining Rest Parameters with Other Parameters ===
/**
 * A function that combines fixed and rest parameters.
 * 
 * @param message - A fixed parameter that is always passed first.
 * @param ...args - Rest parameters that collect additional values.
 * @returns A string showing the message and the number of arguments.
 */
function logMessageAndArguments(message: string, ...args: any[]): string {
    // args is an array of all additional arguments.
    return `${message}: You passed ${args.length} arguments - [${args.join(', ')}]`;
}

// Example usage:
console.log(logMessageAndArguments("Info", 1, 2, 3));  
// Output: Info: You passed 3 arguments - [1, 2, 3]

console.log(logMessageAndArguments("Info"));  
// Output: Info: You passed 0 argument - []

console.log(logMessageAndArguments("Debug", "test", true, { key: "value" }));  
// Output: Debug: You passed 3 arguments - [test, true, [object Object]]


// === Example 3: Rest Parameters in Arrow Functions ===
/**
 * An arrow function that accepts rest parameters.
 * 
 * @param ...strings - Rest parameter to collect all string arguments.
 * @returns A concatenated string of all the passed arguments.
 */
const concatenateStrings = (...strings: string[]): string => {
    return strings.join(' ');  // Concatenate all string arguments
};

// Example usage:
console.log(concatenateStrings("TypeScript", "is", "awesome!"));  
// Output: TypeScript is awesome!

console.log(concatenateStrings("Hello", "world"));  
// Output: Hello world


// === Example 4: Rest Parameters with Destructuring ===
/**
 * A function that demonstrates rest parameters combined with array destructuring.
 * 
 * @param first - The first element in the array.
 * @param rest - Rest parameter to collect the remaining elements.
 * @returns A string describing the first element and the rest.
 */
function describeArray([first, ...rest]: number[]): string {
    return `First element: ${first}, Remaining elements: [${rest.join(', ')}]`;
}

// Example usage:
console.log(describeArray([10, 20, 30, 40]));  
// Output: First element: 10, Remaining elements: [20, 30, 40]

console.log(describeArray([1, 2, 3]));  
// Output: First element: 1, Remaining elements: [2, 3]


// === Example 5: Rest Parameters with Type Inference ===
/**
 * A function that infers types for rest parameters.
 * 
 * @param first - A fixed parameter of type T.
 * @param ...rest - Rest parameters that collect the remaining arguments of type T.
 * @returns A tuple containing the first element and an array of the rest.
 */
function collectElements<T>(first: T, ...rest: T[]): [T, T[]] {
    return [first, rest];  // Return a tuple of the first and the rest
}

// Example usage:
const [firstNum, restNums] = collectElements(1, 2, 3, 4);
console.log("First number:", firstNum);         // Output: First number: 1
console.log("Rest of the numbers:", restNums);  // Output: Rest of the numbers: [2, 3, 4]

const [firstStr, restStrs] = collectElements("a", "b", "c");
console.log("First string:", firstStr);         // Output: First string: a
console.log("Rest of the strings:", restStrs);  // Output: Rest of the strings: [b, c]
