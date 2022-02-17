/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

const path = require('path');
const fs = require('fs');
const {getActiveReleaseTrains} = require('./get-release-train-info');

/** Path to the project `package.json` file. */
const packageJsonPath = path.join(__dirname, '../../package.json');

/** Regular expression matching the revision/branch of the NPM github protocol. */
const npmGithubProtocolBranchRegex = /angular\/material2-docs-content(?:.git)?#(.*)$/;

/**
 * Checks that the proper docs content revision/branch is configured for the
 * given release train. The branch/revision for the release train is being
 * determined from the `angular/components` repo.
 */
async function checkPackageJsonForReleaseTrain(trainName) {
  const activeTrains = await getActiveReleaseTrains();
  const train = activeTrains[trainName];

  if (train === undefined) {
    throw new Error(`Unknown release train: ${trainName}`);
  }

  console.info('Expected Angular CDK/Material version:', train.version.format());
  console.info('Release train branch: angular/components#' + train.branchName);

  assertDocsContentPackageJsonRevision(train.branchName);
}

/**
 * Asserts that the project `package.json` file has the docs-content configured
 * with the given expected revision/branch.
 */
function assertDocsContentPackageJsonRevision(expectedRevisionOrBranch) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const matches = packageJson.dependencies['@angular/components-examples'].match(
    npmGithubProtocolBranchRegex
  );
  const currentRevisionOrBranch = matches ? matches[1] : null;

  if (currentRevisionOrBranch !== expectedRevisionOrBranch) {
    throw new Error(
      `Unexpected docs-content branch. Expected: ${expectedRevisionOrBranch}, ` +
        `but got: ${currentRevisionOrBranch}`
    );
  }
}

exports.checkPackageJsonForReleaseTrain = checkPackageJsonForReleaseTrain;
exports.assertDocsContentPackageJsonRevision = assertDocsContentPackageJsonRevision;
