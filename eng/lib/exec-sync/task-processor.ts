import { IExecSyncBuilder } from "./exec-sync-builder";
import { Task } from "./task";
import { TaskCommandProcessor } from "./task-command-processor";
import { TaskArgsProcessor } from "./task-args-processor";
import { TaskStdioProcessor } from "./task-stdio-processor";
import { ITaskProcessor } from "./task-processor.interface";
import { ITaskValidator } from "./task-validator";

export class TaskProcessor implements ITaskProcessor {
  private readonly taskCommandProcessor: TaskCommandProcessor;
  private readonly taskArgsProcessor: TaskArgsProcessor;
  private readonly taskStdioProcessor: TaskStdioProcessor;

  constructor(private readonly execSyncBuilder: IExecSyncBuilder, private readonly taskValidator: ITaskValidator) {
    this.taskCommandProcessor = new TaskCommandProcessor(execSyncBuilder, taskValidator);
    this.taskArgsProcessor = new TaskArgsProcessor(execSyncBuilder, taskValidator);
    this.taskStdioProcessor = new TaskStdioProcessor(execSyncBuilder, taskValidator);
  }

  public markAsTest() {
    this.execSyncBuilder.isTest();
    return this;
  }

  public processTask(task: Task) {
    this.taskCommandProcessor.processCommand(task);
    this.taskArgsProcessor.processArgs(task);
    this.taskStdioProcessor.processStdio(task);
    return this.execSyncBuilder.execute();
  }
}
