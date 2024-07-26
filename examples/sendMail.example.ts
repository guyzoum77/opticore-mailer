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
        "",
        "",
        "",
        ""
    );
})();


(async() => {
    let user = { username: "BesKane", email: "email@mail.com"}
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
    await mail.sendMailWithEmailTemplate(
        "opticore@mail.com",
        "toto@gmail.com",
        "test",
         user,
        "test QA",
        "lorem ipsum",
        "test/again",
        "Send",
        "ffffff",
        "ff5733",
        "Welcom",
        "Al right reserved",
        2024,
        "NoCors",
        "",
        "",
        "https"
    );
})();