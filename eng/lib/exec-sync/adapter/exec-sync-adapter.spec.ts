import { execSync } from "child_process";
import { ExecSyncAdapter } from "./exec-sync-adapter";

describe("execSyncAdapter", () => {
  const execSyncAdapter = new ExecSyncAdapter();

  it("should have a getDefaultExecSync function", () => {
    expect(execSyncAdapter.getDefaultExecSync).toBeDefined();
    expect(execSyncAdapter.getDefaultExecSync).toBeInstanceOf(Function);
  });
  it("should have an exec function", () => {
    expect(execSyncAdapter.exec).toBeDefined();
    expect(execSyncAdapter.exec).toBeInstanceOf(Function);
  });
  it("should return results from provided execSync", () => {
    const exec = function (command, options) {
      return command;
    };
    const command = "git rev-parse";
    const options = { stdio: "inherit" };
    const results = execSyncAdapter.exec(exec, command, options);
    expect(results).toEqual(command);
  });
  it("should provide default execSync function", () => {
    const exec = execSyncAdapter.getDefaultExecSync();
    expect(exec).toBeDefined();
    expect(exec).toBe(execSync);
  });
});
