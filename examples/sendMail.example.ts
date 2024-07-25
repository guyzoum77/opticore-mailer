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
