class Graph < ApplicationRecord

  validates :datafile_id, :graph_type, presence: true

  belongs_to :dataset,
    primary_key: :id,
    foreign_key: :datafile_id,
    class_name: :Dataset,
    dependent: :destroy

  belongs_to :creator,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User
end
