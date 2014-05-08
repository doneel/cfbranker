class CreateShares < ActiveRecord::Migration
  	def change
            create_table :shares do |t|
                    t.integer 	:user_id
                    t.text      :algorithm_text
                    t.timestamps
            end
  	end
end
