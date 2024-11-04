import { FtaComparer } from './fta-comparer';
import { FtaResultAnalyzer } from './fta-result-analyzer';
import { thresholds, projects } from '../mocks/fta-mock-valid-config';
import { file_name, halstead } from '../mocks/fta-mock-valid-result';

describe('FtaResultAnalyzer', () => {
    let analyzer: FtaResultAnalyzer;

    beforeEach(() => {
        analyzer = new FtaResultAnalyzer(new FtaComparer());
    });

    it('should be created', () => {
        expect(analyzer).toBeTruthy();
    });

    it('should return invalid when invalid', () => {
        const config = { notValid: [] };
        const results = {};
        const invalid = analyzer.analyze(config, results);
        expect(invalid).toStrictEqual({ invalidConfig: true });
    });

    it('should return valid when valid', () => {
        const config = {
            thresholds,
            projects
        };
        const results = [{
            file_name,
            halstead: {
                ...halstead
            }
        }];
        const validResult = analyzer.analyze(config, results);
        expect(validResult).toStrictEqual({ meetsThresholds: true, violations: [] });
    });
});