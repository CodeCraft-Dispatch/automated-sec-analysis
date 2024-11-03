import { FtaRunner } from './fta-runner';

describe('FtaRunner', () => {
    let runner: FtaRunner;
    let expectedResults: any;

    beforeEach(() => {
        runner = new FtaRunner();

        runner.setAnalyzer((projectPath: string, options: any) => {
            return 'result';
        });

        runner.setProjectGroupAnalyzer((analyzer: any, projects: any) => {
            return ['result1', 'result2'];
        });

        runner.setResultAnalyzer({
            analyze: (config: any, results: any) => {
                return 'result';
            }
        });

        runner.setReporter({
            outputResults: (result: any) => {
                expectedResults = result;
            }
        });
    });

    it('should run', () => {
        runner.run({
            projects: ['project1', 'project2']
        });

        expect(expectedResults).toBe('result');
    });
});