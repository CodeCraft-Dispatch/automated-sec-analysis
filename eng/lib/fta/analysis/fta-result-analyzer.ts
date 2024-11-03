import { FtaComparer } from './fta-comparer';
import { FtaCompositeValidator } from '../validators/fta-composite-validator';

export interface IFtaResultAnalyzer {
  analyze(config: any, results: any): any;
}

export class FtaResultAnalyzer implements IFtaResultAnalyzer {
  ftaComparer: FtaComparer;

  constructor(ftaComparer: FtaComparer) {
    this.ftaComparer = ftaComparer;
  }

  analyze(config: any, results: any) {
    const invalid = FtaCompositeValidator.isInvalid(config, results);
    if (invalid) {
      return invalid;
    }

    return this.ftaComparer.compareResults(config.thresholds, results);
  }
}
