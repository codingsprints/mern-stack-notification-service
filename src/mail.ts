import config from "config";
import nodemailer, { Transporter } from "nodemailer";
import { Message, NotificationTransport } from "./types/notification-types";
import { configENV } from "./config/config";

export class MailTransport implements NotificationTransport {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: configENV.mailhost,
      port: configENV.mailport,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: configENV.mailuser,
        pass: configENV.mailpass,
      },
    });
  }
  async send(message: Message) {
    const info = await this.transporter.sendMail({
      from: configENV.mailfrom,
      // todo: validate for valid email.
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });

    // use logger
    console.log("Message sent: %s", info.messageId);
  }
}

// const mailer = new MailTransport();
// //@ts-ignore
// mailer.send({
//   to: "dangaroshiyaparth@gmail.com",
//   subject: "Order update",
//   text: "Thank you for your order.",
//   html:
//     "\n" +
//     "    <h3>Thank you for your order.</h3>\n" +
//     '    <div>Your order id is: <a href="http://localhost:3000/order/undefined">undefined</a></div>\n',
// });

//vokg aufa zspb ajko
