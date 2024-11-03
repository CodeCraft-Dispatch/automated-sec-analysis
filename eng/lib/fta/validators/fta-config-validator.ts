import { FtaConfigThresholdsValidator } from './fta-config-thresholds-validator';
import { FtaConfigProjectsValidator } from './fta-config-projects-validator';

export class FtaConfigValidator {
  public static isInvalid(config): Object | boolean {
    let result;
    const empty = this._isEmpty(config);

    if (empty) {
      result = empty;
    } else if (!this._isValidConfig(config)) {
      result = { invalidConfig: true };
    } else {
      result = false;
    }

    return result;
  }

  static _isEmpty(config) {
    const emptyConfig =
      !config || typeof config !== 'object' || Boolean(config.length);

    return emptyConfig ? { emptyConfig: true } : false;
  }

  static _isValidConfig(config) {
    return Boolean(
      FtaConfigThresholdsValidator.hasValidThresholds(config) &&
      FtaConfigProjectsValidator.hasValidProjects(config)
    );
  }
}
