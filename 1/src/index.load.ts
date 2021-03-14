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

// резолвим относительно этого файла, чтобы иметь возможность запускать из корня пакета
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

const average = async (n: number, k: number): Promise<number> => {
    // array of length k [0, 0, 0, ..., 0]
    const children = (new Array(k)).fill(0);
    const samples = await Promise.all(children.map(_ => childPromise(n)));
    return samples.reduce(
        (average, curr) => average += (curr[0] + curr[1] / NS_PER_SEC) / k, 0
    );
}

const TARGET = 5;
const APPROXIMATION = 0.5;

const binarySearchN = async (n: number, prev: number): Promise<number> => {
    const runs = (new Array(iterations)).fill(0);
    const samples = await Promise.all(runs.map(_ => average(n, forks)));
    const averageTime = samples.reduce(
        (average, curr) => average += curr / iterations, 0
    );
    process.stdout.write(`${n}, ${averageTime.toFixed(6)}\n`);

    const diff = averageTime - TARGET;

    // first try - exponentially increment
    if (diff < -APPROXIMATION && prev < n) {
        return await binarySearchN(n * 2, n);
    }

    // binary search
    if (Math.abs(diff) > APPROXIMATION) {
        const nextN = n - Math.sign(diff) * Math.abs(n - prev) / 2;
        return await binarySearchN(nextN, n);
    }

    return n;
}

binarySearchN(2, 0);
