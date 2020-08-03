
let { Issue } = require("niem-model-qa");
let TabUnitTestsInterface = require("../tab/unit-tests");

class FacetTabUnitTests extends TabUnitTestsInterface {

  constructor(qa) {
    super(qa);
    this.tab = this.spreadsheet.facet;
  }

  /**
   * A valid style value (or blank) is required in the 'Style' column.
   *
   * @example "Valid styles include 'enumeration', 'pattern', 'length', 'minInclusive', and a blank value (defaults to 'enumeration')."
   */
  style_invalid() {

    let test = this.qa.tests.start("facet_style_invalid");

    let problemRows = this.tab.rows.filter( row => ! this.tab.styles.includes(row.targetStyle) );

    let issues = problemRows.map( row => {
      return new Issue(row.targetPrefix, row.label, this.tab.name, row.rowNum, this.tab.colLabels.targetStyle, row.targetStyle, "A facet style must be one of the valid values in the drop-down list, or blank to default to 'enumeration'.");
    });

    return test.log(issues);

  }


}

module.exports = FacetTabUnitTests;
