import {MailerService} from "./core/services/mailer.service";
import {ServiceNameEnums as ServiceName} from "./core/enums/serviceName.enums";
import {SmtpTransportConfigInterface as SmtpTransportConfig} from "./core/interfaces/smtpTransportConfig.interface";
import {GmailTransportConfigInterface as GmailTransportConfig} from "./core/interfaces/gmailTransportConfig.interface";
import {MailgunTransportConfigInterface as MailgunTransportConfig} from "./core/interfaces/mailgunTransportConfig.interface";
import {MailtrapTransportConfigInterface as MailtrapTransportConfig} from "./core/interfaces/mailtrapTransportConfig.interface";
import {ResendTransportConfigInterface as ResendTransportConfig} from "./core/interfaces/resendTransportConfig.interface";
import {SparkPostTransportConfigInterface as SparkPostTransportConfig} from "./core/interfaces/sparkPostTransportConfig.interface";


export {
    MailerService,
    ServiceName,
    SmtpTransportConfig,
    GmailTransportConfig,
    MailgunTransportConfig,
    MailtrapTransportConfig,
    ResendTransportConfig,
    SparkPostTransportConfig
}
