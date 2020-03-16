# Sakuli Properties for prometheus pushgateway

| Property name                         | Property description                                                      | default | 
|---------------------------------------|---------------------------------------------------------------------------|---------|
| sakuli.forwarder.prometheus.enabled   | Whether the forwarder is enabled                                          | false   |
| sakuli.forwarder.prometheus.api.host  | Address of prometheus host                                                |         |
| sakuli.forwarder.prometheus.api.port  | Port of prometheus push gateway host                                      | 9091    |
| sakuli.forwarder.prometheus.api.job   | Value of the job label, configured in the prometheus scrape configuration |         |


Source:

[Pushgateway API](https://github.com/prometheus/pushgateway/blob/master/README.md#api)

[Pushgateway Security](https://prometheus.io/docs/operating/security/#pushgateway)
