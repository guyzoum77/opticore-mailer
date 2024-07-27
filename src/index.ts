import {MailerService} from "./core/services/mailer.service";
import {ServiceNameEnums as ServiceName} from "./core/enums/serviceName.enums";
import {SmtpTransportConfigInterface as SmtpTransportConfig} from "./core/interfaces/smtpTransportConfig.interface";
import {GmailTransportConfigInterface as GmailTransportConfig} from "./core/interfaces/gmailTransportConfig.interface";
import {MailgunTransportConfigInterface as MailgunTransportConfig} from "./core/interfaces/mailgunTransportConfig.interface";
import {MailtrapTransportConfigInterface as MailtrapTransportConfig} from "./core/interfaces/mailtrapTransportConfig.interface";
import {ResendTransportConfigInterface as ResendTransportConfig} from "./core/interfaces/resendTransportConfig.interface";
import {SparkPostTransportConfigInterface as SparkPostTransportConfig} from "./core/interfaces/sparkPostTransportConfig.interface";
import {SingleMailOptionsInterface as MailOptions} from "./core/interfaces/options/singleMailOptions.interface";
import {MailOptionsWithTemplateInterface as MailOptionsWithTemplate} from "./core/interfaces/options/mailOptionsWithTemplate.interface";
import {GroupMailOptionsInterface as GroupMailOptions} from "./core/interfaces/options/groupMailOptions.interface";
import {GroupMailWithTemplateOptionsInterface as GroupMailWithTemplateOptions} from "./core/interfaces/options/groupMailWithTemplateOptions.interface";
import {EmailTemplate} from "./templates/email.template";


export {
    MailerService,
    MailgunTransportConfig,
    MailtrapTransportConfig,
    MailOptions,
    MailOptionsWithTemplate,
    GmailTransportConfig,
    GroupMailOptions,
    GroupMailWithTemplateOptions,
    EmailTemplate,
    ResendTransportConfig,
    SparkPostTransportConfig,
    SmtpTransportConfig,
    ServiceName,
}
