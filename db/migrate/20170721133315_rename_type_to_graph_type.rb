class RenameTypeToGraphType < ActiveRecord::Migration[5.0]
  def change
    remove_column :graphs, :type, :string
    add_column :graphs, :graph_type, :string
  end
end
