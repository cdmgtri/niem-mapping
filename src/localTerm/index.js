
let Tab = require("../tab/index");

let LocalTermRow = require("./row");
let LocalTermTabUnitTests = require("./unit-tests");

let { LocalTerm } = require("niem-model");

/**
 * @extends Tab<LocalTermRow, LocalTermTabUnitTests>
 */
class LocalTermTab extends Tab {

  constructor(spreadsheet) {

    super(spreadsheet, "Local-Terminology");

    this.rowClass = LocalTermRow;

    this.cols = LocalTermRow.header();
    this.colLabels = LocalTermRow.headerLabels();
    this.fields = LocalTermRow.fields();

    this.requiredFields.add.push(
      this.fields.targetPrefix,
      this.fields.targetTerm,
    );

    this.requiredFields.edit.push(
      this.fields.sourcePrefix,
      this.fields.sourceTerm
    );

    this.requiredFields.map.push(
      this.fields.sourceTerm,
      this.fields.targetPrefix,
      this.fields.targetTerm
    );

    this.requiredFields.subset.push(
      this.fields.targetPrefix,
      this.fields.targetTerm
    );

  }

}

module.exports = LocalTermTab;
