class User < ApplicationRecord
  validates :username, :session_token, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :shares,
    primary_key: :id,
    foreign_key: :receiver_id,
    class_name: :Share

    has_many :shared_datasets,
      through: :shares,
      source: :dataset

  has_many :authored_datasets,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Dataset

  has_many :authored_graphs,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Graph

  after_initialize :ensure_session_token

  attr_reader :password

  def self.find_by_credentials(username, pw)
    usr = User.find_by_username(username)
    return usr if usr && usr.is_password?(pw)
    nil
  end

  def is_password?(pw)
    digest = BCrypt::Password.new(self.password_digest)
    digest.is_password?(pw)
  end

  def password=(pw)
    @password = pw
    self.password_digest = BCrypt::Password.create(pw)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end
