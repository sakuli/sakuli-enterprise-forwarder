import { SakuliPresetProvider } from "@sakuli/core";
import { PrometheusForwarder } from "./prometheus-forwarder.class";

const prometheusPreset: SakuliPresetProvider = registry => {
    registry.registerForwarder(new PrometheusForwarder())
};

export default prometheusPreset;