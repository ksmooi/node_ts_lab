export class Timer {
    constructor() {
        console.time('Elapsed time');
    }

    end() {
        console.log('All tasks completed.');
        console.timeEnd('Elapsed time');
    }
}
