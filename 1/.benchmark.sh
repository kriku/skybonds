#!/bin/sh

echo '1 iteration'
time node ./build/index.load.js 1 1 | tee data/s2c1x1.csv
echo '2 iterations'
time node ./build/index.load.js 1 2 | tee data/s2c1x2.csv
echo '10 iterations'
time node ./build/index.load.js 1 10 | tee data/s2c1x10.csv

echo '1 child'
time node ./build/index.load.js 1 1 | tee data/s2c1.csv
echo '2 children'
time node ./build/index.load.js 2 1 | tee data/s2c2.csv
echo '3 children'
time node ./build/index.load.js 3 1 | tee data/s2c3.csv
echo '4 children'
time node ./build/index.load.js 4 1 | tee data/s2c4.csv
echo '10 children'
time node ./build/index.load.js 10 1 | tee data/s2c10.csv
