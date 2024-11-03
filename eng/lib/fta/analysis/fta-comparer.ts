import { FtaResultItemComparer } from './fta-result-item-comparer';

export class FtaComparer {
  private readonly ftaResultItemComparer: FtaResultItemComparer;

  constructor() {
    this.ftaResultItemComparer = new FtaResultItemComparer();
  }

  public compareResults(thresholds: any, results: any) {
    const result = {
      meetsThresholds: true,
      violations: [],
    };

    if (!results || results.length === 0) {
      return result;
    }

    results.forEach((item: any) => {
      const itemResult = this.ftaResultItemComparer.compareResultItem(
        thresholds,
        item
      );

      if (!itemResult.meetsThresholds) {
        result.meetsThresholds = false;
        result.violations.push(...itemResult.violations);
      }
    });

    return result;
  }
}
