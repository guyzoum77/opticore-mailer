import {EmailTemplateInterface} from "../core/interfaces/base/emailTemplate.interface";

export class EmailTemplate {
    public static view(emailView: EmailTemplateInterface): string {
        return `<div style="background-color: #F5F7FA; padding: 50px; min-width: 360px; font-family: Nunito, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 60px 75px 50px; background-color: white;">
            <img style="display: block; max-width: 200px; margin-top: 2px; height: auto;" src="" alt="GestCoiff V2" />
            <h1 style="padding: 50px 0 15px; font-family: Nunito, sans-serif; font-size: 36px; color: #343B4E;">
                ${emailView.mailTitle}
            </h1>
            <p style="padding-bottom: 15px; margin-top: 45px; font-family: Arial, sans-serif; font-size: 18px; color: #52556B; line-height: 1.5">
                ${emailView.greatingWord} ${emailView.user.username}
            </p>
            <p style="padding-bottom: 15px; font-family: Arial, sans-serif; font-size: 18px; color: #52556B; line-height: 1.5">
                ${emailView.mailContent}
            </p>
  
            <p style="padding: 25px 0 40px;">
                <a href="${emailView.protocol}://${emailView.urlAction}" style="padding: 20px 25px; background-color: #${emailView.buttonBackgroundColor}; color: #${emailView.buttonColor}; text-decoration: none; 
                text-transform: uppercase; font-family: Arial, sans-serif; font-size: 20px;" target="_blank">
                   ${emailView.buttonActionTitle}
                </a>
            </p>
        </div>
        <p style="padding: 50px 0 0; text-align: center; font-family: Arial, sans-serif; font-size: 12px; color: #838A9F">
            ${emailView.footerAllRightReservedText}&copy; ${emailView.allRightReservedYears} ${emailView.appName}</p>
        <p style="padding: 0; text-align: center; font-family: Arial, sans-serif; font-size: 12px;">
            <a href="#" style="color: #52556B; text-decoration: none;">${emailView.conditionUsingText}</a>
          &nbsp;|&nbsp;
            <a href="" style="color: #52556B; text-decoration: none;">${emailView.politicsText}</a>
        </p>
    </div>`
    }
}