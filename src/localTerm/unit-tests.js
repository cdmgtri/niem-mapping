
let { Issue } = require("niem-model-qa");
let TabUnitTestsInterface = require("../tab/unit-tests");

class LocalTermTabUnitTests extends TabUnitTestsInterface {

  constructor(qa) {
    super(qa);
    this.tab = this.spreadsheet.localTerm;
  }


}

module.exports = LocalTermTabUnitTests;
