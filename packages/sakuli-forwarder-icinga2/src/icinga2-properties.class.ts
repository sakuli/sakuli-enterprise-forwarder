import { IsBoolean, IsFQDN, ValidateIf, IsNotEmpty, IsString, IsNumber } from "class-validator";
import { BooleanProperty, StringProperty, NumberProperty, Maybe } from "@sakuli/commons";

export class Icinga2Properties {

    @IsBoolean()
    @BooleanProperty('sakuli.forwarder.icinga2.enabled')
    enabled: boolean = true;

    @IsString()
    @StringProperty('sakuli.forwarder.api.host')
    apiHost: Maybe<string>;


    @IsNumber()
    @NumberProperty('sakuli.forwarder.icinga2.api.port')
    apiPort: number = 5665;

    @ValidateIf(o => !!o.apiPassword)
    @IsNotEmpty()
    @IsString()
    @StringProperty('sakuli.forwarder.icinga2.api.username')
    apiUserName: string = '';

    @ValidateIf(o => !!o.apiUserName)
    @IsNotEmpty()
    @IsString()
    @StringProperty('sakuli.forwarder.icinga2.api.password')
    apiPassword: string = '';

    @IsString()
    @IsNotEmpty()
    @StringProperty('sakuli.forwarder.icinga2.api.hostname')
    apiHostName: string = '';

    get hostBaseUrl(): string {
        return `${this.apiHost}:${this.apiPort}/v1`;
    }
}
