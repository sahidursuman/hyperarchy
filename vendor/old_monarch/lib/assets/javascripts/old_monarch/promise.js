(function(OldMonarch) {

_.constructor("OldMonarch.Promise", {
  initialize: function() {
    this.successNode = new OldMonarch.SubscriptionNode();
    this.invalidNode = new OldMonarch.SubscriptionNode();
    this.errorNode = new OldMonarch.SubscriptionNode();
  },

  success: function(fn, context) {
    if (this.successTriggerred) {
      fn.apply(context, this.data);
    } else {
      this.successNode.subscribe(fn, context);
    }
    return this;
  },

  invalid: function(fn, context) {
    if (this.invalidTriggerred) {
      fn.apply(context, this.data);
    } else {
      this.invalidNode.subscribe(fn, context);
    }
    return this;
  },

  error: function(fn, context) {
    if (this.errorTriggerred) {
      fn.apply(context, this.data);
    } else {
      this.errorNode.subscribe(fn, context);
    }
    return this;
  },

  triggerSuccess: function() {
    this.successTriggerred = true;
    this.data = arguments;
    this.successNode.publishArgs(arguments);
    return this;
  },

  triggerInvalid: function() {
    this.invalidTriggerred = true;
    this.data = arguments;
    this.invalidNode.publishArgs(arguments);
    return this;
  },

  triggerError: function() {
    this.errorTriggerred = true;
    this.data = arguments;
    this.errorNode.publishArgs(arguments);
    return this;
  }
});

})(OldMonarch);
