---
title: 'Through the web releases and prerelease management'
---

A number of popular open-source projects I've come across use fully automated releases to make both the project's developers lives easier when deploying versions, as well as to simplify the consumer's lives. While this might seem like a large task for smaller teams, a 'one-click' solution can be ready to go in less than an hour.

### Tools involved

- [release-it](https://github.com/release-it/release-it)
- [GitHub Actions](https://github.com/features/actions)

### Getting started

Get your project setup with GitHub Actions. GitHub published a quickstart guide if you aren't sure on how to do this: https://docs.github.com/en/actions/quickstart. We will be using the [`workflow_dispatch`](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow) event to allow you and your team to trigger a 'release' workflow. We'll also be using [release-it](https://github.com/release-it/release-it) to perform out version updating and any actions that need to be performed along with that (such as tagging or pushing to npm). For more info, see the release-it docs.

Copy and paste the following workflow code:

```yml
name: Release
on:
  workflow_dispatch:
    inputs:
      bump_type:
        type: choice
        required: true
        description: What kind of version bump?
        options:
          - patch
          - minor
          - major
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Git setup
        run: |
          git config user.name "${GITHUB_ACTOR}"
          git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
      - name: Setup node
        uses: actions/setup-node@v3
      - name: npm install
        run: npm ci
      - name: Release
        run: npm run release -- ${{ github.event.inputs.bump_type }} --ci
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

When you view the `Release` workflow, this will allow you to perform a release by pressing 'Run workflow'.  A dropdown will appear asking you if you want a patch, minor or major release. The chosen option is passed through to `release-it` as the type of version bump to perform. The workflow also sets up the git config so that the commit is performed by whoever triggered the workflow run (using your GitHub email address).

Note that unfortunately, because this performs a git commit straight to the chosen branch, this workflow doesn't work with GitHub's [branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule). If you know of a way to get around this limitation, do [reach out to me](mailto:me@jeffersonbledsoe.com)!

### Automatic pre-releases

Thanks to [GitHub's great documentation on Pull Requests in GitHub Actions](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#running-your-workflow-when-a-pull-request-merges) and a [recent update to release-it](https://github.com/release-it/release-it/issues/907), we're able to create a 'pre-release' version on every successfull Pull Request merge. This is the workflow file:

```yml
name: Automatic pre-release
on:
  pull_request:
    types:
      - closed
jobs:
  pre-release:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Git setup
        run: |
          git config user.name "${GITHUB_ACTOR}"
          git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
      - name: Setup node
        uses: actions/setup-node@v3
        run: npm ci
      - name: Release
        run: npx release-it --preRelease=next --ci --git.commitMessage="" --git.commitArgs="--amend -C HEAD"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

The main changes here are the `release-it` command and the workflow trigger. In order to run this on every merged PR, we need to run the workflow on every closed PR and check if the event was a successful merge. The we call `release-it` with `preRelease-next` to generate a version number that looks like this: `1.1.0-next.1`. For more information on this argument, see the [preRelease option documentation for release-it](https://github.com/release-it/release-it/blob/master/docs/pre-releases.md). Additionally, to prevent generating a messy git commit graph and release notes, we make the commit an amend so that it appears as though the version bump was done as part of the PR merge/ squash commit. While this does not now represent exactly what was done in the PR, I believe this leads to a more readable history and so is worth the trade-off. Feel free to remove the following from the release-it step if you don't want this behaviour: `--git.commitArgs="--amend -C HEAD"`.

### Related topics

[Keep A Changelog](https://keepachangelog.com) is a fantastic website for all software developers. It's straight forward and to-the-point principles make having a readable changelog easier to write. Apply these ideas to your projects and your future self will be thanking you!
