/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

const {fetchActiveReleaseTrains} = require('@angular/dev-infra-private/ng-dev/release/versioning');
const {
  GithubClient,
  AuthenticatedGithubClient,
} = require('@angular/dev-infra-private/ng-dev/utils/git/github');

/**
 * Gets all active release trains in the `angular/components` repository,
 * allowing us to determine the branches for types of releases.
 */
async function getActiveReleaseTrains() {
  const githubToken = process.env.GITHUB_TOKEN;
  const githubClient = githubToken
    ? new AuthenticatedGithubClient(githubToken)
    : new GithubClient();

  return await fetchActiveReleaseTrains({
    name: 'components',
    owner: 'angular',
    nextBranchName: 'master',
    api: githubClient,
  });
}

exports.getActiveReleaseTrains = getActiveReleaseTrains;
