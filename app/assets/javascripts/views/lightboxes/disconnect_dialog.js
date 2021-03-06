//  Copyright (c) 2010-2011, Nathan Sobo and Max Brunsfeld.  This file is
//  licensed under the Affero General Public License version 3 or later.  See
//  the COPYRIGHT file.

_.constructor('Views.Lightboxes.DisconnectDialog', Views.Lightboxes.Lightbox, {
  id: "disconnect-dialog",

  lightboxContent: function() { with(this.builder) {
    h1(function() {
      raw("Your connection to our server<br/>has been lost.")
    });
    div("To ensure your interface stays up to date, you'll need to refresh the page.");
    a({'class': "button"}, "Refresh").ref('refreshButton').click('hide');
  }},

  viewProperties: {
    close: function() {
      Application.reload();
    }
  }
});
