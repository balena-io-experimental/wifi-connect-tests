#!/bin/bash

# Clone the wifi connect repo (bash script)

git clone https://github.com/balena-io/wifi-connect.git && cd wifi-connect

# Login into balenCloud Prod

balena login --token "${BALENA_API_KEY}"

# Create a new empty app on your dashboard called wifi-connect (CLI).

balena app create wifi-connect -t raspberrypi3

# Download the OS variant to be tested to a temporary image file

balena os download raspberrypi3 -o /tmp/raspberrypi3.img --version v2.60.1+rev1.prod

# Configure the OS image and add the image to the wifi-connect app with ETHERNET ONLY

balena os configure /tmp/raspberrypi3.img -a wifi-connect --config-network ethernet

# Push one release to the wifi-connect app

balena push wifi-connect

# Preload the configured OS image and pin the release to current (the release from the previous push command)

balena preload /tmp/raspberrypi3.img -a wifi-connect --pin-device-to-release -c current

# Push a second release to the wifi-connect app

balena push wifi-connect
