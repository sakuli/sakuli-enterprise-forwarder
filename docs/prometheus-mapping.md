# Prometheus mapping
Mapping Sakuli metrics to prometheus representation.

General notation for gauges: `<metric name>{<label name>=<label value>, ...} <measurement>`
The notation for gauges will be handled by the chosen prometheus client.

## Mapping
| Metric                   | Dimensions/Labels | Gauge                                                                       |
|--------------------------|-------------------|-----------------------------------------------------------------------------|
| suite duration           | cases             | `suite_<suite id>_duration_seconds{case=<case index>_<case id>}`            |  
| case duration            | steps             | `case_<case index>_<case id>_duration_seconds{step=<step index>_<step id>}` |
| suite warning threshold  |                   | `suite_<suite id>_warning_thresholds_seconds`                               |
| case warning threshold   |                   | `case_<case index>_<case id>_warning_thresholds_seconds`                    |
| step warning threshold   |                   | `step_<step index>_<step id>_warning_thresholds_seconds`                    |
| suite critical threshold |                   | `suite_<suite id>_critical_thresholds_seconds`                              |
| case critical threshold  |                   | `case_<case index>_<case id>_critical_thresholds_seconds`                   |
| step critical threshold  |                   | `step_<step index>_<step id>_critical_thresholds_seconds`                   | 
| suite error              | cases             | `suite_<suite id>_error{case=<case index>_<case id>}`                       |
| case error               | steps             | `case_<case index>_<case id>_error{step=<step index>_<step id>}`            |
| step error               | actions           | `step_<step index>_<step id>_error{action=<action index>_<action id>}`      |     

### Gauges and measurements
| Gauge                                                                       |  measurement                                  |
|-----------------------------------------------------------------------------|-----------------------------------------------|
| `suite_<suite id>_duration_seconds{case=<case index>_<case id>}`            | case duration in seconds                      |
| `case_<case index>_<case id>_duration_seconds{step=<step index>_<step id>}` | step duration in seconds                      |
| `suite_<suite id>_warning_thresholds_seconds`                               | warning threshold in seconds                  |
| `case_<case index>_<case id>_warning_thresholds_seconds`                    | warning threshold in seconds                  |
| `step_<step index>_<step id>_warning_thresholds_seconds`                    | warning threshold in seconds                  |
| `suite_<suite id>_critical_thresholds_seconds`                              | critical threshold in seconds                 |
| `case_<case index>_<case id>_critical_thresholds_seconds`                   | critical threshold in seconds                 |
| `step_<step index>_<step id>_critical_thresholds_seconds`                   | critical threshold in seconds                 |
| `suite_<suite id>_error{case=<case index>_<case id>}`                       | case error state: 0 for OKAY; 1 for FAILURE   |  
| `case_<case index>_<case id>_error{step=<step index>_<step id>}`            | step error state: 0 for OKAY; 1 for FAILURE   |  
| `step_<step index>_<step id>_error{action=<action index>_<action id>}`      | action error state: 0 for OKAY; 1 for FAILURE | 



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