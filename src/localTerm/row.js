
let Row = require("../tab/row");

class LocalTermRow extends Row {

  constructor() {

    super();

    this.sourcePrefix = "";
    this.sourceTerm = "";

    this.code = "";
    this.description = "";
    this.notes = "";

    this.targetPrefix = "";
    this.targetTerm = "";
    this.targetLiteral = "";
    this.targetDefinition = "";

  }

  get label() {
    switch (this.code) {
      case "add":
      case "subset":
        return `${this.targetPrefix} ${this.targetTerm} [term]`;

      case "edit":
      case "delete":
      case "map":
        return `${this.sourcePrefix} ${this.sourceTerm} [term]`;
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

    let row = new LocalTermRow();

    row.sourcePrefix = "LocalTerm_Source_Prefix";
    row.sourceTerm = "LocalTerm_Source_Term";

    row.code = "LocalTerm_Mapping_Code";
    row.description = "LocalTerm_Mapping_Description";
    row.notes = "LocalTerm_Mapping_Notes";

    row.targetPrefix = "LocalTerm_Target_Prefix";
    row.targetTerm = "LocalTerm_Target_Term";
    row.targetLiteral = "LocalTerm_Target_Literal";
    row.targetDefinition = "LocalTerm_Target_Definition";

    return row;

  }

  static headerLabels() {

    let row = new LocalTermRow();

    row.sourcePrefix = "Source NS Prefix";
    row.sourceTerm = "Term (Source)";

    row.code = "Mapping Code";
    row.description = "Description";
    row.notes = "Notes";

    row.targetPrefix = "Target NS Prefix";
    row.targetTerm = "Term (Target)";
    row.targetLiteral = "Literal (Target)";
    row.targetDefinition = "Definition (Target)";

    return row;

  }

  static fields() {

    let row = new LocalTermRow();

    row.sourcePrefix = "sourcePrefix";
    row.sourceTerm = "sourceTerm";

    row.code = "code";
    row.description = "description";
    row.notes = "notes";

    row.targetPrefix = "targetPrefix";
    row.targetTerm = "targetTerm";
    row.targetLiteral = "targetLiteral";
    row.targetDefinition = "targetDefinition";

    return row;

  }

}

module.exports = LocalTermRow;
