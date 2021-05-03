import Mail from "nodemailer/lib/mailer";
import { transporter } from "../config/nodemailer/transporter";

export default class Mailer {
  public static async sendEmail(data: Mail.Options) {
    data.from = "douglas.trofino@outlook.com";

    return transporter.sendMail(data);
  }
}
