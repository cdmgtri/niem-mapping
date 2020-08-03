
let Row = require("../tab/row");

class SubPropertyRow extends Row {

  constructor() {

    super();

    this.sourceTypePrefix = "";
    this.sourceTypeName = "";
    this.sourcePropertyPrefix = "";
    this.sourcePropertyName = "";
    this.sourceMin = "";
    this.sourceMax = "";

    this.code = "";
    this.description = "";
    this.notes = "";

    this.targetTypePrefix = "";
    this.targetTypeName = "";
    this.targetPropertyPrefix = "";
    this.targetPropertyName = "";
    this.targetMin = "";
    this.targetMax = "";
    this.targetDefinition = "";

  }

  get label() {
    switch (this.code) {
      case "add":
      case "subset":
        return `${this.targetTypePrefix}:${this.targetTypeName}-${this.targetPropertyPrefix}:${this.targetPropertyName}`;

      case "edit":
      case "delete":
      case "map":
        return `${this.sourceTypePrefix}:${this.sourceTypeName}-${this.sourcePropertyPrefix}:${this.sourcePropertyName}`;
    }
  }

  get prefix() {
    switch (this.code) {
      case "add":
      case "subset":
        return this.targetTypePrefix;

      case "edit":
      case "delete":
      case "map":
        return this.sourceTypePrefix;
    }
  }

  static header() {

    let row = new SubPropertyRow();

    row.sourceTypePrefix = "HasA_Source_Type_NamespacePrefix";
    row.sourceTypeName = "HasA_Source_Type_Name";
    row.sourcePropertyPrefix = "HasA_Source_Property_NamespacePrefix";
    row.sourcePropertyName = "HasA_Source_Property_Name";
    row.sourceMin = "HasA_Source_Min";
    row.sourceMax = "HasA_Source_Max";

    row.code = "HasA_Mapping_Code";
    row.description = "HasA_Mapping_Description";
    row.notes = "HasA_Mapping_Notes";

    row.targetTypePrefix = "HasA_Target_Type_NamespacePrefix";
    row.targetTypeName = "HasA_Target_Type_Name";
    row.targetPropertyPrefix = "HasA_Target_Property_NamespacePrefix";
    row.targetPropertyName = "HasA_Target_Property_Name";
    row.targetMin = "HasA_Target_Min";
    row.targetMax = "HasA_Target_Max";
    row.targetDefinition = "HasA_Target_Definition";

    return row;

  }

  static headerLabels() {

    let row = new SubPropertyRow();

    row.sourceTypePrefix = "Source Type NS";
    row.sourceTypeName = "Type Name (Source)";
    row.sourcePropertyPrefix = "Property NS (Source)";
    row.sourcePropertyName = "Property Name (Source)";
    row.sourceMin = "Min (Source)";
    row.sourceMax = "Max (Source)";

    row.code = "Mapping Code";
    row.description = "Description";
    row.notes = "Notes";

    row.targetTypePrefix = "Target Type NS";
    row.targetTypeName = "Type Name (Target)";
    row.targetPropertyPrefix = "Property NS (Target)";
    row.targetPropertyName = "Property Name (Target";
    row.targetMin = "Min (Target)";
    row.targetMax = "Max (Target)";
    row.targetDefinition = "Definition (Target)";

    return row;

  }

  static fields() {

    let row = new SubPropertyRow();

    row.sourceTypePrefix = "sourceTypePrefix";
    row.sourceTypeName = "sourceTypeName";
    row.sourcePropertyPrefix = "sourcePropertyPrefix";
    row.sourcePropertyName = "sourcePropertyName";
    row.sourceMin = "sourceMin";
    row.sourceMax = "sourceMax";

    row.code = "code"
    row.description = "description"
    row.notes = "notes"

    row.targetTypePrefix = "targetTypePrefix";
    row.targetTypeName = "targetTypeName"
    row.targetPropertyPrefix = "targetPropertyPrefix"
    row.targetPropertyName = "targetPropertyName"
    row.targetMin = "targetMin"
    row.targetMax = "targetMax"
    row.targetDefinition = "targetDefinition"

    return row;

  }

}

module.exports = SubPropertyRow;
