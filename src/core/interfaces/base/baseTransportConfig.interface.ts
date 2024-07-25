import {ServiceNameEnums as serviceName} from "../../enums/serviceName.enums";
import {TransportAuthConfigInterface as TransportAuthConfig} from "../transportAuthConfig.interface";

export interface BaseTransportConfigInterface {
    service: serviceName.mailgun | serviceName.smtp | serviceName.sparkpost | serviceName.resend | serviceName.gmail;
    auth: TransportAuthConfig;
}