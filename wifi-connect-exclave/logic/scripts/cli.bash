#!/bin/bash

# Login into balenCloud Prod

balena login --token "${BALENA_API_KEY}"

# Create a new empty app on your dashboard called wifi-connect (CLI).

balena app create wifi-connect -t raspberrypi3

# From the wifi-connect app dashboard, add a new device and select Production as the OS edition and Ethernet only (CLI).

balena device init -a wifi-connect -y --os-version x.y.z-prod

# Extract the downloaded image file (skip this step for Edison images) (not required if using device init above)

unzip <the_image_you_downloaded> (bash script)

#  Clone the wifi connect repo (bash script)

git clone https://github.com/balena-io/wifi-connect.git && cd wifi-connect

# Push two releases to your app (bash script/cli)

balena push wifi-connect

balena preload ~/.balena/cache/<the_image_you_downloaded> --app wifi-connect --pin-device-to-release -c current

balena push wifi-connect
