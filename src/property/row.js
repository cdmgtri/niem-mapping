
let RowInterface = require("../tab/row");

class PropertyRow extends RowInterface {

  constructor() {

    super();

    this.sourcePrefix = "";
    this.sourceName = "";
    this.sourceType = "";
    this.sourceDefinition = "";

    this.code = "";
    this.description = "";
    this.notes = "";

    this.targetPrefix = "";
    this.targetName = "";
    this.targetType = "";
    this.targetDefinition = "";
    this.targetGroup = "";
    this.targetStyle = "";
    this.targetKeywords = "";
    this.targetExampleContent = "";
    this.targetUsageInfo = "";

  }

  get label() {
    switch (this.code) {
      case "add":
      case "subset":
        return [this.targetPrefix, this.targetName].join(":");

      case "edit":
      case "delete":
      case "map":
        return [this.sourcePrefix, this.sourceName].join(":");
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

    let row = new PropertyRow();

    row.sourcePrefix = "Property_Source_NamespacePrefix";
    row.sourceName = "Property_Source_Name";
    row.sourceType = "Property_Source_DataType";
    row.sourceDefinition = "Property_Source_Definition";

    row.code = "Property_Mapping_Code";
    row.description = "Property_Mapping_Description";
    row.notes = "Property_Mapping_Notes";

    row.targetPrefix = "Property_Target_NamespacePrefix";
    row.targetName = "Property_Target_Name";
    row.targetType = "Property_Target_DataType";
    row.targetDefinition = "Property_Target_Definition";
    row.targetGroup = "Property_Target_SubstitutionGroup";
    row.targetStyle = "Property_Target_Style";
    row.targetKeywords = "Property_Target_Keywords";
    row.targetExampleContent = "Property_Target_ExampleContent";
    row.targetUsageInfo = "Property_Target_UsageInfo";

    return row;

  }

  static headerLabels() {

    let row = new PropertyRow();

    row.sourcePrefix = "Source NS Prefix";
    row.sourceName = "Property Name (Source)";
    row.sourceType = "Data Type (Source)";
    row.sourceDefinition = "Definition (Source)";

    row.code = "Mapping Code";
    row.description = "Description";
    row.notes = "Notes";

    row.targetPrefix = "Target NS Prefix";
    row.targetName = "Property Name (Target)";
    row.targetType = "Qualified Data Type (Target)";
    row.targetDefinition = "Definition (Target)";
    row.targetGroup = "Substitution Group (Target)";
    row.targetStyle = "Style";
    row.targetKeywords = "Keywords";
    row.targetExampleContent = "Example Content";
    row.targetUsageInfo = "Usage Info";

    return row;

  }

  static fields() {

    let row = new PropertyRow();

    row.sourcePrefix = "sourcePrefix";
    row.sourceName = "sourceName"
    row.sourceType = "sourceType"
    row.sourceDefinition = "sourceDefinition"

    row.code = "code"
    row.description = "description"
    row.notes = "notes"

    row.targetPrefix = "targetPrefix"
    row.targetName = "targetName"
    row.targetType = "targetType"
    row.targetDefinition = "targetDefinition"
    row.targetGroup = "targetGroup"
    row.targetStyle = "targetStyle"
    row.targetKeywords = "targetKeywords"
    row.targetExampleContent = "targetExampleContent"
    row.targetUsageInfo = "targetUsageInfo"

    return row;

  }

}

module.exports = PropertyRow;
