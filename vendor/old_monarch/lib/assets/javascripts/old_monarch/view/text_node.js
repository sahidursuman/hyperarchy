(function(OldMonarch) {

_.constructor("OldMonarch.View.TextNode", {
  initialize: function(text, raw) {
    this.text = text;
    this.raw = raw;
  },

  toXml: function() {
    if (this.raw) {
      return this.text;
    } else {
      return htmlEscape(this.text);
    }
  },

  postProcess: function() {
  }
});

})(OldMonarch);
