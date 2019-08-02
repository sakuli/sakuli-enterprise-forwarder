import { SakuliPresetProvider } from "@sakuli/core";
import { GearmanForwarder } from "./gearman-forwarder.class";

const gearmanForwarderPreset: SakuliPresetProvider = (registry) => {
    registry.registerForwarder(new GearmanForwarder());
};

export const pluginToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjYXRlZ29yeSI6MTQsImlhdCI6MTU2NDc1MzUxOSwiYXVkIjoiQHNha3VsaS9mb3J3YXJkZXItZ2Vhcm1hbiIsImlzcyI6InNha3VsaS5pbyIsInN1YiI6InNha3VsaV9wbHVnaW4ifQ.9nojdOJtqE3GGdWPTynY74qL8Ub5Ar0pfZO77PbUn9xOYp_fBt3tfx6sHZJNKfBfUo6N3UExJq_HTPY9RB8hJQ";
export default gearmanForwarderPreset;