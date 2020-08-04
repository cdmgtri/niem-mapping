
let Tabs = require("./tabs");

class Spreadsheet {

  constructor() {

    // this.info = new Tabs.InfoTab();

    this.property = new Tabs.PropertyTab(this);
    this.type = new Tabs.TypeTab(this);
    this.subProperty = new Tabs.SubPropertyTab(this);
    this.facet = new Tabs.FacetTab(this);
    this.namespace = new Tabs.NamespaceTab(this);
    this.localTerm = new Tabs.LocalTermTab(this);

  }


}

module.exports = Spreadsheet;
