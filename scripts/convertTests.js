
// Converts the test suite spreadsheet to JSON

let { NIEMModelQA } = require("niem-model-qa");

NIEMModelQA.saveTestsAsJSON("niem-spreadsheet-qa-tests.xlsx");
console.log("Updated tests.json");
