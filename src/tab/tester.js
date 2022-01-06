
let { NIEMModelQA, NIEMObjectTester, QATypeDefs } = require('niem-model-qa');
let TabUnitTests = require("./unit-tests");

let { NIEMModelQADef, TestDef } = QATypeDefs;

/**
 * @template {TabUnitTests} TAB_UNIT_TESTS
 */
class TabTester extends NIEMObjectTester {

  /**
   * @param {NIEMModelQADef} qa
   * @param {TAB_UNIT_TESTS} tabUnitTests
   */
  constructor(qa, tabUnitTests) {
    super(qa);

    // /** @type {TAB_UNIT_TESTS} */
    this.tests = tabUnitTests;

    /**
     * @param {Workbook} workbook
     * @returns {Promise<NIEMModelQA>}
     */
    this.run = () => this.runTests();

  }

  /**
   * Run all unit tests
   */
  async runTests() {

    /** @type {TestDef[]} */
    let tests = [];

    // Get function names from the Tester class to be run as tests
    let testNames = this.fieldTestNames();

    // Add an update to the progress tracker
    let label = Object.getPrototypeOf(this.tests).constructor.name;
    let update = this.qa.startUpdate(label, null, testNames.length);

    // Run and log tests
    for (let testName of testNames) {
      let test = await this.tests[testName]();
      tests.push(test);
    }

    // debug(`Ran ${label} tests`);

    // Close out the progress tracker update
    let passed = tests.filter(test => test.passed);
    update.end(passed);

  }

  /**
   * Find all unit test names for the given field.
   * @private
   */
  fieldTestNames() {

    // Get all properties and methods from the unit test class
    let testsPrototype = Object.getPrototypeOf(this.tests);
    let parentPrototype = Object.getPrototypeOf(testsPrototype);

    let testFunctions = []
    .concat( Object.getOwnPropertyNames(parentPrototype) )
    .concat( Object.getOwnPropertyNames(testsPrototype) );

    // Return all unit tests, minus the constructor and helpers
    return testFunctions.filter( fn => fn != "constructor"  && ! fn.startsWith("__"));

  }


}

module.exports = TabTester;
