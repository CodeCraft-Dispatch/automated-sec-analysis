import { Task } from "./task";

export interface ITaskValidator {
  hasCommand(task: Task): boolean;
  hasArgs(task: Task): boolean;
  hasStdio(task: Task): boolean;
}

export class TaskValidator implements ITaskValidator {
  public hasCommand(task: Task) {
    return Boolean(task.command && typeof task.command === 'string');
  }

  public hasArgs(task: Task) {
    return Boolean(task.args && task.args.length);
  }

  public hasStdio(task: Task) {
    return Boolean(
      task.stdio &&
      typeof task.stdio === 'object' &&
      Object.keys(task.stdio).length > 0
    );
  }
}
