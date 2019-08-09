# Icinga2 Forwarder E2E test

0. Enter directory `icinga2-server`
1. Run container: `./start-icinga.sh`
2. Append content of `commands.conf` and `hosts.conf` to the respective files in`$PWD/icinga2/conf.d/`
3. `icinga director` -> `activity log` -> `deploy XXX changes`
4. Copy user and password from `$PWD/icinga2/conf.d/api-users.conf`
5. Configure username and password in `testsuite.properties`
```
sakuli.forwarder.icinga2.api.username=root
sakuli.forwarder.icinga2.api.password=$magic_value_from_api-users.conf
```
5. For demo purposes: Add property `sakuli.forwarder.icinga2.service_description=ping4` to `testsuite.properties`