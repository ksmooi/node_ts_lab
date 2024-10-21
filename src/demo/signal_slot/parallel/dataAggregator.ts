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
