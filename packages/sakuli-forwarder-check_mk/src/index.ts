import {SakuliPresetProvider} from '@sakuli/core'
import {CheckMkForwarder} from './checkmk-forwarder.class';


const gearmanForwarderPreset: SakuliPresetProvider = (registry) => {
    registry.registerForwarder(new CheckMkForwarder());
};

export const pluginToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjYXRlZ29yeSI6MTQsImlhdCI6MTU2NDc1MzY3MywiYXVkIjoiQHNha3VsaS9mb3J3YXJkZXItY2hlY2ttayIsImlzcyI6InNha3VsaS5pbyIsInN1YiI6InNha3VsaV9wbHVnaW4ifQ.raaRXYUd1-9AGe9UuINzaqNGkWPB0jg2P-nD5S751arpUS5lnbhbGOOUodXzv5homINfVnvmk-iKtttALQI0lA";
export default gearmanForwarderPreset;
