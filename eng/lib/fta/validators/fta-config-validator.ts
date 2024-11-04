import { FtaConfigThresholdsValidator } from './fta-config-thresholds-validator';
import { FtaConfigProjectsValidator } from './fta-config-projects-validator';
import { FtaEmptyConfigValidator } from './fta-empty-config-validator';

export class FtaConfigValidator {
  public static isInvalid(config): Object | boolean {
    const empty = FtaEmptyConfigValidator.isEmpty(config) ? { emptyConfig: true } : false;
    const isInvalidConfig = !empty && !FtaConfigValidator._isValidConfig(config);
    const invalidConfig = isInvalidConfig ? { invalidConfig: true } : false;

    return empty || invalidConfig;
  }

  static _isValidConfig(config) {
    return Boolean(
      FtaConfigThresholdsValidator.hasValidThresholds(config) &&
      FtaConfigProjectsValidator.hasValidProjects(config)
    );
  }
}
