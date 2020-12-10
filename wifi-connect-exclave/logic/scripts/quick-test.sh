#!/bin/bash

echo "TEST 0"

#Ping the endpoint - whats the address though?
curl http://testbot:8080/flash

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"ssid":"wificonnect","password":"password"}' \
   http://testbot:8080/connectAp/

#should check whats returned
exit 0