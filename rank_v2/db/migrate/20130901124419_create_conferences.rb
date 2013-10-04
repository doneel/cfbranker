class CreateConferences < ActiveRecord::Migration
  def change
    create_table :conferences do |t|
    	t.integer 	:conference_code
    	t.string	:name
    	t.string	:subdivision
    	t.integer	:year
    end
  end
end
