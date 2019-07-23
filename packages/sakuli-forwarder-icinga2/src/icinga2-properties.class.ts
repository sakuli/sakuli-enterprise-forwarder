import { IsBoolean, IsFQDN, ValidateIf, IsNotEmpty, IsString, IsNumber } from "class-validator";
import { BooleanProperty, StringProperty, NumberProperty, Maybe } from "@sakuli/commons";

export class Icinga2Properties {

    @BooleanProperty('sakuli.forwarder.icinga2.enabled')
    @IsBoolean()
    enabled: boolean = true;

    @StringProperty('sakuli.forwarder.icinga2.api.host')
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

    get hostBaseUrl(): string {
        return `https://${this.apiHost}:${this.apiPort}/v1`;
    }
}
