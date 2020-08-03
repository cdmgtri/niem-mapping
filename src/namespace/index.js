
let Tab = require("../tab/index");

let NamespaceRow = require("./row");
let NamespaceTabUnitTests = require("./unit-tests");

let { Namespace } = require("niem-model");

/**
 * @extends Tab<NamespaceRow, NamespaceTabUnitTests>
 */
class NamespaceTab extends Tab {

  constructor(spreadsheet) {

    super(spreadsheet, "Namespace");

    this.rowClass = NamespaceRow;

    this.cols = NamespaceRow.header();
    this.colLabels = NamespaceRow.headerLabels();
    this.fields = NamespaceRow.fields();

    this.requiredFields.add.push(
      this.fields.targetPrefix,
      this.fields.targetURI,
      this.fields.targetStyle,
      this.fields.targetDefinition,
      this.fields.targetFileName,
      this.fields.targetRelativePath,
      this.fields.targetDraft
    );

    this.requiredFields.edit.push(
      this.fields.sourcePrefix,
    );

    this.requiredFields.map.push(
      this.fields.sourcePrefix,
      this.fields.targetPrefix
    );

    this.requiredFields.subset.push(
      this.fields.targetPrefix
    );

    this.styles = Namespace.Styles;

  }

}

module.exports = NamespaceTab;
