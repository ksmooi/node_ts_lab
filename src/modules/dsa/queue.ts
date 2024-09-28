/**
 * A generic Queue class that implements the queue data structure using an array.
 * This class follows the First-In-First-Out (FIFO) principle, where the first 
 * element added to the queue will be the first to be removed.
 * 
 * @template T The type of the elements in the queue.
 */
export class Queue<T> {
    // Internal array to hold the elements of the queue
    private storage: T[] = [];

    /**
     * Adds an item to the end of the queue (enqueue operation).
     * 
     * @param item The item to be added to the queue.
     */
    enqueue(item: T): void {
        this.storage.push(item);
    }

    /**
     * Removes and returns the item at the front of the queue (dequeue operation).
     * If the queue is empty, it returns undefined.
     * 
     * @returns The item at the front of the queue or undefined if the queue is empty.
     */
    dequeue(): T | undefined {
        return this.storage.shift();
    }

    /**
     * Returns the item at the front of the queue without removing it.
     * 
     * @returns The item at the front of the queue or undefined if the queue is empty.
     */
    peek(): T | undefined {
        return this.storage[0];
    }

    /**
     * Returns the current number of elements in the queue.
     * 
     * @returns The number of elements in the queue.
     */
    size(): number {
        return this.storage.length;
    }

    /**
     * Checks if the queue is empty.
     * 
     * @returns True if the queue is empty, false otherwise.
     */
    isEmpty(): boolean {
        return this.size() === 0;
    }

    /**
     * Clears all elements from the queue.
     * After this operation, the queue will be empty.
     */
    clear(): void {
        this.storage = [];
    }

    /**
     * Checks if the queue contains a specific item.
     * 
     * @param item The item to check for in the queue.
     * @returns True if the item is in the queue, false otherwise.
     */
    contains(item: T): boolean {
        return this.storage.includes(item);
    }

    /**
     * Converts the queue into an array containing all the elements.
     * 
     * @returns A new array containing all the elements in the queue.
     */
    toArray(): T[] {
        return [...this.storage];
    }

    /**
     * Allows forward iteration over the elements of the queue from front to rear.
     * This makes the queue iterable, allowing it to be used in a `for...of` loop.
     * 
     * @returns An iterator that iterates over the elements from front to rear.
     */
    [Symbol.iterator](): Iterator<T> {
        let index = 0;
        const storage = this.storage;

        return {
            next(): IteratorResult<T> {
                // Returns the next element in the queue or marks the iteration as done
                if (index < storage.length) {
                    return { value: storage[index++], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }

    /**
     * Allows reverse iteration over the elements of the queue from rear to front.
     * This custom iterator can be used to traverse the queue in reverse order.
     * 
     * @returns An iterator that iterates over the elements from rear to front.
     */
    reverseIterator(): Iterator<T> {
        let index = this.storage.length - 1;
        const storage = this.storage;

        return {
            next(): IteratorResult<T> {
                // Returns the next element in reverse order or marks the iteration as done
                if (index >= 0) {
                    return { value: storage[index--], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
}
