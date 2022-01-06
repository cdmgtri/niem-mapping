
let XLSX = require("xlsx-populate");

let { Workbook, Cell, Range, Row } = XLSX;

let CellDef = new Cell();
let WorkbookDef = new Workbook();

class Utils {

  /**
   * Loads data from the NIEM mapping spreadsheet into an XLSX workbook
   *
   * @todo Refactor with NIEM.Utils.XLSX.parse
   *
   * @param {Buffer} buffer
   * @param {Spreadsheet} spreadsheet
   *
   * @throws Spreadsheet format invalid
   */
  static async parseSpreadsheet(buffer, spreadsheet) {

    let workbook = await XLSX.fromDataAsync(buffer);

    /** @type {Tab[]} */
    let tabs = Object.values(spreadsheet);

    // Load spreadsheet rows for each expected tabs
    for (let tab of tabs) {
      tab.parse(workbook);
    }

  }

  /**
   * @param {CellDef} cell
   */
  static getCellValue(cell) {
    let value = cell.value();
    if (value == null) return "";
    let valueType = typeof value;
    return (valueType == "string" || valueType == "number") ? value : value.text();
  }

  /**
   * @param {WorkbookDef} workbook
   * @param {string} cellName
   */
  static getColumnNumberFromCellName(workbook, cellName) {
    /** @type {CellDef} */
    let cell = workbook.definedName(cellName);
    if (!cell) return undefined;
    return cell.columnNumber;
}


}

let Spreadsheet = require("../spreadsheet/index");
let Tab = require("../tab/index");

module.exports = Utils;

