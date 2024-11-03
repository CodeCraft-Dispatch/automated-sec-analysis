import { FtaViolationBuilder } from './fta-violation-builder';

describe('ftaViolationBuilder', () => {
  describe('setViolatedResult', () => {
    it('should set undefined object for no parameters', () => {
      const result = {
        meetsThresholds: false,
        violations: [],
      };
      FtaViolationBuilder.setViolatedResult(result, undefined, undefined, undefined, undefined);
      expect(result).toStrictEqual({
        meetsThresholds: false,
        violations: [
          {
            file_name: undefined,
            result_value: undefined,
            threshold: undefined,
            threshold_name: undefined,
          },
        ],
      });
    });
    it('should set full violation object', () => {
      const result = {
        meetsThresholds: false,
        violations: [],
      };
      FtaViolationBuilder.setViolatedResult(
        result,
        'file_name',
        'thresholdName',
        'resultValue',
        'threshold'
      );
      expect(result).toStrictEqual({
        meetsThresholds: false,
        violations: [
          {
            threshold_name: 'thresholdName',
            result_value: 'resultValue',
            threshold: 'threshold',
            file_name: 'file_name',
          },
        ],
      });
    });
  });
});
