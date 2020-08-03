
class Row {

  constructor() {

    /** @type {number} */
    this.rowNum;

    this.code = "";
    this.description = "";
    this.notes = "";

  }

  get label() {
    return ""
  }

  get prefix() {
    return ""
  }

}



module.exports = Row;
