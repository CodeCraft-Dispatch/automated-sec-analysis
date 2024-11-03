import { Task } from "./task";

export interface IConfigValidator {
  isValid(config: { tasks: Task[] }): boolean;
}

export class ConfigValidator implements IConfigValidator {
  public isValid(config: { tasks: Task[] }) {
    return Boolean(config && config.tasks && config.tasks.length);
  }
}
