import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  finalename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    // esto debo configurar para mails corporativos
    // host: envs.MAILER_SERVICE,
    // port: 465,
    // secure: true, // true for 465, false for other ports
    // auth: {
    //   user: envs.MAILER_EMAIL, // generated ethereal user
    //   pass: <PASSWORD>, // generated ethereal password
    // },
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      // console.log(sentInformation);
   

      return true;
    } catch (error) {
  
      return false;
    }
  }

  // enviaremos a un o a muchos correos los logs
  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs de servidor";
    const htmlBody = `
    <h3>Logs de sistema - NOC </h3>
    <p>Lorem wakaksjdakd jaskdjakdjasdkjasdkasdsdkjadkjasdj</p>
    <p>Ver logs adjuntos</p>
    `;

    const attachments: Attachment[] = [
      {
        finalename: "logs-all.log",
        path: "./logs/logs-all.log",
      },
      {
        finalename: "logs-all.log",
        path: "./logs/logs-high.log",
      },
      {
        finalename: "logs-all.log",
        path: "./logs/logs-medium.log",
      },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
