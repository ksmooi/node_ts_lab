# Overview of `signal-slot` Module

The `signal_slot` module is a TypeScript implementation of the **signal-slot** pattern, a powerful communication mechanism originally popularized by the Qt framework. This pattern facilitates decoupled interactions between objects, allowing **senders** to emit **signals** that **receivers** can **slot** into, effectively enabling event-driven programming.

## Table of Contents

1. [Overview](#overview)
2. [Key Concepts](#key-concepts)
   - [Connection Type](#connection-type)
   - [InnerConnection Class](#innerconnection-class)
3. [Core Functions](#core-functions)
   - [create](#create)
   - [connect](#connect)
   - [disconnect](#disconnect)
   - [disconnectAll](#disconnectall)
   - [emit](#emit)
   - [dump](#dump)
4. [Advanced Features](#advanced-features)
   - [Locking Connections](#locking-connections)
   - [Internal Utilities](#internal-utilities)
5. [Usage Examples](#usage-examples)
6. [Best Practices](#best-practices)
7. [Limitations and Considerations](#limitations-and-considerations)
8. [Conclusion](#conclusion)

---

## Overview

The `signal_slot` module provides a robust and flexible way to implement the observer pattern in TypeScript applications. By defining **signals** and connecting them to **slots**, developers can manage complex event-driven interactions with ease, promoting loose coupling and enhancing code maintainability.

Key features include:

- **Signal Creation**: Define custom signals for objects.
- **Connection Management**: Establish and manage connections between senders and receivers.
- **Event Emission**: Emit signals with optional arguments.
- **Connection Control**: Lock, unlock, and inspect connections.
- **Debugging Support**: Dump current signal-slot connections for inspection.

---

## Key Concepts

### Connection Type

The `Connection` type represents a linkage between a **sender** and a **receiver**. It encapsulates the information required to establish and manage this connection.

```typescript
export type Connection = {
    sender: any,
    signal: string,
    receiver: any,
    slot?: string
}
```

- **sender**: The object emitting the signal.
- **signal**: The name of the signal being emitted.
- **receiver**: The object or function that will respond to the signal.
- **slot** (optional): The method name on the receiver to invoke when the signal is emitted. If omitted, the receiver is expected to be a standalone function.

### InnerConnection Class

An internal class that represents the actual connection, maintaining additional state such as whether the connection is locked.

```typescript
class InnerConnection {
    public locked: boolean = false

    constructor(
        public sender: any,
        public receiver: any,
        public slot?: string,
        public desc?: any
    ) {}
}
```

- **locked**: Indicates if the connection is temporarily disabled.
- **sender**: Reference to the sender object.
- **receiver**: Reference to the receiver object or function.
- **slot**: The slot method name, if applicable.
- **desc**: Property descriptor for the slot method, used internally to handle method invocations correctly.

---

## Core Functions

### `create`

**Purpose**: Defines a new signal on a sender object.

```typescript
export function create(sender: any, signal: string): boolean
```

- **Parameters**:
  - `sender`: The object that will emit the signal.
  - `signal`: The name of the signal to create.

- **Returns**: `true` if the signal was successfully created; `false` if the signal already exists.

- **Behavior**:
  - Initializes a `_mapSignals` property on the sender if it doesn't exist.
  - Adds the new signal to the sender's signal map.
  - Prevents duplicate signal names by checking existing entries.

**Example**:

```typescript
create(this, 'dataLoaded');
```

### `connect`

**Purpose**: Establishes a connection between a sender's signal and a receiver's slot or function.

```typescript
export function connect(c: Connection): boolean
```

- **Parameters**:
  - `c`: A `Connection` object specifying the sender, signal, receiver, and optionally the slot.

- **Returns**: `true` if the connection was successfully established; `false` otherwise.

- **Behavior**:
  - Validates that the sender has the specified signal.
  - Differentiates between function receivers and object-method slots.
  - Adds the connection to the sender's signal map.

**Example**:

```typescript
// Connecting a signal to a standalone function
connect({ sender: obj1, signal: 'finished', receiver: () => log('done') });

// Connecting a signal to an object's method
connect({
    sender: obj1,
    signal: 'finished',
    receiver: obj2,
    slot: 'run'
});
```

### `disconnect`

**Purpose**: Removes an existing connection between a sender's signal and a receiver.

```typescript
export function disconnect(c: Connection): boolean
```

- **Parameters**:
  - `c`: The `Connection` to be removed.

- **Returns**: `true` if the connection was successfully removed; `false` otherwise.

- **Behavior**:
  - Searches for the specified connection in the sender's signal map.
  - Removes the connection if found.

**Example**:

```typescript
disconnect(connection);
```

### `disconnectAll`

**Purpose**: Removes all connections associated with a specific signal on a sender.

```typescript
export function disconnectAll(sender: any, signal: string): boolean
```

- **Parameters**:
  - `sender`: The object whose signal connections are to be removed.
  - `signal`: The name of the signal.

- **Returns**: `true` if connections were successfully removed; `false` otherwise.

- **Behavior**:
  - Clears all connections associated with the specified signal.

**Example**:

```typescript
disconnectAll(obj1, 'finished');
```

### `emit`

**Purpose**: Triggers a signal, invoking all connected slots or functions with provided arguments.

```typescript
export function emit(sender: any, signal: string, ...args: any): boolean
```

- **Parameters**:
  - `sender`: The object emitting the signal.
  - `signal`: The name of the signal to emit.
  - `args`: Optional arguments to pass to the receivers.

- **Returns**: `true` if the signal was successfully emitted; `false` otherwise.

- **Behavior**:
  - Checks if the sender supports signals.
  - Invokes all connected slots/functions unless they are locked.

**Example**:

```typescript
emit(obj1, 'finished');
emit(obj1, 'finished', data1, data2);
```

### `dump`

**Purpose**: Logs all signals and their associated connections for a given sender, aiding in debugging.

```typescript
export function dump(sender: any)
```

- **Parameters**:
  - `sender`: The object whose signal connections are to be displayed.

- **Behavior**:
  - Iterates through all signals and their connections, logging details to the console.
  - Warns if the sender has no signals defined.

**Example**:

```typescript
dump(obj1);
```

---

## Advanced Features

### Locking Connections

The module provides mechanisms to **lock** and **unlock** connections, allowing developers to temporarily disable or enable specific signal-slot interactions without removing the connection entirely.

#### `lock`

**Purpose**: Prevents a specific connection from being invoked when a signal is emitted.

```typescript
export function lock(c: Connection): boolean
```

- **Parameters**:
  - `c`: The `Connection` to lock.

- **Returns**: `true` if the connection was successfully locked; `false` otherwise.

#### `unlock`

**Purpose**: Re-enables a previously locked connection.

```typescript
export function unlock(c: Connection): boolean
```

- **Parameters**:
  - `c`: The `Connection` to unlock.

- **Returns**: `true` if the connection was successfully unlocked; `false` otherwise.

#### `isLocked`

**Purpose**: Checks if a specific connection is currently locked.

```typescript
export function isLocked(c: Connection): boolean
```

- **Parameters**:
  - `c`: The `Connection` to check.

- **Returns**: `true` if the connection is locked; `false` otherwise.

**Example**:

```typescript
lock(connection);
if (isLocked(connection)) {
    console.log('Connection is locked.');
}
unlock(connection);
```

### Internal Utilities

The module includes internal functions to manage connections and trigger signals. While these are marked as `@internal` and intended for internal use, understanding them can provide deeper insights into the module's workings.

#### `getConnection`

**Purpose**: Retrieves an existing connection based on the provided `Connection` object.

```typescript
function getConnection(c: Connection): any
```

- **Parameters**:
  - `c`: The `Connection` to retrieve.

- **Returns**: The corresponding `InnerConnection` if found; `undefined` otherwise.

#### `_trigger`

**Purpose**: Invokes all connected slots/functions for a given signal, passing any provided arguments.

```typescript
function _trigger(sender: any, signal: string, args: Array<{receiver: any, desc: any, locked: boolean}>)
```

- **Parameters**:
  - `sender`: The object emitting the signal.
  - `signal`: The name of the signal.
  - `args`: An array of argument objects to pass to receivers.

- **Behavior**:
  - Iterates through all connections for the signal.
  - Skips locked connections.
  - Invokes functions directly or calls methods on receiver objects with the provided arguments.

---

## Usage Examples

### Basic Example

```typescript
import { create, connect, emit, disconnect } from 'signal-slot';

// Define sender and receiver objects
const obj1 = {};
const obj2 = {
    run: () => console.log('done')
};

// Create a signal on obj1
create(obj1, 'finished');

// Connect a standalone function to the signal
const connection1 = {
    sender: obj1,
    signal: 'finished',
    receiver: () => console.log('done')
};
connect(connection1);

// Connect a method from obj2 to the signal
const connection2 = {
    sender: obj1,
    signal: 'finished',
    receiver: obj2,
    slot: 'run'
};
connect(connection2);

// Emit the signal
emit(obj1, 'finished');
// Output:
// done
// done

// Disconnect the first connection
disconnect(connection1);

// Emit the signal again
emit(obj1, 'finished');
// Output:
// done
```

### Class-Based Example

```typescript
import { create, connect, emit } from 'signal-slot';

class Task {
    constructor(private name: string) {
        create(this, 'finished');
        connect({
            sender: this,
            signal: 'finished',
            receiver: this,
            slot: 'onFinished'
        });
    }

    start() {
        console.log(`${this.name} is starting`);
        setTimeout(() => emit(this, 'finished'), 1000);
    }

    onFinished() {
        console.log(`${this.name} is done`);
    }
}

const taskA = new Task('Task A');
const taskB = new Task('Task B');

// Connect Task A's finished signal to Task B's start method
connect({
    sender: taskA,
    signal: 'finished',
    receiver: taskB,
    slot: 'start'
});

taskA.start();
// Output:
// Task A is starting
// (after 1 second)
// Task A is done
// Task B is starting
```

### Using Locking Mechanism

```typescript
import { create, connect, emit, lock, unlock } from 'signal-slot';

const sender = {};
create(sender, 'update');

const receiver = {
    handleUpdate: (data: any) => console.log('Received update:', data)
};

// Connect the signal to the receiver's method
const connection = {
    sender: sender,
    signal: 'update',
    receiver: receiver,
    slot: 'handleUpdate'
};
connect(connection);

// Emit the signal
emit(sender, 'update', { key: 'value' });
// Output:
// Received update: { key: 'value' }

// Lock the connection
lock(connection);

// Emit the signal again
emit(sender, 'update', { key: 'anotherValue' });
// No output since the connection is locked

// Unlock the connection
unlock(connection);

// Emit the signal once more
emit(sender, 'update', { key: 'finalValue' });
// Output:
// Received update: { key: 'finalValue' }
```

---

## Best Practices

1. **Signal Definition**: Always define signals using the `create` function before attempting to connect or emit them. This ensures that the sender's signal map is properly initialized.

2. **Consistent Connections**: When connecting to object methods, ensure that the specified slot exists and is correctly named to prevent runtime warnings or errors.

3. **Manage Connections**: Use `disconnect` and `disconnectAll` judiciously to manage connections, especially in scenarios where objects are dynamically created and destroyed, to avoid memory leaks.

4. **Leverage Locking**: Utilize the locking mechanism to temporarily disable connections without removing them, providing greater control over signal emission behavior.

5. **Debugging**: Use the `dump` function during development to inspect current signal-slot connections, aiding in troubleshooting and ensuring connections are correctly established.

---

## Limitations and Considerations

1. **Type Safety**: The module uses `any` types for senders and receivers, which may bypass TypeScript's type checking. Consider enhancing type definitions for stricter type safety.

2. **Performance**: For applications with a large number of signals and connections, performance may be impacted. Profiling and optimization may be necessary for high-frequency signal emissions.

3. **Error Handling**: The module primarily logs warnings to the console. Depending on the application, you might want to implement more robust error handling mechanisms.

4. **Memory Management**: Connections are stored within the sender's `_mapSignals`. Ensure that connections are properly disconnected when no longer needed to prevent memory leaks.

5. **Concurrency**: The current implementation does not account for asynchronous or concurrent signal emissions. If your application emits signals from multiple threads or asynchronous contexts, additional synchronization mechanisms may be required.

---

## Conclusion

The `signal_slot` module offers a straightforward and flexible implementation of the signal-slot pattern in TypeScript, enabling developers to build decoupled and maintainable event-driven architectures. By understanding its core concepts, leveraging its features effectively, and adhering to best practices, you can harness the full potential of this module to enhance your application's responsiveness and modularity.

For advanced use cases or integrations, consider extending the module with additional type definitions, performance optimizations, or enhanced error handling to better fit your project's specific requirements.

