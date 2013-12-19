class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
    	t.integer	"game_code"
    	t.date		"date"
    	t.integer	"visit_team_code"
    	t.integer	"home_team_code"
    	t.integer	"stadium_code"
    	t.string	"site"
      t.integer "week"
      t.integer :year
      t.timestamps
    end
  end
end
