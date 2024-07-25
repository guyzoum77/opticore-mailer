import {BaseTransportConfigInterface} from "./base/baseTransportConfig.interface";
import {ServiceNameEnums as serviceName} from "../enums/serviceName.enums";

export interface ResendTransportConfigInterface extends BaseTransportConfigInterface {
    service: serviceName.resend;
    host: string;
    key: string;
    tags?: Array<{ name: string; value: string }>;
}