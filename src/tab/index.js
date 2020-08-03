
let Row = require("./row");
let Utils = require("../utils/index");

/**
 * @template {Row} ROW
 */
class Tab {

  /**
   * @param {Spreadsheet} spreadsheet
   * @param {String} tabName
   */
  constructor(spreadsheet, tabName) {

    this.spreadsheet = spreadsheet;

    this.name = tabName;

    /** @type {typeof Row} */
    this.rowClass;

    /** @type {ROW} */
    this.cols;

    /** @type {ROW} */
    this.colLabels;

    /** @type {ROW} */
    this.fields;

    /** @type {ROW[]} */
    this.rows = [];

    this.requiredFields = {
      /** @type {String[]} */
      add: [],

      /** @type {String[]} */
      edit: [],

      /** @type {String[]} */
      delete: [],

      /** @type {String[]} */
      map: [],

      /** @type {String[]} */
      subset: [],

      /** @type {String[]} */
      clear: [],
    };

    this.requiredFields.delete = this.requiredFields.edit;
    this.requiredFields.clear = this.requiredFields.edit;

    this.nameFields = [];
    this.qnameFields = [];

    /** True if the input included this tab; false if it was missing or unrecognized because of rename */
    this.provided = false;

    /** An array of expected columns that were not found when loading the tab */
    this.missingColumnCellNames = [];

  }

  get hasData() {
    return this.rows.length > 0;
  }

  get codes() {
    return {

      value: {
        add: "add",
        edit: "edit",
        delete: "delete",
        comment: "comment",
        no_change: "no change",
        map: "map",
        subset: "subset",
        no_match: "no match",
        documentation: "documentation",
        clear: "clear"
      },

      valid: ["add", "edit", "delete", "comment", "no change", "map", "subset", "no match", "documentation", "clear"],

      tracked: ["add", "edit", "delete", "map", "subset", "clear"],
    }
  }

  /**
   * Convert row object keys from spreadsheet column headers (user may have made changes) to known values
   * based on column header cell names.
   *
   * @param {Workbook} workbook
   */
  parse(workbook) {

    let sheet = workbook.sheet(this.name);

    if (!sheet) return;

    this.provided = true;
    let range = sheet.usedRange();

    // Get the row keys used in this project
    let newKeys = Object.keys(this.cols);

    // Map header column header cell names to column numbers
    let colNumbers = {};

    for (let newKey of newKeys) {
      // Look up the column number of the header cell name linked for each row key
      colNumbers[newKey] = Utils.getColumnNumberFromCellName(workbook, this.cols[newKey]);

      if (colNumbers[newKey] == undefined) {
        this.missingColumnCellNames.push(newKey);
      }
    }

    // For each row after the header, load the cell values into a new row object
    for (let rangeRow = 2; rangeRow <= range._numRows; rangeRow++) {
      let tabRow = new this.rowClass();

      Object.keys(tabRow).forEach( key => {
        let colNum = colNumbers[key];
        let cell = sheet.row(rangeRow).cell(colNum);
        tabRow[key] = Utils.getCellValue(cell);
      });

      tabRow.rowNum = rangeRow;
      this.rows.push(tabRow);
    }

  }

  rowsWithCode(code) {
    return this.rows.filter( row => row.code == code );
  }

  get rowsTracked() {
    return this.rows.filter( row => this.codes.tracked.includes(row.code));
  }

}

const Workbook = require("xlsx-populate/lib/Workbook");
const Spreadsheet = require("../spreadsheet/index");

/**
 * @type {"add"|"edit"|"delete"|"map"|"subset"|"clear"}
 */
Tab.TrackedCodes;

module.exports = Tab;
