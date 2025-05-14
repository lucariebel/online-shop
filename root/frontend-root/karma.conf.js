module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      // Hier werden alle Test-Dateien eingebunden
      "src/**/*.spec.ts",
    ],
    preprocessors: {
      "src/**/*.spec.ts": ["@angular-devkit/build-angular"],
    },
    plugins: [
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-jasmine-html-reporter",
      "@angular-devkit/build-angular",
    ],
    browsers: ["ChromeHeadless"], // Headless Chrome für CI verwenden
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu"],
      },
    },
    reporters: ["progress", "kjhtml"], // Fortschrittsanzeige und HTML-Reporter
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false, // Auf true setzen, wenn Tests nur einmal laufen sollen
    restartOnFileChange: true,
  });
};
