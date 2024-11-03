import path from 'path';
import { FtaAnalyzer } from './fta-analyzer';

export class FtaProjectGroupAnalyzer {
  public analyze(analyzer, projects) {
    const results = this.getCombinedResults(analyzer, projects);
    const uniqueResults = this.getUniqueResults(results);
    const uniqueResultsArray = Array.from(uniqueResults.values());
    return uniqueResultsArray;
  }

  getCombinedResults(analyzer, projects) {
    const combinedResults: any[] = [];

    projects.forEach((project) => {
      const json = FtaAnalyzer.analyze(analyzer, project);
      combinedResults.push(...json);
    });

    return combinedResults;
  }

  normalizer(item) {
    return path.normalize(item.file_name);
  }

  normalizedEitherContainsOther(normalizedOne, normalizedTwo) {
    return (
      normalizedOne.includes(normalizedTwo) ||
      normalizedTwo.includes(normalizedOne)
    );
  }

  getUniqueResults(results) {
    const uniqueResults = new Map();

    results.forEach((item) => {
      const normalizedPath = this.normalizer(item);
      let isDuplicate = false;

      for (let key of uniqueResults.keys()) {
        const normalizedKey = path.normalize(key);
        if (
          this.normalizedEitherContainsOther(normalizedPath, normalizedKey)
        ) {
          isDuplicate = true;
          break;
        }
      }

      if (!isDuplicate) {
        uniqueResults.set(normalizedPath, item);
      }
    });

    return uniqueResults;
  }
}
