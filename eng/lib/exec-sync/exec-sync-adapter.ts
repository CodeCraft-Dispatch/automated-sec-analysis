import { execSync } from 'child_process';

export interface IExecSyncAdapter {
  getDefaultExecSync(): any;
  exec(exec: any, command: string, options: any): any;
}

export class ExecSyncAdapter implements IExecSyncAdapter {
  public getDefaultExecSync() {
    return execSync;
  }

  public exec(exec: any, command: string, options: any) {
    return exec(command, options);
  }
}
