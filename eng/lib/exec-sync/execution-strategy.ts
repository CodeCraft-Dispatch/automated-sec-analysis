import { IExecSyncAdapter } from "./exec-sync-adapter";

export interface IExecutionStrategy {
  markAsTest(): void;
  setExecSyncAdapter(adapter: IExecSyncAdapter): void;
  getExecutionStrategies(command: string, options: any): any;
  selectExecutionStrategy(command: string, options: any): any;
}

export class ExecutionStrategy implements IExecutionStrategy {
  constructor(private execSyncAdapter: IExecSyncAdapter, private isTest: boolean) {

  }

  public markAsTest() {
    this.isTest = true;
  }

  public setExecSyncAdapter(adapter: IExecSyncAdapter) {
    this.execSyncAdapter = adapter;
  }

  public getExecutionStrategies(command: string, options: any) {
    return {
      isTest: () => ({ command, options }),
      noCommand: () => "",
      exec: () => {
        const execSync = this.execSyncAdapter.getDefaultExecSync();
        return execSync(command, options);
      },
    };
  }

  public selectExecutionStrategy(command: string, options: any) {
    let selectedStrategy;
    let strategies = this.getExecutionStrategies(command, options);
    if (this.isTest) {
      selectedStrategy = strategies.isTest;
    } else if (!command) {
      selectedStrategy = strategies.noCommand;
    } else {
      selectedStrategy = strategies.exec;
    }

    return selectedStrategy;
  }
}