import { Task } from './task';

export interface ITaskGenerator {
    command(command: string): ITaskGenerator;
    arg(arg: string): ITaskGenerator;
    build(): Task;
}

export class TaskGenerator implements ITaskGenerator {
    private task: Task;

    public command(command: string): ITaskGenerator {
        this.task = {
            command,
            args: [],
        }
        return this;
    }

    public arg(arg: string): ITaskGenerator {
        this.task.args.push(arg);
        return this;
    }

    public build(): Task {
        return this.task;
    }
}
