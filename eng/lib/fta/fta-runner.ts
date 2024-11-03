import { FtaAnalysisOptions } from 'fta-cli';
import { FtaAnalyzer } from './analysis/fta-analyzer';
import { FtaComparer } from './analysis/fta-comparer';
import { FtaProjectGroupAnalyzer } from './analysis/fta-project-group-analyzer';
import { FtaResultAnalyzer, IFtaResultAnalyzer } from './analysis/fta-result-analyzer';
import { FtaLogger } from './fta-logger';
import { FtaReporter, IFtaReporter } from './fta-reporter';

export class FtaRunner {
  private analyzer: (projectPath: string, options: FtaAnalysisOptions) => string;
  private projectGroupAnalyzer: (analyzer: any, projects: any) => any[];
  private resultAnalyzer: IFtaResultAnalyzer;
  private reporter: IFtaReporter;

  constructor() {
    this.analyzer = FtaAnalyzer.getDefaultAnalyzer();
    const projectGroupAnalyzerInstance = new FtaProjectGroupAnalyzer();
    this.projectGroupAnalyzer = (projectGroupAnalyzerInstance.analyze.bind(projectGroupAnalyzerInstance));
    this.resultAnalyzer = new FtaResultAnalyzer(new FtaComparer());
    this.reporter = new FtaReporter(new FtaLogger());
  }

  public run(config: any) {
    const analyzer = this.analyzer;
    const results = this.projectGroupAnalyzer(analyzer, config.projects);
    const result = this.resultAnalyzer.analyze(config, results);
    this.reporter.outputResults(result);
  }

  public setAnalyzer(analyzer: (projectPath: string, options: FtaAnalysisOptions) => string) {
    this.analyzer = analyzer;
  }

  public setProjectGroupAnalyzer(projectGroupAnalyzer: (analyzer: any, projects: any) => any[]) {
    this.projectGroupAnalyzer = projectGroupAnalyzer;
  }

  public setResultAnalyzer(resultAnalyzer: IFtaResultAnalyzer) {
    this.resultAnalyzer = resultAnalyzer;
  }

  public setReporter(reporter: IFtaReporter) {
    this.reporter = reporter;
  }
}
