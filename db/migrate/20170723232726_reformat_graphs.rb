class ReformatGraphs < ActiveRecord::Migration[5.0]
  def change
    add_column :graphs, :sort_by, :string
    add_column :graphs, :y_data2, :string
    add_column :graphs, :y_data3, :string
    add_column :graphs, :labels, :string
  end
end
