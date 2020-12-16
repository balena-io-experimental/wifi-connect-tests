#!/bin/bash

#It takes time for wifi connect to become active - so we need to wait - or keep retrying if it fails

nmcli d wifi connect "WiFi Connect"

# https://core.docs.ubuntu.com/en/stacks/network/network-manager/docs/configure-wifi-connections
