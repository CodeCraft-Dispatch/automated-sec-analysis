import type { FtaViolation } from '../analysis/fta-violation-builder';
import type { IFtaLogger } from './fta-logger';
import { FtaReporterFormat } from './fta-reporter-format';

export interface IFtaReporter {
  outputResults(results: any): void;
}

export class FtaReporter implements IFtaReporter {
  private readonly logger: IFtaLogger;

  constructor(logger: IFtaLogger) {
    this.logger = logger;
  }

  public outputResults(results) {
    if (this.hasNoViolations(results)) {
      this.logger.log('No violations found');
      this.logger.log(JSON.stringify(results));
    } else {
      const formatter = new FtaReporterFormat(this.logger);
      this.logger.error('\nViolations found\n');
      const groupedResults = formatter.groupViolationsByFile(results.violations);
      Object.entries(groupedResults).forEach(formatter.processFileViolations.bind(formatter));
      this.logger.log('\n');
      throw new Error('Violations found');
    }
  }

  private hasNoViolations(results) {
    const hasNoViolations = !results.violations || results.violations.length === 0;
    return hasNoViolations && results.meetsThresholds === true;
  }
}
