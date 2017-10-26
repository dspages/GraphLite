class CreateDatasets < ActiveRecord::Migration[5.0]
  def change
    create_table :datasets do |t|
      t.string :title, presence: true, uniqueness: true
      t.integer :user_id
      t.string :location, presence: true
      t.boolean :privacy
      t.timestamps
    end
    add_index :datasets, :user_id
  end
end
