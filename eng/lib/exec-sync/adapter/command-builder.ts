
export interface ICommandBuilder {
  process(processName: string): ICommandBuilder;
  arg(argValue: string): ICommandBuilder;
  build(): string;
}

export class CommandBuilder implements ICommandBuilder {
  private _command: string;
  constructor() {
    this._command = "";
  }

  public process(processName: string) {
    this._command = processName;
    return this;
  }

  public arg(argValue: string) {
    this._command += ` ${argValue}`;
    return this;
  }

  public build() {
    const result = this._command;
    this._command = "";
    return result;
  }
}
