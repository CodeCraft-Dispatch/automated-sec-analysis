import { ITaskProcessor } from "./task-processor.interface";
import { IConfigValidator } from "./config-validator";
import { ITaskValidator } from "./task-validator";
import { Task } from "./task";

export class QualityRunner {
  constructor(
    private taskProcessor: ITaskProcessor,
    private configValidator: IConfigValidator,
    private taskValidator: ITaskValidator
  ) { }

  public markAsTest() {
    this.taskProcessor.markAsTest();
    return this;
  }

  private getProcessResults(json: { tasks: Task[] }) {
    return json.tasks
      .filter((t) => this.taskValidator.hasCommand(t))
      .map((task) => {
        return this.taskProcessor.processTask(task);
      })
      .filter((x) => Boolean(x));
  }

  public run(json: { tasks: Task[] }) {
    return this.configValidator.isValid(json) ? this.getProcessResults(json) : [];
  }
}
