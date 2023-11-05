import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface ChekServiceUseCase {
  execute(url: string): Promise<boolean>;
}
// esto revisa cualquier url
type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

// checkear si un servicio esta activo cada cierto tiemnpo
export class CheckService implements ChekServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCalback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const optionsLow = {
        message: `Service ${url} is ok`,
        level: LogSeverityLevel.low,
        origin: "check-service-ts", 
      };

      // creo la isntancia de un nuevo log
      const log = new LogEntity(optionsLow);
      // guardo el log de exito
      this.logRepository.saveLog(log);
      this.successCalback && this.successCalback();

      // console.log(`${url} is ok`);

      return true;
    } catch (error) {
      const optionsHigh = {
        message: `Service ${url} is not ok`,
        level: LogSeverityLevel.high,
        origin: "check-service-ts",
      };

      const log = new LogEntity(optionsHigh);
      this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback(`${error}`);

      return false;
    }
  }
}
