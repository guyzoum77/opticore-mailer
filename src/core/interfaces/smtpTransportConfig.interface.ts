import {BaseTransportConfigInterface} from "./base/baseTransportConfig.interface";
import {ServiceNameEnums as serviceName} from "../enums/serviceName.enums";

export interface SmtpTransportConfigInterface extends BaseTransportConfigInterface {
    service: serviceName.smtp;
    host: string;
    port: number;
    secure: boolean;
    auth: {
        type: 'login';
        user: string;
        pass: string;
    };
    tls?: object;
    ignoreTLS?: boolean;
    requireTLS?: boolean;
    pool?: boolean;
    maxConnections?: number;
    maxMessages?: number;
}