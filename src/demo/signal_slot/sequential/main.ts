// npx ts-node src/demo/signal_slot/sequential/main.ts

import { connect, dump } from '../../../modules/signal_slot';
import { DataLoader } from './dataLoader';
import { DataProcessor } from './dataProcessor';
import { DataSaver } from './dataSaver';
import { ProcessedData } from './data';

export class DataPipeline {
    private loader: DataLoader;
    private processor: DataProcessor;
    private saver: DataSaver;

    constructor() {
        this.loader = new DataLoader();
        this.processor = new DataProcessor();
        this.saver = new DataSaver();

        // Connect loader's 'loaded' signal to processor's 'processData' slot
        connect({
            sender: this.loader,
            signal: 'loaded',
            receiver: this.processor,
            slot: 'processData'
        });

        // Connect processor's 'processed' signal to saver's 'saveData' slot
        connect({
            sender: this.processor,
            signal: 'processed',
            receiver: this.saver,
            slot: 'saveData'
        });

        // Connect processor's 'error' signal to DataPipeline's 'onProcessingError' slot
        connect({
            sender: this.processor,
            signal: 'error',
            receiver: this,
            slot: 'onProcessingError'
        });

        // Connect saver's 'saved' signal to DataPipeline's 'onDataSaved' slot
        connect({
            sender: this.saver,
            signal: 'saved',
            receiver: this,
            slot: 'onDataSaved'
        });
    }

    run() {
        console.log('DataPipeline: Starting the data processing pipeline...');
        this.loader.loadData();
    }

    onDataSaved(data: ProcessedData) {
        console.log(`DataPipeline: Data processing pipeline completed for id=${data.id}.\n`);
        // Optionally, restart the pipeline or perform additional actions
    }

    onProcessingError(error: any) {
        console.error(`DataPipeline: An error occurred during processing: ${error.message}`);
        // Optionally, terminate the pipeline or attempt recovery
    }

    // For debugging purposes, you can dump the connections
    debugDump() {
        dump(this.loader);
        dump(this.processor);
        dump(this.saver);
    }
}

function runSignalSlotSequentialDemo() {
    const pipeline = new DataPipeline();
    pipeline.run();

    // Optional: Uncomment the line below to view the current signal-slot connections for debugging
    // pipeline.debugDump();
}

runSignalSlotSequentialDemo();
