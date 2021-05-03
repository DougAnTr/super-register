import Mail from "nodemailer/lib/mailer";
import { transporter } from "../config/nodemailer/transporter";

export default class Mailer {
  transporter: Mail;

  constructor() {
    this.transporter = transporter;
  }

  async sendEmail(data: Mail.Options) {
    return this.transporter.sendMail(data);
  }
}
