import { CheckService } from "../domain/use-cases/checks/check-services";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
    // new postgress
    // mongo
)

export class Server {
    public static start(){
        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                // inyeccion de dependencia
                const url = 'http://localhost:3000'
               new CheckService(
                fileSystemLogRepository,
                () => console.log(`${url} is ok`),
                (error: string) => console.log(error)
                // undefined,
                // undefined
               ).execute(url);
            //    new CheckService().execute('http://localhost:3000');
            }
        );
        
    }
}

