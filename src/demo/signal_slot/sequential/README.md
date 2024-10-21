# Overview of `Signal-Slot Sequential Processing Example` Example

The **Data Processing Pipeline** demonstrates a sequential workflow where data flows through three primary stages:

1. **Data Loading**: Fetches or generates raw data.
2. **Data Processing**: Transforms the raw data into a processed format.
3. **Data Saving**: Persists the processed data to a storage medium.

Each stage operates as an independent class, emitting signals upon task completion. These signals trigger the subsequent stage in the pipeline, orchestrated using the `signal_slot` module. This decoupled architecture promotes flexibility and scalability, allowing each component to evolve independently.

## File Breakdown

### 1. `data.ts`

**Purpose**: Defines TypeScript interfaces representing the structure of the data being handled throughout the pipeline.

**Contents**:
- **`Data` Interface**: Represents the raw data structure loaded by `DataLoader`.
- **`ProcessedData` Interface**: Represents the transformed data structure produced by `DataProcessor` and consumed by `DataSaver`.

**Explanation**:
- **`Data`**: Contains an `id` and `content`, simulating raw data attributes.
- **`ProcessedData`**: Contains an `id` and `processedContent`, representing the outcome after processing.

### 2. `dataLoader.ts`

**Purpose**: Implements the `DataLoader` class responsible for loading or generating raw data and emitting a `'loaded'` signal upon completion.

**Contents**:
- **`DataLoader` Class**:
  - **Method `loadData()`**: Simulates an asynchronous data loading process using `setTimeout`.
  - **Signal `'loaded'`**: Emitted after data is loaded, carrying the loaded `Data` object.

**Explanation**:
- **Initialization**: Defines a `'loaded'` signal during construction.
- **`loadData()`**: Logs the start of data loading, waits for 1 second, logs completion, and emits the `'loaded'` signal with the loaded data.

### 3. `dataProcessor.ts`

**Purpose**: Implements the `DataProcessor` class responsible for processing the loaded data and emitting a `'processed'` signal upon completion.

**Contents**:
- **`DataProcessor` Class**:
  - **Method `processData(data: Data)`**: Simulates data processing using `setTimeout`.
  - **Signal `'processed'`**: Emitted after data processing, carrying the `ProcessedData` object.
  - **Signal `'error'`**: Emitted if an error occurs during processing.

**Explanation**:
- **Initialization**: Defines `'processed'` and `'error'` signals during construction.
- **`processData(data: Data)`**: Logs the start of processing, waits for 1.5 seconds, processes the data by converting `content` to uppercase, logs completion, and emits the `'processed'` signal. If an error occurs (e.g., missing `content`), logs the error and emits the `'error'` signal.

### 4. `dataSaver.ts`

**Purpose**: Implements the `DataSaver` class responsible for saving the processed data and emitting a `'saved'` signal upon completion.

**Contents**:
- **`DataSaver` Class**:
  - **Method `saveData(processedData: ProcessedData)`**: Simulates data saving using `setTimeout`.
  - **Signal `'saved'`**: Emitted after data is saved, carrying the `ProcessedData` object.

**Explanation**:
- **Initialization**: Defines a `'saved'` signal during construction.
- **`saveData(processedData: ProcessedData)`**: Logs the start of saving, waits for 0.5 seconds, logs completion with the processed content, and emits the `'saved'` signal.

### 5. `main.ts`

**Purpose**: Serves as the entry point of the application, orchestrating the connections between `DataLoader`, `DataProcessor`, and `DataSaver` using the `signal_slot` module to ensure sequential execution.

**Contents**:
- **Imports**: Imports the necessary classes and functions.
- **`DataPipeline` Class**:
  - **Constructor**: Instantiates `DataLoader`, `DataProcessor`, and `DataSaver`, and sets up signal-slot connections.
  - **Methods**:
    - **`run()`**: Initiates the data loading process.
    - **`onDataSaved(data: ProcessedData)`**: Handles the completion of the pipeline.
    - **`onProcessingError(error: any)`**: Handles errors during data processing.
    - **`debugDump()`** *(Optional)*: Dumps the current signal-slot connections for debugging purposes.
- **Execution**: Creates an instance of `DataPipeline` and runs it.

**Explanation**:
- **Instantiation**: Creates instances of `DataLoader`, `DataProcessor`, and `DataSaver`.
- **Signal-Slot Connections**:
  - **`'loaded'` → `processData`**: When `DataLoader` emits `'loaded'`, `DataProcessor`'s `processData` method is invoked with the loaded data.
  - **`'processed'` → `saveData`**: When `DataProcessor` emits `'processed'`, `DataSaver`'s `saveData` method is invoked with the processed data.
  - **`'error'` → `onProcessingError`**: When `DataProcessor` emits `'error'`, the pipeline's `onProcessingError` method handles the error.
  - **`'saved'` → `onDataSaved`**: When `DataSaver` emits `'saved'`, the pipeline's `onDataSaved` method signifies the completion of the pipeline.
- **Execution**: Initiates the pipeline by calling `run()`, which starts the data loading process.
- **Optional Debugging**: The `debugDump()` method can be called to log all current signal-slot connections for inspection.

## Execution Flow

Here's a step-by-step overview of how the pipeline operates:

1. **Pipeline Initialization**:
   - An instance of `DataPipeline` is created.
   - The constructor sets up connections between the signals and slots of the loader, processor, and saver.

2. **Starting the Pipeline**:
   - The `run()` method logs the start of the pipeline and calls `loadData()` on the `DataLoader`.

3. **Data Loading**:
   - `DataLoader` logs the commencement of data loading.
   - After a simulated 1-second delay, it logs the completion of data loading and emits the `'loaded'` signal with the loaded data.

4. **Data Processing**:
   - The `'loaded'` signal triggers `DataProcessor`'s `processData()` method with the loaded data.
   - `DataProcessor` logs the start of data processing.
   - After a simulated 1.5-second delay, it processes the data by converting the `content` to uppercase, logs completion, and emits the `'processed'` signal with the processed data.
   - If an error occurs (e.g., missing `content`), it logs the error and emits the `'error'` signal.

5. **Data Saving**:
   - The `'processed'` signal triggers `DataSaver`'s `saveData()` method with the processed data.
   - `DataSaver` logs the start of data saving.
   - After a simulated 0.5-second delay, it logs the completion of data saving with the processed content and emits the `'saved'` signal.

6. **Pipeline Completion**:
   - The `'saved'` signal triggers the pipeline's `onDataSaved()` method, logging the completion of the pipeline for the specific data item.

7. **Error Handling** *(If Applicable)*:
   - If an error occurs during data processing, the `'error'` signal triggers the pipeline's `onProcessingError()` method, logging the error details.

**Sample Console Output**:

```
DataPipeline: Starting the data processing pipeline...
DataLoader: Starting data loading...
DataLoader: Data loaded.
DataProcessor: Processing data with id=1...
DataProcessor: Data processed.
DataSaver: Saving data with id=1...
DataSaver: Data saved: SAMPLE DATA
DataPipeline: Data processing pipeline completed for id=1.
```

## Benefits of This Structure

- **Modularity**: Each class resides in its own file, promoting separation of concerns and reusability.
- **Maintainability**: Isolated components simplify debugging and future enhancements.
- **Scalability**: Easily extend the pipeline by adding new stages or modifying existing ones without impacting unrelated parts of the system.
- **Type Safety**: Utilizing TypeScript interfaces ensures consistent data structures across different pipeline stages.
- **Decoupling**: The `signal_slot` module facilitates communication between components without direct dependencies, enhancing flexibility.

## Conclusion

Organizing the **Data Processing Pipeline** into separate files within the `src/demo/signal_slot/sequential` directory structure streamlines development and fosters a clean, maintainable codebase. Leveraging the `signal_slot` module enables efficient and decoupled communication between distinct components, embodying best practices in TypeScript and object-oriented programming.

By following this structured approach, you set a strong foundation for building more complex and scalable event-driven systems in TypeScript, harnessing the full potential of the signal-slot pattern.

