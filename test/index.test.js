
let fs = require("fs");
let path = require("path");

let NIEMSpreadsheet = require("../src/index");
let SpreadsheetQA = require("../src/qa/index");

/**
 * See the test report spreadsheets for specific errors and their locations.
 */


beforeAll( async () => {
  // Make sure the JSON test data has been updated with the latest from the spreadsheet test data
  await SpreadsheetQA.saveTestsAsJSON("niem-spreadsheet-qa-tests.xlsx");
});


/** @type {NIEMSpreadsheet} */
let spread;

describe("Valid example", () => {

  test("qa", async () => {
    let spread = await init("test", "example-valid");

    let issues = spread.qa.results.issues();
    let passed = spread.qa.results.passed();

    expect(issues.length).toBe(0);
    expect(spread.qa.results.tests.ran.length).toBeGreaterThan(1);
    expect(passed).toBeTruthy();
  });

});


/**
 * @todo Link in the test spreadsheet for more issue information
 */
describe("Invalid spreadsheet format", () => {

  describe("Missing tabs", () => {

    beforeAll( async () => {
      spread = await init("test", "example-invalid-missingTabs");
    });

    callTest(() => spread, "spreadsheet_tab_missing", 3);

  })

  describe("Missing columns", () => {

    beforeAll( async () => {
      spread = await init("test", "example-invalid-missingCols");
    });

    callTest(() => spread, "spreadsheet_column_missing", 9);

  });

});


describe("Invalid example", () => {

  beforeAll( async () => {
    spread = await init("test", "example-invalid-data");
  });

  describe("Spreadsheet checks", () => {

    callTest(() => spread, "spreadsheet_code_invalid", 7, "MAP");
    callTest(() => spread, "spreadsheet_field_missing", 19);
    callTest(() => spread, "spreadsheet_field_name", 3, "ext:QualifiedNameType")
    callTest(() => spread, "spreadsheet_field_qname", 3, "TextType")

  })

  describe("Property tab checks", () => {

    callTest(() => spread, "property_style_invalid", 3);

  });

  describe("Type tab checks", () => {

    callTest(() => spread, "type_style_invalid", 2);

  });

  describe("Code tab checks", () => {

    callTest(() => spread, "facet_style_invalid", 3);

  });

});



/**
 * Jest test for the given test ID checking for the expected number of issues, and optionally
 * the expected problem values.
 *
 * @param {Function} getNIEMSpreadsheet
 * @param {String} testID
 * @parm {Number} expectedCount
 * @parm {String} expectedProblemValue
 */
function callTest(getNIEMSpreadsheet, testID, expectedCount, expectedProblemValue) {

  test(testID, () => {

    /** @type {NIEMSpreadsheet} */
    let spread = getNIEMSpreadsheet();

    let test = spread.qa.tests.find(testID);
    expect(test.issues.length).toBe(expectedCount);

    if (expectedProblemValue) {
      let issue = test.issues.find( issue => issue.problemValue == expectedProblemValue );
      expect(issue).not.toBeNull();
    }

  });

}


async function init(folder, fileName) {
  let filePath = path.resolve(folder, fileName + ".xlsx");
  let buffer = fs.readFileSync(filePath);
  let spread = new NIEMSpreadsheet(buffer);
  await spread.import();
  await spread.qa.report.saveAsFile("test/" + fileName + "-qa", [], [], {sourceFormat: "spreadsheet"});
  return spread;
}

/**
 * Save the ran tests to a JSON file.
 *
 * @param {String} fileStem
 * @param {NIEMMapping} mapping
 * @param {Boolean} [issuesOnly=true]
 */
function saveTests(fileStem, mapping, issuesOnly=true) {
  let testList = issuesOnly ? mapping.failedTests : mapping.tests;
  let json = JSON.stringify(testList, null, 2);
  fs.writeFileSync(`test/example-${fileStem}-issues.json`, json);
}
