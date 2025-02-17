import * as base from "../../jest.base.config";

module.exports = {
    ...base.default,
    displayName: "engine-library",
    testMatch: ["**/*.spec.ts"], // Ensure it matches your JS test files
    coverageDirectory: "<rootDir>../../coverage/engine-library",
    coverageThreshold: {
        global: {
            branches: -1,
            functions: -1,
            lines: -1,
            statements: -1,
        },
    },
    transform: {
        "^.+\\.ts$": ["ts-jest", {
            tsconfig: 'eng/lib/tsconfig.englib.json'
        }]
    }
};
