import { SakuliPresetProvider } from "@sakuli/core";
import { GearmanForwarder } from "./gearman-forwarder.class";

const gearmanForwarderPreset: SakuliPresetProvider = (registry) => {
    registry.registerForwarder(new GearmanForwarder());
}

export default gearmanForwarderPreset;