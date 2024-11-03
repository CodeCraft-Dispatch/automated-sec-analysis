import { IExecSyncBuilder } from "./exec-sync-builder";
import { Stdio, Task } from "./task";
import { ITaskProcessor } from "./task-processor.interface";
import { ITaskValidator } from "./task-validator";

export class TaskProcessor implements ITaskProcessor {
  constructor(private readonly execSyncBuilder: IExecSyncBuilder, private readonly taskValidator: ITaskValidator) {
  }

  public markAsTest() {
    this.execSyncBuilder.isTest();
    return this;
  }

  private processCommand(task: Task) {
    if (this.taskValidator.hasCommand(task)) {
      this.execSyncBuilder.process(task.command);
    }
  }

  private processArgs(task: Task) {
    if (task.args && this.taskValidator.hasArgs(task)) {
      (task.args).forEach((arg) => {
        this.execSyncBuilder.arg(arg);
      });
    }
  }

  private readonly processStdioLookup = [
    (stdio: Stdio) => { return { input: stdio.input }; },
    (stdio: Stdio) => { return { output: stdio.output } },
    (stdio: Stdio) => { return { error: stdio.error } }
  ];

  private processStdio(task: Task) {
    if (!this.taskValidator.hasStdio(task)) {
      return;
    }

    this.processStdioLookup.forEach((lookup) => {
      const stdio = lookup(task.stdio);
      this.execSyncBuilder[Object.keys(stdio)[0]](Object.values(stdio)[0]);
    });
  }

  public processTask(task: Task) {
    this.processCommand(task);
    this.processArgs(task);
    this.processStdio(task);
    return this.execSyncBuilder.execute();
  }
}
