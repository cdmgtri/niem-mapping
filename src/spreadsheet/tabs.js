
class Tab {

}

class InfoTab extends Tab {

  constructor() {
    super("Info");
    this.cells = Cells.InfoCells;
  }

}

module.exports = {
  Tab: require("../tab/index"),
  PropertyTab: require("../property/index"),
  TypeTab: require("../type/index"),
  SubPropertyTab: require("../subProperty/index"),
  FacetTab: require("../facet/index"),
  NamespaceTab: require("../namespace/index"),
  LocalTermTab: require("../localTerm/index"),

  InfoTab,
}