import { FtaAnalyzer } from "./fta-analyzer";

describe("ftaAnalyzer", () => {
  it("should have a getDefaultAnalyzer function", () => {
    expect(FtaAnalyzer.getDefaultAnalyzer).toBeDefined();
    expect(FtaAnalyzer.getDefaultAnalyzer).toBeInstanceOf(Function);
  });
  it("should have an analyze function", () => {
    expect(FtaAnalyzer.analyze).toBeDefined();
    expect(FtaAnalyzer.analyze).toBeInstanceOf(Function);
  });
  it("should return results from provided analyzer", () => {
    const analyzer = function (project) {
      return JSON.stringify(project);
    };
    const project = {
      name: "root",
      path: ".",
    };
    const results = FtaAnalyzer.analyze(analyzer, project);
    expect(results).toEqual(project.path);
  });
  it("should provide default analyzer function", () => {
    const analyzer = FtaAnalyzer.getDefaultAnalyzer();
    expect(analyzer).toBeDefined();
    expect(analyzer).toBeInstanceOf(Function);
  });
});
