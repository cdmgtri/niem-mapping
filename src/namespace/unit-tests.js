
let { Issue } = require("niem-model-qa");
let TabUnitTestsInterface = require("../tab/unit-tests");

class NamespaceTabUnitTests extends TabUnitTestsInterface {

  constructor(qa) {
    super(qa);
    this.tab = this.spreadsheet.namespace;
  }

  /**
   * A valid style value (or blank) is required in the 'Style' column.
   *
   * @example "Valid styles include 'object', 'augmentation', 'CSC', 'simple', and a blank value (defaults to 'object')."
   */
  style_invalid() {

    let test = this.qa.tests.start("namespace_style_invalid");

    let problemRows = this.tab.rows.filter( row => row.targetStyle != "" && ! this.tab.styles.includes(row.targetStyle) );

    let issues = problemRows.map( row => {
      return new Issue(row.targetPrefix, row.label, this.tab.name, row.rowNum, this.tab.colLabels.targetStyle, row.targetStyle, "A namespace style must be one of the valid values in the drop-down list or blank.");
    });

    return test.log(issues);

  }


}

module.exports = NamespaceTabUnitTests;
