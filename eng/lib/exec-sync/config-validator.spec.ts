import { ConfigValidator } from "./config-validator";

describe("configValidator", () => {
  const cv = new ConfigValidator();

  describe("isValid", () => {
    it("should return false if config.tasks is an empty array", () => {
      const config = { tasks: [] };
      expect(cv.isValid(config)).toBe(false);
    });

    it("should return true if config.tasks is not an empty array", () => {
      const config = { tasks: [{ name: "test", command: "echo test" }] };
      expect(cv.isValid(config)).toBe(true);
    });
  });
});
