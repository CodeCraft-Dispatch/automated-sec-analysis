import { FtaResultItemComparer } from './fta-result-item-comparer';

describe('FtaResultItemComparer', () => {
    let ftaResultItemComparer: FtaResultItemComparer;

    beforeEach(() => {
        ftaResultItemComparer = new FtaResultItemComparer();
    });

    describe('compareResultItem', () => {
        it('should return meetsThresholds as true when no threshold is violated', () => {
            const thresholds = {
                score: 10,
            };
            const resultItem = {
                fta_score: 5,
            };

            const result = ftaResultItemComparer.compareResultItem(
                thresholds,
                resultItem
            );

            expect(result.meetsThresholds).toBe(true);
            expect(result.violations).toEqual([]);
        });

        it('should return meetsThresholds as false when threshold is violated', () => {
            const thresholds = {
                score: 10,
            };
            const resultItem = {
                fta_score: 15,
            };

            const result = ftaResultItemComparer.compareResultItem(
                thresholds,
                resultItem
            );

            expect(result.meetsThresholds).toBe(false);
            expect(result.violations).toEqual([
                {
                    file_name: undefined,
                    result_value: 15,
                    threshold: 10,
                    threshold_name: "score"
                },
            ]);
        });

        it('should return meetsThresholds as false when multiple thresholds are violated', () => {
            const thresholds = {
                score: 10,
                cyclo: 5,
                halstead: {
                    bugs: 1,
                    difficulty: 10,
                },
            };
            const resultItem = {
                fta_score: 15,
                cyclo: 10,
                halstead: {
                    bugs: 2,
                    difficulty: 15,
                },
            };

            const result = ftaResultItemComparer.compareResultItem(
                thresholds,
                resultItem
            );

            expect(result.meetsThresholds).toBe(false);
            expect(result.violations).toEqual([
                {
                    file_name: undefined,
                    result_value: 15,
                    threshold: 10,
                    threshold_name: "score"
                },
                {
                    file_name: undefined,
                    result_value: 10,
                    threshold: 5,
                    threshold_name: "cyclo"
                },
                {
                    file_name: undefined,
                    result_value: 2,
                    threshold: 1,
                    threshold_name: "bugs"
                },
                {
                    file_name: undefined,
                    result_value: 15,
                    threshold: 10,
                    threshold_name: "difficulty"
                }
            ]);
        });
    });
});