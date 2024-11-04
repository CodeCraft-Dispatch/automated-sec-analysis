import { FtaLogger, IFtaLogger } from "./fta-logger";
import { FtaReporter } from "./fta-reporter";

describe("ftaReporter", () => {
  let ftaReporter: FtaReporter = new FtaReporter(new FtaLogger());

  describe("outputResults", () => {
    it("should output no violations found", () => {
      const results = { meetsThresholds: true, violations: [] };
      const logger = <IFtaLogger>{ log: jest.fn(), error: jest.fn(), warn: jest.fn() };
      ftaReporter = new FtaReporter(logger);
      ftaReporter.outputResults(results);
      expect(logger.log).toHaveBeenCalledWith("No violations found");
    });

    it("should output violations found", () => {
      const results = {
        meetsThresholds: false,
        violations: [
          {
            file_name: "file_name",
            threshold_name: "thresholdName",
            result_value: "resultValue",
            threshold: "threshold",
          },
        ],
      };
      const logger = <IFtaLogger>{ log: jest.fn(), error: jest.fn(), warn: jest.fn() };
      ftaReporter = new FtaReporter(logger);
      expect(() => ftaReporter.outputResults(results)).toThrow(
        "Violations found"
      );
      expect(logger.error).toHaveBeenCalledWith("\nViolations found\n");
      expect(logger.error).toHaveBeenCalledWith("file_name:");
      expect(logger.log).toHaveBeenCalledWith(
        "| Threshold: thresholdName, Value: resultValue, Threshold: threshold"
      );
    });
  });
});
