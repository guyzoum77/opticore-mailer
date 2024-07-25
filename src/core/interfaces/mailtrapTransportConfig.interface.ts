import {ServiceNameEnums as serviceName} from "../enums/serviceName.enums";

export type MailtrapTransportConfigInterface = {
    service: serviceName.mailtrap;
    host: string;
    port: number;
    auth: {
        user: string;
        pass: string;
    };
    pool: boolean;
    secure: boolean,
};