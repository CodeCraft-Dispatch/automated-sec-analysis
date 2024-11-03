import { FtaConfigThresholdsValidator } from './fta-config-thresholds-validator';

describe('ftaConfigThresholdsValidator', () => {
  describe('hasValidThresholds', () => {
    it('should return false when no thresholds are provided', () => {
      const config = {
        thresholds: {},
      };

      const result = FtaConfigThresholdsValidator.hasValidThresholds(config);

      expect(result).toBe(false);
    });

    it('should return false when thresholds are not an object', () => {
      const config = {
        thresholds: 'invalid',
      };

      const result = FtaConfigThresholdsValidator.hasValidThresholds(config);

      expect(result).toBe(false);
    });

    it('should return false when thresholds object is empty', () => {
      const config = {
        thresholds: {},
      };

      const result = FtaConfigThresholdsValidator.hasValidThresholds(config);

      expect(result).toBe(false);
    });

    it('should return false when thresholds object contains empty objects', () => {
      const config = {
        thresholds: {
          '': {},
        },
      };

      const result = FtaConfigThresholdsValidator.hasValidThresholds(config);

      expect(result).toBe(false);
    });

    it('should return true when thresholds object contains valid thresholds', () => {
      const config = {
        thresholds: {
          name: {
            threshold1: 1,
          },
        },
      };

      const result = FtaConfigThresholdsValidator.hasValidThresholds(config);

      expect(result).toBe(true);
    });
  });
});
