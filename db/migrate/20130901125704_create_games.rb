class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
    	t.column         :game_code, :bigint
    	t.date		"date"
    	t.integer	"visit_team_code", :limit => 8
    	t.integer	"home_team_code", :limit => 8
    	t.integer	"stadium_code", :limit => 8
    	t.string	"site"
      t.integer "week"
      t.integer :year
      t.timestamps
    end
  end
end
