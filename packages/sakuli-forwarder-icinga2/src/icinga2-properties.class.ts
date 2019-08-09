import {IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateIf} from "class-validator";
import {Maybe, Property, StringProperty} from "@sakuli/commons";

export class Icinga2Properties {

    @Property('sakuli.forwarder.icinga2.enabled')
    @IsBoolean()
    enabled: boolean = true;

    @Property('sakuli.forwarder.icinga2.api.host')
    @IsString()
    apiHost: Maybe<string>;

    @Property('sakuli.forwarder.icinga2.check_command')
    @IsString()
    checkCommand: string = 'check_sakuli';

    @Property('sakuli.forwarder.icinga2.check_source')
    @IsString()
    checkSource: string = 'check_sakuli';

    @Property('sakuli.forwarder.icinga2.api.port')
    @IsNumber()
    apiPort: number = 5665;

    @Property('sakuli.forwarder.icinga2.api.username')
    @ValidateIf(o => !!o.apiPassword)
    @IsNotEmpty()
    @IsString()
    apiUserName: string = '';

    @StringProperty('sakuli.forwarder.icinga2.api.password')
    @ValidateIf(o => !!o.apiUserName)
    @IsNotEmpty()
    @IsString()
    apiPassword: string = '';

    @StringProperty('sakuli.forwarder.icinga2.hostname')
    @IsString()
    @IsNotEmpty()
    hostName: string = '';

    @StringProperty('sakuli.forwarder.icinga2.service_description')
    @IsString()
    serviceDescription: string = '${testsuite.id}';

    @StringProperty('sakuli.forwarder.icinga2.allow_insecure_connection')
    @IsBoolean()
    allowInsecure: boolean = false;

    get hostBaseUrl(): string {
        return `https://${this.apiHost}:${this.apiPort}/v1`;
    }
}
