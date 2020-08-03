
let Cells = require("./cells");
let Columns = require("./columns");

class Tab {

}

class InfoTab extends Tab {

  constructor() {
    super("Info");
    this.cells = Cells.InfoCells;
  }

}

class SubPropertyTab extends Tab {

  constructor() {
    super("Type-Has-Property");
    this.cols = Columns.SubPropertyColumns;

    let adds = [
      this.cols.TargetTypePrefix,
      this.cols.TargetTypeName,
      this.cols.TargetPropertyPrefix,
      this.cols.TargetPropertyName
    ];

    let edits = [
      this.cols.SourceTypePrefix,
      this.cols.SourceTypeName,
      this.cols.SourcePropertyPrefix,
      this.cols.SourcePropertyName
    ];

    this.requiredColNames = getRequiredColNames(adds, edits);

  }

  /**
   * Type qname - Property qname
   */
  label(row) {

    let typePrefix = row[this.cols.TargetTypePrefix] || row[this.cols.SourceTypePrefix];
    let typeName = row[this.cols.TargetTypeName] || row[this.cols.SourceTypeName];
    let typeQName = typePrefix + ":" + typeName;

    let propertyPrefix = row[this.cols.TargetPropertyPrefix] || row[this.cols.SourcePropertyPrefix];
    let propertyName = row[this.cols.TargetPropertyName] || row[this.cols.SourcePropertyName];
    let propertyQName = propertyPrefix + ":" + propertyName;

    return typeQName + " - " + propertyQName;

  }

}


class NamespaceTab extends Tab {

  constructor() {
    super("Namespace");
    this.cols = Columns.NamespaceColumns;

    let adds = [
      this.cols.TargetPrefix,
      this.cols.TargetURI,
      this.cols.TargetFileName,
      this.cols.TargetDefinition
    ];

    let edits = [
      this.cols.SourcePrefix
    ];

    let maps = [
      this.cols.TargetPrefix
    ];

    this.requiredColNames = getRequiredColNames(adds, edits, maps);
    this.requiredColNames.clear = edits;
  }

  /**
   * Namespace prefix
   */
  label(row) {
    return row[this.cols.TargetPrefix] || row[this.cols.SourcePrefix];
  }

}


class LocalTermTab extends Tab {

  constructor() {
    super("Local Terminology");
    this.cols = Columns.LocalTermColumns;

    let adds = [
      this.cols.TargetPrefix,
      this.cols.TargetTerm
    ];

    let edits = [
      this.cols.SourcePrefix,
      this.cols.SourceTerm
    ];

    this.requiredColNames = getRequiredColNames(adds, edits);
  }

  /**
   * Qualified term
   */
  label(row) {
    let prefix = row[this.cols.TargetPrefix] || row[this.cols.SourcePrefix];
    let term = row[this.cols.TargetTerm] || row[this.cols.SourceTerm];
    return prefix + ":" + term;
  }

}

module.exports = {
  Tab: require("../tab/index"),
  PropertyTab: require("../property/index"),
  TypeTab: require("../type/index"),
  SubPropertyTab: require("../subProperty/index"),
  FacetTab: require("../facet/index"),

  InfoTab,
  NamespaceTab,
  LocalTermTab,
}