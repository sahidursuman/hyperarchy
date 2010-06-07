require File.expand_path("#{File.dirname(__FILE__)}/../../hyperarchy_spec_helper")

module Models
  describe Membership do
    attr_reader :organization
    before do
      @organization = Organization.make
    end

    describe "when created with an email address of an existing user" do
      it "associates the membership with the user that has that email address" do
        user = User.make
        membership = organization.memberships.create!(:email_address => user.email_address)
        membership.user.should == user
        membership.should_not be_pending
        membership.invitation.should be_nil
      end
    end

    describe "when created with an unknown email address" do
      it "associates the membership with an invitation to that email address and assigns it a pending state" do
        current_user = User.make
        Monarch::Model::Record.current_user = current_user

        email_address = "new_member@example.com"
        membership = organization.memberships.create!(:email_address => email_address)
        membership.should be_pending
        invitation = membership.invitation
        invitation.inviter.should == current_user
        invitation.sent_to_address.should == email_address
        membership.user.should be_nil

        other_organization = Organization.make
        other_membership = other_organization.memberships.create!(:email_address => email_address)

        other_membership.should be_pending
        other_membership.invitation.should == invitation

        user = invitation.redeem(User.plan)

        membership.should_not be_pending
        membership.user.should == user
        other_membership.should_not be_pending
        other_membership.user.should == user
      end
    end
  end
end
