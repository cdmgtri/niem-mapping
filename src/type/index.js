
let Tab = require("../tab/index");

let TypeRow = require("./row");
let TypeTabUnitTests = require("./unit-tests");

let { Type } = require("niem-model");

/**
 * @extends Tab<TypeRow, TypeTabUnitTests>
 */
class TypeTab extends Tab {

  constructor(spreadsheet) {

    super(spreadsheet, "Type");

    this.rowClass = TypeRow;

    this.cols = TypeRow.header();
    this.colLabels = TypeRow.headerLabels();
    this.fields = TypeRow.fields();

    this.requiredFields.add.push(
      this.fields.targetPrefix,
      this.fields.targetName,
      this.fields.targetDefinition
    );

    this.requiredFields.edit.push(
      this.fields.sourcePrefix,
      this.fields.sourceName
    );

    this.requiredFields.map.push(
      this.fields.sourceName,
      this.fields.targetPrefix,
      this.fields.targetName
    );

    this.requiredFields.subset.push(
      this.fields.targetPrefix,
      this.fields.targetName
    );

    this.nameFields = [
      this.fields.sourceName,
      this.fields.targetName
    ];

    this.qnameFields = [
      this.fields.targetBase
    ]

    this.styles = [...Type.Styles, ""];

  }

}

module.exports = TypeTab;
