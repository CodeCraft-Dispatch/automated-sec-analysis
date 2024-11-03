import { CommandBuilder } from "./command-builder";
import { ExecSyncAdapter } from "./exec-sync-adapter";
import { ExecSyncBuilder } from "./exec-sync-builder";
import { ExecSyncOptionsBuilder } from "./exec-sync-options-builder";
import { ExecutionStrategy } from "./execution-strategy";
import { Task } from "./task";
import { TaskProcessor } from "./task-processor";
import { TaskValidator } from "./task-validator";

describe("taskProcessor", () => {
  const tp = new TaskProcessor(new ExecSyncBuilder(new CommandBuilder(), new ExecSyncOptionsBuilder(), new ExecutionStrategy(new ExecSyncAdapter(), true)), new TaskValidator());

  describe("markAsTest", () => {
    it("should return this", () => {
      expect(tp.markAsTest()).toBe(tp);
    });
  });

  describe("processTask(no command)", () => {
    it("should return empty command with default options", () => {
      expect(tp.processTask(<Task>{})).toStrictEqual({
        command: "",
        options: { stdio: ["inherit", "inherit", "inherit"] },
      });
    });
  });

  describe("processTask(missing stdio settings)", () => {
    it("should return command with fallback stdio settings", () => {
      const task: Task = {
        command: "echo",
      };
      expect(tp.processTask(task)).toStrictEqual({
        command: "echo",
        options: { stdio: ["inherit", "inherit", "inherit"] },
      });
    });
    it("should return command with default stdio setting", () => {
      const task: Task = {
        command: "echo",
        stdio: {
          output: "hello",
          error: "hello",
          input: "hello",
        },
      };
      expect(tp.processTask(task)).toStrictEqual({
        command: "echo",
        options: { stdio: ["hello", "hello", "hello"] },
      });
    });
  });

  describe("processTask", () => {
    it("should return a result", () => {
      const task = {
        command: "echo",
      };
      expect(tp.processTask(task)).toStrictEqual({
        command: "echo",
        options: { stdio: ["inherit", "inherit", "inherit"] },
      });
    });

    it("should return a result with args", () => {
      const task = {
        command: "echo",
        args: ["hello"],
      };
      expect(tp.processTask(task)).toStrictEqual({
        command: "echo hello",
        options: { stdio: ["inherit", "inherit", "inherit"] },
      });
    });

    it("should return a result with stdio", () => {
      const task = {
        command: "echo",
        stdio: {
          input: "hello",
          output: "hello",
          error: "hello",
        },
      };
      expect(tp.processTask(task)).toStrictEqual({
        command: "echo",
        options: { stdio: ["hello", "hello", "hello"] },
      });
    });
  });
});
