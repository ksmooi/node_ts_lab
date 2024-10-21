// npx ts-node src/demo/signal_slot/parallel/main.ts

import { connect } from '../../../modules/signal_slot';
import { DataFetcher } from './dataFetcher';
import { DataAggregator } from './dataAggregator';
import { DataReporter } from './dataReporter';
import { Timer } from './timer';

function runSignalSlotParallelDemo() {
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
}

runSignalSlotParallelDemo();
