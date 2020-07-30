#!/bin/bash
tmux new-window -n charly-dev
tmux split-window -dh -- npm run re:watch
tmux split-window -dh -- npm run test:watch
tmux kill-pane