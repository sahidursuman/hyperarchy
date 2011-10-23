(function(OldMonarch) {

_.constructor("OldMonarch.Subscription", {
  initialize: function(node, callback, context) {
    this.node = node;
    this.callback = callback;
    this.context = context
  },

  trigger: function(args) {
    return this.callback.apply(this.context, args);
  },

  destroy: function() {
    this.node.unsubscribe(this);
  }
});

})(OldMonarch);
