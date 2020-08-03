
let Row = require("./row");

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
      colNumbers[newKey] = getColumnNumberFromCellName(workbook, this.cols[newKey]);

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
        tabRow[key] = getCellValue(cell);
      });

      tabRow.rowNum = rangeRow;
      this.rows.push(tabRow);
    }

  }

  rowsWithCode(code) {
    return this.rows.filter( row => row.code == code );
  }

  get rowsTracked() {
    let trackedCodes = this.spreadsheet.codes.tracked;
    return this.rows.filter( row => trackedCodes.includes(row.code));
  }

}

/**
 * @param {Cell} cell
 */
function getCellValue(cell) {
  let value = cell.value();
  if (!value) return "";
  return (typeof value == "string") ? value : value.text();
}

/**
 * @param {Workbook} workbook
 * @param {string} cellName
 */
function getColumnNumberFromCellName(workbook, cellName) {
  /** @type {Cell} */
  let cell = workbook.definedName(cellName);
  if (!cell) return undefined;
  return cell._columnNumber;
}

const Cell = require("xlsx-populate/lib/Cell");
const Workbook = require("xlsx-populate/lib/Workbook");
const Spreadsheet = require("../spreadsheet/index");

module.exports = Tab;
