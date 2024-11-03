import { Task } from "./task";
import { TaskValidator } from "./task-validator";

describe("taskValidator", () => {
  const tv = new TaskValidator();

  describe("hasCommand", () => {
    it("should return false if task.command is an empty string", () => {
      const task = { command: "" };
      expect(tv.hasCommand(task)).toBe(false);
    });

    it("should return true if task.command is a string", () => {
      const task = { command: "echo" };
      expect(tv.hasCommand(task)).toBe(true);
    });
  });

  describe("hasArgs", () => {
    it("should return false if task.args is an empty array", () => {
      const task = <Task>{ args: [], command: "echo" };
      expect(tv.hasArgs(task)).toBe(false);
    });

    it("should return true if task.args is an array", () => {
      const task = <Task>{ args: ["arg"] };
      expect(tv.hasArgs(task)).toBe(true);
    });
  });

  describe("hasStdio", () => {
    it("should return false if task.stdio is an empty object", () => {
      const task = <Task>{ stdio: {} };
      expect(tv.hasStdio(task)).toBe(false);
    });

    it("should return true if task.stdio is an object", () => {
      const task = <Task>{
        stdio: { input: "input", output: "output", error: "error" },
      };
      expect(tv.hasStdio(task)).toBe(true);
    });
  });
});
