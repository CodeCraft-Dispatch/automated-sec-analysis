
import * as base from "../../jest.base.config";

module.exports = {
  ...base.default,
  displayName: "quality-gates",
  testMatch: ["**/quality-gates/**/*.spec.ts"], // Ensure it matches your JS test files
  coverageDirectory: "<rootDir>../../coverage/quality-gates",
};
