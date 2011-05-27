require "spec_helper"

describe EventObserver do
  describe "#observe" do
    before do
      stub(EventObserver).post
    end

    let(:events) { [] }

    it "causes all events on the given model classes to be sent to the appropriate channels on the socket server" do
      EventObserver.observe(User, Organization, Election)

      org1 = Organization.make
      org2 = Organization.make

      expect_event(org1)
      org1.update(:name => 'New Org Name', :description => 'New Org Description')
      events.shift.should == ["update", "organizations", org1.id, {"name"=>"New Org Name", "description"=>"New Org Description"}]

      expect_event(org1)
      election = org1.elections.make
      events.shift.should == ["create", "elections", election.wire_representation]

      expect_event(org1)
      election.destroy
      events.shift.should == ["destroy", "elections", election.id]

      user = org1.make_member
      org2.memberships.make(:user => user)

      expect_event(org1)
      expect_event(org2)

      user.update(:first_name => "MartyPrime")

      event = ["update", "users", user.id, {"first_name"=>"MartyPrime"}]
      events.should == [event, event]
    end

    def expect_event(organization)
      mock(EventObserver).post(organization.event_url, is_a(Hash)) do |url, options|
        events.push(JSON.parse(options[:params][:message]))
      end
    end
  end
end
