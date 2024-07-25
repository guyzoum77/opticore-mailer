import {BaseTransportConfigInterface} from "./base/baseTransportConfig.interface";
import {ServiceNameEnums as serviceName} from "../enums/serviceName.enums";

export interface MailgunTransportConfigInterface extends BaseTransportConfigInterface {
    service: serviceName.mailgun;
    host: string;
    key: string;
    domain: string;
    debug: boolean;
    logger: boolean;
    oDkim?: boolean;
    oTags?: string[];
    oDeliverytime?: Date;
    oTestMode?: boolean;
    oTracking?: boolean;
    oTrackingClick?: boolean;
    oTrackingOpens?: boolean;
    headers?: { [key: string]: string };
    variables?: { [key: string]: string };
}