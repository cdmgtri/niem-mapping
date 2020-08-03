
let Row = require("../tab/row");

class FacetRow extends Row {

  constructor() {

    super();

    this.sourcePrefix = "";
    this.sourceName = "";
    this.sourceValue = "";
    this.sourceDefinition = "";
    this.sourceStyle = "";

    this.code = "";
    this.description = "";
    this.notes = "";

    this.targetPrefix = "";
    this.targetName = "";
    this.targetValue = "";
    this.targetDefinition = "";
    this.targetStyle = "";

  }

  get label() {
    switch (this.code) {
      case "add":
      case "subset":
        return `${this.targetPrefix}:${this.targetName}-${this.targetStyle}-${this.targetValue}`;

      case "edit":
      case "delete":
      case "map":
        return `${this.sourcePrefix}:${this.sourceName}-${this.sourceStyle}-${this.sourceValue}`;
    }
  }

  get prefix() {
    switch (this.code) {
      case "add":
      case "subset":
        return this.targetPrefix;

      case "edit":
      case "delete":
      case "map":
        return this.sourcePrefix;
    }
  }

  static header() {

    let row = new FacetRow();

    row.sourcePrefix = "Facet_Source_NamespacePrefix";
    row.sourceName = "Facet_Source_TypeName";
    row.sourceValue = "Facet_Source_Value";
    row.sourceDefinition = "Facet_Source_Definition";
    row.sourceStyle = "Facet_Source_Style";

    row.code = "Facet_Mapping_Code";
    row.description = "Facet_Mapping_Description";
    row.notes = "Facet_Mapping_Notes";

    row.targetPrefix = "Facet_Target_NamespacePrefix";
    row.targetName = "Facet_Target_TypeName";
    row.targetValue = "Facet_Target_Value";
    row.targetDefinition = "Facet_Target_Definition";
    row.targetStyle = "Facet_Target_Style";

    return row;

  }

  static headerLabels() {

    let row = new FacetRow();

    row.sourcePrefix = "Source NS Prefix";
    row.sourceName = "Type Name (Source)";
    row.sourceValue = "Value (Source)";
    row.sourceDefinition = "Definition (Source)";
    row.targetStyle = "Kind of Facet (Source)";

    row.code = "Mapping Code";
    row.description = "Description";
    row.notes = "Notes";

    row.targetPrefix = "Target NS Prefix";
    row.targetName = "Type Name (Target)";
    row.targetValue = "Value (Target)";
    row.targetDefinition = "Definition (Target)";
    row.targetStyle = "Kind of Facet (Target)";

    return row;

  }

  static fields() {

    let row = new FacetRow();

    row.sourcePrefix = "sourcePrefix";
    row.sourceName = "sourceName";
    row.sourceValue = "sourceValue";
    row.sourceDefinition = "sourceDefinition";
    row.sourceStyle = "sourceStyle";

    row.code = "code";
    row.description = "description";
    row.notes = "notes";

    row.targetPrefix = "targetPrefix";
    row.targetName = "targetName";
    row.targetValue = "targetValue";
    row.targetDefinition = "targetDefinition";
    row.targetStyle = "targetStyle";

    return row;

  }

}

module.exports = FacetRow;
