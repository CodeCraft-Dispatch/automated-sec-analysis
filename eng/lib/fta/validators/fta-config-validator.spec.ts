import { FtaConfigValidator } from './fta-config-validator';
import * as valid_config from '../mocks/fta-mock-valid-config';
import { missing_thresholds, missing_halstead_thresholds, missing_projects, invalid_projects, invalid_project_name, invalid_project_path } from '../mocks/fta-mock-invalid-configs';

describe('ftaConfigValidator', () => {
  it('should return false for valid config', () => {
    const isInvalid = FtaConfigValidator.isInvalid(valid_config);
    expect(isInvalid).toBe(false);
  });

  [undefined, 'config', [{ item: true }]].forEach((config, index) => {
    it(`should return empty config for empty config ${index}`, () => {
      const analyzedResults = FtaConfigValidator.isInvalid(config);
      expect(analyzedResults).toStrictEqual({
        emptyConfig: true,
      });
    });
  });

  [
    missing_thresholds,
    missing_halstead_thresholds,
    missing_projects,
    invalid_projects,
    invalid_project_name,
    invalid_project_path,
  ].forEach((config, index) => {
    it(`should return invalid config for invalid config ${index}`, () => {
      const analyzedResults = FtaConfigValidator.isInvalid(config);
      expect(analyzedResults).toStrictEqual({
        invalidConfig: true,
      });
    });
  });
});
