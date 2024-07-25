import {ServiceNameEnums as serviceName} from "../enums/serviceName.enums";

export type GmailTransportConfigInterface = {
    service: serviceName.gmail;
    host: string;
    port: number;
    auth: {
        user: string;
        pass: string;
    };
    pool: boolean;
    secure: boolean,
};