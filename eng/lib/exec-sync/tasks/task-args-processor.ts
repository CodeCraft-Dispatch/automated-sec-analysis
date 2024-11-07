import { IExecSyncBuilder } from "../adapter/exec-sync-builder";
import { Task } from "./task";
import { ITaskValidator } from "./task-validator";

export class TaskArgsProcessor {
    constructor(private readonly execSyncBuilder: IExecSyncBuilder, private readonly taskValidator: ITaskValidator) {
        this.execSyncBuilder = execSyncBuilder;
        this.taskValidator = taskValidator;
    }

    public processArgs(task: Task) {
        if (task.args && this.taskValidator.hasArgs(task)) {
            (task.args).forEach((arg) => {
                this.execSyncBuilder.arg(arg);
            });
        }
    }
}