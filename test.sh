#!/usr/bin/env bash

if [ -z $1 ]; then
  echo "Invalid server"
  echo "usage: test.sh <server> <outputDir>"
  exit
fi

date=$(date +'%Y-%m-%d-%H-%M')

echo "Testing upload"
iperf3 -c $1 --logfile "${date}-tcp-upload.log"

echo "Testing download"
iperf3 -c $1 -R --logfile "${date}-tcp-dowload.log"

echo "Testing upload packet loss"
iperf3 -c $1 -u -b 10M --logfile "${date}-udp-upload.log"

echo "Testing download packet loss"
iperf3 -c $1 -u -b 10M -R --logfile "${date}-udp-dowload.log"

ping $1 -c 10 > "${date}-ping.log"
