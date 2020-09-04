#! /usr/bin/env bash

# -e exit immediatly when command fails, for pipeline operations: -o pipefail
# if one command during the pipeline operation fails then the whole pipeline fails, otherwise only the last commands exit code considered
set -eo pipefail

function help () {
  echo "Usage: bash release.sh <RELEASE_VERSION>"
  echo ""
  echo "Parameters:"
  echo "RELEASE_VERSION: SemVer Version of the release"
}

# RegEx:(<first capture group>) -> matches 0 or character between 1-9, matches further a character between 0-9 zero or unlimited times
# \. matches dot
semver_pattern="^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$"

RELEASE_VERSION=${1}

# -z -> string is null (empty string), so if empty string then throw error
[[ -z "${RELEASE_VERSION}" ]] && echo "ERROR: RELEASE_VERSION is empty" && help && exit 1
# ! returns true if false -> if release version not like semver_pattern then throw error
[[ ! "${RELEASE_VERSION}" =~ $semver_pattern ]] && echo "ERROR: RELEASE_VERSION does not match the SemVer specification" && help && exit 1

# go back one directory (like cd ..)
pushd ..

git fetch
printf "\n%s\n" "Create new branch release/${RELEASE_VERSION}"
git checkout -b release/${RELEASE_VERSION} origin/develop

printf "\n%s\n" "Run npm install"
npm install

printf "\n%s\n" "Change version in package.json"
# --no-git-tag-version -> doesnt commit changes made to package.json files and doesnt tag the release
# --no-push -> doesnt push to the configured git remote branch
# --exact -> specify updated dependencies in updated packages exactly instead with ^
npx lerna version --no-git-tag-version --no-push -y --exact ${RELEASE_VERSION}
printf "\n%s\n" "Update @sakuli package versions in package.json"
npx lerna add @sakuli/commons@${RELEASE_VERSION} -E --no-bootstrap
npx lerna add @sakuli/core@${RELEASE_VERSION} -E --no-bootstrap
npx lerna add @sakuli/result-builder-commons@${RELEASE_VERSION} -E --scope=@sakuli/forwarder-checkmk \
  --scope=@sakuli/forwarder-gearman \
  --scope=@sakuli/forwarder-icinga2 \
  --scope=@sakuli/forwarder-prometheus \
  --scope=@sakuli/result-builder-checkmk \
  --scope=@sakuli/result-builder-omd \
  --no-bootstrap
npx lerna add @sakuli/result-builder-checkmk@${RELEASE_VERSION} -E --scope=@sakuli/forwarder-checkmk --no-bootstrap
npx lerna add @sakuli/result-builder-omd@${RELEASE_VERSION} -E --scope=@sakuli/forwarder-gearman --no-bootstrap


printf "\n%s\n" "Run npm run rebuild"
npm run rebuild

printf "\n%s\n" "Run npm run audit"
npm run audit

printf "\n%s\n" "Please update the changelog before continuing. Would you like to commit and push these changes? (y/n)"
read CHANGE_CONFIRMATION
[[ ! "${CHANGE_CONFIRMATION}" == "y" ]] && exit 1

printf "\n%s\n" "Committing changes"
git commit -am "Release ${RELEASE_VERSION}"
printf "\n%s\n" "Pushing changes"
git push --set-upstream origin release/${RELEASE_VERSION}

printf "\n\n%s\n" "Verify successful builds on Travis before continuing."
echo "To release the sakuli-enterprise-forwarder use following commands:"
printf "%s\n" "git tag -a v${RELEASE_VERSION} -m 'Release ${RELEASE_VERSION}'"
echo "git push --tags"

#go back to the directory you started in
popd