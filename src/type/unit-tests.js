
let { Issue } = require("niem-model-qa");
let TabUnitTestsInterface = require("../tab/unit-tests");

class TypeTabUnitTests extends TabUnitTestsInterface {

  constructor(qa) {
    super(qa);
    this.tab = this.spreadsheet.type;
  }

  /**
   * A valid style value (or blank) is required in the 'Style' column.
   *
   * @example "Valid styles include 'object', 'augmentation', 'CSC', 'simple', and a blank value (defaults to 'object')."
   */
  style_invalid() {

    let test = this.qa.tests.start("type_style_invalid");

    let problemRows = this.tab.rows.filter( row => ! this.tab.styles.includes(row.targetStyle) );

    let issues = problemRows.map( row => {
      return new Issue(row.targetPrefix, row.label, this.tab.name, row.rowNum, this.tab.colLabels.targetStyle, row.targetStyle, "A type style must be one of the valid values in the drop-down list, or blank to default to 'object'.");
    });

    return test.log(issues);

  }


}

module.exports = TypeTabUnitTests;
