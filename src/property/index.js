
let Tab = require("../tab/interface");

let PropertyRow = require("./row");
let PropertyTabUnitTests = require("./unit-tests");

let { Property } = require("niem-model");

/**
 * @extends Tab<PropertyRow, PropertyTabUnitTests>
 */
class PropertyTab extends Tab {

  constructor(spreadsheet) {

    super(spreadsheet, "Property");

    this.rowClass = PropertyRow;

    this.cols = PropertyRow.header();
    this.colLabels = PropertyRow.headerLabels();
    this.fields = PropertyRow.fields();

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
      this.fields.targetType,
      this.fields.targetGroup
    ]

    this.styles = ["element", "attribute", "abstract", ""];

  }

}

module.exports = PropertyTab;
