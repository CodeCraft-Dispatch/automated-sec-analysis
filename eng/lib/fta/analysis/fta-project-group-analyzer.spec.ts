import { FtaProjectGroupAnalyzer } from './fta-project-group-analyzer';

describe('ftaProjectGroupAnalyzer', () => {
  it('should return the output of the FTA analyzer', () => {
    const expected = [{ file_name: 'expected' }];
    const analyzer = (path, options) => JSON.stringify(expected);
    const projects = [
      {
        name: 'root',
        path: '.',
      },
    ];

    const result = (new FtaProjectGroupAnalyzer()).analyze(analyzer, projects);
    expect(result).toStrictEqual(expected);
  });
  it('should return the combined output of the FTA analyzer', () => {
    const expected = [
      { file_name: 'expected' },
      { file_name: 'uniqueTwo' },
      { file_name: 'resultThree' },
    ];
    const analyzer = (path, options) => JSON.stringify(expected);
    const projects = [
      {
        name: 'root',
        path: '.',
      },
      {
        name: 'packages',
        path: './packages',
      },
      {
        name: 'husky',
        path: './.husky',
      },
    ];

    const result = (new FtaProjectGroupAnalyzer()).analyze(analyzer, projects);
    expect(result).toStrictEqual(expected);
  });
  it('should return the unique output of the FTA analyzer', () => {
    const expected = [{ file_name: 'expected' }];
    const output = [
      expected[0],
      { file_name: 'expectedOne' },
      { file_name: 'expectedTwo' },
    ];
    const analyzer = (path, options) => JSON.stringify(output);
    const projects = [
      {
        name: 'root',
        path: '.',
      },
      {
        name: 'packages',
        path: './packages',
      },
      {
        name: 'husky',
        path: './.husky',
      },
    ];

    const result = (new FtaProjectGroupAnalyzer()).analyze(analyzer, projects);
    expect(result).toStrictEqual(expected);
  });
});
