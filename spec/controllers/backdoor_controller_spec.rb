require 'spec_helper'

describe BackdoorController do
  describe "#create" do
    it "merges the given field_values into a plan generated by the blueprint for the model being created" do
      expect {
        post :create, :relation => "users", :field_values => { :first_name => "Joe" }
        response.should be_success
      }.to change(User, :count).by(1)

      user = User.find(response_json['id'])

      user.first_name.should == "Joe"
      user.last_name.should_not be_blank
      response_json.should == user.wire_representation(:ignore_security)
    end
  end

  describe "#clear_tables" do
    it "clears all tables in the database" do
      User.make
      Team.make
      User.should_not be_empty
      post :clear_tables
      response.should be_success
      Team.all.should == [Team.social]
      User.all.should == [User.default_guest]
    end
  end

  describe "#upload_repository" do
    it "inserts / updates the given records after filling in their missing properties with blueprints" do
      freeze_time

      existing_agenda_item = AgendaItem.make(:id => 2, :body => "Overwrite me!")

      records_json = {
        "agenda_items" => {
          "1" => { "id" => 1, "question_id" => 1, "creator_id" => 2},
          "2" => { "id" => 2, "body" => "La la" }
        }
      }.to_json

      post :upload_repository, :records => records_json

      new_agenda_item = AgendaItem.find(1)
      new_agenda_item.body.should_not be_blank

      existing_agenda_item.reload.body.should == "La la"

      response_json.should == {
        "agenda_items" => {
          "1" => new_agenda_item.wire_representation,
          "2" => existing_agenda_item.wire_representation
        }
      }
    end
  end
end
