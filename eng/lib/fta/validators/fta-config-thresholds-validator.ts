
export class FtaConfigThresholdsValidator {
  public static hasValidThresholds(config) {
    return (
      FtaConfigThresholdsValidator._hasThresholds(config) && FtaConfigThresholdsValidator._hasValidThresholdValues(config.thresholds)
    );
  }

  private static _hasThresholds(config) {
    return (
      Boolean(config.thresholds) &&
      typeof config.thresholds === 'object' &&
      Object.keys(config.thresholds).length > 0
    );
  }

  private static _hasValidThresholdValues(thresholds) {
    return Object.keys(thresholds).every((key) => {
      return typeof thresholds[key] === 'object'
        ? Object.keys(thresholds[key]).length > 0
        : true;
    });
  }
}