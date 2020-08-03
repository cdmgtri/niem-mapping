
let Tab = require("../tab/index");

let FacetRow = require("./row");
let FacetTabUnitTests = require("./unit-tests");

let { Facet } = require("niem-model");

/**
 * @extends Tab<FacetRow, FacetTabUnitTests>
 */
class FacetTab extends Tab {

  constructor(spreadsheet) {

    super(spreadsheet, "Codes");

    this.rowClass = FacetRow;

    this.cols = FacetRow.header();
    this.colLabels = FacetRow.headerLabels();
    this.fields = FacetRow.fields();

    this.requiredFields.add.push(
      this.fields.targetPrefix,
      this.fields.targetName,
      this.fields.targetValue
    );

    this.requiredFields.edit.push(
      this.fields.sourcePrefix,
      this.fields.sourceName,
      this.fields.sourceValue
    );

    this.requiredFields.map.push(
      this.fields.sourceName,
      this.fields.sourceValue,
      this.fields.targetPrefix,
      this.fields.targetName,
      this.fields.targetValue
    );

    this.requiredFields.subset.push(
      this.fields.targetPrefix,
      this.fields.targetName,
      this.fields.targetValue
    );

    this.nameFields = [
      this.fields.sourceName,
      this.fields.targetName
    ];

    this.styles = [...Facet.Styles, ""];

  }

}

module.exports = FacetTab;
