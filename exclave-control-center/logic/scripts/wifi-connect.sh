#!/bin/bash

#disconnect just for clean slate
nmcli connection delete id "WiFi Connect"

connected=0
until [ $connected == 1 ]
do
    nmcli dev wifi
    nmcli d wifi connect "WiFi Connect"
    sleep 30s
    if  nmcli | grep -q "WiFi Connect"; then
        echo "Connected to WiFi Connect AP!"
        connected=1
        exit 0
    fi
done

npm run codeceptjs:headless
