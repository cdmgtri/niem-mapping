
let { Issue } = require("niem-model-qa");
let TabUnitTestsInterface = require("../tab/unit-tests");

class PropertyTabUnitTests extends TabUnitTestsInterface {

  constructor(qa) {
    super(qa);
    this.tab = this.spreadsheet.property;
  }

  /**
   * A valid style value (or blank) is required in the 'Style' column.
   *
   * @example "Valid styles are 'element', 'attribute', 'abstract', or a blank value (defaults to 'element')."
   */
  style_invalid() {

    let test = this.qa.tests.start("property_style_invalid");

    let problemRows = this.tab.rows.filter( row => !this.tab.styles.includes(row.targetStyle) );

    let issues = problemRows.map( row => {
      return new Issue(row.targetPrefix, row.label, this.tab.name, row.rowNum, this.tab.colLabels.targetStyle, row.targetStyle, "A property style must be 'element', 'attribute', 'abstract', or left blank.")
    });

    return test.log(issues);

  }


}

module.exports = PropertyTabUnitTests;
