#!/bin/sh

node ./build/index.load.js 1 60 > 1child.csv
node ./build/index.load.js 2 30 > 2child.csv
node ./build/index.load.js 3 20 > 3child.csv
node ./build/index.load.js 4 15 > 4child.csv
node ./build/index.load.js 5 12 > 5child.csv
