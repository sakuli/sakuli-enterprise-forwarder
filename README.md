# Sakuli Enterprise Forwarders

## Testing Forwarders Locally

In order to test a forwarder in a local development setup, several steps are required:

1. On package root level in sakuli-enterprise-forwarder, run `npm link`
2. To make forwarders usable in a test setup, run e.g. `npm link @sakuli/forwarder-checkmk` inside the sakuli-cli package
3. Configure your forwarder in the integration-test package
4. Run a test, verify the output

### Why?

The actual `require()` for a forwarder package is carried out in `@sakuli/cli`, so running `npm link ...` inside the integration-test package will not have the desired effect

### Troubleshooting

- Clear local setup:

`npm link` will symlink packages to your global node_modules folder.
For a nvm setup, this will be at `~/.nvm/versions/$YOUR_NODE_VERSION/lib/node_modules`
To avoid possible errors due to existing linked packages, remove any existing link to packages in `@sakuli`
