class RenameShareColumn < ActiveRecord::Migration[5.0]
  def change
    remove_column :shares, :user_id, :string
    add_column :shares, :receiver_id, :string
  end
end
