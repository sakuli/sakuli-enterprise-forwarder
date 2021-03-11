# Sakuli forwarder change log

All notable changes to this project will be documented in this file.

## v2.5.0

- Bugfix: Icinga Mapping is not correct [(#81)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/81)
- Enhancement: change log level of "* disabled by properties" to debug [(#77)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/77)
- Bugfix: Close gearman connection properly [(#73)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/73)
- Maintenance: Update dependencies [(#83)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/83)
- Enhancement: forwarder-gearman: Improve Gearman queue log output [(#26)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/26)
- Maintenance: Add node matrix builds again [(#93)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/93)
- Maintenance: Refactor logging constructs to elvis operator [(#194)](https://github.com/sakuli/sakuli/issues/194)

## v2.4.0
- Enhancement: Improve logging [(#338)](https://github.com/sakuli/sakuli/issues/338)
- Enhancement: Autodiscovery for presetprovider [(#276)](https://github.com/sakuli/sakuli/issues/276)
- Enhancement: Prometheus: Validate config only if necessary [(#55)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/55)
- Enhancement: Icinga2: Validate config only if necessary [(#54)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/54)
- Enhancement: CheckMK: Validate config only if necessary [(#53)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/53)
- Enhancement: Gearman: Validate config only if necessary [(#52)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/52)
- Bugfix: Prometheus: Error states are not updated [(#45)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/45)
- Enhancement: Typescript Update [(#42)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/42)
- Enhancement: Remove superfluous okay in CheckMK spool files [(#41)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/41)

## v2.3.0
- Enhancement: Implement Prometheus forwarder [(#18)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/18)
- Bugfix: Fix spoolfile format [(#23)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/23)
- Enhancement: Add website URL to spool files [(#30)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/30)
- Bugfix: Fix CheckMK forwarder URL property [(#43)](https://github.com/sakuli/sakuli-docker/issues/43)

## v2.2.0
- Enhancement: Enable configuration of hostname for piggyback results in checkmk forwarder [(#5)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/5)
- Enhancement: Support CheckMK Piggybacks [(#10)](https://github.com/sakuli/sakuli-enterprise-forwarder/issues/10)

## v2.1.1
- Initial release
