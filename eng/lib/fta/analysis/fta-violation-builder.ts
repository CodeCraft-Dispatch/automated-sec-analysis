
export interface FtaViolation {
  threshold_name: string;
  result_value: number;
  threshold: number;
  file_name: string;
}

export class FtaViolationBuilder {
  private static createViolation(file_name, thresholdName, resultValue, threshold) {
    return <FtaViolation>{
      threshold_name: thresholdName,
      result_value: resultValue,
      threshold: threshold,
      file_name: file_name,
    };
  }

  public static setViolatedResult(
    result,
    file_name,
    thresholdName,
    resultValue,
    threshold
  ) {
    result.meetsThresholds = false;
    result.violations.push(
      FtaViolationBuilder.createViolation(
        file_name,
        thresholdName,
        resultValue,
        threshold
      )
    );
  }
}
