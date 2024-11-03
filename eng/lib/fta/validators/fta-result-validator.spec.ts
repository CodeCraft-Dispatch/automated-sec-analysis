import { FtaResultValidator } from './fta-result-validator';
import * as valid_result from '../mocks/fta-mock-result';

describe('ftaResultValidator', () => {
  it('should return false for valid results', () => {
    const isInvalid = FtaResultValidator.isInvalid([valid_result]);
    expect(isInvalid).toBe(false);
  });

  it('should return empty result analysis result', () => {
    const analyzedResults = FtaResultValidator.isInvalid([]);
    expect(analyzedResults).toStrictEqual({
      emptyResult: true,
    });
  });
});
