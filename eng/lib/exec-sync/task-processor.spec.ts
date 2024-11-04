import { TaskProcessorSpecApi } from "./task-processor.spec.api";

describe("taskProcessor", () => {
  let tp: TaskProcessorSpecApi;

  beforeEach(() => {
    tp = new TaskProcessorSpecApi();
  });

  describe("markAsTest", () => {
    it("should call isTest with true", () => {
      tp.whenMarkedAsTest().thenIsTestIsCalled();
    });
  });

  describe("processTask", () => {
    it("should process task", () => {
      tp.whenProcessingTask({ command: "hello" })
        .thenExecuteCalled();
    });

    it("should process task with command", () => {
      tp.whenProcessingTaskWithCommand("hello")
        .thenProcessIsCalledWith("hello");
    });

    it("should process task with args", () => {
      tp.whenProcessingTaskWithArgs(["hello"])
        .thenArgIsCalledWith("hello");
    });

    it("should process task with stdio", () => {
      tp.whenProcessingTaskWithSdtio({ input: "hello", output: "hello", error: "hello" })
        .thenStdioIsCalledWith("hello", "hello", "hello");
    });
  });
});
