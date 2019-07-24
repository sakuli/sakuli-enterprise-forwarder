# Sakuli Icinga2 Forwarder

## Icinga Setup

The steps to enable the Icinga2 API are described in the REST API documentation.

Create a **check_command**, which will be executed only if Icinga did not receive a Sakuli result within a certain time. This ensures that you get a notification even if no passive check results arrive in Icinga at all:

```

vim /etc/icinga2/conf.d/commands.conf

object CheckCommand "check_dummy" {
   import "plugin-check-command"
   command = [
     PluginDir + "/check_dummy","$dummy_state$","$dummy_text$"
   ]
   vars.dummy_state = 0
   vars.dummy_text = "Check was successful."
}

object CheckCommand "check_sakuli" {
   import "check_dummy"
   vars.dummy_state = 3
   vars.dummy_text = "No passive Sakuli check result received."
}

```

Create a **host** object for the Sakuli client:

```

object Host "sakuliclient01" {
   import "generic-host"
   address = "<IP of host>"
}

```

Create the following service object for the first test case. freshness_threshold should be slightly higher than the interval Sakuli tests are planned (if you are using PNP4Nagios, see also RRD heartbeat )

```

object Service "sakuli_demo" {
  import "generic-service"
  host_name = "sakuliclient01"
  check_command = "check_sakuli"
  enable_active_checks = 0
  enable_passive_checks = 1
  enable_flapping = 0
  volatile = 1
  enable_perfdata = 1
}

```
