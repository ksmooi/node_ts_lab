import { IData } from './data';

export class DataReporter {
    report(data: IData[]) {
        console.log('DataReporter: Reporting aggregated data:');
        data.forEach((item, index) => {
            console.log(`  ${index + 1}. [${item.source}] ${item.content}`);
        });
    }
}
