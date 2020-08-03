
let Tabs = require("./tabs");

let Tabs2 = require("../tab/index");

class Spreadsheet {

  constructor() {

    // this.info = new Tabs.InfoTab();

    this.property = new Tabs2.PropertyTab(this);
    this.type = new Tabs2.TypeTab(this);

    // this.subProperty = new Tabs.SubPropertyTab();
    // this.facet = new Tabs.FacetTab();
    // this.namespace = new Tabs.NamespaceTab();
    // this.localTerm = new Tabs.LocalTermTab();
    // this.metadata = new Tabs.MetadataTab();
    // this.union = new Tabs.TypeUnionTab();
  }

  get codes() {
    return {

      value: {
        add: "add",
        edit: "edit",
        delete: "delete",
        comment: "comment",
        no_change: "no change",
        map: "map",
        subset: "subset",
        no_match: "no match",
        documentation: "documentation",
        clear: "clear"
      },

      valid: ["add", "edit", "delete", "comment", "no change", "map", "subset", "no match", "documentation", "clear"],

      tracked: ["add", "edit", "delete", "map", "subset", "clear"],
    }
  }


}

module.exports = Spreadsheet;
