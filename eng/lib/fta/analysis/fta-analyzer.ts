import { runFta } from 'fta-cli';

/**
 * Analyzer for FTA
 * @module fta-analyzer (ftaAnalyzer)
 * @example
 * const analyzer = ftaAnalyzer.getDefaultAnalyzer();
 * const project = {
 *  name: 'root',   // Name of the project, e.g. 'root'
 *  path: '.'       // Path to the project root directory, e.g. 'C:\\Users\\user\\project\\root
 * };
 * const results = ftaAnalyzer.analyze(analyzer, project);
 * console.log(results);
 *
 * // Output:
 *  [
 *    {
 *      file_name: 'src\\path\\and\\file.ts',   // Path to the file including the file name and extension
 *      cyclo: 1,                               // Cyclomatic complexity level of the code
 *      halstead: {                             // Halstead metrics object
 *        uniq_operators: 11,                     // Unique operators in the code
 *        uniq_operands: 40,                      // Unique operands in the code
 *        total_operators: 88,                    // Total operators in the code
 *        total_operands: 76,                     // Total operands in the code
 *        program_length: 164,                    // Program length (N) = total_operators + total_operands
 *        vocabulary_size: 51,                    // Vocabulary size (n) = uniq_operators + uniq_operands
 *        volume: 930.2777560833252,              // Volume level of the code
 *        difficulty: 9.5,                        // Difficulty level of the code
 *        effort: 8837.63868279159,               // Effort level to develop the code
 *        time: 490.97992682175504,               // Time to develop the code
 *        bugs: 0.3100925853611084                // Bugs count in the code
 *      },                                      // End of Halstead metrics object
 *      line_count: 100,                        // Total lines of code in the file
 *      fta_score: 50                           // FTA score of the file
 *    }
 *  ]
 */
export class FtaAnalyzer {
  public static getDefaultAnalyzer() {
    return runFta;
  }

  public static analyze(analyzer, project) {
    const output = analyzer(project.path, { json: true });
    return JSON.parse(output);
  }
}