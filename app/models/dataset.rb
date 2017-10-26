class Dataset < ApplicationRecord

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  has_many :graphs,
    primary_key: :id,
    foreign_key: :datafile_id,
    class_name: :Graph

end
