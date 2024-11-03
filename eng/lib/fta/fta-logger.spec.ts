import { FtaLogger } from "./fta-logger";

describe("FtaLogger", () => {
    let logger: FtaLogger;
    let logSpy: (...params: any[]) => void;

    beforeEach(() => {
        logger = new FtaLogger();
        logSpy = jest.fn();
        logger.setLog(logSpy);
    });

    it("should log message", () => {
        logger.log("message");
        expect(logSpy).toHaveBeenCalledWith("message");
    });

    it("should log message with params", () => {
        logger.log("message", "param1", "param2");
        expect(logSpy).toHaveBeenCalledWith("message", "param1", "param2");
    });

    it("should log warning", () => {
        logger.warn("message");
        expect(logSpy).toHaveBeenCalledWith("message");
    });

    it("should log warning with params", () => {
        logger.warn("message", "param1", "param2");
        expect(logSpy).toHaveBeenCalledWith("message", "param1", "param2");
    });

    it("should log error", () => {
        logger.error("message");
        expect(logSpy).toHaveBeenCalledWith("message");
    });

    it("should log error with params", () => {
        logger.error("message", "param1", "param2");
        expect(logSpy).toHaveBeenCalledWith("message", "param1", "param2");
    });
});