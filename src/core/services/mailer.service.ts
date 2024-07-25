import nodemailer, {SendMailOptions, Transporter} from 'nodemailer';
import {constants} from "node:http2";

import {EmailTransportConfigType} from "../types/emailTransportConfig.type";
import {MailgunTransportConfigInterface as MailgunTransportConfig} from "../interfaces/mailgunTransportConfig.interface";
import {SmtpTransportConfigInterface as SMTPTransportConfig} from "../interfaces/smtpTransportConfig.interface";
import {SparkPostTransportConfigInterface as SparkPostTransportConfig} from "../interfaces/sparkPostTransportConfig.interface";
import {ResendTransportConfigInterface as ResendTransportConfig} from "../interfaces/resendTransportConfig.interface";
import {LogMessageCore} from "opticore-console-log-message";
import {MailtrapTransportConfigInterface as MailtrapTransportConfig} from "../interfaces/mailtrapTransportConfig.interface";
import {GmailTransportConfigInterface as GmailTransportConfig} from "../interfaces/gmailTransportConfig.interface";
import {EmailTemplate} from "../../templates/email.template";
import {messageUtils} from "../../utils/messages/message.utils";

/**
 * The EmailService class handles sending emails using various providers.
 *
 * The EmailService constructor initializes the transporter based on the provided configuration.
 *
 * The sendMail method adapts its behavior based on the configured service, supporting different email providers.
 *
 * The sendMailWithEmailTemplate method adapts its behavior based on the configured service,
 * supporting different email providers and template view already build and configurable.
 *
 */
export class MailerService {
    private transporter: Transporter;

    constructor(config: EmailTransportConfigType) {
        switch (config.service) {
            case "MAILGUN":
                this.transporter = this.createMailgunTransport(config as MailgunTransportConfig);
                break;
            case "SMTP":
                this.transporter = this.createSMTPTransport(config as SMTPTransportConfig);
                break;
            case "SPARKPOST":
                this.transporter = this.createSparkPostTransport(config as SparkPostTransportConfig);
                break;
            case "RESEND":
                this.transporter = this.createResendTransport(config as ResendTransportConfig);
                break;
            case "MAILTRAP":
                this.transporter = this.createMailtrapTransport(config as MailtrapTransportConfig);
                break;
            case "GMAIL":
                this.transporter = this.createGmailTransport(config as GmailTransportConfig);
                break;
            default:
                throw new Error(`Unsupported service: ${config.service}`);
        }
    }

    /**
     *
     * @param config
     * @private
     */
    private createMailgunTransport(config: MailgunTransportConfig): Transporter {
        return nodemailer.createTransport({
            ...config
        });
    }

    /**
     *
     * @param config
     * @private
     */
    private createSMTPTransport(config: SMTPTransportConfig): Transporter {
        return nodemailer.createTransport({
            ...config
        });
    }

    /**
     *
     * @param config
     * @private
     */
    private createSparkPostTransport(config: SparkPostTransportConfig): Transporter {
        return nodemailer.createTransport({
            ...config
        });
    }

    /**
     *
     * @param config
     * @private
     */
    private createResendTransport(config: ResendTransportConfig): Transporter {
        return nodemailer.createTransport({
            ...config
        });
    }

    /**
     *
     * @param config
     * @private
     */
    private createMailtrapTransport(config: MailtrapTransportConfig): Transporter {
        return nodemailer.createTransport({
            ...config
        });
    }

    /**
     *
     * @param config
     * @private
     */
    private createGmailTransport(config: GmailTransportConfig): Transporter {
        return nodemailer.createTransport({
            ...config
        });
    }

    /**
     *
     * @param from
     * @param to
     * @param subject
     * @param html
     * @param attachments
     */
    public async sendMail(from: string, to: string, subject: string, html: string, attachments?: SendMailOptions['attachments']): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: from,
                to,
                subject,
                html,
                attachments
            });
            LogMessageCore.success(messageUtils.emailSentTitle, messageUtils.emailActionTitle, messageUtils.sentEmailContent);
        } catch (error: any) {
            LogMessageCore.error(messageUtils.errorSentEmail, messageUtils.errorSentName, error.message, constants.HTTP_STATUS_NOT_ACCEPTABLE);
            return error;
        }
    }

    /**
     *
     * @param from
     * @param to
     * @param subject
     * @param user
     * @param mailTitle
     * @param mailContent
     * @param urlAction
     * @param buttonActionTitle
     * @param buttonBackgroundColor
     * @param buttonColor
     * @param greatingWord
     * @param footerAllRightReservedText
     * @param allRightReservedYears
     * @param appName
     * @param conditionUsingText
     * @param politicsText
     * @param protocol
     * @param attachments
     */
    public async sendMailWithEmailTemplate(from: string, to: string, subject: string, user: any, mailTitle: string,
                                           mailContent: string, urlAction: string, buttonActionTitle: string,
                                           buttonBackgroundColor: any, buttonColor: any, greatingWord: string,
                                           footerAllRightReservedText: string, allRightReservedYears: number, 
                                           appName: string, conditionUsingText: string, politicsText: string, protocol: string,
                                           attachments?: SendMailOptions['attachments']): Promise<any> {
        try {
            await this.transporter.sendMail({
                from: from,
                to,
                subject,
                html: EmailTemplate.view(user, mailTitle, mailContent, urlAction, buttonActionTitle,
                    buttonBackgroundColor, buttonColor, greatingWord, footerAllRightReservedText, allRightReservedYears, appName,
                    conditionUsingText, politicsText, protocol
                ),
                attachments
            });
            LogMessageCore.success(messageUtils.emailSentTitle, messageUtils.emailActionTitle, messageUtils.sentEmailContent);
        } catch (error: any) {
            LogMessageCore.error(messageUtils.errorSentEmail, messageUtils.errorSentName, error.message, constants.HTTP_STATUS_NOT_ACCEPTABLE);
            return error;
        }
    }
}