#!/bin/bash

set -e -o pipefail

TUNNEL_FILE="sc-4.4.1-linux.tar.gz"
TUNNEL_URL="https://saucelabs.com/downloads/$TUNNEL_FILE"
TUNNEL_DIR="/tmp/saucelabs-connect"

TUNNEL_LOG="$LOGS_DIR/sauce-connect"
TUNNEL_STDOUT="$LOGS_DIR/sauce-connect.stdout"
TUNNEL_STDERR="$LOGS_DIR/sauce-connect.stderr"

SAUCE_ACCESS_KEY=`echo $SAUCE_ACCESS_KEY | rev`

# Cleanup and create the directory for the tunnel connector.
rm -rf $TUNNEL_DIR $BROWSER_PROVIDER_READY_FILE
mkdir -p $TUNNEL_DIR

cd $TUNNEL_DIR

# Download the saucelabs connect binaries.
curl $TUNNEL_URL -o $TUNNEL_FILE 2> /dev/null 1> /dev/null

# Extract the saucelabs connect binaries from the tarball.
mkdir -p sauce-connect
tar --extract --file=$TUNNEL_FILE --strip-components=1 --directory=sauce-connect > /dev/null

# Cleanup the download directory.
rm $TUNNEL_FILE

ARGS=""

# Set tunnel-id only on Travis, to make local testing easier.
if [ ! -z "$TRAVIS_JOB_NUMBER" ]; then
  ARGS="$ARGS --tunnel-identifier $TRAVIS_JOB_NUMBER"
fi
if [ ! -z "$BROWSER_PROVIDER_READY_FILE" ]; then
  ARGS="$ARGS --readyfile $BROWSER_PROVIDER_READY_FILE"
fi

echo "Starting Sauce Connect in the background, logging into:"
echo "  $TUNNEL_LOG"
echo "  $TUNNEL_STDOUT"
echo "  $TUNNEL_STDERR"
echo "  ---"
echo "  $ARGS"

sauce-connect/bin/sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY $ARGS --logfile $TUNNEL_LOG &
