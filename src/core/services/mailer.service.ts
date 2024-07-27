import nodemailer, {SendMailOptions, Transporter} from 'nodemailer';
import amqp, {Connection} from 'amqplib';
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
import XOAuth2 from "nodemailer/lib/xoauth2";
import StackTraceHandler from "../../utils/exceptions/handler/stackTrace.handler";
import {HttpStatusCodesConstant as status} from "../../utils/constants/httpStatusCode.constant";
import {SingleMailOptionsInterface as MailOptions} from "../interfaces/options/singleMailOptions.interface";
import {GroupMailOptionsInterface as GroupMailOptions} from "../interfaces/options/groupMailOptions.interface";
import {MailOptionsWithTemplateInterface} from "../interfaces/options/mailOptionsWithTemplate.interface";
import {GroupMailWithTemplateOptionsInterface} from "../interfaces/options/groupMailWithTemplateOptions.interface";
import JSONTransport from "nodemailer/lib/json-transport";


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
        this.onToken((token: XOAuth2.Token): void => {
            LogMessageCore.success(msg.XOAuth2TokenTitle, msg.token, msg.tokenTimeExpiresMsg + `${token.expires}`);
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
    
    protected jsonErrorResponse(err: any): string {
        return JSON.stringify({
            status: status.NOT_ACCEPTABLE,
            error: err,
            message: err.message
        });
    }

    /**
     *
     * @private
     */
    private verifyTransporter(): void {
        this.transporter.verify((err: Error | null, success: true) => {
            if (err) {
                LogMessageCore.error(msg.errorVerifying, msg.errorVerifyingTransporter, err.message, status.NOT_ACCEPTABLE);
                this.jsonErrorResponse(err);
            } else {
                LogMessageCore.success(msg.verifyTransportTitle, msg.verificationIsOk, msg.readyToSendMsg);
                return success.valueOf();
            }
        });
    }

    /**
     *
     * @param queueName
     * @private
     *
     * Function to create and return a RabbitMQ channel
     */
    private async createChannel(queueName: string): Promise<amqp.Channel | any> {
        try {
            const connection: Connection = await amqp.connect(`${process.env.AMQP_URL}`);
            const channel: amqp.Channel = await connection.createChannel();
            await channel.assertQueue(queueName, { durable: true });

            return channel;
        } catch (err: any) {
            LogMessageCore.error(msg.errorRabbitMQChannelTitle, msg.errorRabbitMQChannelName, err.message, status.BAD_REQUEST);
            this.jsonErrorResponse(err);
        }
    }


    /**
     *
     * @param msgAMQP
     * @param channel
     * @private
     *
     * Function to process messages from the queue
     *
     */
    private async processMessage(msgAMQP: amqp.ConsumeMessage | null, channel: amqp.Channel): Promise<Object | any> {
        if (msgAMQP !== null) {
            try {
                const dataToSend: MailOptions = JSON.parse(msgAMQP.content.toString());
                await this.transporter.sendMail({ ...dataToSend });
                channel.ack(msgAMQP);
                
                LogMessageCore.success(msg.messageInQueueTitle, msg.inQueueName, msgAMQP.content.toString());
                return JSON.stringify({ 
                    status: status.OK, 
                    message: `${msgAMQP.content.toString()} in queue.` 
                }) ;
            } catch (error: any) {
                LogMessageCore.error(msg.processMessageTitle, msg.processMessageName, error.message, status.NOT_ACCEPTABLE);
                channel.nack(msgAMQP); /** Requeue the message in case of failure */
            }
        } else {
            return JSON.stringify({ 
                status: status.NOT_ACCEPTABLE,
                message: msg.processError 
            });
        }
    }

    /**
     *
     * @param options
     */
    public async sendMail(options: MailOptions): Promise<string | any> {
        try {
            await this.transporter.sendMail({ ...options });
           
            LogMessageCore.success(msg.emailSentTitle, msg.emailActionTitle, msg.sentEmailContent);
            return JSON.stringify({
                status: status.OK, 
                message: msg.sentEmailContent 
            });
        } catch (error: any) {
            LogMessageCore.error(msg.errorSentEmail, msg.errorSentName, error.message, status.NOT_ACCEPTABLE);
            this.jsonErrorResponse(error);
        }
    }

    /**
     *
     * @param options
     */
    public async sendMailWithMailTemplate(options: MailOptionsWithTemplateInterface): Promise<any> {
        try {
            await this.transporter.sendMail({
                from: options.from,
                to: options.to,
                subject: options.subject,
                html: EmailTemplate.view(options.html),
                attachments: options.attachments,
                cc: options.cc,
                bcc: options.bcc,
                replyTo: options.replyTo,
                inReplyTo: options.inReplyTo,
                references: options.references,
                text: options.text,
                watchHtml: options.watchHtml,
                amp: options.amp,
                icalEvent: options.icalEvent,
                headers: options.headers,
                list: options.list,
                alternatives: options.alternatives,
                envelope: options.envelope,
                messageId: options.messageId,
                date: options.date,
                encoding: options.encoding,
                raw: options.raw,
                textEncoding: options.textEncoding,
                disableUrlAccess: options.disableUrlAccess,
                disableFileAccess: options.disableFileAccess,
                dkim: options.dkim,
                priority: options.priority,
                attachDataUrls: options.attachDataUrls
            }).then(
                (onComplete) => {
                    LogMessageCore.success(msg.emailSentTitle, msg.emailActionTitle, onComplete.message);
                    return msg.sentEmailContent;
                },
                (onRejected) => {
                    LogMessageCore.error(msg.errorSentEmail, msg.errorSentName, onRejected.message, status.NOT_ACCEPTABLE);
                    this.jsonErrorResponse(onRejected);
                },
            );
        } catch (error: any) {
            LogMessageCore.error(msg.errorSentEmail, msg.errorSentName, error.message, status.NOT_ACCEPTABLE);
            this.jsonErrorResponse(error);
        }
    }

    /**
     *
     * @param options
     */
    public async sendMailToGroup(options: GroupMailOptions): Promise<string | any> {
        try {
            for (const to of options.recipients) {
                await this.transporter.sendMail({ ...options });
            }

            LogMessageCore.success(msg.emailSentTitle, msg.emailActionTitle, msg.sentEmailContent);
            return JSON.stringify({ 
                status: status.OK, 
                message: msg.sentEmailContent 
            });
        } catch (err: any) {
            LogMessageCore.error(msg.errorSentEmail, msg.errorSentName, err.message, status.NOT_ACCEPTABLE);
            this.jsonErrorResponse(err);
        }
    }

    /**
     *
     * @param options
     */
    public async sendMailWithMailTemplateToGroup(options: GroupMailWithTemplateOptionsInterface): Promise<string | any> {
        try {
            for (const to of options.recipients) {
                await this.transporter.sendMail({
                    subject: options.subject,
                    html: EmailTemplate.view(options.html),
                    attachments: options.attachments,
                    cc: options.cc,
                    bcc: options.bcc,
                    replyTo: options.replyTo,
                    inReplyTo: options.inReplyTo,
                    references: options.references,
                    text: options.text,
                    watchHtml: options.watchHtml,
                    amp: options.amp,
                    icalEvent: options.icalEvent,
                    headers: options.headers,
                    list: options.list,
                    alternatives: options.alternatives,
                    envelope: options.envelope,
                    messageId: options.messageId,
                    date: options.date,
                    encoding: options.encoding,
                    raw: options.raw,
                    textEncoding: options.textEncoding,
                    disableUrlAccess: options.disableUrlAccess,
                    disableFileAccess: options.disableFileAccess,
                    dkim: options.dkim,
                    priority: options.priority,
                    attachDataUrls: options.attachDataUrls
                });
            }

            LogMessageCore.success(msg.emailSentTitle, msg.emailActionTitle, msg.sentEmailContent);
            return JSON.stringify({
                status: status.OK,
                message: msg.sentEmailContent
            });
        } catch (err: any) {
            LogMessageCore.error(msg.errorSentEmail, msg.errorSentName, err.message, status.NOT_ACCEPTABLE);
            this.jsonErrorResponse(err);
        }
    }

    /**
     *
     * @param queueName
     */
    public async startWorker(queueName: string): Promise<any> {
        try {
            const channel: amqp.Channel = await this.createChannel(queueName);
            LogMessageCore.success(
                msg.queueTitle,
                msg.queueActionTitle,
                `Waiting for messages in ${queueName}. To exit press CTRL+C`
            );

            await channel.consume(
                queueName,
                (msg: amqp.ConsumeMessage | null) => this.processMessage(msg, channel),
                { noAck: false }
            );
        } catch (error: any) {
            LogMessageCore.error(msg.queueErrorTitle, msg.queueStartWorkerErrorName, error.message, status.NOT_ACCEPTABLE);
            this.jsonErrorResponse(error);
        }
    }

    public async sendToQueue(queueName: string, mailOptions: MailOptions): Promise<string | any> {
        try {
            const connection: Connection = await amqp.connect(`${process.env.AMQP_URL}`);
            const channel: amqp.Channel  = await connection.createChannel();

            // Ensure the queue exists and is durable
            await channel.assertQueue(queueName, { durable: true });
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(mailOptions)), { persistent: true });

            LogMessageCore.success(msg.sendInQueueTitle, msg.sendInQueueActionTitle, msg.emailSentInQueue);
            setTimeout((): void => {
                channel.close();
                connection.close();
            }, 500);
            return JSON.stringify({
                status: status.OK,
                message: `Message in queue ${queueName} successfully`
            });
        } catch (err: any) {
            LogMessageCore.error(msg.sendToQueueErrorTitle, msg.sendToQueueErrorName, err.message, status.NOT_ACCEPTABLE);
            this.jsonErrorResponse(err);
        }
    }
}