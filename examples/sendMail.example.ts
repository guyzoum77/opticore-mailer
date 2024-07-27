import {ServiceNameEnums} from "../src/core/enums/serviceName.enums";
import {MailerService} from "../src";

(async() => {
    const mail = new MailerService({
        service: ServiceNameEnums.gmail,
        host: "",
        port: 1234,
        pool: true,
        secure: true,
        auth: {
            user: "",
            pass: ""
        }
    });
    await mail.sendMail(
        {
            to: "",
            from: "",
            subject: "",
            html: ""
        }
    );
})();


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
        to: "",
        from: "",
        subject: "",
        html: {
            appName: "", allRightReservedYears: 2024, user, mailTitle: "", mailContent: "", urlAction: "", buttonActionTitle: "",
            buttonColor: "", buttonBackgroundColor: "", conditionUsingText: "", footerAllRightReservedText: "", politicsText: "",
            greatingWord: "", protocol: "http"
        },
    });
})();