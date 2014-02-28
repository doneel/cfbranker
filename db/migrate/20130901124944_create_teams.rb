class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
    	t.integer	"team_code", :limit => 8
    	t.string	"name"
    	t.integer	"conference_code"
    	t.integer	"year"
      	t.timestamps

    end
  end
end
