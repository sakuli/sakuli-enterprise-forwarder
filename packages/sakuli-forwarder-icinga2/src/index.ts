import { SakuliPresetProvider } from "@sakuli/core";
import { Icinga2Forwarder } from "./icinga2-forwarder.class";

const icinga2ForwarderPreset: SakuliPresetProvider = (registry) => {
    registry.registerForwarder(new Icinga2Forwarder());
};

export default icinga2ForwarderPreset;
