import { IExecSyncBuilder } from "./exec-sync-builder";
import { Task } from "./task";
import { ITaskValidator } from "./task-validator";

export class TaskCommandProcessor {
    constructor(private readonly execSyncBuilder: IExecSyncBuilder, private readonly taskValidator: ITaskValidator) {
    }

    public processCommand(task: Task) {
        if (this.taskValidator.hasCommand(task)) {
            this.execSyncBuilder.process(task.command);
        }
    }
}