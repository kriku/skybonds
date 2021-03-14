import { computeFractions } from './index';

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
        _ => Math.random().toString()
    );
}

const input = generateInput(n);

const time = process.hrtime();
computeFractions(input);
const computationTime = process.hrtime(time);

process.stdout.write(JSON.stringify(computationTime));
