#!/usr/bin/env node

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

const {
  fetchLongTermSupportBranchesFromNpm,
  getLtsNpmDistTagOfMajor,
} = require('@angular/dev-infra-private/ng-dev/release/versioning');
const {
  checkPackageJsonForReleaseTrain,
  assertDocsContentPackageJsonRevision,
} = require('./check-package-json');

/** Regular expression matching the major integer of a deployment target (like `v13`). */
const versionMajorRegex = /^v?(\d+)$/;

async function checkPackageJsonForLtsVersion(deploymentTarget) {
  const matches = deploymentTarget.match(versionMajorRegex);

  if (matches === null) {
    throw new Error(`Invalid deployment target specified: ${deploymentTarget}`);
  }

  const major = matches[1];
  const majorLtsDistTag = getLtsNpmDistTagOfMajor(major);
  const ltsBranches = await fetchLongTermSupportBranchesFromNpm({
    representativeNpmPackage: '@angular/cdk',
  });

  const ltsBranchInfo = [...ltsBranches.active, ...ltsBranches.inactive].find(
    info => info.npmDistTag === majorLtsDistTag
  );

  if (ltsBranchInfo === undefined) {
    throw new Error(`No LTS branch found for: ${deploymentTarget}`);
  }

  assertDocsContentPackageJsonRevision(ltsBranchInfo.name);
}

/**
 * Checks that the proper docs content revision/branch is configured for the
 * specified "deployment target". The release train computed from the deployment
 * target is checked against the `angular/components` repository.
 *
 * Note that a "deployment target" is a construct from the `deploy.sh` script.
 * The `deploy.sh` script calls this validation script directly.
 */
async function main(deploymentTarget) {
  if (deploymentTarget === 'stable') {
    await checkPackageJsonForReleaseTrain('latest');
  } else if (deploymentTarget === 'next') {
    await checkPackageJsonForReleaseTrain('next');
  } else {
    await checkPackageJsonForLtsVersion(deploymentTarget);
  }
}

main(process.argv[2]).catch(e => {
  console.error(e);
  process.exitCode = 1;
});
