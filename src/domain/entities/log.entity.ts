export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createAt: Date;
  public origin: string;

  // constructor de las propiedades
  constructor(options: LogEntityOptions) {
    // si bno viene el createat sera igual a new date
    const { level, message, origin, createAt = new Date() } = options;
    this.level = level;
    this.message = message;
    this.origin = origin;
    this.createAt = createAt;
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createAt, origin } = JSON.parse(json);

    //   if(!message) throw new Error('message is required');
    //   if(!level) throw new Error('message is required');
    //   if(!createAt) throw new Error('message is required');

    const log = new LogEntity({ 
      message, 
      level, 
      createAt,
      origin
    });
 

    return log;
  };
}
