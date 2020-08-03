
let Row = require("../tab/row");

class NamespaceRow extends Row {

  constructor() {

    super();

    this.sourcePrefix = "";
    this.sourceURI = "";
    this.sourceDefinition = "";

    this.code = "";
    this.description = "";
    this.notes = "";

    this.targetPrefix = "";
    this.targetURI = "";
    this.targetDefinition = "";
    this.targetStyle = "";
    this.targetNDR = "";
    this.targetFileName = "";
    this.targetRelativePath = "";
    this.targetDraft = "";

  }

  get label() {
    return this.prefix;
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

    let row = new NamespaceRow();

    row.sourcePrefix = "Namespace_Source_Prefix";
    row.sourceURI = "Namespace_Source_URI";
    row.sourceDefinition = "Namespace_Source_Definition";

    row.code = "Namespace_Mapping_Code";
    row.description = "Namespace_Mapping_Description";
    row.notes = "Namespace_Mapping_Notes";

    row.targetPrefix = "Namespace_Target_Prefix";
    row.targetURI = "Namespace_Target_URI";
    row.targetDefinition = "Namespace_Target_Definition";
    row.targetStyle = "Namespace_Target_Style";
    row.targetNDR = "Namespace_Target_NDRTarget";
    row.targetFileName = "Namespace_Target_FileName";
    row.targetRelativePath = "Namespace_Target_RelativePath";
    row.targetDraft = "Namespace_Target_DraftVersion";

    return row;

  }

  static headerLabels() {

    let row = new NamespaceRow();

    row.sourcePrefix = "Source NS Prefix";
    row.sourceURI = "URI (Source)";
    row.sourceDefinition = "Definition (Source)";

    row.code = "Mapping Code";
    row.description = "Description";
    row.notes = "Notes";

    row.targetPrefix = "Target NS Prefix";
    row.targetURI = "URI (Target)";
    row.targetDefinition = "Definition (Target)";
    row.targetStyle = "Style (Target)";
    row.targetNDR = "NDR Target";
    row.targetFileName = "File Name (Target)";
    row.targetRelativePath = "Relative Path (Target)";
    row.targetDraft = "Draft Version (Target)";

    return row;

  }

  static fields() {

    let row = new NamespaceRow();

    row.sourcePrefix = "sourcePrefix";
    row.sourceURI = "sourceURI";
    row.sourceDefinition = "sourceDefinition";

    row.code = "code";
    row.description = "description";
    row.notes = "notes";

    row.targetPrefix = "targetPrefix";
    row.targetURI = "targetURI";
    row.targetDefinition = "targetDefinition";
    row.targetStyle = "targetStyle";
    row.targetNDR = "targetNDR";
    row.targetFileName = "targetFileName";
    row.targetRelativePath = "targetRelativePath";
    row.targetDraft = "targetDraft";

    return row;

  }

}

module.exports = NamespaceRow;
