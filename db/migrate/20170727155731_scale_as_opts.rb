class ScaleAsOpts < ActiveRecord::Migration[5.0]
  def change
    remove_column :graphs, :scaled, :boolean
    add_column :graphs, :scaled, :string
  end
end
