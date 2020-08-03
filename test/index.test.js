
let fs = require("fs");
let path = require("path");

let NIEMSpreadsheet = require("../src/index");
let SpreadsheetQA = require("../src/qa/index");

beforeAll( async () => {
  // Make sure the JSON test data has been updated with the latest from the spreadsheet test data
  await SpreadsheetQA.saveTestsAsJSON("niem-spreadsheet-qa-tests.xlsx");
});


/** @type {NIEMSpreadsheet} */
let spread;

describe("Valid example", () => {

  test("qa", async () => {
    let spread = await init("iepd-requirements", "iepd-requirements-example");

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
      spread = await init("iepd-requirements", "iepd-requirements-example-invalid-missingTabs");
    });

    callTest(() => spread, "spreadsheet_tab_missing", 2);

  })

  describe("Missing columns", () => {

    beforeAll( async () => {
      spread = await init("iepd-requirements", "iepd-requirements-example-invalid-missingCols");
    });

    // Four missing columns or deleted column cell names in tab Property; two in tab Type
    callTest(() => spread, "spreadsheet_column_missing", 6);

  });

});


describe("Invalid example", () => {

  beforeAll( async () => {
    spread = await init("iepd-requirements", "iepd-requirements-example-invalid");
  });

  describe("Spreadsheet checks", () => {

    // Property tab: 2 blank mapping codes, "MAP" (upper case of a valid code), and "use" (unknown)
    // Type tab: 3 invalid mapping codes ("x", "y", "z")
    callTest(() => spread, "spreadsheet_code_invalid", 7, "MAP");

    // Empty rows at the end of Property with codes add, edit, delete, map, subset, and clear
    // Empty rows in Type with codes add and edit
    callTest(() => spread, "spreadsheet_field_missing", 19);

    // Property tab, Property Name column: "nc:OrganizationTaxIdentification", "ext:MusicGroupGenreText"
    // Type tab, Type Name column: "nc:PersonType"
    callTest(() => spread, "spreadsheet_field_name", 3, "ext:QualifiedNameType")

    // Property tab, Qualified Data Type column: "IdentificationType", "TextType"
    // Type tab, Qualified Parent / Base Type column: "ObjectType"
    callTest(() => spread, "spreadsheet_field_qname", 3, "TextType")

  })

  describe("Property tab checks", () => {

    // Style column: "elt" (twice) and "none"
    callTest(() => spread, "property_style_invalid", 3);

  });

  describe("Type tab checks", () => {

    // Style column: "none", "AUG"
    callTest(() => spread, "type_style_invalid", 2);

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


async function init(exampleFolder, fileName) {
  let filePath = path.resolve("examples", exampleFolder, fileName + ".xlsx");
  let buffer = fs.readFileSync(filePath);
  let spread = new NIEMSpreadsheet(buffer);
  await spread.import();
  await spread.qa.report.saveAsFile("test/report-" + fileName, [], [], {sourceFormat: "spreadsheet"});
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
