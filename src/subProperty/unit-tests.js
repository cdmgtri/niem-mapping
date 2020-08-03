
let { Issue } = require("niem-model-qa");
let TabUnitTestsInterface = require("../tab/unit-tests");

class SubPropertyTabUnitTests extends TabUnitTestsInterface {

  constructor(qa) {
    super(qa);
    this.tab = this.spreadsheet.subProperty;
  }

  /**
   * A valid minOccurs value (or blank) is required in the 'Min' column.
   *
   * @example "Valid values include 0, 1, and a blank value (defaults to 0)."
   */
  min_invalid() {

    let test = this.qa.tests.start("subProperty_min_invalid");

    let problemRows = this.tab.rows.filter( row => row.targetMin != "" && ! Number.isInteger(row.targetMin) );

    let issues = problemRows.map( row => {
      return new Issue(row.targetPrefix, row.label, this.tab.name, row.rowNum, this.tab.colLabels.targetMin, row.targetMin, "A subProperty min must be an integer or blank (defaults to 0).");
    });

    return test.log(issues);

  }

  /**
   * A valid maxOccurs value (or blank) is required in the 'Max' column.
   *
   * @example "Valid values include "unbounded", 1, 2, ..., and a blank value (defaults to "unbounded" for elements, 1 for attributes)."
   */
  max_invalid() {

    let test = this.qa.tests.start("subProperty_max_invalid");

    let problemRows = this.tab.rows
    .filter( row => row.targetMax !== "" && row.targetMax != "unbounded")
    .filter( row => {
      if (typeof row.targetMax == "string") {
        return row.targetMax != "" && row.targetMax != "unbounded";
      }
      if (typeof row.targetMax == "number") {
        return ! Number.isInteger(row.targetMax) || row.targetMax <= 0;
      }
      return true;
    });

    let issues = problemRows.map( row => {
      return new Issue(row.targetPrefix, row.label, this.tab.name, row.rowNum, this.tab.colLabels.targetMax, row.targetMax, "A subProperty max must be 'unbounded' or a positive integer value.");
    });

    return test.log(issues);

  }


}

module.exports = SubPropertyTabUnitTests;
