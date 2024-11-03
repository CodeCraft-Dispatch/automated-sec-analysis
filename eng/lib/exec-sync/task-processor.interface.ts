import { Task } from "./task";

export interface ITaskProcessor {
    markAsTest(): ITaskProcessor;
    processTask(task: Task): string;
}