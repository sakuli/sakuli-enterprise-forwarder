import { SakuliPresetProvider } from "@sakuli/core";
import { Icinga2Forwarder } from "./icinga2-forwarder.class";

const gearmanForwarderPreset: SakuliPresetProvider = (registry) => {
    registry.registerForwarder(new Icinga2Forwarder());
};

export const pluginToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjYXRlZ29yeSI6MTQsImlhdCI6MTU2NDc1MzcyNSwiYXVkIjoiQHNha3VsaS9mb3J3YXJkZXItaWNpbmdhMiIsImlzcyI6InNha3VsaS5pbyIsInN1YiI6InNha3VsaV9wbHVnaW4ifQ.nJXKDFo18bXoYGcp_OR24QTLpwYD3LPV0A4KoaHW5o39GsfxX_XzPB8cXw8pgdY_xWqq75gxDlNVgRQXCeTqww";
export default gearmanForwarderPreset;
