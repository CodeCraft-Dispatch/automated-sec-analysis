
export interface IExecSyncOptionsBuilder {
  input(value: string): IExecSyncOptionsBuilder;
  output(value: string): IExecSyncOptionsBuilder;
  error(value: string): IExecSyncOptionsBuilder;
  build(): any;
}

export class ExecSyncOptionsBuilder implements IExecSyncOptionsBuilder {
  private options: any;
  constructor() {
    this.options = {
      stdio: ["inherit", "inherit", "inherit"],
    };
  }

  public input(value: string) {
    this.options.stdio[0] = value;
    return this;
  }

  public output(value: string) {
    this.options.stdio[1] = value;
    return this;
  }

  public error(value: string) {
    this.options.stdio[2] = value;
    return this;
  }

  public build() {
    const result = { ...this.options };
    this.options = {
      stdio: ["inherit", "inherit", "inherit"],
    };
    return result;
  }
}
