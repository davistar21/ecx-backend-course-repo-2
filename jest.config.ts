import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true, // Optional: Show detailed results for tests
  collectCoverage: true, // Optional: Collect code coverage
  coverageDirectory: "coverage",
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"], // Define test files
};

export default config;
