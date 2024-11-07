import { Task } from "./task";
import { TaskProcessor } from "./task-processor";
import { TaskProcessorSpecThen } from "./task-processor.spec.then";

export class TaskProcessorSpecApi {
    private readonly tp: TaskProcessor;
    private readonly execSyncBuilder;
    private readonly taskValidator;

    constructor() {
        this.execSyncBuilder = {
            process: jest.fn(),
            arg: jest.fn(),
            input: jest.fn(),
            output: jest.fn(),
            error: jest.fn(),
            execute: jest.fn(),
            isTest: jest.fn(),
        };
        this.taskValidator = {
            hasCommand: jest.fn(),
            hasArgs: jest.fn(),
            hasStdio: jest.fn(),
        };
        this.tp = new TaskProcessor(this.execSyncBuilder, this.taskValidator);
    }

    whenMarkedAsTest() {
        this.tp.markAsTest();
        return new TaskProcessorSpecThen(this.execSyncBuilder);
    }

    whenProcessingTask(task: Task) {
        this.tp.processTask(task);
        return new TaskProcessorSpecThen(this.execSyncBuilder);
    }

    whenProcessingTaskWithCommand(command: string) {
        this.taskValidator.hasCommand.mockReturnValue(true);
        this.tp.processTask({ command });
        return new TaskProcessorSpecThen(this.execSyncBuilder);
    }

    whenProcessingTaskWithArgs(args: string[]) {
        this.taskValidator.hasArgs.mockReturnValue(true);
        this.tp.processTask({ command: "hello", args });
        return new TaskProcessorSpecThen(this.execSyncBuilder);
    }

    whenProcessingTaskWithSdtio(stdio: { input: string, output: string, error: string }) {
        this.taskValidator.hasStdio.mockReturnValue(true);
        this.tp.processTask({ command: "hello", stdio });
        return new TaskProcessorSpecThen(this.execSyncBuilder);
    }
}