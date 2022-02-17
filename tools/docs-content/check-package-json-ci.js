#!/usr/bin/env node

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

const {checkPackageJsonForReleaseTrain} = require('./check-package-json');

/**
 * Below is a table outlining our strategy for validating the release train.
 * The branch in `angular/material.angular.io` will be used as indicator
 * for the intended deployment URL or release train:
 *
 * |--------------------------|--------|------------------|
 * | Deployment Url           | Branch | Release Train    |
 * |--------------------------|--------|------------------|
 * | material.angular.io      | master | latest           |
 * | next.material.angular.io | next   | next             |
 * |--------------------------|--------|------------------|
 *
 * e.g. if a new commit is pushed for `next`, then we will check that the
 * docs-content matches the branch of the `next` release train.
 *
 * For older, branched-out majors (like `12.x`), this check will not be run
 * in case commits are pushed to such "archive" branches.
 */
function getReleaseTrainForCiBranch() {
  switch (process.env.CIRCLE_BRANCH) {
    case 'master':
      return 'latest';
    case 'next':
      return 'next';
    default:
      return null;
  }
}

/**
 * Checks that the proper docs content revision/branch is configured for the
 * current branch. The release train is determined based on the current CI
 * branch name. See `getReleaseTrainForCiBranch` for more details.
 */
async function main() {
  const trainName = getReleaseTrainForCiBranch();

  if (trainName === null) {
    console.info('Skipping check as this is not an active deployment branch.');
    return;
  }

  checkPackageJsonForReleaseTrain(trainName);
}

main().catch(e => {
  console.error(e);
  process.exitCode = 1;
});
