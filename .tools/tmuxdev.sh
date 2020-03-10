#!/bin/sh

# This script is inteded for a simple multi-pane logger, displaying logs from each service next to each other
#todo: not working
tmux new-session -s "pis-eshop-runtime-logs" -d
tmux split-window -v
tmux -2 attach-session -d
