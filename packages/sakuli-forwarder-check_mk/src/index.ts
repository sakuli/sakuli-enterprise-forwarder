import {SakuliPresetProvider} from '@sakuli/core'
import {CheckMkForwarder} from './checkmk-forwarder.class';


const checkMkForwarderPreset: SakuliPresetProvider = (registry) => {
    registry.registerForwarder(new CheckMkForwarder());
};

export default checkMkForwarderPreset;
