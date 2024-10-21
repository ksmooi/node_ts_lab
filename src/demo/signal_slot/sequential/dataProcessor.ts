import { create, emit } from '../../../modules/signal_slot';
import { Data, ProcessedData } from './data';

export class DataProcessor {
    constructor() {
        create(this, 'processed');
        create(this, 'error');
    }

    processData(data: Data) {
        console.log(`DataProcessor: Processing data with id=${data.id}...`);
        setTimeout(() => {
            try {
                // Simulate processing logic
                if (!data.content) throw new Error('No content to process.');
                const processedData: ProcessedData = {
                    id: data.id,
                    processedContent: data.content.toUpperCase(),
                };
                console.log('DataProcessor: Data processed.');
                emit(this, 'processed', processedData);
            } catch (error) {
                console.error('DataProcessor: Error processing data.', error);
                emit(this, 'error', error);
            }
        }, 1500); // Simulate 1.5 seconds processing time
    }
}
