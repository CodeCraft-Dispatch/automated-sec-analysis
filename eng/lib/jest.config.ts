import * as base from "../../jest.base.config";

module.exports = {
    ...base.default,
    displayName: "engine-library",
    testMatch: ["**/*.spec.ts"], // Ensure it matches your JS test files
    coverageDirectory: "<rootDir>../../coverage/engine-library",
};
