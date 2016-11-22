#!/bin/bash

set -e -o pipefail

TUNNEL_FILE="BrowserStackLocal-linux-x64.zip"
TUNNEL_URL="https://www.browserstack.com/browserstack-local/$TUNNEL_FILE"
TUNNEL_DIR="/tmp/browserstack-tunnel"

TUNNEL_LOG="$LOGS_DIR/sauce-connect"
TUNNEL_STDOUT="$LOGS_DIR/sauce-connect.stdout"
TUNNEL_STDERR="$LOGS_DIR/sauce-connect.stderr"

BROWSER_STACK_ACCESS_KEY=`echo $BROWSER_STACK_ACCESS_KEY | rev`

# Create the directory for the tunnel connector.
mkdir -p $TUNNEL_DIR
cd $TUNNEL_DIR

# Download the saucelabs connect binaries.
curl $TUNNEL_URL -o $TUNNEL_DIR 2> /dev/null 1> /dev/null

# Extract the saucelabs connect binaries from the tarball.
mkdir browserstack-tunnel
unzip -q $TUNNEL_FILE -d browserstack-tunnel

# Cleanup the download directory.
rm $TUNNEL_FILE

ARGS=""

# Set tunnel-id only on Travis, to make local testing easier.
if [ ! -z "$TRAVIS_JOB_NUMBER" ]; then
  ARGS="$ARGS --local-identifier $TRAVIS_JOB_NUMBER"
fi
if [ ! -z "$BROWSER_PROVIDER_READY_FILE" ]; then
  ARGS="$ARGS --readyfile $BROWSER_PROVIDER_READY_FILE"
fi

echo "Starting Browserstack Local in the background, logging into:"
echo "  $TUNNEL_LOG"
echo "  $TUNNEL_STDOUT"
echo "  $TUNNEL_STDERR"
echo "  ---"
echo "  $ARGS"

browserstack-tunnel/BrowserStackLocal -k $BROWSER_STACK_ACCESS_KEY $ARGS \
  --logfile $CONNECT_LOG 2> $CONNECT_STDERR 1> $CONNECT_STDOUT &
