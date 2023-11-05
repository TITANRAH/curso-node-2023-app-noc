import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-services";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
  // new postgress
  // mongo
);
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "granrah1@gmail.com",
    //   "titanrah@gmail.com",
    // ]);

    // console.log(envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL);

    // emailService.sendEmailWithFileSystemLogs(
    //     [
    //         'granrah1@gmail.com','titanrah@gmail.com'
    //     ]
    // )

    // CronService.createJob(
    //     '*/5 * * * * *',
    //     () => {
    // inyeccion de dependencia
    // const url = 'http://localhost:3000'
    //     const url = 'http://www.google.com'
    //    new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error: string) => console.log(error),
    //     // undefined,
    //     // undefined,
    //    ).execute(url);
    //    new CheckService().execute('http://localhost:3000');
  }
  // );

  // }
}
