#!/bin/bash
set -ex

# Change directory to project root.
cd $(dirname $0)/../..

# Include sources.
# source ./scripts/ci/sources/mode.sh
# source ./scripts/ci/sources/tunnel.sh

./scripts/browserstack/start-tunnel.sh
./scripts/browserstack/block-tunnel.sh

if is_lint; then
  $(npm bin)/ng lint
elif is_e2e; then
  $(npm bin)/ng e2e
else
  $(npm bin)/ng test
fi

./scripts/browserstack/teardown-tunnel.sh
