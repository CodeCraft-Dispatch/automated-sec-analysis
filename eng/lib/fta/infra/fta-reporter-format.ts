import { FtaViolation } from "../analysis/fta-violation-builder";
import { IFtaLogger } from "./fta-logger";

export class FtaReporterFormat {
    constructor(private readonly logger: IFtaLogger) { }

    public groupViolationsByFile(violations: FtaViolation[]): { [key: string]: FtaViolation[] } {
        return violations.reduce((acc, result) => {
            acc[result.file_name] = acc[result.file_name] || [];
            acc[result.file_name].push(result);
            return acc;
        }, {});
    }

    public processFileViolations([file, violations]) {
        this.logger.error(`${file}:`);
        violations.forEach(this.logViolation.bind(this));
    }

    private logViolation(violation) {
        this.logger.log(
            `| Threshold: ${violation.threshold_name}, Value: ${violation.result_value}, Threshold: ${violation.threshold}`
        );
    }
}