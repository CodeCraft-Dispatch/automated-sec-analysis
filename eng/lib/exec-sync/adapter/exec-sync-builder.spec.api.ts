import { CommandBuilder } from "./command-builder";
import { ExecSyncAdapter } from "./exec-sync-adapter";
import { ExecSyncBuilder } from "./exec-sync-builder";
import { ExecSyncOptionsBuilder } from "./exec-sync-options-builder";
import { ExecutionStrategy } from "./execution-strategy";

export class ExecSyncBuilderSpecApi {
  private readonly execSyncBuilder: ExecSyncBuilder;
  constructor(private readonly isTest: boolean = true) {
    this.execSyncBuilder = new ExecSyncBuilder(new CommandBuilder(), new ExecSyncOptionsBuilder(), new ExecutionStrategy(new ExecSyncAdapter(), isTest));
  }

  public get instance() {
    return this.execSyncBuilder;
  }

  public getMethodNameArray() {
    return ["process", "arg", "input", "output", "error", "execute"];
  }

  public getMethodCallMapping() {
    return [
      { name: "process", arg: "git" },
      { name: "arg", arg: "rev-parse" },
      { name: "input", arg: "inherit" },
      { name: "output", arg: "inherit" },
      { name: "error", arg: "inherit" },
    ];
  }

  public getMethod(methodName) {
    return this.execSyncBuilder[methodName];
  }

  public getMethodCall(methodCall) {
    return this.execSyncBuilder[methodCall.name](...methodCall.arg);
  }

  public getEmptyOutput() {
    return this.execSyncBuilder.execute();
  }

  public getFullTestOutput() {
    return this.execSyncBuilder
      .process("git")
      .arg("rev-parse")
      .arg("--abbrev-ref")
      .arg("HEAD")
      .input("inherit")
      .output("inherit")
      .error("inherit")
      .isTest()
      .execute();
  }
}
