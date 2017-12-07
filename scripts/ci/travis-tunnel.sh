#!/bin/bash

# Load the retry-call utility function.
source ./scripts/retry-call.sh

start_tunnel() {
  case "$MODE" in

    e2e|saucelabs*)
      ./scripts/saucelabs/start-tunnel.sh
    ;;

    browserstack*)
      ./scripts/browserstack/start-tunnel.sh
    ;;

  esac
}

wait_for_tunnel() {
  case "$MODE" in
    e2e*|saucelabs*)
      retryCall ${WAIT_RETRIES} ./scripts/saucelabs/wait-tunnel.sh
      ;;
    browserstack*)
      retryCall ${WAIT_RETRIES} ./scripts/browserstack/wait-tunnel.sh
      ;;
    *)
      ;;
  esac
}

teardown_tunnel() {
  case "$MODE" in

    e2e|saucelabs*)
      ./scripts/saucelabs/teardown-tunnel.sh
    ;;

    browserstack*)
      ./scripts/browserstack/teardown-tunnel.sh
    ;;

  esac
}
