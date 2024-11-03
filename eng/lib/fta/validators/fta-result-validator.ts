
export class FtaResultValidator {
  static isInvalid(results: Array<Object>): Object | boolean {
    return FtaResultValidator.isEmpty(results);
  }

  static isEmpty(results: Array<Object>): Object | boolean {
    const emptyResults = !results || results.length === 0;

    if (emptyResults) {
      return { emptyResult: true };
    } else {
      return false;
    }
  }
}
