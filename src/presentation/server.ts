import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-services";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImpl(
  // new FileSystemDatasource()
  new MongoLogDatasource(),
  // new postgress
  // mongo
);
const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started...");

    // ste es el ultimo 
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

    // esto crea los logs
  //   CronService.createJob(
  //       '*/5 * * * * *',
  //       () => {
  //   inyeccion de dependencia
  //   const url = 'http://localhost:3000'
  //       const url = 'http://www.ASDADADASDSADASDASD.com'
  //      new CheckService(
  //       logRepository,
  //       () => console.log(`${url} is ok`),
  //       (error: string) => console.log(error),
  //       undefined,
  //       undefined,
  //      ).execute(url);
  //      new CheckService().execute('http://localhost:3000');
  // }
  // );

  // obtencion de logs dede mongo db
  const logs = await logRepository.getLogs(LogSeverityLevel.medium);
  console.log(logs);

  }
}
