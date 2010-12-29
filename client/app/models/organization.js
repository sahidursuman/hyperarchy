_.constructor("Organization", Model.Record, {
  constructorProperties: {
    initialize: function() {
      this.columns({
        name: "string",
        description: "string",
        membersCanInvite: "boolean",
        dismissedWelcomeGuide: 'boolean',
        useSsl: 'boolean'
      });

      this.hasMany("elections");
      this.relatesToMany("candidates", function() {
        return this.elections().joinThrough(Candidate);
      });
      this.relatesToMany("votes", function() {
        return this.elections().joinThrough(Vote);
      });

      this.hasMany("memberships", {orderBy: ["firstName asc", "emailAddress asc"]});
      this.relatesToMany("members", function() {
        return this.memberships().joinThrough(User);
      });
    },

    global: function() {
      return this.find({name: "Alpha Testers"});
    }
  },

  membershipForUser: function(user) {
    return this.memberships().find({userId: user.id()});
  },

  membershipForCurrentUser: function() {
    return this.membershipForUser(Application.currentUser());
  },

  currentUserIsMember: function() {
    return this.membershipForCurrentUser() != null;
  },

  currentUserIsOwner: function() {
    var currentUserMembership = this.memberships().find({userId: Application.currentUserId});
    return currentUserMembership.role() === "owner";
  },

  currentUserCanEdit: function() {
    return Application.currentUser().admin() || this.currentUserIsOwner();
  }
});
