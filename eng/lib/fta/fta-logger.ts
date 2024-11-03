export interface IFtaLogger {
  log(message: string, ...params: any[]): void;
  warn(message: string, ...params: any[]): void;
  error(message: string, ...params: any[]): void;
}

export class FtaLogger implements IFtaLogger {
  private _log = console.log;

  public setLog(logFunction: (...params: any[]) => void): void {
    this._log = logFunction;
  }

  public log(message: string, ...params: any[]): void {
    this._log(message, ...params);
  }

  public warn(message: string, ...params: any[]): void {
    this._log(message, ...params);
  }

  public error(message: string, ...params: any[]): void {
    this._log(message, ...params);
  }
}
