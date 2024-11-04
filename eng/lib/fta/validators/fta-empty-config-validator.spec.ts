import { FtaEmptyConfigValidator } from './fta-empty-config-validator';

describe('FtaEmptyConfigValidator', () => {
    describe('isEmpty', () => {
        it('should return true if config is empty', () => {
            expect(FtaEmptyConfigValidator.isEmpty(null)).toEqual({ emptyConfig: true });
            expect(FtaEmptyConfigValidator.isEmpty(undefined)).toEqual({ emptyConfig: true });
            expect(FtaEmptyConfigValidator.isEmpty([])).toEqual({ emptyConfig: true });
            expect(FtaEmptyConfigValidator.isEmpty({})).toEqual({ emptyConfig: true });
        });

        it('should return true if config is not an object', () => {
            expect(FtaEmptyConfigValidator.isEmpty('string')).toEqual({ emptyConfig: true });
            expect(FtaEmptyConfigValidator.isEmpty(123)).toEqual({ emptyConfig: true });
            expect(FtaEmptyConfigValidator.isEmpty(true)).toEqual({ emptyConfig: true });
        });

        it('should return false if config is not empty', () => {
            expect(FtaEmptyConfigValidator.isEmpty({ key: 'value' })).toEqual(false);
            expect(FtaEmptyConfigValidator.isEmpty([1, 2, 3])).toEqual(false);
        });
    });
});