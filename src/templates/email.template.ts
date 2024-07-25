export class EmailTemplate {
    public static view(user: any, mailTitle: string, mailContent: string, urlAction: string, buttonActionTitle: string,
                       buttonBackgroundColor: any, buttonColor: any, greatingWord: string, footerAllRightReservedText: string,
                       allRightReservedYears: number, appName: string, conditionUsingText: string, politicsText: string, protocol: string): string {
        return `<div style="background-color: #F5F7FA; padding: 50px; min-width: 360px; font-family: Nunito, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 60px 75px 50px; background-color: white;">
            <img style="display: block; max-width: 200px; margin-top: 2px; height: auto;" src="" alt="GestCoiff V2" />
            <h1 style="padding: 50px 0 15px; font-family: Nunito, sans-serif; font-size: 36px; color: #343B4E;">
                ${mailTitle}
            </h1>
            <p style="padding-bottom: 15px; margin-top: 45px; font-family: Arial, sans-serif; font-size: 18px; color: #52556B; line-height: 1.5">
                ${greatingWord} ${user.username}
            </p>
            <p style="padding-bottom: 15px; font-family: Arial, sans-serif; font-size: 18px; color: #52556B; line-height: 1.5">
                ${mailContent}
            </p>
  
            <p style="padding: 25px 0 40px;">
                <a href="${protocol}://${urlAction}" style="padding: 20px 25px; background-color: #${buttonBackgroundColor}; color: #${buttonColor}; text-decoration: none; 
                text-transform: uppercase; font-family: Arial, sans-serif; font-size: 20px;" target="_blank">
                   ${buttonActionTitle}
                </a>
            </p>
        </div>
        <p style="padding: 50px 0 0; text-align: center; font-family: Arial, sans-serif; font-size: 12px; color: #838A9F">
            ${footerAllRightReservedText}&copy; ${allRightReservedYears} ${appName}</p>
        <p style="padding: 0; text-align: center; font-family: Arial, sans-serif; font-size: 12px;">
            <a href="#" style="color: #52556B; text-decoration: none;">${conditionUsingText}</a>
          &nbsp;|&nbsp;
            <a href="" style="color: #52556B; text-decoration: none;">${politicsText}</a>
        </p>
    </div>`
    }
}