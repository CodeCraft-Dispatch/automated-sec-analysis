import { FtaViolation } from './analysis/fta-violation-builder';
import { IFtaLogger } from './fta-logger';

export interface IFtaReporter {
  outputResults(results: any): void;
}

export class FtaReporter implements IFtaReporter {
  private readonly logger: IFtaLogger;

  constructor(logger: IFtaLogger) {
    this.logger = logger;
  }

  private groupViolationsByFile(violations: FtaViolation[]): { [key: string]: FtaViolation[] } {
    return violations.reduce((acc, result) => {
      acc[result.file_name] = acc[result.file_name] || [];
      acc[result.file_name].push(result);
      return acc;
    }, {});
  }

  public outputResults(results) {
    if (results.meetsThresholds === true || results.violations.length === 0) {
      this.logger.log('No violations found');
    } else {
      this.logger.error('\nViolations found\n');
      const groupedResults = this.groupViolationsByFile(results.violations);
      Object.entries(groupedResults)
        .forEach(([file, violations]) => {
          this.logger.error(`${file}:`);
          violations.forEach((violation) => {
            this.logger.log(
              `| Threshold: ${violation.threshold_name}, Value: ${violation.result_value}, Threshold: ${violation.threshold}`
            );
          });
        });
      this.logger.log('\n');
      throw new Error('Violations found');
    }
  }
}
