/**
 * A generic Stack class with support for forward and backward iteration.
 * 
 * This stack implementation follows the LIFO (Last In First Out) principle.
 * 
 * @template T - The type of elements in the stack.
 */
export class Stack<T> {
    private storage: T[] = [];  // Internal array to store stack elements

    /**
     * Pushes a new element onto the stack.
     * 
     * @param item - The item to be added to the stack.
     */
    push(item: T): void {
        this.storage.push(item);  // Adds the item to the end of the array
    }

    /**
     * Removes and returns the element from the top of the stack.
     * 
     * @returns The top item from the stack, or undefined if the stack is empty.
     */
    pop(): T | undefined {
        return this.storage.pop();  // Removes and returns the last item
    }

    /**
     * Returns the element at the top of the stack without removing it.
     * 
     * @returns The top item of the stack, or undefined if the stack is empty.
     */
    peek(): T | undefined {
        return this.storage[this.storage.length - 1];  // Access the last item without removing it
    }

    /**
     * Returns the number of elements in the stack.
     * 
     * @returns The number of items in the stack.
     */
    size(): number {
        return this.storage.length;  // Returns the length of the internal array
    }

    /**
     * Checks if the stack is empty.
     * 
     * @returns True if the stack is empty, false otherwise.
     */
    isEmpty(): boolean {
        return this.size() === 0;  // Returns true if the array length is 0
    }

    /**
     * Clears all elements from the stack.
     */
    clear(): void {
        this.storage = [];  // Resets the array to an empty array
    }

    /**
     * Forward iteration over the stack.
     * Iterates from bottom (first pushed) to top (last pushed).
     * 
     * @returns An iterator for the stack elements.
     */
    [Symbol.iterator](): Iterator<T> {
        let index = 0;  // Start from the first element (bottom of the stack)
        const storage = this.storage;

        return {
            next(): IteratorResult<T> {
                if (index < storage.length) {
                    return { value: storage[index++], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }

    /**
     * Backward iteration over the stack.
     * Iterates from top (last pushed) to bottom (first pushed).
     * 
     * @returns An iterator for the stack elements in reverse order.
     */
    public reverseIterator(): Iterator<T> {
        let index = this.storage.length - 1;  // Start from the last element (top of the stack)
        const storage = this.storage;

        return {
            next(): IteratorResult<T> {
                if (index >= 0) {
                    return { value: storage[index--], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
}
