import { FtaCompositeValidator } from './fta-composite-validator';

describe('ftaCompositeValidator', () => {
  it('should return false when config and results are valid', () => {
    const config = {
      thresholds: {
        coverage: 80,
      },
      projects: [
        {
          name: 'project1',
          path: 'path1',
        },
      ],
    };
    const results = [
      {
        coverage: 85,
      },
    ];

    const result = FtaCompositeValidator.isInvalid(config, results);

    expect(result).toStrictEqual(false);
  });

  it('should return the error when config is invalid', () => {
    const config = { invalidConfig: [] };
    const results = [
      {
        coverage: 85,
      },
    ];

    const result = FtaCompositeValidator.isInvalid(config, results);

    expect(result).toStrictEqual({
      invalidConfig: true,
    });
  });

  it('should return the error when results are invalid', () => {
    const config = {
      thresholds: {
        coverage: 80,
      },
      projects: [
        {
          name: 'project1',
          path: 'path1',
        },
      ],
    };
    const results = [];

    const result = FtaCompositeValidator.isInvalid(config, results);

    expect(result).toStrictEqual({
      emptyResult: true,
    });
  });

  it('should return the error when both config and results are invalid', () => {
    const config = {};
    const results = [];

    const result = FtaCompositeValidator.isInvalid(config, results);

    expect(result).toStrictEqual({
      emptyConfig: true,
      emptyResult: true,
    });
  });
});
