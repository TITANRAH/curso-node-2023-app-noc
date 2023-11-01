import { CheckService } from "../domain/use-cases/checks/check-services";
import { CronService } from "./cron/cron-service";

export class Server {
    public static start(){
        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                // inyeccion de dependencia
                const url = 'http://www.google.com'
               new CheckService(
                () => console.log(`${url} is ok`),
                (error: string) => console.log(error)
               ).execute(url);
            //    new CheckService().execute('http://localhost:3000');
            }
        );
        
    }
}

