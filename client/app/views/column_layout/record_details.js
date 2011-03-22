_.constructor("Views.ColumnLayout.RecordDetails", View.Template, {
  content: function() {with(this.builder) {
    div({'class': "detailsContainer"}, function() {
      div({'class': _.singularize(template.tableName) + "Details"}, function() {

        h2({'class': "body"}).ref("body");
        div({'class': "details"}).ref("details");

        div({'class': "creatorInfo"}, function() {
          subview('creatorAvatar', Views.Avatar, { size: 40 });
          div({'class': "creatorName"}, "").ref('creatorName');
          div({'class': "creationDate"}, "").ref('createdAt');
        });

        ul({'class': "childLinks"}, function() {
          _(template.childNames).each(function(informalName, tableName) {
            li({'class': "childLink"}, function() {
              div({'class': "childLinkIcon"}).ref(tableName + "LinkIcon");
              span().ref(tableName + "LinkNumber");
              raw(' ');
              span().ref(tableName + "LinkText");
            }).ref(tableName + "Link").
               click("showChildTableInNextColumn", tableName);
          }, this);
        }).ref("childLinksList");
      });
    });
  }},

  // template properties to override:
  tableName: "elections",
  childNames: {
    candidates: "Answers",
    comments:   "Comments",
    votes:      "Votes"
  },
  recordConstructor: Election,
  childRelations: function(recordId) { return {
    candidates: Candidate.where({electionId: recordId}),
    comments:   ElectionComment.where({electionId: recordId}),
    votes:      Vote.where({electionId: recordId})
  }},

  viewProperties: {

    initialize: function() {
      this.subscriptions = new Monarch.SubscriptionBundle;

    },

    recordId: {
      afterChange: function(id) {
        this.childRelations = this.template.childRelations(id);
        this.record(this.template.recordConstructor.find(id));
      }
    },

    selectedChildLink: {
      afterChange: function(selectedTableName) {
        _(this.childRelations).each(function(relation, tableName) {
          this[tableName + 'Link'].removeClass('selected');
        }, this);
        this[selectedTableName + 'Link'].addClass('selected');
      }
    },

    record: {
      afterChange: function(record) {
        this.body.bindHtml(record, "body");
        if (this.record.details) {
          this.details.bindHtml(this.record, "details");
        }
        var creator = User.find(record.creatorId());
        this.creatorAvatar.user(creator);
        this.creatorName.html(htmlEscape(creator.fullName()));
        this.createdAt.html(record.formattedCreatedAt());

        Server.fetch(this.childRelations).onSuccess(function() {
          this.populateChildLinks();
          this.subscribeToChildRelationChanges();
        }, this)
      }
    },

    showChildTableInNextColumn: function(childTableName) {
      var newStateForNextColumn = {
        tableName:       childTableName,
        recordId:        NaN,
        parentTableName: this.template.tableName,
        parentRecordId:  this.record().id()
      };
      this.containingView.containingColumn.setNextColumnState(newStateForNextColumn);
    },

    populateChildLinks: function() {
      _(this.childRelations).each(function(relation, tableName) {
        this.updateLinkNumber(tableName);
        var link     = this[tableName + "Link"];
        var linkIcon = this[tableName + "LinkIcon"];
        link.mouseover(function() {
          linkIcon.addClass('expandIcon');
        });
        link.mouseout(function() {
          linkIcon.removeClass('expandIcon');
        });
      }, this);
    },

    subscribeToChildRelationChanges: function() {
      this.subscriptions.destroy();
      _(this.childRelations).each(function(relation, tableName) {
        this.subscriptions.add(relation.onInsert(function() {
          this.updateLinkNumber(tableName);
        }, this));
        this.subscriptions.add(relation.onRemove(function() {
          this.updateLinkNumber(tableName);
        }, this));
      }, this);
    },

    updateLinkNumber: function(tableName) {
      var relation = this.childRelations[tableName];
      var informalName = this.template.childNames[tableName];
      var linkNumber = this[tableName + "LinkNumber"];
      var linkText   = this[tableName + "LinkText"];
      var size = relation.size();
      if (size > 1) {
        linkNumber.html(size);
        linkText.html(informalName);
      } else if (size === 1) {
        linkNumber.html(1);
        linkText.html(_(informalName).singularize());
      } else {
        linkNumber.html('');
        var article = _(informalName).singularize()[0].match(/[aeiou]/) ? "an " : "a ";
        linkText.html("Add " + article + _(informalName).singularize());
      }
    },

    startLoading: function() {

    },

    stopLoading: function() {

    }
  }
});