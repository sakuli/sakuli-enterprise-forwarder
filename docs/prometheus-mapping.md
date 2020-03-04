# Prometheus mapping
Mapping Sakuli metrics to prometheus representation.

General notation for gauges: `<metric name>{<label name>=<label value>, ...} <measurement>`
The notation for gauges will be handled by the chosen prometheus client.

## Mapping
| Metric                   | Dimensions/Labels | Gauge                                                                         |
|--------------------------|-------------------|-------------------------------------------------------------------------------|
| suite duration           | cases             | `_<suite id>_suite_duration_seconds{case=<case index>_<case id>}`             |  
| case duration            | steps             | `_<case index>_<case id>_case_duration_seconds{step=<step index>_<step id>}`  |
| suite warning threshold  |                   | `_<suite id>_suite_warning_thresholds_seconds`                                |
| case warning threshold   |                   | `_<case index>_<case id>_case_warning_thresholds_seconds`                     |
| step warning threshold   |                   | `_<step index>_<step id>_step_warning_thresholds_seconds`                     |
| suite critical threshold |                   | `_<suite id>_suite_critical_thresholds_seconds`                               |
| case critical threshold  |                   | `_<case index>_<case id>_case_critical_thresholds_seconds`                    |
| step critical threshold  |                   | `_<step index>_<step id>_step_critical_thresholds_seconds`                    | 
| suite error              | cases             | `_<suite id>_suite_error{case=<case index>_<case id>}`                        |
| case error               | steps             | `_<case index>_<case id>_case_error{step=<step index>_<step id>}`             |
| step error               | actions           | `_<step index>_<step id>_step_error{action=<action index>_<action id>}`       |     

### Gauges and measurements
| Gauge                                                                         |  measurement                                  |
|-------------------------------------------------------------------------------|-----------------------------------------------|
| `_<suite id>_suite_duration_seconds{case=<case index>_<case id>}`             | case duration                                 |
| `_<case index>_<case id>_case_duration_seconds{step=<step index>_<step id>}`  | step duration                                 |
| `_<suite id>_suite_warning_thresholds_seconds`                                | warning threshold in seconds                  |
| `_<case index>_<case id>_case_warning_thresholds_seconds`                     | warning threshold in seconds                  |
| `_<step index>_<step id>_step_warning_thresholds_seconds`                     | warning threshold in seconds                  |
| `_<suite id>_suite_critical_thresholds_seconds`                               | critical threshold in seconds                 |
| `_<case index>_<case id>_case_critical_thresholds_seconds`                    | critical threshold in seconds                 |
| `_<step index>_<step id>_step_critical_thresholds_seconds`                    | critical threshold in seconds                 |
| `_<suite id>_suite_error{case=<case index>_<case id>}`                        | case error state: 0 for OKAY; 1 for FAILURE   |  
| `_<case index>_<case id>_case_error{step=<step index>_<step id>}`             | step error state: 0 for OKAY; 1 for FAILURE   |  
| `_<step index>_<step id>_step_error{action=<action index>_<action id>}`       | action error state: 0 for OKAY; 1 for FAILURE | 



### Fields
| Field            | Description                                   | Format                                                 |
|------------------|-----------------------------------------------|--------------------------------------------------------|
| `<case index>`   | Index of the test case within the test suite  | Index as three digit representation with leading zeros |
| `<step index>`   | Index of the test step within the test case   | Index as three digit representation with leading zeros |
| `<action index>` | Index of the test action within the test step | Index as three digit representation with leading zeros |

## Sources
### Prometheus data model
- [Data model](https://prometheus.io/docs/concepts/data_model/)
- [Metric types](https://prometheus.io/docs/concepts/metric_types/)

#### Best practices
- [metrics naming conventions](https://prometheus.io/docs/practices/naming/)
- [Histograms vs Summaries](https://prometheus.io/docs/practices/histograms/)
- [When to use the push gateway](https://prometheus.io/docs/practices/pushing/)
- [Instrumentation of batch jobs](https://prometheus.io/docs/practices/instrumentation/#batch-jobs)

#### Instrumenting
- [Writing exporters](https://prometheus.io/docs/instrumenting/writing_exporters/)
- [Exposition formats](https://prometheus.io/docs/instrumenting/exposition_formats/)
  
### Prometheus tech
- [Node.js client](https://github.com/siimon/prom-client)
- [Push Gateway](https://prometheus.io/docs/instrumenting/pushing/)