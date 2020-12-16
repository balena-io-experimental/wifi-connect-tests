#!/bin/bash


rm  -R /var/run/docker
rm /var/run/docker.sock

set -eu

# https://docs.docker.com/engine/reference/commandline/dockerd/
dockerd &

sleep 5

# cargo run -- -c /usr/src/core/tests

tail -f /dev/null
