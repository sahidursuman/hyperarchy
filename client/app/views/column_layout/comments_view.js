_.constructor("Views.ColumnLayout.CommentsView", View.Template, {

  liConstructor: Views.ColumnLayout.CommentLi,

  leftHeader: function() { with(this.builder) {
    h2("Comments");
  }},

  content: function() {with(this.builder) {
    div({'class': "comments columnView"}, function() {
      div({'class': "header"}, function() {
        h2("Comments");
      }).ref("header");
      div({'class': "section full"}, function() {
        div({'class': "recordsList"}, function() {
          subview('list', Views.SortedList);
          div({'class': "loading"}).ref("loading");
        });
      }).ref("body");
    });
  }},
  

  viewProperties: {

    relativeWidth: 1,

    initialize: function() {
      this.subscriptions = new Monarch.SubscriptionBundle;
      this.list.buildElement = this.bind(function(comment) {
        return Views.ColumnLayout.CommentLi.toView({
          record: comment,
          containingView: this
        });
      });
    },

    state: {
      afterChange: function(state, oldState) {
        var relationIsTheSame = (oldState &&
          (state.parentRecordId  === oldState.parentRecordId) &&
          (state.parentTableName === oldState.parentTableName));
        if (relationIsTheSame) {
          this.selectedRecordId(state.recordId);
          return;
        }
        this.startLoading();
        try {
          var mainRelation   = this.mainRelationToFetch(state);
          var otherRelations = this.otherRelationsToFetch(state);
          var relationsToFetch = [mainRelation].concat(otherRelations);
          Server.fetch(relationsToFetch).onSuccess(function() {
            this.mainRelation(mainRelation);
            this.selectedRecordId(state.recordId);
            if (this.isInFirstColumn()) this.setCurrentOrganizationId();
            this.stopLoading();
          }, this);
        } catch (badColumnState) {
          this.containingColumn.handleInvalidState(badColumnState);
        }
      }
    },

    mainRelationToFetch: function(state) {
      if (state.parentTableName === "elections")  {
        return Election.where({id: state.parentRecordId}).joinThrough(ElectionComment);
      } else {
        return Candidate.where({id: state.parentRecordId}).joinThrough(CandidateComment);
      }
    },

    otherRelationsToFetch: function(state) {
      var constructor;
      if (state.parentTableName === "elections") constructor = Election;
      else constructor = Candidate;
      var commentRelation = this.mainRelationToFetch(state);
      return [
        commentRelation.join(User).on(constructor.creatorId.eq(User.id)),
      ];
    },

    mainRelation: {
      afterChange: function(commentsRelation) {
        this.list.relation(commentsRelation);
      }
    },

    selectedRecordId: {
      afterChange: function(id) {
        if (! id) return;
        var selectedLi = this.list.elementsById[id];
        if (! selectedLi) return;
        this.list.children().removeClass("selected");
        selectedLi.addClass("selected");
      }
    },

    adjustHeight: function() {
      this.body.fillContainingVerticalSpace();
    },

    setCurrentOrganizationId: function() {
      Application.currentOrganizationId(1);
    },
    
    isInFirstColumn: function() {
      return (this.containingColumn.number === 0);
    },

    startLoading: function() {
      this.list.hide();
      this.loading.show();
    },

    stopLoading: function() {
      this.loading.hide();
      this.list.show();
      this.adjustHeight();
    }
  }
});