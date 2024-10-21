# Signal-Slot Parallel Processing Example

This repository showcases a **Signal-Slot Parallel Processing** pipeline implemented in TypeScript using an object-oriented (OO) approach. The example demonstrates how to execute multiple asynchronous tasks in parallel and perform subsequent actions once all tasks are completed, leveraging the **signal-slot** pattern for efficient event-driven communication.

## Table of Contents

- [Project Structure](#project-structure)
- [Components Overview](#components-overview)
  - [1. `data.ts`](#1-datatssignal_slotparalleldatats)
  - [2. `dataFetcher.ts`](#2-datafetcherts)
  - [3. `dataAggregator.ts`](#3-dataaggregators)
  - [4. `dataReporter.ts`](#4-datareporterts)
  - [5. `timer.ts`](#5-timerts)
  - [6. `main.ts`](#6-maints)
- [Execution Flow](#execution-flow)
- [Running the Example](#running-the-example)
- [Expected Output](#expected-output)
- [Conclusion](#conclusion)

---

## Project Structure

```
src/demo/signal_slot/parallel/
├── dataAggregator.ts
├── dataFetcher.ts
├── dataReporter.ts
├── data.ts
├── main.ts
└── timer.ts
```

- **`data.ts`**: Defines TypeScript interfaces for data structures used across the pipeline.
- **`dataFetcher.ts`**: Implements the `DataFetcher` class responsible for fetching data asynchronously.
- **`dataAggregator.ts`**: Implements the `DataAggregator` class that monitors multiple `DataFetcher` instances and aggregates their results.
- **`dataReporter.ts`**: Implements the `DataReporter` class that receives aggregated data and performs reporting actions.
- **`timer.ts`**: Implements the `Timer` class to measure and log the total elapsed time of the processing workflow.
- **`main.ts`**: Entry point that sets up and runs the parallel processing pipeline by instantiating classes and establishing signal-slot connections.

---

## Components Overview

### 1. `data.ts`

**Purpose**: Defines the structure of the data objects handled within the pipeline.

```typescript
// src/demo/signal_slot/parallel/data.ts

export interface IData {
    source: string;
    content: string;
}
```

### 2. `dataFetcher.ts`

**Purpose**: Represents an asynchronous task that fetches data. Upon completion, it emits a `'finished'` signal with the fetched data.

```typescript
// src/demo/signal_slot/parallel/dataFetcher.ts

import { create, emit } from '../../../modules/signal_slot';
import { IData } from './data';

export class DataFetcher {
    constructor(public name: string, public ms: number) {
        create(this, 'finished');
    }

    fetchData() {
        console.log(`${this.name}: Starting data fetch...`);
        setTimeout(() => {
            const data: IData = {
                source: this.name,
                content: `Data from ${this.name}`,
            };
            console.log(`${this.name}: Data fetched.`);
            emit(this, 'finished', data);
        }, this.ms);
    }
}
```

### 3. `dataAggregator.ts`

**Purpose**: Monitors multiple `DataFetcher` instances and aggregates their results once all have completed. It emits an `'aggregated'` signal with the combined data.

```typescript
// src/demo/signal_slot/parallel/dataAggregator.ts

import { create, emit, connect } from '../../../modules/signal_slot';
import { IData } from './data';

export class DataAggregator {
    private completedTasks: number = 0;
    private totalTasks: number = 0;
    private aggregatedData: IData[] = [];

    constructor() {
        create(this, 'aggregated');
    }

    addFetcher(fetcher: any) {
        this.totalTasks++;
        connect({
            sender: fetcher,
            signal: 'finished',
            receiver: (data: IData) => this.onFetcherFinished(data),
        });
    }

    private onFetcherFinished(data: IData) {
        this.aggregatedData.push(data);
        this.completedTasks++;
        console.log(`DataAggregator: Received data from ${data.source}. (${this.completedTasks}/${this.totalTasks})`);

        if (this.completedTasks === this.totalTasks) {
            console.log('DataAggregator: All data fetched. Aggregating data...');
            emit(this, 'aggregated', this.aggregatedData);
            // Reset for potential reuse
            this.completedTasks = 0;
            this.aggregatedData = [];
        }
    }
}
```

### 4. `dataReporter.ts`

**Purpose**: Receives aggregated data and performs reporting actions, such as logging the combined results.

```typescript
// src/demo/signal_slot/parallel/dataReporter.ts

import { IData } from './data';

export class DataReporter {
    report(data: IData[]) {
        console.log('DataReporter: Reporting aggregated data:');
        data.forEach((item, index) => {
            console.log(`  ${index + 1}. [${item.source}] ${item.content}`);
        });
    }
}
```

### 5. `timer.ts`

**Purpose**: Measures and logs the total elapsed time of the entire parallel processing workflow.

```typescript
// src/demo/signal_slot/parallel/timer.ts

export class Timer {
    constructor() {
        console.time('Elapsed time');
    }

    end() {
        console.log('All tasks completed.');
        console.timeEnd('Elapsed time');
    }
}
```

### 6. `main.ts`

**Purpose**: Entry point of the application. Sets up and runs the parallel processing pipeline by instantiating classes and establishing signal-slot connections.

```typescript
// src/demo/signal_slot/parallel/main.ts

import { DataFetcher } from './dataFetcher';
import { DataAggregator } from './dataAggregator';
import { DataReporter } from './dataReporter';
import { Timer } from './timer';
import { connect } from '../../../modules/signal_slot';

// Instantiate components
const fetcher1 = new DataFetcher('Fetcher1', 2000); // 2 seconds
const fetcher2 = new DataFetcher('Fetcher2', 3000); // 3 seconds
const fetcher3 = new DataFetcher('Fetcher3', 1000); // 1 second

const aggregator = new DataAggregator();
const reporter = new DataReporter();
const timer = new Timer();

// Connect DataAggregator's 'aggregated' signal to DataReporter and Timer
connect({
    sender: aggregator,
    signal: 'aggregated',
    receiver: reporter,
    slot: 'report'
});

connect({
    sender: aggregator,
    signal: 'aggregated',
    receiver: timer,
    slot: 'end'
});

// Add fetchers to aggregator
aggregator.addFetcher(fetcher1);
aggregator.addFetcher(fetcher2);
aggregator.addFetcher(fetcher3);

// Start all fetchers in parallel
console.log('Main: Starting all data fetchers in parallel...');
fetcher1.fetchData();
fetcher2.fetchData();
fetcher3.fetchData();
```

---

## Execution Flow

1. **Initialization**:
    - Three `DataFetcher` instances (`Fetcher1`, `Fetcher2`, `Fetcher3`) are created, each simulating data fetching with different delays.
    - A `DataAggregator` instance is created to monitor these fetchers.
    - A `DataReporter` instance is created to handle the aggregated data.
    - A `Timer` instance is created to measure the total elapsed time.

2. **Establishing Connections**:
    - Each `DataFetcher` is connected to the `DataAggregator`. When a fetcher completes, it emits a `'finished'` signal, which the aggregator listens to.
    - The `DataAggregator` is connected to both the `DataReporter` and the `Timer`. Once all fetchers have finished, the aggregator emits an `'aggregated'` signal, triggering the reporter to log the data and the timer to stop.

3. **Running Tasks in Parallel**:
    - All `DataFetcher` instances are initiated simultaneously. They operate asynchronously, simulating parallel data fetching.
    - As each fetcher completes, they emit their `'finished'` signals, which the aggregator collects.
    - Once all fetchers have completed, the aggregator emits the `'aggregated'` signal with the combined data.
    - The reporter logs the aggregated data, and the timer logs the total elapsed time.

---

## Running the Example

Follow these steps to set up, compile, and run the **Signal-Slot Parallel Processing** example:

### 1. Initialize the Project

Navigate to your project directory and initialize a new Node.js project:

```bash
mkdir signal-slot-parallel-example
cd signal-slot-parallel-example
npm init -y
```

### 2. Install TypeScript and Dependencies

Install TypeScript and Node.js type definitions as development dependencies:

```bash
npm install typescript @types/node --save-dev
```

### 3. Create `tsconfig.json`

Initialize a TypeScript configuration file:

```bash
npx tsc --init
```

Modify the `tsconfig.json` to match the project structure. Here's a sample configuration:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./",
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*", "modules/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 4. Create Project Files

Create the necessary directories and files as per the project structure:

```bash
mkdir -p src/demo/signal_slot/parallel/interfaces
mkdir -p src/modules
```

Create each `.ts` file with the provided code snippets.

### 5. Compile the TypeScript Code

Run the TypeScript compiler to transpile `.ts` files to `.js`:

```bash
npx tsc
```

This command reads the `tsconfig.json` and compiles the TypeScript files into the `dist/` directory.

### 6. Execute the Compiled JavaScript

Run the `main.js` file using Node.js:

```bash
node dist/demo/signal_slot/parallel/main.js
```

---

## Expected Output

Upon running the example, the console should display logs indicating the parallel execution of data fetchers, aggregation of their results, reporting, and the elapsed time. Here's a sample output:

```
Main: Starting all data fetchers in parallel...
Fetcher1: Starting data fetch...
Fetcher2: Starting data fetch...
Fetcher3: Starting data fetch...
Fetcher3: Data fetched.
DataAggregator: Received data from Fetcher3. (1/3)
Fetcher1: Data fetched.
DataAggregator: Received data from Fetcher1. (2/3)
Fetcher2: Data fetched.
DataAggregator: Received data from Fetcher2. (3/3)
DataAggregator: All data fetched. Aggregating data...
DataReporter: Reporting aggregated data:
  1. [Fetcher3] Data from Fetcher3
  2. [Fetcher1] Data from Fetcher1
  3. [Fetcher2] Data from Fetcher2
All tasks completed.
Elapsed time: 3030.123ms
```

**Explanation**:

1. **Initialization**:
    - All three fetchers start fetching data simultaneously.

2. **Fetching Completion**:
    - `Fetcher3` completes first after 1 second.
    - `Fetcher1` completes next after 2 seconds.
    - `Fetcher2` completes last after 3 seconds.

3. **Aggregation**:
    - Once all fetchers have completed, the `DataAggregator` emits the `'aggregated'` signal with the collected data.

4. **Reporting and Timing**:
    - `DataReporter` receives the aggregated data and logs the report.
    - `Timer` logs the total elapsed time of the process.

*Note*: The exact values and timing may vary due to the use of `Math.random()` and `setTimeout` precision.

---

## Conclusion

The **Signal-Slot Parallel Processing** example effectively demonstrates how to manage multiple asynchronous tasks running in parallel using the signal-slot pattern in TypeScript with an object-oriented design. By decoupling the tasks and leveraging event-driven communication, the system ensures that actions are performed only after all parallel operations have completed, enhancing both scalability and maintainability.

**Key Takeaways**:

- **Decoupling**: Components communicate via signals and slots without direct dependencies, promoting modularity.
- **Parallel Execution**: Multiple tasks can run concurrently, improving efficiency.
- **Synchronization**: Aggregating results after all parallel tasks complete ensures coherent downstream processing.
- **Scalability**: Easily extend the system by adding more fetchers or processing steps without altering existing components.

**Potential Enhancements**:

1. **Error Handling**: Implement mechanisms to handle failures in individual fetchers without disrupting the entire pipeline.
2. **Dynamic Task Management**: Allow adding or removing tasks at runtime.
3. **Type Safety**: Enhance type definitions for stricter TypeScript type checking.
4. **Logging Framework**: Integrate a logging library for more advanced logging capabilities.

By understanding and applying the signal-slot pattern, developers can build robust, efficient, and scalable event-driven systems in TypeScript.

