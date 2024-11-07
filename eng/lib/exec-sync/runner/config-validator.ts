import { Task } from "../tasks/task";

export interface IConfigValidator {
  isValid(config: { tasks: Task[] }): boolean;
}

export class ConfigValidator implements IConfigValidator {
  public isValid(config: { tasks: Task[] }) {
    return Boolean(config?.tasks?.length);
  }
}
