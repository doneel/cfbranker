class CreateShares < ActiveRecord::Migration
  	def change
    	create_table :shares do |t|
    		t.integer :share_url_extension

      		t.timestamps
    	end
  	end
end
