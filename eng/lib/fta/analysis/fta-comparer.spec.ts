import { FtaComparer } from './fta-comparer';
import { thresholds } from '../mocks/fta-mock-valid-config';
import { file_name, halstead } from '../mocks/fta-mock-valid-result';

describe('FtaComparer', () => {
    let ftaComparer: FtaComparer

    beforeEach(() => {
        ftaComparer = new FtaComparer();
    });

    it('should create', () => {
        expect(ftaComparer).toBeTruthy();
    });

    [null, undefined, []].forEach(results => {
        it('should return meetsThresholds true and empty violations when results is null, undefined or empty', () => {
            const thresholds = {};

            const result = ftaComparer.compareResults(thresholds, results);

            expect(result.meetsThresholds).toBe(true);
            expect(result.violations).toEqual([]);
        });
    });

    it('should return meetsThresholds false and violations when results has violations', () => {
        const results = [
            {
                file_name,
                halstead: {
                    ...halstead
                }
            },
            {
                file_name,
                halstead: {
                    ...halstead,
                    bugs: 1
                }
            }
        ];

        const result = ftaComparer.compareResults(thresholds, results);

        expect(result.meetsThresholds).toBe(false);
        expect(result.violations).toStrictEqual([{
            "file_name": "mock.js",
            "result_value": 1,
            "threshold": 0.5,
            "threshold_name": "bugs",
        }]);
    });

});