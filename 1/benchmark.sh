#!/bin/sh

time node ./build/index.load.js 1 1 | tee data/s2c1x1.csv
time node ./build/index.load.js 1 2 | tee data/s2c1x2.csv
time node ./build/index.load.js 1 10 | tee data/s2c1x10.csv

time node ./build/index.load.js 1 1 | tee data/s2c1.csv
time node ./build/index.load.js 2 1 | tee data/s2c2.csv
time node ./build/index.load.js 3 1 | tee data/s2c3.csv
time node ./build/index.load.js 4 1 | tee data/s2c4.csv
time node ./build/index.load.js 10 1 | tee data/s2c10.csv
