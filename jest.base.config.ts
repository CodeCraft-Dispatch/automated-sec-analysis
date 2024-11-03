
export default {
    preset: "ts-jest",
    displayName: "base-tests-config",
    testEnvironment: "node",
    verbose: false,
    cache: false,
    moduleFileExtensions: ["js", "ts"],
    collectCoverage: true,
    collectCoverageFrom: ["**/*.ts", "!**/*.spec.js", "!**/*.config.js", "!**/*.config.ts"],
    coverageReporters: ["text-summary", "cobertura", "lcov"],
    coverageThreshold: {
        global: {
            branches: -1,
            functions: -1,
            lines: -5,
            statements: -5,
        },
    }
};
