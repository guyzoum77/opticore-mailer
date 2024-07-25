import {BaseTransportConfigInterface} from "./base/baseTransportConfig.interface";
import {ServiceNameEnums as serviceName} from "../enums/serviceName.enums";

export interface SparkPostTransportConfigInterface extends BaseTransportConfigInterface {
    service: serviceName.sparkpost;
    host: string;
    key: string;
    startTime?: Date;
    openTracking?: boolean;
    clickTracking?: boolean;
    initialOpen?: boolean;
    transactional?: boolean;
    sandbox?: boolean;
    skipSuppression?: boolean;
    ipPool?: string;
}