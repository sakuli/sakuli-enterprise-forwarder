import {IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateIf} from "class-validator";
import {BooleanProperty, Maybe, NumberProperty, StringProperty} from "@sakuli/commons";

export class Icinga2Properties {

    @BooleanProperty('sakuli.forwarder.icinga2.enabled')
    @IsBoolean()
    enabled: Maybe<boolean> = false;

    @StringProperty('sakuli.forwarder.icinga2.api.host')
    @IsString()
    apiHost: Maybe<string>;

    @StringProperty('sakuli.forwarder.icinga2.check_command')
    @IsString()
    checkCommand: string = 'check_sakuli';

    @StringProperty('sakuli.forwarder.icinga2.check_source')
    @IsString()
    checkSource: string = 'check_sakuli';

    @NumberProperty('sakuli.forwarder.icinga2.api.port')
    @IsNumber()
    apiPort: number = 5665;

    @StringProperty('sakuli.forwarder.icinga2.api.username')
    @ValidateIf(o => !!o.apiPassword)
    @IsString()
    @IsNotEmpty()
    apiUserName: string = '';

    @StringProperty('sakuli.forwarder.icinga2.api.password')
    @ValidateIf(o => !!o.apiUserName)
    @IsString()
    @IsNotEmpty()
    apiPassword: string = '';

    @StringProperty('sakuli.forwarder.icinga2.hostname')
    @IsString()
    @IsNotEmpty()
    hostName: string = '';

    @StringProperty('sakuli.forwarder.icinga2.service_description')
    @IsString()
    serviceDescription: string = '';

    @BooleanProperty('sakuli.forwarder.icinga2.allow_insecure_connection')
    @IsBoolean()
    allowInsecure: boolean = false;

    get hostBaseUrl(): string {
        return `https://${this.apiHost}:${this.apiPort}/v1`;
    }
}
