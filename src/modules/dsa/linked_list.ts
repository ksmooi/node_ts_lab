
/**
 * Represents a single node in a doubly linked list.
 * Each node contains a value, a reference to the next node, and a reference to the previous node.
 * 
 * @template T The type of the value stored in the node.
 */
class DoublyLinkedNode<T> {
    public value: T;  // The data stored in the node
    public next: DoublyLinkedNode<T> | null = null;  // Reference to the next node
    public prev: DoublyLinkedNode<T> | null = null;  // Reference to the previous node

    // Constructor to initialize the node with a given value
    constructor(value: T) {
        this.value = value;
    }
}

/**
 * A generic implementation of a doubly linked list.
 * Supports efficient insertion, deletion, and traversal in both forward and backward directions.
 * 
 * @template T The type of elements in the list.
 */
export class DoublyLinkedList<T> {
    // The head (first node) of the list
    private head: DoublyLinkedNode<T> | null = null;
    // The tail (last node) of the list
    private tail: DoublyLinkedNode<T> | null = null;
    // The number of nodes (length) in the list
    private length: number = 0;

    // === Insertion ===

    /**
     * Appends a new element to the end of the list.
     * 
     * @param value - The value to insert at the end of the list.
     */
    append(value: T): void {
        const newNode = new DoublyLinkedNode<T>(value);  // Create a new node
        if (!this.tail) {
            // If the list is empty, the new node is both head and tail
            this.head = this.tail = newNode;
        } else {
            // Add the new node after the tail and update the tail
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;  // Increment the size of the list
    }

    /**
     * Prepends a new element to the beginning of the list.
     * 
     * @param value - The value to insert at the beginning of the list.
     */
    prepend(value: T): void {
        const newNode = new DoublyLinkedNode<T>(value);  // Create a new node
        if (!this.head) {
            // If the list is empty, the new node is both head and tail
            this.head = this.tail = newNode;
        } else {
            // Add the new node before the head and update the head
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;  // Increment the size of the list
    }

    // === Deletion ===

    /**
     * Removes the first node with the given value from the list.
     * 
     * @param value - The value of the node to remove.
     * @returns true if the node was removed, false if the value was not found.
     */
    remove(value: T): boolean {
        let current = this.head;  // Start from the head

        // Traverse the list to find the node to remove
        while (current) {
            if (current.value === value) {
                // If removing the head node
                if (current === this.head) {
                    this.head = current.next;
                    if (this.head) {
                        this.head.prev = null;  // Update the new head's prev to null
                    }
                }
                // If removing the tail node
                if (current === this.tail) {
                    this.tail = current.prev;
                    if (this.tail) {
                        this.tail.next = null;  // Update the new tail's next to null
                    }
                }
                // If removing a node from the middle
                if (current.prev) {
                    current.prev.next = current.next;
                }
                if (current.next) {
                    current.next.prev = current.prev;
                }
                this.length--;  // Decrement the size of the list
                return true;  // Node was found and removed
            }
            current = current.next;  // Move to the next node
        }
        return false;  // Node with the given value was not found
    }

    // === Accessing ===

    /**
     * Finds the first node with the given value.
     * 
     * @param value - The value to search for in the list.
     * @returns The node if found, or null if the value does not exist in the list.
     */
    find(value: T): DoublyLinkedNode<T> | null {
        let current = this.head;  // Start from the head

        // Traverse the list to find the node with the given value
        while (current) {
            if (current.value === value) {
                return current;  // Node found
            }
            current = current.next;  // Move to the next node
        }
        return null;  // Node with the given value was not found
    }

    /**
     * Returns the number of nodes in the list.
     * 
     * @returns The size (number of nodes) in the list.
     */
    size(): number {
        return this.length;  // Return the length of the list
    }

    /**
     * Checks if the list is empty.
     * 
     * @returns true if the list is empty, false otherwise.
     */
    isEmpty(): boolean {
        return this.length === 0;  // Returns true if the length is 0
    }

    /**
     * Clears the entire list by removing all nodes.
     */
    clear(): void {
        this.head = null;  // Set the head to null
        this.tail = null;  // Set the tail to null
        this.length = 0;   // Reset the length to 0
    }

    // === Iteration ===

    /**
     * Forward iteration over the list (from head to tail).
     * 
     * This makes the list iterable with `for...of` loops and other iterators.
     * 
     * @returns An iterator that iterates over the values from head to tail.
     */
    [Symbol.iterator](): Iterator<T> {
        let current = this.head;  // Start from the head
        return {
            next(): IteratorResult<T> {
                if (current) {
                    const value = current.value;  // Get the value of the current node
                    current = current.next;  // Move to the next node
                    return { value, done: false };  // Return the current value
                } else {
                    return { value: undefined, done: true };  // End iteration
                }
            }
        };
    }

    /**
     * Reverse iteration over the list (from tail to head).
     * 
     * This provides custom iteration for iterating from the tail to the head.
     * 
     * @returns An iterator that iterates over the values from tail to head.
     */
    reverseIterator(): Iterator<T> {
        let current = this.tail;  // Start from the tail
        return {
            next(): IteratorResult<T> {
                if (current) {
                    const value = current.value;  // Get the value of the current node
                    current = current.prev;  // Move to the previous node
                    return { value, done: false };  // Return the current value
                } else {
                    return { value: undefined, done: true };  // End iteration
                }
            }
        };
    }
}

// Example Usage
const dll = new DoublyLinkedList<number>();
dll.append(10);
dll.append(20);
dll.append(30);
dll.prepend(5);

// Forward Iteration
console.log("Forward iteration:");
for (const value of dll) {
    console.log(value);  // Expected: 5, 10, 20, 30
}

// Backward Iteration
console.log("Backward iteration:");
const reverseIter = dll.reverseIterator();
let result = reverseIter.next();
while (!result.done) {
    console.log(result.value);  // Expected: 30, 20, 10, 5
    result = reverseIter.next();
}

// Find and Remove
console.log("\nRemoving 20 from the list...");
dll.remove(20);
console.log("List after removing 20:");
for (const value of dll) {
    console.log(value);  // Expected: 5, 10, 30
}
