#!/bin/bash
echo "Running test-01-cli..."
# Clone the wifi connect repo (bash script)

echo "git cloning..."
git clone https://github.com/balena-io/wifi-connect.git ~/wifi-connect && cd ~/wifi-connect

# Login into balenCloud Prod
echo "balena login..."
balena login --token "${CLI_API_KEY}"

# Create a new empty app on your dashboard called wifi-connect (CLI).
echo "balena app create..."
balena app create wifi-connect -t raspberrypi3

# Download the OS variant to be tested to a temporary image file
echo "balena OS download..."
balena os download raspberrypi3 -o /tmp/raspberrypi3.img --version v2.58.3+rev1.prod

# Configure the OS image and add the image to the wifi-connect app with ETHERNET ONLY
echo "balena OS configure..."
balena os configure /tmp/raspberrypi3.img -a wifi-connect --config-network ethernet

# Push one release to the wifi-connect app
echo "balena push..."
balena push wifi-connect

# Preload the configured OS image and pin the release to current (the release from the previous push command)
echo "balena preload..."
balena preload /tmp/raspberrypi3.img -a wifi-connect --pin-device-to-release -c current -P /var/run/docker.sock  --debug

# Push a second release to the wifi-connect app
echo "balena push..."
balena push wifi-connect

exit 0
