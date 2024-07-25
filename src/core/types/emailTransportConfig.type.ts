import {MailgunTransportConfigInterface as MailgunTransportConfig} from "../interfaces/mailgunTransportConfig.interface";
import {SmtpTransportConfigInterface as SmtpTransportConfig} from "../interfaces/smtpTransportConfig.interface";
import {SparkPostTransportConfigInterface as SparkPostTransportConfig} from "../interfaces/sparkPostTransportConfig.interface";
import {ResendTransportConfigInterface as ResendTransportConfig} from "../interfaces/resendTransportConfig.interface";
import {MailtrapTransportConfigInterface as MailtrapTransportConfig} from "../interfaces/mailtrapTransportConfig.interface";
import {GmailTransportConfigInterface as GmailTransportConfig} from "../interfaces/gmailTransportConfig.interface";


/**
 * Define a union type for all possible transport configurations
 */
export type EmailTransportConfigType = MailgunTransportConfig |
                                       SmtpTransportConfig |
                                       SparkPostTransportConfig |
                                       ResendTransportConfig |
                                       MailtrapTransportConfig |
                                       GmailTransportConfig;
