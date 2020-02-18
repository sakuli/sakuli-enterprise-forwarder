import { SakuliPresetProvider } from "@sakuli/core";
import { PrometheusForwarder } from "./prometheus-forwarder.class";

const prometheusPreset: SakuliPresetProvider = registry => {
    registry.registerForwarder(new PrometheusForwarder())
};

export const pluginToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjYXRlZ29yeSI6MTQsImlhdCI6MTU4MjAxMzMxNCwiYXVkIjoiQHNha3VsaS9mb3J3YWRlci1wcm9tZXRoZXVzIiwiaXNzIjoic2FrdWxpLmlvIiwic3ViIjoic2FrdWxpX3BsdWdpbiJ9.2CkvYXmMxw6Y3orKY8lRYqSHjQXieF4BBxwvnnZvpyetSXLAKKOMFewG5bcoVQZgISZTHn7stAt9XQni_GbHeQ";
export default prometheusPreset;