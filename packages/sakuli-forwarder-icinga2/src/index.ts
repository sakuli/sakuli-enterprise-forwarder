import { SakuliPresetProvider } from "../node_modules/@sakuli/core/dist";
import { Icinga2Forwarder } from "./icinga2-forwarder.class";

const gearmanForwarderPreset: SakuliPresetProvider = (registry) => {
    registry.registerForwarder(new Icinga2Forwarder());
}

export default gearmanForwarderPreset;
