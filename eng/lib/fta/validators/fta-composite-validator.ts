import { FtaConfigValidator } from './fta-config-validator';
import { FtaResultValidator } from './fta-result-validator';

export class FtaCompositeValidator {
  public static isInvalid(config: any, results: any): any {
    let result: any;
    const emptyConfig = FtaConfigValidator.isInvalid(config);
    const emptyResults = FtaResultValidator.isInvalid(results);

    if (emptyConfig && emptyResults) {
      result = {
        ...(emptyConfig as any),
        ...(emptyResults as any),
      };
    } else if (emptyConfig) {
      result = emptyConfig;
    } else if (emptyResults) {
      result = emptyResults;
    } else {
      result = false;
    }

    return result;
  }
}
