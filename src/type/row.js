
let RowInterface = require("../tab/row");

class TypeRow extends RowInterface {

  constructor() {

    super();

    this.sourcePrefix = "";
    this.sourceName = "";
    this.sourceBase = "";
    this.sourceDefinition = "";

    this.code = "";
    this.description = "";
    this.notes = "";

    this.targetPrefix = "";
    this.targetName = "";
    this.targetBase = "";
    this.targetDefinition = "";
    this.targetStyle = "";
    this.targetUnionMembers = "";
    this.targetAppliesToTypes = "";
    this.targetAppinfo = "";

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

    let row = new TypeRow();

    row.sourcePrefix = "Type_Source_NamespacePrefix";
    row.sourceName = "Type_Source_Name";
    row.sourceBase = "Type_Source_Base";
    row.sourceDefinition = "Type_Source_Definition";

    row.code = "Type_Mapping_Code";
    row.description = "Type_Mapping_Description";
    row.notes = "Type_Mapping_Notes";

    row.targetPrefix = "Type_Target_NamespacePrefix";
    row.targetName = "Type_Target_Name";
    row.targetBase = "Type_Target_Base";
    row.targetDefinition = "Type_Target_Definition";
    row.targetStyle = "Type_Target_Style";
    row.targetUnionMembers = "Type_Target_Members";
    row.targetAppliesToTypes = "Type_Target_AppliesToTypes";
    row.targetAppinfo = "Type_Target_Appinfo";

    return row;

  }

  static headerLabels() {

    let row = new TypeRow();

    row.sourcePrefix = "Source NS Prefix";
    row.sourceName = "Type Name (Source)";
    row.sourceBase = "Parent / Base Type (Source)";
    row.sourceDefinition = "Definition (Source)";

    row.code = "Mapping Code";
    row.description = "Description";
    row.notes = "Notes";

    row.targetPrefix = "Target NS Prefix";
    row.targetName = "Type Name (Target)";
    row.targetBase = "Qualified Parent / Base Type (Target)";
    row.targetDefinition = "Definition (Target)";
    row.targetStyle = "Style";
    row.targetUnionMembers = "Qualified Union Member Types";
    row.targetAppliesToTypes = "Qualified Metadata Applies to Types";
    row.targetAppinfo = "Appinfo";

    return row;

  }

  static fields() {

    let row = new TypeRow();

    row.sourcePrefix = "sourcePrefix";
    row.sourceName = "sourceName"
    row.sourceBase = "sourceBase"
    row.sourceDefinition = "sourceDefinition"

    row.code = "code"
    row.description = "description"
    row.notes = "notes"

    row.targetPrefix = "targetPrefix"
    row.targetName = "targetName"
    row.targetBase = "targetBase"
    row.targetDefinition = "targetDefinition"
    row.targetStyle = "targetStyle"

    return row;

  }

}

module.exports = TypeRow;
