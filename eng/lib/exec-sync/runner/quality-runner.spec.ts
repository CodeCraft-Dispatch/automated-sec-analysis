import { QualityRunner } from "./quality-runner";
import { ITaskProcessor } from "../tasks/task-processor.interface";
import { ITaskValidator } from "../tasks/task-validator";

describe("qualityRunner", () => {
  let qualityRunnerObject: QualityRunner;

  const taskProcessor = <ITaskProcessor>{
    markAsTest: jest.fn(),
    processTask: jest.fn().mockReturnValue("result"),
  };

  const taskValidatorFactory = (returnValue: boolean) => {
    return <ITaskValidator>{
      hasCommand: jest.fn().mockReturnValue(returnValue),
      hasArgs: jest.fn().mockReturnValue(returnValue),
      hasStdio: jest.fn().mockReturnValue(returnValue),
    };
  }

  const configValidatorFactory = (returnValue: boolean) => {
    return {
      isValid: jest.fn().mockReturnValue(returnValue),
    };
  };

  beforeEach(() => {
    qualityRunnerObject = new QualityRunner(taskProcessor, configValidatorFactory(true), taskValidatorFactory(true));
  });

  describe("run", () => {
    it("should return empty array if config is invalid", () => {
      qualityRunnerObject = new QualityRunner(taskProcessor, configValidatorFactory(false), taskValidatorFactory(true));
      expect(qualityRunnerObject.run({ tasks: [] })).toEqual([]);
    });

    it("should return empty array if no tasks have command", () => {
      qualityRunnerObject = new QualityRunner(taskProcessor, configValidatorFactory(true), taskValidatorFactory(false));
      expect(qualityRunnerObject.run({ tasks: [{ command: "" }] })).toEqual([]);
    });

    it("should return processed tasks", () => {
      expect(qualityRunnerObject.run({ tasks: [{ command: "command" }] })).toEqual(["result"]);
    });
  });

  describe("markAsTest", () => {
    it("should call taskProcessor.markAsTest", () => {
      qualityRunnerObject.markAsTest();
      expect(taskProcessor.markAsTest).toHaveBeenCalled();
    });
  });
});
