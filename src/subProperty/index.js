
let Tab = require("../tab/index");

let SubPropertyRow = require("./row");
let SubPropertyTabUnitTests = require("./unit-tests");

/**
 * @extends Tab<SubPropertyRow, SubPropertyTabUnitTests>
 */
class SubPropertyTab extends Tab {

  constructor(spreadsheet) {

    super(spreadsheet, "Type-Has-Property");

    this.rowClass = SubPropertyRow;

    this.cols = SubPropertyRow.header();
    this.colLabels = SubPropertyRow.headerLabels();
    this.fields = SubPropertyRow.fields();

    this.requiredFields.add.push(
      this.fields.targetTypePrefix,
      this.fields.targetTypeName,
      this.fields.targetPropertyPrefix,
      this.fields.targetPropertyName
    );

    this.requiredFields.edit.push(
      this.fields.sourceTypePrefix,
      this.fields.sourceTypeName,
      this.fields.sourcePropertyPrefix,
      this.fields.sourcePropertyName
    );

    this.requiredFields.map.push(
      this.fields.sourceTypeName,
      this.fields.sourcePropertyName,
      this.fields.targetTypePrefix,
      this.fields.targetTypeName,
      this.fields.targetPropertyPrefix,
      this.fields.targetPropertyName
    );

    this.requiredFields.subset.push(
      this.fields.targetTypePrefix,
      this.fields.targetTypeName,
      this.fields.targetPropertyPrefix,
      this.fields.targetPropertyName
    );

    this.nameFields = [
      this.fields.sourceTypeName,
      this.fields.sourcePropertyName,
      this.fields.targetTypeName,
      this.fields.targetPropertyName
    ];

  }

}

module.exports = SubPropertyTab;
