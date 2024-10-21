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
