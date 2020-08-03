
let { Issue } = require("niem-model-qa");
let UnitTestsInterface = require("../qa/unit-tests");
const { REF } = require("xlsx-populate/lib/FormulaError");

class TabUnitTests extends UnitTestsInterface {

  /**
   * Check to see if this tab appears in the spreadsheet.
   *
   * @example "Tab 'Property' should appear in the spreadsheet."
   */
  tab_missing() {

    let test = this.qa.tests.start("spreadsheet_tab_missing");

    if (this.tab.provided == false) {
      let issue = new Issue("", "Spreadsheet", this.tab.name, "", "", "", `Tab '${this.tab.name}' should appear in this spreadsheet.  Use the NIEM Spreadsheet template to get the required tabs and columns.`);
      return test.log([issue]);
    }

    return test.log([]);

  }

  /**
   * Check the tab for missing columns.
   * Columns are identified by a pre-defined cell name from the template in the first row.
   *
   * @example `The Property tab should have a column for the mapping code identified by cell name 'Property_Mapping_Code' in the first row.`
   *
   * Note:
   * - Columns are not identified by position because some users like to add new columns to capture
   *   additional metadata.
   * - Columns are not identified by the expected column header (value in the first row) because some
   *   users like to rename the headers.
   */
  column_missing() {

    let test = this.qa.tests.start("spreadsheet_column_missing");

    let issues = this.tab.missingColumnCellNames.map( missingCellName => {
      let cellName = this.tab.cols[missingCellName];
      let colHeader = this.tab.colLabels[missingCellName];

      return new Issue("", "", this.tab.name, "", colHeader, cellName, `Column '${colHeader}' is expected with defined cell name ${cellName} in the first row.`);
    });

    return test.log(issues);

  }

  /**
   * Check the tab for blank or invalid mapping codes.  These codes explain how the row should be processed.
   *
   * @example "Valid mapping codes include 'add', 'edit', 'delete', and 'comment'."
   */
  code_invalid() {

    let test = this.qa.tests.start("spreadsheet_code_invalid");
    let validCodes = this.spreadsheet.codes.valid;

    let problemRows = this.tab.rows.filter( row => ! validCodes.includes(row.code) );

    let issues = problemRows.map( row => {
      return new Issue(row.prefix, row.label, this.tab.name, row.rowNum, this.tab.colLabels.code, row.code, "Valid mapping codes include 'add', 'edit', 'delete', 'comment', 'map', and 'subset'.");
    })

    return test.log(issues);

  }

  /**
   * Check each row in the tab for missing fields based on the given mapping code.
   *
   * @example "For a row with mapping code 'add', the target prefix, name, and definition fields are required."
   * @example "For a row with mapping code 'edit', the source prefix and name are required."
   */
  field_missing() {

    let test = this.qa.tests.start("spreadsheet_field_missing");

    /** @type {Issue[]} */
    let issues = [];

    for (let row of this.tab.rowsTracked) {
      let requiredFields = this.tab.requiredFields[row.code];
      for (let requiredField of requiredFields) {
        if (!row[requiredField]) {
          let issue = new Issue(row.prefix, row.label, this.tab.name, row.rowNum, requiredField, "(missing value)", `A value is required for ${row.code} rows in column ${requiredField}`);
          issues.push(issue);
        }
      }
    }

    return test.log(issues);

  }

  /**
   * Check the tab for qualified names in columns that should only have names (no namespace prefix) instead.
   *
   * @example "For the 'Property Name' column in the 'Property' tab, a valid name would be 'Person'."
   * @example "For the 'Property Name' column in the 'Property' tab, an invalid name would be 'nc:Person'."
   */
  field_name() {

    let test = this.qa.tests.start("spreadsheet_field_name");

    /** @type {Issue[]} */
    let issues = [];

    for (let nameField of this.tab.nameFields) {

      this.tab.rowsTracked
      .filter( row => row[nameField].includes(":") )
      .forEach( row => {
        let issue = new Issue(row.prefix, row.label, this.tab.name, row.rowNum, this.tab.colLabels[nameField], row[nameField], `Column ${this.tab.colLabels[nameField]} should not contain a namespace prefix}`);
        issues.push(issue);
      });

    }

    return test.log(issues);

  }

  /**
   * Check the tab for names in columns that should have qualified names (includes the namespace prefix) instead.
   *
   * @example "For the 'Qualified Data Type' column in the 'Property' tab, a valid qname would be 'nc:PersonType' (includes the namespace prefix)."
   *
   * @example "For the 'Qualified Data Type' column in the 'Property' tab, an invalid qname would be 'PersonType' (no namespace prefix)."
   */
  field_qname() {

    let test = this.qa.tests.start("spreadsheet_field_qname");

    /** @type {Issue[]} */
    let issues = [];

    for (let nameField of this.tab.qnameFields) {

      this.tab.rowsTracked
      .filter( row => row[nameField] != "" && row[nameField] != "NONE" && !row[nameField].includes(":") )
      .forEach( row => {
        let issue = new Issue(row.prefix, row.label, this.tab.name, row.rowNum, this.tab.colLabels[nameField], row[nameField], `Column '${this.tab.colLabels[nameField]}' should not contain a namespace prefix}`);
        issues.push(issue);
      });

    }

    return test.log(issues);

  }


}

module.exports = TabUnitTests;
