
let XLSX = require("xlsx-populate");

let { Workbook, Cell, Range, Row } = XLSX;


class Utils {

  static getRow(row) {
    // Adjust row for 0-based index
    return row["__rowNum__"] + 1;
  }

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

    // Load spreadsheet rows for each expected tabs
    Object.values(spreadsheet).forEach( tab => {
      tab.parse(workbook);
    });

  }

  static deepCopy(object) {
    return JSON.parse(JSON.stringify(object));
  }


}

let Spreadsheet = require("../spreadsheet/index");


module.exports = Utils;

