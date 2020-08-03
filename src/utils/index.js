
let XLSX = require("xlsx-populate");

let { Workbook, Cell, Range, Row } = XLSX;


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
   * @param {Cell} cell
   */
  static getCellValue(cell) {
    let value = cell.value();
    if (!value) return "";
    return (typeof value == "string") ? value : value.text();
  }

  /**
   * @param {Workbook} workbook
   * @param {string} cellName
   */
  static getColumnNumberFromCellName(workbook, cellName) {
    /** @type {Cell} */
    let cell = workbook.definedName(cellName);
    if (!cell) return undefined;
    return cell._columnNumber;
}


}

let Spreadsheet = require("../spreadsheet/index");
let Tab = require("../tab/index");

module.exports = Utils;

