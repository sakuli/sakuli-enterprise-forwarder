import {SakuliPresetProvider} from '@sakuli/core'
import { CheckMkForwarder } from './checkmk-forwarder.class';


const gearmanForwarderPreset: SakuliPresetProvider = (registry) => {
    registry.registerForwarder(new CheckMkForwarder());
}

export default gearmanForwarderPreset;
