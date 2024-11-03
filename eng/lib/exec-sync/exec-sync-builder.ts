import { IExecutionStrategy } from "./execution-strategy";
import { ICommandBuilder } from "./command-builder";
import { IExecSyncOptionsBuilder } from "./exec-sync-options-builder";

export interface IExecSyncBuilder {
  process(value: string): IExecSyncBuilder;
  arg(value: string): IExecSyncBuilder;
  input(value: string): IExecSyncBuilder;
  output(value: string): IExecSyncBuilder;
  error(value: string): IExecSyncBuilder;
  isTest(): IExecSyncBuilder;
  execute(): string;
}

export class ExecSyncBuilder implements IExecSyncBuilder {
  constructor(
    private readonly commandBuilder: ICommandBuilder,
    private readonly execSyncOptionsBuilder: IExecSyncOptionsBuilder,
    private readonly executionStrategy: IExecutionStrategy) {
  }

  public process(value: string) {
    this.commandBuilder.process(value);
    return this;
  }

  public arg(value: string) {
    this.commandBuilder.arg(value);
    return this;
  }

  public input(value: string) {
    this.execSyncOptionsBuilder.input(value);
    return this;
  }

  public output(value: string) {
    this.execSyncOptionsBuilder.output(value);
    return this;
  }

  public error(value: string) {
    this.execSyncOptionsBuilder.error(value);
    return this;
  }

  public isTest() {
    this.executionStrategy.markAsTest();
    return this;
  }

  public execute() {
    const _command = this.commandBuilder.build();
    const _options = this.execSyncOptionsBuilder.build();
    const _exec = this.executionStrategy.selectExecutionStrategy(_command, _options);
    return _exec();
  }
}
