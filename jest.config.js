module.exports = {
  preset: "ts-jest",
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: ["**/src/**/*.ts"],
  coveragePathIgnorePatterns: ["src/interfaces"],
};
