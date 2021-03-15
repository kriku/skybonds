#!/usr/bin/env node

import { spawn, ChildProcess } from 'child_process';
import { resolve } from 'path';

const forks = parseInt(process.argv[2]);
const isForksValid = Number.isFinite(forks) && forks > 0;
const iterations = parseInt(process.argv[3]);
const isIterationValid = Number.isFinite(iterations) && iterations > 0;

if (!isForksValid || !isIterationValid) {
    throw new Error(`
Invalid script argument.
Expected child process count as second argument, iteration count as third argument.
Usage:

node index.load.js 4 10
`);
}

// relative to this file directory, to run from package.json directory
const processFilename = resolve(`${__dirname}/index.proc.js`);

const childPromise = (n: number): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
        const computation = spawn('node', [processFilename, n.toString()]);
        computation.stdout.on('data', (data) => {
            // loosely typed
            resolve(JSON.parse(data));
        });
        computation.stderr.on('data', (data) => {
            reject(data);
        });
    })
}

const NS_PER_SEC = 1e9;

const averageChildren = async (n: number): Promise<number> => {
    // array of length k [0, 0, 0, ..., 0]
    const children = (new Array(forks)).fill(0);
    const samples = await Promise.all(children.map(_ => childPromise(n)));
    return samples.reduce(
        (average, curr) => average += (curr[0] + curr[1] / NS_PER_SEC) / forks, 0
    );
}

const iteratedAverage = async (n: number): Promise<number> => {
    const samples = [];
    for (let i = 0; i < iterations; i++) {
        let averageTime = await averageChildren(n);
        samples.push(averageTime);
    }
    const average = samples.reduce(
        (average, curr) => average += curr / iterations, 0
    );
    process.stdout.write(`${n}, ${average.toFixed(6)}\n`);
    return average;
}

const TARGET = 2;
const APPROXIMATION = 0.1;

const binaryApproximation = async (n: number): Promise<number> => {
    let averageTime = await iteratedAverage(n);
    let diff = averageTime - TARGET;
    let prev = n;

    while (diff < -APPROXIMATION) {
        prev = n;
        n *= 2;
        averageTime = await iteratedAverage(n);
        diff = averageTime - TARGET;
    }

    while (diff > APPROXIMATION || diff < -APPROXIMATION) {
        let step = Math.sign(-diff) * Math.abs(n - prev) / 2;
        prev = n;
        n += step;
        averageTime = await iteratedAverage(n);
        diff = averageTime - TARGET;
    }

    return n;
}

binaryApproximation(2).then(() => {
    process.exit(0);
});
