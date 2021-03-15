set datafile separator ','

set style line 100 lt 1 lc rgb "grey" lw 0.5 # linestyle for the grid
set grid ls 100 # enable grid with specific linestyle

set xtics rotate
set terminal pngcairo size 800,600 enhanced font 'Segoe UI,10'
set output 'data/s2children-time.png'

plot 'data/s2c1.csv' using 1:2 with lines title '1 child process', \
     'data/s2c2.csv' using 1:2 with lines title '2 child processes', \
     'data/s2c3.csv' using 1:2 with lines title '3 child processes', \
     'data/s2c4.csv' using 1:2 with lines title '4 child processes', \
     'data/s2c10.csv' using 1:2 with lines title '10 child processes'