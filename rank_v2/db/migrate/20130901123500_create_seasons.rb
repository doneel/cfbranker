class CreateSeasons < ActiveRecord::Migration
  def change
    create_table :seasons do |t|
		t.integer	:year
		t.integer	:num_weeks
    end
  end
end
