import { SakuliPresetProvider } from "@sakuli/core";
import { PrometheusForwarder } from "./prometheus-forwarder.class";

const prometheusPreset: SakuliPresetProvider = registry => {
    registry.registerForwarder(new PrometheusForwarder())
};

export const pluginToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjYXRlZ29yeSI6MTQsImlhdCI6MTU4MjAzMjIzNywiYXVkIjoiQHNha3VsaS9mb3J3YXJkZXItcHJvbWV0aGV1cyIsImlzcyI6InNha3VsaS5pbyIsInN1YiI6InNha3VsaV9wbHVnaW4ifQ.2tnSv56i8JZEcx4rkeqvEB23pRUSA56SqmEj9b393Wp_i2l8ldCKiwyg7WyY1rxmi6i-cuIwouviYhLw9H7I0g";
export default prometheusPreset;