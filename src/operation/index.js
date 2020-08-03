
let { NIEMObject, Interfaces } = require("niem-model");
let { DataSetInterface } = Interfaces.SourceInterface;
let { TrackedCodes } = require("../tab/index");

let DataSetInterfaceType = new DataSetInterface();

class Operation {

  /**
   * @param {DataSetInterfaceType} dataSet
   * @param {TrackedCodes} changeCode
   * @param {NIEMObject} oldIdentifiers - Original component identifiers (left-hand side of mapping)
   * @param {NIEMObject} newIdentifiers - New component identifiers (right-hand side of mapping)
   * @param {NIEMObject} newFields - New or updated fields (right-hand side of mapping)
   * @param {String} description
   * @param {String} notes
   * @param {String} issueURL
   */
  constructor(dataSet, changeCode, oldIdentifiers, newIdentifiers, newFields, description, notes, issueURL) {

    this.dataSet = dataSet;

    /** @type {TrackedCodes} */
    this.changeCode = changeCode;

    this.oldIdentifiers = oldIdentifiers;
    this.newIdentifiers = newIdentifiers;
    this.newFields = newFields;

    this.description = description;
    this.notes = notes;
    this.issueURL = issueURL;

  }

  async oldObject() {
    return this.dataSet.get(this.oldIdentifiers);
  }

  async newObject() {

    // No new object
    if (this.changeCode == "clear" || this.changeCode == "delete") return;

    // Object already exists
    if (this.changeCode == "map" || this.changeCode == "subset") {
      return this.dataSet.get(this.newIdentifiers);
    }

    // Object is being created and the new fields fully specify the new object
    if (this.changeCode == "add") {
      return this.newFields;
    }

    // An old object is being modified.  Only changes are identified in the new fields.
    let object = await this.oldObject();

    for (let field in newFields) {
      object[field] = newFields[field];
    }

    return object;
  }

}

module.exports = Operation;
