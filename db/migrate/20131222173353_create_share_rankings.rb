class CreateShareRankings < ActiveRecord::Migration
	  def change
		    create_table :share_rankings do |t|
                        t.integer :share_id
		    	t.integer :year
                        t.integer :week

                        #Uses postgres array type. Will not work with non-pg db
                        t.integer :teams, :array => true, :length => 247
                        t.timestamps
		    end
	  end
end
