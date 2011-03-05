_.constructor("Views.Columns.ColumnLi", View.Template, {
  content: function() {
    this.builder.tag("li", {'class': "column"});
  },

  viewProperties: {

    initialize: function() {
      this.views = {
        organizations: Views.Columns.OrganizationsColumn.toView(),
        votes:         Views.Columns.VotesColumn.toView(),
        elections:     Views.Columns.ElectionsColumn.toView(),
        candidates:    Views.Columns.CandidatesColumn2.toView(),
        comments:      Views.Columns.CommentsColumn2.toView()
      };

      _(this.views).each(function(view) {
        view.hide();
        view.appendTo(this);
        view.containingColumn = this;
      }, this);
    },

    state: {
      afterChange: function(columnState, oldState) {
        if (!columnState || _(columnState).isEqual(oldState)) return;
        var viewName = columnState.tableName;
        this.switchToView(viewName);
        this.currentView.state(columnState);

        console.debug(viewName + " change");
      }
    },

    getViewNameFromColumnState: function(state) {
      return state.tableName;
    },

    setNextColumnState: function(newStateForNextColumn) {
      var newStateForThisColumn = _.clone(this.state());
      newStateForThisColumn.recordId = newStateForNextColumn.parentRecordId;
      this.state(newStateForThisColumn);

      var columnNumber     = this.columnNumber();
      var lastColumnNumber = this.containingList.numVisibleColumns() - 1;
      if (columnNumber === lastColumnNumber) {
        this.containingList.scrollRightAndSetRightColumnState(newStateForNextColumn);
      } else {
        var nextColumn = this.containingList.visibleColumns[columnNumber + 1];
        this.containingList.setColumnState(nextColumn, newStateForNextColumn);
      }
    },

    handleInvalidState: function(invalidState) {
      this.containingList.handleInvalidState(invalidState);
    },

    switchToView: function(viewName) {
      if (! this.views[viewName]) this.handleInvalidState();
      _(this.views).each(function(view, name) {
        if (name === viewName) view.show();
        else view.hide();
      });
      this.currentView = this.views[viewName];
    },

    columnNumber: {
      afterChange: function() {}
    },

    isFirst: function() {
      return (this.columnNumber() === 0);
    }
  }
});
