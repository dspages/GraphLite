class Share < ApplicationRecord
  belongs_to :dataset,
    primary_key: :id,
    foreign_key: :dataset_id,
    class_name: :Dataset,
    dependent: :destroy
end
