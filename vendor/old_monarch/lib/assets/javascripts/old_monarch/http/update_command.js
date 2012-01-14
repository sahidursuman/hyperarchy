(function(OldMonarch) {

_.constructor("OldMonarch.Http.UpdateCommand", OldMonarch.Http.Command, {
  initialize: function($super, record, server) {
    $super(record, server);
    this.version = this.record.nextPendingVersion();
    this.tableName = this.record.table.globalName;
    this.id = this.record.id();
    this.fieldValues = this.record.local.dirtyWireRepresentation();
  },

  wireRepresentation: function() {
    return ['update', this.tableName, this.id, this.fieldValues];
  },

  complete: function(fieldValuesFromServer) {
    this.record.updated(fieldValuesFromServer, this.version);
  },

  handleFailure: function(errorsByFieldName) {
    if (errorsByFieldName) this.record.assignValidationErrors(errorsByFieldName);
  }
});

})(OldMonarch);