class CreateShares < ActiveRecord::Migration[5.0]
  def change
    create_table :shares do |t|
      t.integer  :user_id, presence: true
      t.integer  :dataset_id, presence: true
      t.timestamps
    end
  end
end
