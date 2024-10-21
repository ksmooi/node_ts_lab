import { create, emit } from '../../../modules/signal_slot';
import { ProcessedData } from './data';

export class DataSaver {
    constructor() {
        create(this, 'saved');
    }

    saveData(processedData: ProcessedData) {
        console.log(`DataSaver: Saving data with id=${processedData.id}...`);
        setTimeout(() => {
            console.log(`DataSaver: Data saved: ${processedData.processedContent}`);
            emit(this, 'saved', processedData);
        }, 500); // Simulate 0.5 seconds saving time
    }
}
