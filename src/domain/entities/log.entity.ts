export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createAt: Date;

  // constructor de las propiedades
  constructor(message: string, level: LogSeverityLevel) {
    this.level = level;
    this.message = message;
    this.createAt = new Date();
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createAt } = JSON.parse(json);

    //   if(!message) throw new Error('message is required');
    //   if(!level) throw new Error('message is required');
    //   if(!createAt) throw new Error('message is required');

    const log = new LogEntity(message, level);
    log.createAt = new Date(createAt);

    return log;
  };
}
