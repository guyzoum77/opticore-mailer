import {SendMailOptions} from "nodemailer";
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

export interface SingleMailOptionsInterface {
    from: string;
    to: string;
    subject: string;
    html: string;
    attachments?: SendMailOptions['attachments'];
    cc?: string | Address | Array<string | Address> | undefined;
    bcc?: string | Address | Array<string | Address> | undefined;
    replyTo?: string | Address | Array<string | Address> | undefined;
    inReplyTo?: string | Address | undefined;
    references?: string | string[] | undefined;
    text?: string | Buffer | Readable | AttachmentLike | undefined;
    watchHtml?: string | Buffer | Readable | AttachmentLike | undefined;
    amp?: string | Buffer | Readable | AmpAttachment | undefined;
    icalEvent?: string | Buffer | Readable | IcalAttachment | undefined;
    headers?: Headers | undefined;
    list?: ListHeaders | undefined;
    alternatives?: Attachment[];
    envelope?: Envelope | MimeNode.Envelope | undefined;
    messageId?: string | undefined;
    date?: Date | string | undefined;
    encoding?: string | undefined;
    raw?: string | Buffer | Readable | AttachmentLike | undefined;
    textEncoding?: TextEncoding | undefined;
    disableUrlAccess?: boolean | undefined;
    disableFileAccess?: boolean | undefined;
    dkim?: DKIM.Options | undefined;
    priority?: "high" | "normal" | "low" | undefined;
    attachDataUrls?: boolean | undefined;
}