
let { NIEMModelQA, Test } = require("niem-model-qa");

let Spreadsheet = require("../spreadsheet/index");
let TabTester = require("../tab/tester");

let PropertyTabUnitTests = require("../property/unit-tests");

class NIEMSpreadsheetQA extends NIEMModelQA {

  /**
   * @param {Spreadsheet} spreadsheet
   */
  constructor(spreadsheet) {

    super();

    this.spreadsheet = spreadsheet;

    /** @type {TabTester<PropertyTabUnitTests>} */
    let propertyTab = new TabTester(this, new PropertyTabUnitTests(this));

    this.objects = {
      propertyTab

    };


  }

  /**
   * Initialize the QA test suite.
   */
  async init() {
    // Convert JSON test descriptions into test objects and add
    let JSONTests = require("../../niem-spreadsheet-qa-tests.json");
    let tests = JSONTests.map( metadata => Object.assign(new Test(), metadata) );
    this.tests.add(tests);
  }

  /**
   * @param {boolean} [reset=true] True (default) to reset existing test suite
   */
  async run(reset=true) {

    if (reset) this.tests.reset();

    // Run tests
    await this.objects.propertyTab.run();

  }

}

const { Workbook } = require("xlsx-populate");

module.exports = NIEMSpreadsheetQA;
