class CreateGraphs < ActiveRecord::Migration[5.0]
  def change
    create_table :graphs do |t|
      t.string :title, presence: true
      t.string :x_data
      t.string :y_data
      t.string :type
      t.string :filter
      t.integer :datafile_id, presence: true
      t.integer :user_id
      t.timestamps
    end
    add_index :graphs, :user_id
  end
end
