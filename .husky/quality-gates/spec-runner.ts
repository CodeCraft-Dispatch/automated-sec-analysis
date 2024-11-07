import { ExecSyncBuilder } from "../../eng/lib/exec-sync/adapter/exec-sync-builder";
import { CommandBuilder } from "../../eng/lib/exec-sync/adapter/command-builder";
import { ExecSyncOptionsBuilder } from "../../eng/lib/exec-sync/adapter/exec-sync-options-builder";
import { ExecSyncAdapter } from "../../eng/lib/exec-sync/adapter/exec-sync-adapter";
import { ExecutionStrategy } from "../../eng/lib/exec-sync/adapter/execution-strategy";
import { ConfigValidator } from "../../eng/lib/exec-sync/runner/config-validator";
import { QualityRunner } from "../../eng/lib/exec-sync/runner/quality-runner";
import { TaskProcessor } from "../../eng/lib/exec-sync/tasks/task-processor";
import { TaskValidator } from "../../eng/lib/exec-sync/tasks/task-validator";
import { tasks } from "./tasks";

export class SpecRunner {
  public static run(isTest: boolean) {
    const taskValidator = new TaskValidator();
    const commandBuilder = new CommandBuilder();
    const configValidator = new ConfigValidator();
    const execSyncOptionsBuilder = new ExecSyncOptionsBuilder();
    const execSyncAdapter = new ExecSyncAdapter();
    const executionStrategy = new ExecutionStrategy(execSyncAdapter, isTest);
    const execSyncBuilder = new ExecSyncBuilder(commandBuilder, execSyncOptionsBuilder, executionStrategy);
    const taskProcessor = new TaskProcessor(execSyncBuilder, taskValidator);
    const qualityRunner = new QualityRunner(taskProcessor, configValidator, taskValidator);

    return qualityRunner.run({ tasks });
  }
}
