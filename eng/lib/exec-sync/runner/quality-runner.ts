import { ITaskProcessor } from "../tasks/task-processor.interface";
import { IConfigValidator } from "./config-validator";
import { ITaskValidator } from "../tasks/task-validator";
import { Task } from "../tasks/task";

export class QualityRunner {
  constructor(
    private readonly taskProcessor: ITaskProcessor,
    private readonly configValidator: IConfigValidator,
    private readonly taskValidator: ITaskValidator
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
