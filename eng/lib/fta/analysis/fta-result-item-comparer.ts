import { FtaViolationBuilder } from './fta-violation-builder';

const HALSTEAD_CONFIG_KEY: string = 'halstead';
const SCORE_CONFIG_KEY: string = 'score';
const SCORE_RESULT_ITEM_KEY: string = 'fta_score';

export class FtaResultItemComparer {
  private handleCompareHalstead(
    file_name: string,
    threshold_name: string,
    threshold_value: number,
    resultItem: any,
    result: any
  ) {
    if (threshold_name === HALSTEAD_CONFIG_KEY) {
      for (const [halsteadKey, halsteadValue] of Object.entries(
        threshold_value
      )) {
        if (resultItem[threshold_name][halsteadKey] > halsteadValue) {
          FtaViolationBuilder.setViolatedResult(
            result,
            file_name,
            halsteadKey,
            resultItem[threshold_name][halsteadKey],
            halsteadValue
          );
        }
      }
    }
  }

  private handleScore(
    file_name: string,
    threshold_name: string,
    threshold_value: number,
    resultItem: any,
    result: any
  ) {
    if (threshold_name === SCORE_CONFIG_KEY) {
      if (resultItem[SCORE_RESULT_ITEM_KEY] > threshold_value) {
        FtaViolationBuilder.setViolatedResult(
          result,
          file_name,
          threshold_name,
          resultItem[SCORE_RESULT_ITEM_KEY],
          threshold_value
        );
      }
    }
  }

  private handleDefault(
    file_name: string,
    threshold_name: string,
    threshold_value: number,
    resultItem: any,
    result: any
  ) {
    if (resultItem[threshold_name] > threshold_value) {
      FtaViolationBuilder.setViolatedResult(
        result,
        file_name,
        threshold_name,
        resultItem[threshold_name],
        threshold_value
      );
    }
  }

  private _compareResultItem(
    comparisonPaths: any[],
    thresholds: any,
    resultItem: any
  ) {
    const result = {
      meetsThresholds: true,
      violations: [],
    };

    Object.entries(thresholds).forEach(([threshold_name, threshold_value]) => {
      comparisonPaths.forEach((comparisonPath) => {
        comparisonPath(
          resultItem.file_name,
          threshold_name,
          threshold_value,
          resultItem,
          result
        );
      });
    });

    return result;
  }

  public compareResultItem(thresholds: any, resultItem: any) {
    const comparisonPaths = [
      this.handleCompareHalstead,
      this.handleScore,
      this.handleDefault,
    ];

    return this._compareResultItem(comparisonPaths, thresholds, resultItem);
  }
}
