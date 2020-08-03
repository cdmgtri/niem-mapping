
let { NIEM, Release, Type, Facet, Namespace, Interfaces } = require("niem-model");

let NIEMSpreadsheetQA = require("./qa/index");

let FormatQA = require("./qa/index");
let Utils = require("./utils/index");
let Spreadsheet = require("./spreadsheet/index");

let { NIEMFormatInterface } = Interfaces.FormatInterface;

class NIEMSpreadsheet extends NIEMFormatInterface {

  /**
   * @param {Buffer} buffer - NIEM mapping spreadsheet loaded into buffer
   * @param {NIEM} niem
   */
  constructor(buffer, niem) {

    super();

    /**
     * A NIEM XLSX file read into a buffer
     */
    this.buffer = buffer;

    /**
     * A set of existing NIEM data or a newly initialized NIEM data source
     */
    this.niem = niem || new NIEM();

    /**
     * The tabs, columns, rows, and cells of a NIEM spreadsheet
     */
    this.spreadsheet = new Spreadsheet();

    this.qa = new NIEMSpreadsheetQA(this.spreadsheet);

    /**
     * Spreadsheet data loaded into a NIEM release object.
     * @type {Release}
     */
    this.data;

  }

  /**
   * Parse, load, and test the data.
   *
   * @param {boolean} [quitOnFormatErrors=false] True to skip model QA and import if formatting errors found
   *
   * @throws Spreadsheet format invalid
   * @throws Modeling
   */
  async import(quitOnFormatErrors=false) {

    // Parse the file buffer into the NIEM spreadsheet object
    await Utils.parseSpreadsheet(this.buffer, this.spreadsheet);

    // Load spreadsheet format tests
    await this.qa.init();

    // await this.qa.tests.loadSpreadsheet("niem-xlsx-qa-tests.xlsx");
    await this.qa.run();
    // FormatQA.checkFormat(this, this.qa._tests, );

    return;

    // this.status.validFormat = this.qa.testSuite.passed();

    // Optional break on errors
    if (quitOnFormatErrors && !this.status.validFormat) return;

    // Load the spreadsheet object into a NIEM release object
    await this.loadData();

    // Run modeling tests from niem-model-qa
    let update = this.status.startUpdate("Modeling checks",
      "Check model-based NDR rules and NIEM best practices (partially implemented).");
    this.qa.testSuite.loadModelTests();
    await this.qa.checkRelease(this.data);
    update.done();

    return this.data;
  }

  /**
   * @todo Add other tab data
   * @todo Load base NIEM release
   *
   * @param {String} userName
   * @param {String} modelName
   * @param {String} releaseName
   */
  async loadData(userName="user", modelName="model", releaseName="release") {

    this.data = await this.niem.releases.add(userName, modelName, releaseName);

    let typeCols = this.spreadsheet.type.cols;

    for (let row of this.spreadsheet.type.rows) {
      if (row[typeCols.Code] == "add") {
        let type = await this.data.types.add(
          row[typeCols.TargetPrefix],
          row[typeCols.TargetName],
          row[typeCols.TargetDefinition],
          row[typeCols.TargetStyle] || "object",
          row[typeCols.TargetBase]
        );
        type.input_location = this.spreadsheet.type.name;
        type.input_line = Utils.getRow(row);
      }
    }


    let facetCols = this.spreadsheet.facet.cols;

    for (let row of this.spreadsheet.facet.rows) {
      if (row[facetCols.Code] == "add") {
        let facet = await this.data.facets.add(
          row[facetCols.TargetPrefix] + ":" + row[facetCols.TargetName],
          row[facetCols.TargetValue],
          row[facetCols.TargetDefinition],
          row[facetCols.TargetKind] || "enumeration"
        );
        facet.input_location = this.spreadsheet.facet.name;
        facet.input_line = Utils.getRow(row);
      }
    }


    let nsCols = this.spreadsheet.namespace.cols;

    for (let row of this.spreadsheet.namespace.rows) {
      if (row[nsCols.Code] == "add") {
        let ns = await this.data.namespaces.add(
          row[nsCols.TargetPrefix],
          row[nsCols.TargetStyle],
          row[nsCols.TargetURI],
          row[nsCols.TargetFileName],
          row[nsCols.TargetDefinition],
          row[nsCols.TargetDraftVersion],
        );
        ns.input_location = this.spreadsheet.namespace.name;
        ns.input_line = Utils.getRow(row);
      }
    }

  }

}

module.exports = NIEMSpreadsheet;
