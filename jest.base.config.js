// https://blog.angularindepth.com/integrate-jest-into-an-angular-application-and-library-163b01d977ce
module.exports = {
    "preset": "jest-preset-angular",
    "setupTestFrameworkScriptFile": "<rootDir>/src/setupJest.ts",
    "collectCoverage": true,
    "coverageReporters": [
        "json",
        "lcov",
        "text",
        "clover",
        "html"
    ],
    "coverageDirectory": "./reports/coverage/html",
    "coveragePathIgnorePatterns": [
        "/node_modules/",
        "jestGlobalMocks",
        "src/lib/testing",
        "src/setupJest.ts",
        "dist/",
        "src/app/search",
        "lib/helper-functions/helper-functions.ts",
    ],
    "coverageThreshold": {
        "global": {
            "branches": 65,
            "functions": 80,
            "lines": 80,
            "statements": 80
        }
    },
    modulePaths: ['<rootDir>/dist']
};
