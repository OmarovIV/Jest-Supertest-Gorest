module.exports = {
    reporters: [
      "default",
      [
        "jest-html-reporter",
        {
          pageTitle: "Test report",
          outputPath: "./test-report.html"
        }
      ]
    ]
  };