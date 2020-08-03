
class Tab {

}

class InfoTab extends Tab {

  constructor() {
    super("Info");
    this.cells = Cells.InfoCells;
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
  NamespaceTab: require("../namespace/index"),

  InfoTab,
  LocalTermTab,
}