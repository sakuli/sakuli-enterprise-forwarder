import { BooleanProperty, Maybe, NumberProperty, StringProperty } from "@sakuli/commons";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PrometheusProperties {

    @BooleanProperty("sakuli.forwarder.prometheus.enabled")
    @IsBoolean()
    enabled: Maybe<boolean> = false;

    @StringProperty("sakuli.forwarder.prometheus.api.host")
    @IsString()
    @IsNotEmpty()
    apiHost: string = "";

    @NumberProperty("sakuli.forwarder.prometheus.api.port")
    @IsNumber()
    apiPort: number = 9091;

    @StringProperty("sakuli.forwarder.prometheus.api.job")
    @IsString()
    @IsNotEmpty()
    apiJob: string = "";
}