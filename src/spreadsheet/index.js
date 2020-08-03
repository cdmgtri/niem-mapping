
let Tabs = require("./tabs");

class Spreadsheet {

  constructor() {

    // this.info = new Tabs.InfoTab();

    this.property = new Tabs.PropertyTab(this);
    this.type = new Tabs.TypeTab(this);
    this.facet = new Tabs.FacetTab(this);

    // this.subProperty = new Tabs.SubPropertyTab();
    // this.namespace = new Tabs.NamespaceTab();
    // this.localTerm = new Tabs.LocalTermTab();
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
