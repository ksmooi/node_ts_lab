import { create, emit } from '../../../modules/signal_slot';
import { Data } from './data';

export class DataLoader {
    constructor() {
        create(this, 'loaded');
    }

    loadData() {
        console.log('DataLoader: Starting data loading...');
        setTimeout(() => {
            const data: Data = { id: 1, content: 'Sample Data' };
            console.log('DataLoader: Data loaded.');
            emit(this, 'loaded', data);
        }, 1000); // Simulate 1 second loading time
    }
}
