import { computeFractions } from './index';

declare global {
    function gc(): void;
}

const n = parseInt(process.argv[2]);
if (!Number.isFinite(n) || n < 0) {
    throw new Error(`
Invalid script argument.
Expect input array size, number, as second argument.
Usage:

node index.proc.js 100
`);
}

const generateInput = (n: number): string[] => {
    return (new Array(n)).fill(n).map(
        _ => Number.MAX_SAFE_INTEGER.toString() + Math.random().toFixed(10) + '1'
    );
}


const input = generateInput(n);

gc();
const memoryUsage = process.memoryUsage();
const time = process.hrtime();
computeFractions(input);
const computationTime = process.hrtime(time);
const computationMemoryUsage = process.memoryUsage();

export interface AverageConsumption {
    time: number;
    heap: number;
}

const NS_PER_SEC = 1e9;
const BYTES_IN_MB = Math.pow(2, 20);
const average: AverageConsumption = {
    time: computationTime[0] + computationTime[1] / NS_PER_SEC,
    heap: (computationMemoryUsage.heapUsed - memoryUsage.heapUsed) / BYTES_IN_MB,
}

process.stdout.write(JSON.stringify(average));
