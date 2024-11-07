import { IExecSyncBuilder } from "../adapter/exec-sync-builder";
import { Stdio, Task } from "./task";
import { ITaskValidator } from "./task-validator";

export class TaskStdioProcessor {
    constructor(private readonly execSyncBuilder: IExecSyncBuilder, private readonly taskValidator: ITaskValidator) {
    }

    private readonly processStdioLookup = [
        (stdio: Stdio) => { return { input: stdio.input }; },
        (stdio: Stdio) => { return { output: stdio.output }; },
        (stdio: Stdio) => { return { error: stdio.error }; }
    ];

    public processStdio(task: Task) {
        if (!this.taskValidator.hasStdio(task)) {
            return;
        }

        this.processStdioLookup.forEach((lookup) => {
            const stdio = lookup(task.stdio);
            this.execSyncBuilder[Object.keys(stdio)[0]](Object.values(stdio)[0]);
        });
    }
}