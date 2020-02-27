#!/bin/sh
tmux new-session -s "pis-eshop-runtime-logs" -d
tmux split-window -v
tmux -2 attach-session -d
