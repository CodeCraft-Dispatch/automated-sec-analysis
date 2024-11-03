import { QualityRunner } from "../../eng/lib/exec-sync/quality-runner";
import { TaskProcessor } from "../../eng/lib/exec-sync/task-processor";
import { ExecSyncBuilder } from "../../eng/lib/exec-sync/exec-sync-builder";
import { CommandBuilder } from "../../eng/lib/exec-sync/command-builder";
import { ExecSyncOptionsBuilder } from "../../eng/lib/exec-sync/exec-sync-options-builder";
import { ExecutionStrategy } from "../../eng/lib/exec-sync/execution-strategy";
import { ExecSyncAdapter } from "../../eng/lib/exec-sync/exec-sync-adapter";
import { TaskValidator } from "../../eng/lib/exec-sync/task-validator";
import { ConfigValidator } from "../../eng/lib/exec-sync/config-validator";
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
