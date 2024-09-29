/**
 * Circular Queue implementation using an array.
 * 
 * The Circular Queue is a data structure that follows the FIFO principle 
 * (First In First Out) with a fixed size. When it reaches the end, it wraps 
 * around to the beginning (circular behavior). It supports enqueueing, 
 * dequeueing, peeking, and iteration in both front-to-rear and rear-to-front directions.
 * 
 * @template T The type of the elements in the queue.
 * @param {T[]} queue The array that holds the elements of the queue.
 * @param {number} frontIndex The index of the front element in the queue.
 * @param {number} rearIndex The index of the rear element in the queue.
 * @param {number} size The total size of the queue.
 */
export class CircularQueue<T> {
  private queue: T[];
  private frontIndex: number;
  private rearIndex: number;
  private size: number;

  /**
   * Initializes the circular queue with a fixed size.
   * @param {number} size The maximum size of the queue.
   */
  constructor(size: number) {
    this.queue = new Array(size);  // Initialize the queue with the given size
    this.frontIndex = -1;  // Set front index to -1 indicating an empty queue
    this.rearIndex = -1;   // Set rear index to -1 indicating an empty queue
    this.size = size;      // Set the total capacity of the queue
  }

  /**
   * Adds an item to the queue. If the queue is full, throws an error.
   * 
   * @param item The item being added to the queue.
   */
  enqueue(item: T): void {
    // Check if the queue is full
    if (
      (this.frontIndex == 0 && this.rearIndex == this.size - 1) ||
      this.rearIndex == (this.frontIndex - 1) % (this.size - 1)
    ) {
      throw new Error('Queue is full');
    } else if (this.frontIndex == -1) {
      // If queue is empty, initialize front and rear index
      this.frontIndex = 0;
      this.rearIndex = 0;
      this.queue[this.rearIndex] = item;
    } else if (this.rearIndex == this.size - 1 && this.frontIndex != 0) {
      // Wrap around if we reach the end of the array and there is space at the start
      this.rearIndex = 0;
      this.queue[this.rearIndex] = item;
    } else {
      // Increment rear index and add the item
      this.rearIndex++;
      this.queue[this.rearIndex] = item;
    }
  }

  /**
   * Removes and returns an item from the front of the queue. 
   * If the queue is empty, throws an error.
   * 
   * @returns {T | undefined} The item that was removed from the queue.
   */
  dequeue(): T | undefined {
    // Check if the queue is empty
    if (this.frontIndex == -1) {
      throw new Error('Queue is empty');
    }

    const item = this.queue[this.frontIndex];  // Get the item at the front

    // If there is only one element left, reset the queue
    if (this.frontIndex == this.rearIndex) {
      this.frontIndex = -1;
      this.rearIndex = -1;
    } else if (this.frontIndex == this.size - 1) {
      // Wrap around if we reach the end of the array
      this.frontIndex = 0;
    } else {
      // Move the front index forward
      this.frontIndex++;
    }

    return item;
  }

  /**
   * Returns the item at the front of the queue without removing it.
   * 
   * @returns {T | null | undefined} The item at the front or null if the queue is empty.
   */
  peek(): T | null | undefined {
    if (this.frontIndex == -1) {
      return null;  // Return null if the queue is empty
    }
    return this.queue[this.frontIndex];  // Return the front element
  }

  /**
   * Checks if the queue is empty.
   * 
   * @returns {boolean} True if the queue is empty, false otherwise.
   */
  isEmpty(): boolean {
    return this.frontIndex == -1;
  }

  /**
   * Returns the current number of elements in the queue.
   * 
   * @returns {number} The number of items in the queue.
   */
  length(): number {
    if (this.frontIndex == -1) {
      return 0;  // Return 0 if the queue is empty
    }

    if (this.rearIndex >= this.frontIndex) {
      // When rear index is ahead of front index, calculate normally
      return this.rearIndex - this.frontIndex + 1;
    }

    // If rear index has wrapped around, calculate the total count
    return this.size - (this.frontIndex - this.rearIndex - 1);
  }

  /**
   * Default iteration from front to rear.
   * Makes the CircularQueue iterable using `for...of` and similar constructs.
   * 
   * @returns {Iterator<T>} An iterator to iterate over the queue from front to rear.
   */
  [Symbol.iterator](): Iterator<T> {
    let index = this.frontIndex;  // Start at the front index
    let count = 0;  // Track the number of items iterated over
    const storage = this.queue;
    const totalItems = this.length();  // Total number of elements in the queue

    return {
      next: (): IteratorResult<T> => {
        if (count >= totalItems || index === -1) {
          // Stop iteration if all items have been iterated
          return { value: undefined, done: true };
        }

        const value = storage[index];  // Get the current item
        index = (index + 1) % this.size;  // Move index forward circularly
        count++;
        return { value: value, done: false };
      }
    };
  }

  /**
   * Reverse iteration from rear to front.
   * Allows iterating over the queue from rear to front using a custom iterator.
   * 
   * @returns {Iterator<T>} An iterator to iterate over the queue from rear to front.
   */
  reverseIterator(): Iterator<T> {
    let index = this.rearIndex;  // Start at the rear index
    let count = 0;
    const storage = this.queue;
    const totalItems = this.length();  // Total number of elements in the queue

    return {
      next: (): IteratorResult<T> => {
        if (count >= totalItems || index === -1) {
          // Stop iteration if all items have been iterated
          return { value: undefined, done: true };
        }

        const value = storage[index];  // Get the current item
        index = (index - 1 + this.size) % this.size;  // Move index backward circularly
        count++;
        return { value: value, done: false };
      }
    };
  }
}


