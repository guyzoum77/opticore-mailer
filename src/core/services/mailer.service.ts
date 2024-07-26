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
import {messageUtils as msg} from "../../utils/messages/message.utils";
import {
    Address,
    AmpAttachment,
    Attachment,
    AttachmentLike, Envelope,
    Headers,
    IcalAttachment,
    ListHeaders, TextEncoding
} from "nodemailer/lib/mailer";
import {Readable} from "stream";
import MimeNode from "nodemailer/lib/mime-node";
import DKIM from "nodemailer/lib/dkim";
import XOAuth2 from "nodemailer/lib/xoauth2";
import StackTraceHandler from "../../utils/exceptions/handler/stackTrace.handler";
import {HttpStatusCodesConstant as status} from "../../utils/constants/httpStatusCode.constant";

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
        this.verifyTransporter();
        this.onToken((token: XOAuth2.Token) => {
            console.log('Token received:', token);
        });
        this.onError((error: Error): void => {
            LogMessageCore.error(msg.eventErrorOccur, msg.eventErrorOccurName, error.message, status.BAD_REQUEST);
            throw new Error(error.message);
        });
    }

    /**
     *
     * @param listener
     * @protected
     */
    protected onToken(listener: (token: XOAuth2.Token) => void): void {
        this.transporter.on('token', listener);
    }

    /**
     *
     * @param listener
     * @protected
     */
    protected onError(listener: (error: Error) => void): void {
        this.transporter.on('error', listener);
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
     * @private
     */
    private verifyTransporter(): void {
        this.transporter.verify((err: Error | null, success: true) => {
            if (err) {
                console.error('Error verifying transporter:', err);
                LogMessageCore.error(
                    msg.errorVerifying,
                    msg.errorVerifyingTransporter,
                    err.message,
                    status.NOT_ACCEPTABLE
                );
                throw new StackTraceHandler(msg.errorVerifying, msg.errorVerifyingTransporter, err.message, status.NOT_ACCEPTABLE, true);
            } else {
                LogMessageCore.success(msg.verifyTransportTitle, msg.verificationIsOk, msg.readyToSendMsg);
                return success.valueOf();
            }
        });
    }

    /**
     *
     * @param from
     * @param to
     * @param subject
     * @param html
     * @param cc
     * @param bcc
     * @param replyTo
     * @param inReplyTo
     * @param references
     * @param text
     * @param watchHtml
     * @param amp
     * @param icalEvent
     * @param headers
     * @param attachments
     * @param list
     * @param alternatives
     * @param envelope
     * @param messageId
     * @param date
     * @param encoding
     * @param raw
     * @param textEncoding
     * @param disableUrlAccess
     * @param disableFileAccess
     * @param dkim
     * @param priority
     * @param attachDataUrls
     */
    public async sendMail(from: string, to: string, subject: string, html: string,
                          attachments?: SendMailOptions['attachments'],
                          cc?: string | Address | Array<string | Address> | undefined,
                          bcc?: string | Address | Array<string | Address> | undefined,
                          replyTo?: string | Address | Array<string | Address> | undefined,
                          inReplyTo?: string | Address | undefined,
                          references?: string | string[] | undefined,
                          text?: string | Buffer | Readable | AttachmentLike | undefined,
                          watchHtml?: string | Buffer | Readable | AttachmentLike | undefined,
                          amp?: string | Buffer | Readable | AmpAttachment | undefined,
                          icalEvent?: string | Buffer | Readable | IcalAttachment | undefined,
                          headers?: Headers | undefined,
                          list?: ListHeaders | undefined,
                          alternatives?: Attachment[],
                          envelope?: Envelope | MimeNode.Envelope | undefined,
                          messageId?: string | undefined,
                          date?: Date | string | undefined,
                          encoding?: string | undefined,
                          raw?: string | Buffer | Readable | AttachmentLike | undefined,
                          textEncoding?: TextEncoding | undefined,
                          disableUrlAccess?: boolean | undefined,
                          disableFileAccess?: boolean | undefined,
                          dkim?: DKIM.Options | undefined,
                          priority?: "high" | "normal" | "low" | undefined,
                          attachDataUrls?: boolean | undefined): Promise<string> {
        try {
            await this.transporter.sendMail({
                from: from,
                to,
                subject,
                html,
                attachments,
                cc,
                bcc,
                replyTo,
                inReplyTo,
                references,
                text,
                watchHtml,
                amp,
                icalEvent,
                headers,
                list,
                alternatives,
                envelope,
                messageId,
                date,
                encoding,
                raw,
                textEncoding,
                disableUrlAccess,
                disableFileAccess,
                dkim,
                priority,
                attachDataUrls
            });
            LogMessageCore.success(msg.emailSentTitle, msg.emailActionTitle, msg.sentEmailContent);
            return msg.sentEmailContent;
        } catch (error: any) {
            LogMessageCore.error(msg.errorSentEmail, msg.errorSentName, error.message, status.NOT_ACCEPTABLE);
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
     * @param cc
     * @param bcc
     * @param replyTo
     * @param inReplyTo
     * @param references
     * @param text
     * @param watchHtml
     * @param amp
     * @param icalEvent
     * @param headers
     * @param list
     * @param alternatives
     * @param envelope
     * @param messageId
     * @param date
     * @param encoding
     * @param raw
     * @param textEncoding
     * @param disableUrlAccess
     * @param disableFileAccess
     * @param dkim
     * @param priority
     * @param attachDataUrls
     */
    public async sendMailWithEmailTemplate(from: string, to: string, subject: string, user: any, mailTitle: string,
                                           mailContent: string, urlAction: string, buttonActionTitle: string,
                                           buttonBackgroundColor: any, buttonColor: any, greatingWord: string,
                                           footerAllRightReservedText: string, allRightReservedYears: number, 
                                           appName: string, conditionUsingText: string, politicsText: string, protocol: string,
                                           attachments?: SendMailOptions['attachments'],
                                           cc?: string | Address | Array<string | Address> | undefined,
                                           bcc?: string | Address | Array<string | Address> | undefined,
                                           replyTo?: string | Address | Array<string | Address> | undefined,
                                           inReplyTo?: string | Address | undefined,
                                           references?: string | string[] | undefined,
                                           text?: string | Buffer | Readable | AttachmentLike | undefined,
                                           watchHtml?: string | Buffer | Readable | AttachmentLike | undefined,
                                           amp?: string | Buffer | Readable | AmpAttachment | undefined,
                                           icalEvent?: string | Buffer | Readable | IcalAttachment | undefined,
                                           headers?: Headers | undefined,
                                           list?: ListHeaders | undefined,
                                           alternatives?: Attachment[],
                                           envelope?: Envelope | MimeNode.Envelope | undefined,
                                           messageId?: string | undefined,
                                           date?: Date | string | undefined,
                                           encoding?: string | undefined,
                                           raw?: string | Buffer | Readable | AttachmentLike | undefined,
                                           textEncoding?: TextEncoding | undefined,
                                           disableUrlAccess?: boolean | undefined,
                                           disableFileAccess?: boolean | undefined,
                                           dkim?: DKIM.Options | undefined,
                                           priority?: "high" | "normal" | "low" | undefined,
                                           attachDataUrls?: boolean | undefined): Promise<any> {
        try {
            await this.transporter.sendMail({
                from: from,
                to,
                subject,
                html: EmailTemplate.view(user, mailTitle, mailContent, urlAction, buttonActionTitle,
                    buttonBackgroundColor, buttonColor, greatingWord, footerAllRightReservedText, allRightReservedYears, appName,
                    conditionUsingText, politicsText, protocol
                ),
                attachments,
                cc,
                bcc,
                replyTo,
                inReplyTo,
                references,
                text,
                watchHtml,
                amp,
                icalEvent,
                headers,
                list,
                alternatives,
                envelope,
                messageId,
                date,
                encoding,
                raw,
                textEncoding,
                disableUrlAccess,
                disableFileAccess,
                dkim,
                priority,
                attachDataUrls
            });
            LogMessageCore.success(msg.emailSentTitle, msg.emailActionTitle, msg.sentEmailContent);
            return msg.sentEmailContent;
        } catch (error: any) {
            LogMessageCore.error(msg.errorSentEmail, msg.errorSentName, error.message, constants.HTTP_STATUS_NOT_ACCEPTABLE);
            return error;
        }
    }


    /**
     *
     * @param recipients
     * @param subject
     * @param html
     * @param attachments
     * @param cc
     * @param bcc
     * @param replyTo
     * @param inReplyTo
     * @param references
     * @param text
     * @param watchHtml
     * @param amp
     * @param icalEvent
     * @param headers
     * @param list
     * @param alternatives
     * @param envelope
     * @param messageId
     * @param date
     * @param encoding
     * @param raw
     * @param textEncoding
     * @param disableUrlAccess
     * @param disableFileAccess
     * @param dkim
     * @param priority
     * @param attachDataUrls
     *
     */
    public async sendMailToGroup(recipients: string[],
                                 subject: string,
                                 html: string,
                                 attachments?: SendMailOptions['attachments'],
                                 cc?: string | Address | Array<string | Address> | undefined,
                                 bcc?: string | Address | Array<string | Address> | undefined,
                                 replyTo?: string | Address | Array<string | Address> | undefined,
                                 inReplyTo?: string | Address | undefined,
                                 references?: string | string[] | undefined,
                                 text?: string | Buffer | Readable | AttachmentLike | undefined,
                                 watchHtml?: string | Buffer | Readable | AttachmentLike | undefined,
                                 amp?: string | Buffer | Readable | AmpAttachment | undefined,
                                 icalEvent?: string | Buffer | Readable | IcalAttachment | undefined,
                                 headers?: Headers | undefined,
                                 list?: ListHeaders | undefined,
                                 alternatives?: Attachment[],
                                 envelope?: Envelope | MimeNode.Envelope | undefined,
                                 messageId?: string | undefined,
                                 date?: Date | string | undefined,
                                 encoding?: string | undefined,
                                 raw?: string | Buffer | Readable | AttachmentLike | undefined,
                                 textEncoding?: TextEncoding | undefined,
                                 disableUrlAccess?: boolean | undefined,
                                 disableFileAccess?: boolean | undefined,
                                 dkim?: DKIM.Options | undefined,
                                 priority?: "high" | "normal" | "low" | undefined,
                                 attachDataUrls?: boolean | undefined): Promise<string> {
        try {
            for (const to of recipients) {
                await this.transporter.sendMail({
                    to,
                    subject,
                    html,
                    attachments,
                    cc,
                    bcc,
                    replyTo,
                    inReplyTo,
                    references,
                    text,
                    watchHtml,
                    amp,
                    icalEvent,
                    headers,
                    list,
                    alternatives,
                    envelope,
                    messageId,
                    date,
                    encoding,
                    raw,
                    textEncoding,
                    disableUrlAccess,
                    disableFileAccess,
                    dkim,
                    priority,
                    attachDataUrls
                });
            }
            LogMessageCore.success(msg.emailSentTitle, msg.emailActionTitle, msg.sentEmailContent);
            return msg.sentEmailContent;
        } catch (err: any) {
            LogMessageCore.error(msg.errorSentEmail, msg.errorSentName, err.message, constants.HTTP_STATUS_NOT_ACCEPTABLE);
            return err;
        }
    }
}