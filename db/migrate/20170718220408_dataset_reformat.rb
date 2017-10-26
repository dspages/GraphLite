class DatasetReformat < ActiveRecord::Migration[5.0]
  def change
    add_column :datasets, :data, :text
    remove_column :datasets, :location, :string
  end
end
