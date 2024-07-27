# OptiCore Mailer

Overview
------------
OptiCore Mailer will allow to choose and configure the email transport they want to use. We'll define specific configurations for a service and create a method to instantiate the appropriate transporter based on the provided configuration

Installation
------------
<blockquote>npm i opticore-mailer</blockquote>

<p align="center">

<a href="https://github.com/guyzoum77/opticore-mailer/actions?query=workflow%3ATests+branch%3Amaster"><img src="https://github.com/guyzoum77/opticore-mailer/workflows/Tests/badge.svg?branch=master" alt="GitHub Actions Build Status"></a></p>


Usage
-------------
<blockquote>import {MailerService, ServiceName} from "opticore-mailer";</blockquote>

API Reference
-------------
1. sendMail
   
   Purpose:
   Send mail and custom like you want a html
   
Signature:
```
sendMail(from: string, to: string, subject: string, html: string, attachments?: SendMailOptions['attachments']): Promise<void>
```

**Parameters:**
* `from` (string): It's a static address that will be used unless an explicit from address is set on the Email.
* `to` (string): It's a static address that will be used unless an explicit to address is set on the Email.
* `subject` (string, optional): This a subject of mail.
* `html` (string): This a view of mail and his content
* `attachments` [{ 
       filename?: string | false | undefined; 
       cid?: string | undefined; 
       encoding?: string | undefined; 
       contentType?: string | undefined;
       contentTransferEncoding?: "7bit" | "base64" | "quoted-printable" | false | undefined;
       contentDisposition?: "attachment" | "inline" | undefined;
       headers?: Headers | undefined;
       raw?: string | Buffer | Readable | AttachmentLike | undefined;
   }]: send mail to add any file in attachments from streams and buffers using. It's accepts a readable stream or the buffer.

**Returns:**

* `Promise`: string.
 
   possible return value.

   If `successful`, it returns a message that the mail was sent successfully.

   In case of `error` it will simply log the error and return it
Example
```
import { MailerService, ServiceName } from 'opticore-mailer';

(async() => {
    const credential = {user: "azerty", pass: "21dc!@dvf"};
    const mail = new MailerService({
        service: ServiceNameEnums.gmail,
        host: "define a host",
        port: 1234,
        pool: true,
        secure: true,
        auth: {
            user: credential.user,
            pass: credential.pass
        }
    });
    await mail.sendMail(
        {
            to: "define sender mail",
            from: "define receiver mail",
            subject: "define the subject",
            html: "content can be html or text, no matter what"
        }
    );
})();
```

2. sendMailWithEmailTemplate

   Purpose:
   Send mail with a template html
Signature:
```
sendMailWithEmailTemplate(from: string, to: string, subject: string, user: any, mailTitle: string,
                                           mailContent: string, urlAction: string, buttonActionTitle: string,
                                           buttonBackgroundColor: any, buttonColor: any, greatingWord: string,
                                           footerAllRightReservedText: string, allRightReservedYears: number, 
                                           appName: string, conditionUsingText: string, politicsText: string, protocol: string,
                                           attachments?: SendMailOptions['attachments']): Promise<any>
```
**Parameters:**
* `from` (string): It's a static address that will be used unless an explicit from address is set on the Email.
* `to` (string): It's a static address that will be used unless an explicit to address is set on the Email.
* `subject` (string, optional): This a subject of mail.
* `user` (any): User object
* `mailTitle` (string): An email title
* `mailContent` (string): An mail content
* `urlAction` (string): url action
* `buttonActionTitle` (string): A button title 
* `buttonBackgroundColor` (string): Button background color
* `buttonColor` (string): A button color
* `greatingWord` (string): The word of greeting
* `footerAllRightReservedText` (string): In this prt you may to include 
* `allRightReservedYears` (string): Include the mention all rights reserved as well as the year if you want.
* `appName` (string): The name of the application you want to appear on the email template
* `conditionUsingText` (string): Using condition text
* `politicsText` (string): politics text
* `attachments` [{
  filename?: string | false | undefined;
  cid?: string | undefined;
  encoding?: string | undefined;
  contentType?: string | undefined;
  contentTransferEncoding?: "7bit" | "base64" | "quoted-printable" | false | undefined;
  contentDisposition?: "attachment" | "inline" | undefined;
  headers?: Headers | undefined;
  raw?: string | Buffer | Readable | AttachmentLike | undefined;
  }]: send mail to add any file in attachments from streams and buffers using. It's accepts a readable stream or the buffer.
* 
**Returns:**

possible return value.

If `successful`, it returns a message that the mail was sent successfully.

In case of `error` it will simply log the error and return it

Example
```
import { MailerService, ServiceName } from 'opticore-mailer';

(async() => {
    const credential = {user: "azerty", pass: "21dc!@dvf"};
    const mail: MailerService = new MailerService({
        service: ServiceNameEnums.gmail,
        host: "",
        port: 1234,
        pool: true,
        secure: true,
        auth: {
            user: credential.user,
            pass: credential.pass
        }
    });

    let user = { username: "BesKane", email: "email@mail.com"}
    await mail.sendMailWithMailTemplate({
        to: "define sender mail",
        from: "define receiver mail",
        subject: "define the subject",
        html: "content can be html or text, no matter what"
        html: {
            appName: "application name", allRightReservedYears: 2024, user, mailTitle: "mail title", mailContent: "mail content", urlAction: "url action", buttonActionTitle: "action button title",
            buttonColor: "define string color", buttonBackgroundColor: "background color", conditionUsingText: "", footerAllRightReservedText: "All right reserved", politicsText: "politics",
            greatingWord: "welcome", protocol: "http"
        },
    });
})();
```


Security Issues
---------------
https://github.com/guyzoum77/opticore-mailer/issues

Contributing
------------
OptiCore mailer module is an Open Source, so if you would like to contribute, you're welcome. Clone repository and open pull request.

About
--------
OptiCore mailer module is led by **Guy-serge Kouacou** and supported by **Guy-serge Kouacou**

