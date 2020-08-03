
let { NIEMModelQA, Test } = require("niem-model-qa");

let Spreadsheet = require("../spreadsheet/index");
let TabTester = require("../tab/tester");

let PropertyTabUnitTests = require("../property/unit-tests");
let TypeTabUnitTests = require("../type/unit-tests");
let FacetTabUnitTests = require("../facet/unit-tests");
let SubPropertyUnitTests = require("../subProperty/unit-tests");
let NamespaceUnitTests = require("../namespace/unit-tests");

class NIEMSpreadsheetQA extends NIEMModelQA {

  /**
   * @param {Spreadsheet} spreadsheet
   */
  constructor(spreadsheet) {

    super();

    this.spreadsheet = spreadsheet;

    /** @type {TabTester<PropertyTabUnitTests>} */
    let propertyTab = new TabTester(this, new PropertyTabUnitTests(this));

    /** @type {TabTester<TypeTabUnitTests>} */
    let typeTab = new TabTester(this, new TypeTabUnitTests(this));

    /** @type {TabTester<FacetTabUnitTests>} */
    let facetTab = new TabTester(this, new FacetTabUnitTests(this));

    /** @type {TabTester<SubPropertyUnitTests>} */
    let subPropertyTab = new TabTester(this, new SubPropertyUnitTests(this));

    /** @type {TabTester<NamespaceUnitTests>} */
    let namespaceTab = new TabTester(this, new NamespaceUnitTests(this));

    this.objects = {
      propertyTab,
      typeTab,
      subPropertyTab,
      facetTab,
      namespaceTab
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
    await this.objects.typeTab.run();
    await this.objects.subPropertyTab.run();
    await this.objects.facetTab.run();
    await this.objects.namespaceTab.run();

  }

}

module.exports = NIEMSpreadsheetQA;
