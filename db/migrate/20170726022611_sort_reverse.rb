class SortReverse < ActiveRecord::Migration[5.0]
  def change
    add_column :graphs, :sort_reverse, :boolean
  end
end
