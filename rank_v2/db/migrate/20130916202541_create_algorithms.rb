class CreateAlgorithms < ActiveRecord::Migration
  def change
    create_table :algorithms do |t|

      t.integer	:user_id
      t.text	:code
      t.string	:save_name

      t.timestamps
    end
  end
end
