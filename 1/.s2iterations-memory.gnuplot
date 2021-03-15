set datafile separator ','

set style line 100 lt 1 lc rgb "grey" lw 0.5 # linestyle for the grid
set grid ls 100 # enable grid with specific linestyle

set xtics rotate
set terminal pngcairo size 800,600 enhanced font 'Segoe UI,10'
set output 'data/s2iterations-memory.png'

plot 'data/s2c1x1.csv' using 1:3 with lines title '1 iteration', \
     'data/s2c1x2.csv' using 1:3 with lines title '2 iteration', \
     'data/s2c1x10.csv' using 1:3 with lines title '10 iteration'